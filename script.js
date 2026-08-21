const products = [
  {
    id: "Fazalux Magasin",
    title: "Fazalux Magasin",
    category: "Mauritius Street Scene",
    price: 250,
    size: "A3 (29.7 × 42 cm)",
    paper: "310gsm archival matte paper",
    image: "images/fazalux/chatty-fazalux-front.png",
    images: [
      { type: "image", src: "images/fazalux/chatty-fazalux-frame.png", alt: "Fazalux Magasin in Frame" },
      { type: "image", src: "images/fazalux/fazalux-zoom-left.jpg", alt: "Fazalux Magasin zoom left" },
      { type: "image", src: "images/fazalux/fazalux-zoom-right.jpg", alt: "Fazalux Magasin zoom right" },
      { type: "image", src: "images/fazalux/chatty-fazalux-shell.png", alt: "Fazalux Magasin shell view" },
      { type: "video", src: "images/fazalux/showflip.mp4", poster: "images/fazalux/chatty-fazalux-front.png", alt: "Painting process video" }
    ],
    description: "Classic Tabagie of Mauritius in Curepipe - where pots are sold and you can also get a haircut!"
  },
  { id: "Calm boat", title: "Calm boat", category: "Mauritius Seascape", price: 250, image: "images/calm_boat/01_front.jpg", images: [
    { type: "image", src: "images/calm_boat/02_framed.png", alt: "Calm boat print with a luminous green island landscape" },
    { type: "image", src: "images/calm_boat/02_detail.jpg", alt: "Calm boat print detail showing layered tropical greens" },
    { type: "image", src: "images/calm_boat/03_styled_shells.jpg", alt: "Calm boat print displayed with a view of misty hills" },
    { type: "image", src: "images/calm_boat/05_back.jpg", alt: "Calm boat print displayed with a view of misty hills" },
    { type: "video", src: "images/calm_boat/showflip.mp4", poster: "images/calm_boat/01_front.jpg", alt: "Calm boat print displayed in video" }
  ], description: "A boat rests calmly on the serene waters of Mauritius. Location Unknown" },
  { id: "infinity-papaya",
    title: "Infinity Papaya", category: "Mauritius Food Scene", price: 250, image: "images/papaya/01_front.jpg", images: [
    { type: "image", src: "images/papaya/03_framed.png", alt: "Infinity Papaya print with a golden citrus still life" },
    { type: "image", src: "images/papaya/02_detail.jpg", alt: "Infinity Papaya print detail with sunlit yellow fruit" },
    { type: "image", src: "images/papaya/04_styled_shells.jpg", alt: "Infinity Papaya print in a warm, sunlit interior" },
    { type: "image", src: "images/papaya/05_back.jpg", alt: "Infinity Papaya print in a warm, sunlit interior" },
    { type: "video", src: "images/papaya/showflip.mp4", poster: "images/papaya/04_styled_shells.jpg", alt: "Infinity Papaya print in a warm, sunlit interior" }
  ], description: "Something we are all used to seeing and are often blessed to taste - papaya from below." },
  { id: "Tractor Monkeys", title: "Tractor Monkeys", category: "Mauritius Street Scene", price: 250, image: "images/tractor_monkeys/01_front.png", images: [
    { type: "image", src: "images/tractor_monkeys/04_framed.png", alt: "Tractor Monkeys print with a luminous green island landscape" },
    { type: "image", src: "images/tractor_monkeys/02_detail.jpg", alt: "Tractor Monkeys print detail showing layered tropical greens" },
    { type: "image", src: "images/tractor_monkeys/03_styled_shells.jpg", alt: "Tractor Monkeys print displayed with a view of misty hills" },
    { type: "image", src: "images/tractor_monkeys/05_back.jpg", alt: "Tractor Monkeys print displayed with a view of misty hills" },
    { type: "video", src: "images/tractor_monkeys/showflip.mp4", poster: "images/tractor_monkeys/01_front.png", alt: "Tractor Monkeys print displayed in video" }
  ], description: "These Monkeys have found a home by the Curepipe Bazar. Often fed by the locals, they loiter on this tractor all day long"},
  { id: "the-red-church", title: "The Red Church", category: "Mauritius Seascape", price: 250, image: "images/red_church/01_front.png", images: [
    { type: "image", src: "images/red_church/03_detail.png", alt: "The Red Church print with loose pink petals and green leaves" },
    { type: "image", src: "images/red_church/03_detail.png", alt: "The Red Church print detail showing layered botanical colour" },
    { type: "image", src: "images/red_church/04_shell.png", alt: "The Red Church print styled with delicate flowering branches" },
    { type: "image", src: "images/red_church/05_back.png", alt: "The Red Church print styled with delicate flowering branches" },
    { type: "video", src: "images/red_church/showflip2.mp4", poster: "images/red_church/01_front.png", alt: "The Red Church print styled with delicate flowering branches" }
  ], description: "The iconic church of Cap Malheureux captured with the beautiful azure sea in front of it. " }
];
let cart = JSON.parse(localStorage.getItem("ajna-cart") || "[]");
let selectedProduct = null;
let selectedImageIndex = 0;

