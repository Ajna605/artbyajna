/**
 * Vercel Serverless Function: POST /api/order-notification
 *
 * Sends an admin email notification when a customer submits an order.
 *
 * Setup (one-time, in the Vercel project dashboard → Settings → Environment Variables):
 *   ADMIN_EMAIL       – the email address to notify (e.g. your Gmail address)
 *   SMTP_HOST         – SMTP server hostname  (e.g. smtp.gmail.com)
 *   SMTP_PORT         – SMTP server port       (e.g. 587)
 *   SMTP_USER         – SMTP login username    (e.g. your Gmail address)
 *   SMTP_PASS         – SMTP login password    (use a Gmail App Password, not your main password)
 *
 * For Gmail:
 *   1. Enable 2-Factor Authentication on your Google account.
 *   2. Create an App Password at https://myaccount.google.com/apppasswords
 *      (select "Mail" + "Other" and name it "Ajna Shop").
 *   3. Set SMTP_PASS to that 16-character app password.
 *   4. Set SMTP_HOST=smtp.gmail.com, SMTP_PORT=587, SMTP_USER=<your gmail>.
 */

const nodemailer = require("nodemailer");

module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const order = req.body;

  if (!order || !order.reference) {
    return res.status(400).json({ error: "Invalid order data" });
  }

  const {
    ADMIN_EMAIL,
    SMTP_HOST,
    SMTP_PORT,
    SMTP_USER,
    SMTP_PASS,
  } = process.env;

  if (!ADMIN_EMAIL || !SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS) {
    // Not configured — log and return success so the order is not blocked.
    console.warn("order-notification: SMTP environment variables not set. Skipping email.");
    return res.status(200).json({ sent: false, reason: "not_configured" });
  }

  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT),
    secure: Number(SMTP_PORT) === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });

  const productList = Array.isArray(order.products)
    ? order.products.map((p) => `  • ${p.title ?? "Unknown"} (${p.size ?? "N/A"})`).join("\n")
    : "  (no products listed)";

  const text = [
    `New order received on Ajna Art Shop`,
    ``,
    `Reference : ${order.reference}`,
    `Date      : ${order.date}`,
    `Status    : ${order.status}`,
    ``,
    `--- Customer ---`,
    `Name      : ${order.name}`,
    `Email     : ${order.email}`,
    `Phone     : ${order.phone}`,
    ``,
    `--- Shipping ---`,
    `Address   : ${order.address}`,
    `Country   : ${order.country}`,
    ``,
    `--- Products ---`,
    productList,
    ``,
    `--- Payment ---`,
    `Method    : ${order.payment}`,
  ].join("\n");

  try {
    await transporter.sendMail({
      from: `"Ajna Shop" <${SMTP_USER}>`,
      to: ADMIN_EMAIL,
      subject: `New order ${order.reference} from ${order.name}`,
      text,
    });

    return res.status(200).json({ sent: true });
  } catch (err) {
    console.error("order-notification: failed to send email:", err.message);
    // Return 200 so the front end does not treat this as a hard failure.
    return res.status(200).json({ sent: false, reason: "smtp_error" });
  }
};