const formatPrice = (price) => `Rs ${price.toLocaleString("en-MU")}`;
const openModal = (id) => {
  const modal = document.getElementById(id);
  if (modal) { modal.classList.add("open"); modal.setAttribute("aria-hidden", "false"); }
};
const closeModals = () => document.querySelectorAll(".modal").forEach((modal) => { modal.classList.remove("open"); modal.setAttribute("aria-hidden", "true"); });
const savedOrders = () => JSON.parse(localStorage.getItem("ajna-orders") || "[]");
const saveOrders = (orders) => localStorage.setItem("ajna-orders", JSON.stringify(orders));
const escapeHtml = (value) => String(value).replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll("\"", "&quot;").replaceAll("'", "&#39;");
const paymentMethodDetails = {
  "Bank Transfer (Local - Mauritius)": {
    title: "Bank Transfer — Local (Mauritius)",
    fields: [
      ["Bank Name", "Mauritius Commercial Bank (MCB)"],
      ["Account Name", "Art by Ajna"],
      ["Account Number", "000123456789"],
      ["Branch Code", "MCB001"],
      ["Reference", "Use your order number"]
    ]
  },
  "Bank Transfer (International)": {
    title: "Bank Transfer — International",
    fields: [
      ["Bank Name", "Mauritius Commercial Bank (MCB)"],
      ["Account Name", "Art by Ajna"],
      ["IBAN / Account Number", "— to be provided on confirmation —"],
      ["SWIFT / BIC", "MCBLMUMU"],
      ["Reference", "Use your order number"]
    ]
  },
  "Juice Payment": {
    title: "Juice Payment (Mauritius only)",
    fields: [
      ["Wallet Name", "Art by Ajna"],
      ["Juice Number", "+230 5XXX XXXX"],
      ["Payment Reference", "Use your order number"],
      ["Note", "Send payment screenshot after transfer"]
    ]
  }
};

function renderPaymentDetails(method) {
  const details = paymentMethodDetails[method];
  if (!details) return "<p class=\"payment-details-placeholder\">Select a payment method to view details.</p>";
  return `<h3>${escapeHtml(details.title)}</h3><dl class="payment-details-list">${details.fields.map(([label, value]) => `<dt>${escapeHtml(label)}</dt><dd>${escapeHtml(value)}</dd>`).join("")}</dl>`;
}

function renderProducts() {
  const openProductPage = (productId) => {
    window.location.href = `product.html?id=${encodeURIComponent(productId)}`;
  };

  document.getElementById("product-grid").innerHTML = products.map((product) => `
    <article class="product-card" data-product="${product.id}" role="button" tabindex="0" aria-label="View ${product.title} print details">
      <div class="product-image"><img src="${product.image}" alt="${product.title} watercolor print" /></div>
      <div class="product-meta"><div><h3>${product.title}</h3><p>${product.category}</p></div><span class="product-price">${formatPrice(product.price)}</span></div>
    </article>`).join("");

  document.querySelectorAll(".product-card").forEach((card) => {
    card.addEventListener("click", () => openProductPage(card.dataset.product));
    card.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        openProductPage(card.dataset.product);
      }
    });
  });
}

function updateProductGallery() {
  const image = selectedProduct.images[selectedImageIndex];
  const galleryImage = document.getElementById("product-gallery-image");
  if (!galleryImage) return;
  galleryImage.src = image.src;
  galleryImage.alt = image.alt;
  document.querySelectorAll(".gallery-indicator").forEach((indicator, index) => {
    const isCurrent = index === selectedImageIndex;
    indicator.classList.toggle("active", isCurrent);
    indicator.setAttribute("aria-pressed", String(isCurrent));
    indicator.setAttribute("aria-label", `Show image ${index + 1} of ${selectedProduct.images.length}`);
  });
  document.querySelector(".gallery-current").textContent = selectedImageIndex + 1;
  document.getElementById("gallery-status").textContent = `Image ${selectedImageIndex + 1} of ${selectedProduct.images.length}: ${image.alt}`;
}

function moveProductGallery(direction) {
  selectedImageIndex = (selectedImageIndex + direction + selectedProduct.images.length) % selectedProduct.images.length;
  updateProductGallery();
}

function showProduct(id) {
  selectedProduct = products.find((product) => product.id === id);
  selectedImageIndex = 0;
  document.getElementById("product-detail").innerHTML = `
    <div class="product-gallery" role="region" aria-roledescription="carousel" aria-label="${selectedProduct.title} print gallery" tabindex="0">
      <div class="product-gallery-frame">
        <img class="product-detail-image" id="product-gallery-image" src="${selectedProduct.images[0].src}" alt="${selectedProduct.images[0].alt}" />
        <button class="gallery-control gallery-previous" type="button" aria-label="Show previous image"><span aria-hidden="true">&larr;</span></button>
        <button class="gallery-control gallery-next" type="button" aria-label="Show next image"><span aria-hidden="true">&rarr;</span></button>
      </div>
      <div class="gallery-navigation"><div class="gallery-indicators" aria-label="Choose an image">${selectedProduct.images.map((image, index) => `<button class="gallery-indicator${index === 0 ? " active" : ""}" type="button" data-image-index="${index}" aria-label="Show image ${index + 1} of ${selectedProduct.images.length}" aria-pressed="${index === 0}"><span class="sr-only">Image ${index + 1}</span></button>`).join("")}</div><p class="gallery-count" aria-hidden="true"><span class="gallery-current">1</span> / ${selectedProduct.images.length}</p></div>
      <p class="sr-only" id="gallery-status" aria-live="polite"></p>
    </div>
    <div><p class="eyebrow">${selectedProduct.category}</p><h2>${selectedProduct.title}</h2><p class="price">From ${formatPrice(selectedProduct.price)}</p><p class="description">${selectedProduct.description}</p>
    <div class="detail-row"><label>Choose your size</label><div class="sizes"><button class="size-option active" data-size="A4">A4 &middot; ${formatPrice(selectedProduct.price)}</button><button class="size-option" data-size="A3">A3 &middot; ${formatPrice(selectedProduct.price + 700)}</button><button class="size-option" data-size="A2">A2 &middot; ${formatPrice(selectedProduct.price + 1550)}</button></div></div>
    <div class="detail-row"><label>Paper</label><p>310gsm textured archival fine-art paper</p></div><div class="detail-row">
    <div class="detail-row"><label>Shipping costs</label><p>Local and international postage cost an extra Rs 50 and Rs 200 respectively.</p></div><div class="detail-row">
    <label>Preparation time</label><p>Made to order in 5–8 business days</p></div>
    <button class="button button-dark add-to-cart">Add to bag <span>→</span></button></div>`;
  document.querySelector(".gallery-previous").addEventListener("click", () => moveProductGallery(-1));
  document.querySelector(".gallery-next").addEventListener("click", () => moveProductGallery(1));
  document.querySelectorAll(".gallery-indicator").forEach((button) => button.addEventListener("click", () => {
    selectedImageIndex = Number(button.dataset.imageIndex);
    updateProductGallery();
  }));
  document.querySelector(".product-gallery").addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") { event.preventDefault(); moveProductGallery(-1); }
    if (event.key === "ArrowRight") { event.preventDefault(); moveProductGallery(1); }
  });
  document.querySelectorAll(".size-option").forEach((button) => button.addEventListener("click", () => {
    document.querySelectorAll(".size-option").forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
  }));
  document.querySelector(".add-to-cart").addEventListener("click", () => {
    const size = document.querySelector(".size-option.active").dataset.size;
    const price = selectedProduct.price + (size === "A3" ? 700 : size === "A2" ? 1550 : 0);
    cart.push({ ...selectedProduct, size, price, lineId: `${selectedProduct.id}-${size}-${Date.now()}` });
    saveCart(); closeModals(); renderCart(); openModal("cart-modal");
  });
  updateProductGallery();
  openModal("product-modal");
}

function saveCart() {
  localStorage.setItem("ajna-cart", JSON.stringify(cart));
  document.querySelectorAll(".cart-count").forEach((count) => { count.textContent = cart.length; });
}
function renderCart() {
  const items = document.getElementById("cart-items"), empty = document.getElementById("cart-empty");
  if (!items || !empty) return;
  const subtotal = cart.reduce((sum, item) => sum + item.price, 0);
  items.innerHTML = cart.map((item) => `<div class="cart-item"><img src="${item.image}" alt="${item.title}" /><div><h3>${item.title}</h3><p>${item.size} print &middot; Fine-art paper</p><p>${formatPrice(item.price)}</p></div><button class="remove-item" data-id="${item.lineId}">Remove</button></div>`).join("");
  empty.style.display = cart.length ? "none" : "block";
  const cartSummary = document.querySelector(".cart-summary"), shippingNote = document.querySelector(".shipping-note"), checkoutTrigger = document.querySelector(".checkout-trigger"), cartSubtotal = document.getElementById("cart-subtotal");
  if (cartSummary) cartSummary.style.display = cart.length ? "flex" : "none";
  if (shippingNote) shippingNote.style.display = cart.length ? "block" : "none";
  if (checkoutTrigger) checkoutTrigger.style.display = cart.length ? "flex" : "none";
  if (cartSubtotal) cartSubtotal.textContent = formatPrice(subtotal);
  document.querySelectorAll(".remove-item").forEach((button) => button.addEventListener("click", () => { cart = cart.filter((item) => item.lineId !== button.dataset.id); saveCart(); renderCart(); }));
}

function showCheckout() {
  const checkoutContent = document.getElementById("checkout-content");
  if (!checkoutContent) return;
  const total = cart.reduce((sum, item) => sum + item.price, 0);
  checkoutContent.innerHTML = `<p class="eyebrow">Order enquiry</p><h2>Almost there.</h2><div class="checkout-notice"><strong>Submitting this order does not require immediate payment.</strong><br />You will receive a personal confirmation with the final delivery cost and secure payment instructions. Your order will only be confirmed once payment has been received.</div>
  <form class="checkout-form" id="checkout-form"><label>First name<input required name="firstName" /></label><label>Last name<input required name="lastName" /></label><label>Email address<input required type="email" name="email" /></label><label>Phone number<input required type="tel" name="phone" /></label>
  <label class="full">Message<textarea optional name="message" placeholder="Tell me more about your order"></textarea></label>
  <label class="full">Delivery address<textarea required name="address" placeholder="Street address, city, postal code"></textarea></label>
  <label>Country<select required name="country"><option value="">Select your country</option><option>Mauritius</option><option>Australia</option><option>Canada</option><option>France</option><option>United Kingdom</option><option>United States</option><option>Other</option></select></label>
  <label>Preferred payment method<select required name="payment"><option value="">Select a method</option><option value="Bank Transfer (Local - Mauritius)">Bank Transfer — Local (Mauritius)</option><option value="Bank Transfer (International)">Bank Transfer — International</option><option value="Juice Payment">Juice Payment (Mauritius only)</option></select></label>
  <section class="full payment-details-panel" id="payment-details-panel" aria-live="polite" aria-label="Payment instructions">${renderPaymentDetails("")}</section><div class="full order-summary-box"><strong>Your print selection</strong><br />${cart.map((item) => `${item.title} (${item.size})`).join("<br />")}<br /><br /><strong>Print subtotal: ${formatPrice(total)}</strong><br />Delivery will be confirmed separately.</div><button class="button button-dark full" id="confirm-transfer-btn" type="button">Already paid? I have made the transfer <span>→</span></button></form>`;
  closeModals(); openModal("checkout-modal");
  const paymentSelect = document.querySelector('#checkout-form select[name="payment"]');
  const paymentDetails = document.getElementById("payment-details-panel");
  if (paymentSelect && paymentDetails) paymentSelect.addEventListener("change", () => { paymentDetails.innerHTML = renderPaymentDetails(paymentSelect.value); });
  document.getElementById("checkout-form").addEventListener("submit", submitOrder);
  document.getElementById("confirm-transfer-btn").addEventListener("click", () => {
    const form = document.getElementById("checkout-form");
    if (!form.checkValidity()) { form.reportValidity(); return; }
    const data = new FormData(form);
    const orderData = {
      customerName: `${data.get("firstName") || ""} ${data.get("lastName") || ""}`.trim(),
      customerEmail: data.get("email") || "",
      phone: data.get("phone") || "",
      payment: data.get("payment") || "",
      products: cart,
      message: "Customer clicked 'I have made the transfer'.",
      status: "Awaiting verification",
      confirmedAt: new Date().toISOString(),
    };
    handlePaymentConfirmation(orderData);
  });
}

async function handlePaymentConfirmation(orderData) {
  const btn = document.getElementById("confirm-transfer-btn");
  if (btn) { btn.textContent = "Awaiting verification"; btn.disabled = true; }
  const reference = `AJNA-${Math.floor(1000 + Math.random() * 9000)}`;
  const order = { reference, status: "Awaiting verification", name: orderData.customerName, email: orderData.customerEmail, phone: orderData.phone, payment: orderData.payment, products: orderData.products, date: new Date().toLocaleDateString("en-GB") };
  const orders = savedOrders(); orders.push(order); saveOrders(orders); cart = []; saveCart();
  try {
    const res = await fetch("/api/payment-confirmed", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...order, ...orderData }) });
    if (!res.ok) throw new Error(`Server responded with ${res.status}`);
  } catch (err) {
    console.error("Failed to send payment confirmation:", err);
  }
  document.getElementById("checkout-content").innerHTML = `<div class="confirmation"><p class="eyebrow">Transfer noted</p><h2>Thank you, ${escapeHtml(order.name.split(" ")[0])}.</h2><p>Your order reference is</p><p class="reference">${reference}</p><span class="status">Awaiting verification</span><p>I'll verify your payment and be in touch personally to confirm your order and arrange delivery.</p><button class="button button-dark close-confirmation">Continue browsing <span>→</span></button></div>`;
  document.querySelector(".close-confirmation").addEventListener("click", closeModals);
}

function submitOrder(event) {
  event.preventDefault();
  const form = new FormData(event.target), reference = `AJNA-${Math.floor(1000 + Math.random() * 9000)}`;
  const order = { reference, status: "Pending Confirmation", name: `${form.get("firstName")} ${form.get("lastName")}`, email: form.get("email"), phone: form.get("phone"), address: form.get("address"), country: form.get("country"), payment: form.get("payment"), products: cart, date: new Date().toLocaleDateString("en-GB") };
  const orders = savedOrders(); orders.push(order); saveOrders(orders); cart = []; saveCart();
  fetch("/api/order-notification", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(order) }).catch(() => {});
  document.getElementById("checkout-content").innerHTML = `<div class="confirmation"><p class="eyebrow">Order submitted</p><h2>Thank you, ${order.name.split(" ")[0]}.</h2><p>Your order reference is</p><p class="reference">${reference}</p><span class="status">Pending confirmation</span><p>I'll be in touch personally to confirm availability, delivery costs, and private payment instructions. Your order is not final until payment has been received.</p><button class="button button-dark close-confirmation">Continue browsing <span>→</span></button></div>`;
  document.querySelector(".close-confirmation").addEventListener("click", closeModals);
}

function showAccount() {
  const accountContent = document.getElementById("account-content");
  if (!accountContent) return;
  const orders = savedOrders();
  accountContent.innerHTML = `<p class="eyebrow">Your Ajna account</p><h2>Your orders</h2><p>Keep your order reference and email handy to track any order.</p><div class="account-tabs"><button class="active">Orders</button><button class="account-track">Track an order</button><button class="studio-orders">Studio order desk</button></div>${orders.length ? orders.map(orderCard).join("") : `<div class="order-card"><strong>No orders saved in this browser yet.</strong><p>When you place an order, its details will appear here.</p></div>`}`;
  document.querySelector(".account-track").addEventListener("click", () => { closeModals(); openModal("tracking-modal"); });
  document.querySelector(".studio-orders").addEventListener("click", showStudioOrders);
  openModal("account-modal");
}
function orderCard(order) { return `<div class="order-card"><div class="order-card-head"><strong>${order.reference}</strong><span class="status">${order.status}</span></div><p>${order.products.map((product) => `${product.title} (${product.size})`).join(", ")}<br />Placed ${order.date}</p></div>`; }
function showStudioOrders() {
  const accountContent = document.getElementById("account-content");
  if (!accountContent) return;
  const orders = savedOrders(), statuses = ["Pending Confirmation", "Order received", "Awaiting payment", "Payment received", "Print being prepared", "Shipped", "Delivered"];
  accountContent.innerHTML = `<p class="eyebrow">Private studio view</p><h2>Order desk</h2><p>Update an order after reviewing availability, delivery, and payment.</p>${orders.length ? orders.map((order) => `<div class="order-card"><div class="order-card-head"><strong>${order.reference}</strong><span class="status">${order.status}</span></div><p>${order.name} &middot; ${order.country}<br />${order.products.map((product) => `${product.title} (${product.size})`).join(", ")}</p><label class="sr-only" for="status-${order.reference}">Order status</label><select class="status-select" id="status-${order.reference}" data-reference="${order.reference}">${statuses.map((status) => `<option ${status === order.status ? "selected" : ""}>${status}</option>`).join("")}</select></div>`).join("") : `<div class="order-card"><strong>No orders to manage yet.</strong></div>`}`;
  document.querySelectorAll(".status-select").forEach((select) => select.addEventListener("change", () => {
    const updatedOrders = savedOrders().map((order) => order.reference === select.dataset.reference ? { ...order, status: select.value } : order);
    saveOrders(updatedOrders); showStudioOrders();
  }));
}

document.addEventListener("click", (event) => {
  if (event.target.classList.contains("cart-trigger")) { renderCart(); openModal("cart-modal"); }
  if (event.target.classList.contains("account-trigger")) showAccount();
  if (event.target.classList.contains("tracking-trigger")) { event.preventDefault(); openModal("tracking-modal"); }
  if (event.target.classList.contains("checkout-trigger")) showCheckout();
  if (event.target.classList.contains("close-modal") || event.target.classList.contains("modal")) closeModals();
  if (event.target.closest('a[href="#policies"]')) { event.preventDefault(); openModal("policies-modal"); }
});
document.addEventListener("keydown", (event) => { if (event.key === "Escape") closeModals(); });
const menuToggle = document.querySelector(".menu-toggle");
if (menuToggle) menuToggle.addEventListener("click", () => { const nav = document.querySelector(".main-nav"); nav.classList.toggle("open"); menuToggle.setAttribute("aria-expanded", nav.classList.contains("open")); });
const trackingForm = document.getElementById("tracking-form");
if (trackingForm) trackingForm.addEventListener("submit", (event) => { event.preventDefault(); const order = savedOrders().find((item) => item.reference.toLowerCase() === document.getElementById("tracking-order").value.trim().toLowerCase() && item.email.toLowerCase() === document.getElementById("tracking-email").value.trim().toLowerCase()); document.getElementById("tracking-result").innerHTML = order ? `<div class="order-card"><div class="order-card-head"><strong>${order.reference}</strong><span class="status">${order.status}</span></div><p>${order.products.map((product) => `${product.title} (${product.size})`).join(", ")}<br />We'll email you when your order moves to its next stage.</p></div>` : `<p>No order was found with those details. Please check your reference and email.</p>`; });
const newsletterForm = document.getElementById("newsletter-form");
if (newsletterForm) newsletterForm.addEventListener("submit", (event) => { event.preventDefault(); document.getElementById("newsletter-message").textContent = "Thank you — your first studio letter will arrive soon."; event.target.reset(); });
if (document.getElementById("product-grid")) { renderProducts(); saveCart(); }
if (location.hash === "#tracking") openModal("tracking-modal");
if (location.hash === "#policies") openModal("policies-modal");
if (location.hash === "#bag") { renderCart(); openModal("cart-modal"); history.replaceState(null, "", location.pathname); }
