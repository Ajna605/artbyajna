const products = [
  { id: "sea-garden", title: "Sea Garden", category: "Botanical study", price: 1450, image: "https://images.unsplash.com/photo-1531058020387-3be344556be6?auto=format&fit=crop&w=900&q=85", images: [
    { src: "https://images.unsplash.com/photo-1531058020387-3be344556be6?auto=format&fit=crop&w=1200&q=85", alt: "Sea Garden print with blue-green botanical leaves" },
    { src: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=1200&q=85", alt: "Sea Garden print detail showing soft leaf shapes" },
    { src: "https://images.unsplash.com/photo-1463320726281-696a485928c7?auto=format&fit=crop&w=1200&q=85", alt: "Sea Garden print styled among quiet green foliage" }
  ], description: "A quietly joyful study of garden forms and sea-coloured leaves. Painted in a wash of mineral blue, soft green, and warm earth." },
  { id: "sunday-lemons", title: "Sunday Lemons", category: "Still life", price: 1350, image: "https://images.unsplash.com/photo-1582560475093-ba66accbc424?auto=format&fit=crop&w=900&q=85", images: [
    { src: "https://images.unsplash.com/photo-1582560475093-ba66accbc424?auto=format&fit=crop&w=1200&q=85", alt: "Sunday Lemons print with a golden citrus still life" },
    { src: "https://images.unsplash.com/photo-1590502593747-42a996133562?auto=format&fit=crop&w=1200&q=85", alt: "Sunday Lemons print detail with sunlit yellow fruit" },
    { src: "https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea?auto=format&fit=crop&w=1200&q=85", alt: "Sunday Lemons print in a warm, sunlit interior" }
  ], description: "A small celebration of slow mornings and sunlight on the table. This cheerful still life is full of soft texture and golden warmth." },
  { id: "after-the-rain", title: "After the Rain", category: "Island landscape", price: 1650, image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=85", images: [
    { src: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=85", alt: "After the Rain print with a luminous green island landscape" },
    { src: "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1200&q=85", alt: "After the Rain print detail showing layered tropical greens" },
    { src: "https://images.unsplash.com/photo-1433086966358-54859d0ed716?auto=format&fit=crop&w=1200&q=85", alt: "After the Rain print displayed with a view of misty hills" }
  ], description: "The rich green quiet that arrives after a tropical shower, with a glimpse of light opening over the hills." },
  { id: "bougainvillea", title: "Bougainvillea", category: "Botanical study", price: 1450, image: "https://images.unsplash.com/photo-1497250681960-ef046c08a56e?auto=format&fit=crop&w=900&q=85", images: [
    { src: "https://images.unsplash.com/photo-1497250681960-ef046c08a56e?auto=format&fit=crop&w=1200&q=85", alt: "Bougainvillea print with loose pink petals and green leaves" },
    { src: "https://images.unsplash.com/photo-1526047932273-341f2a7631f9?auto=format&fit=crop&w=1200&q=85", alt: "Bougainvillea print detail showing layered botanical colour" },
    { src: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=1200&q=85", alt: "Bougainvillea print styled with delicate flowering branches" }
  ], description: "An ode to the generous colour of island gardens. Loose petals and leafy shadows make this an easy, uplifting companion." }
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

function renderProducts() {
  document.getElementById("product-grid").innerHTML = products.map((product) => `
    <article class="product-card" data-product="${product.id}" role="button" tabindex="0" aria-label="View ${product.title} print details">
      <div class="product-image"><img src="${product.image}" alt="${product.title} watercolor print" /></div>
      <div class="product-meta"><div><h3>${product.title}</h3><p>${product.category}</p></div><span class="product-price">${formatPrice(product.price)}</span></div>
    </article>`).join("");
  document.querySelectorAll(".product-card").forEach((card) => {
    card.addEventListener("click", () => showProduct(card.dataset.product));
    card.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") { event.preventDefault(); showProduct(card.dataset.product); }
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
    <div class="detail-row"><label>Paper</label><p>310gsm textured archival fine-art paper</p></div><div class="detail-row"><label>Preparation time</label><p>Made to order in 5–8 business days</p></div>
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
  <form class="checkout-form" id="checkout-form"><label>First name<input required name="firstName" /></label><label>Last name<input required name="lastName" /></label><label>Email address<input required type="email" name="email" /></label><label>Phone number<input required type="tel" name="phone" /></label><label class="full">Delivery address<textarea required name="address" placeholder="Street address, city, postal code"></textarea></label><label>Country<select required name="country"><option value="">Select your country</option><option>Mauritius</option><option>Australia</option><option>Canada</option><option>France</option><option>United Kingdom</option><option>United States</option><option>Other</option></select></label><label>Preferred payment method<select required name="payment"><option value="">Select a method</option><option>Local bank transfer</option><option>International bank transfer</option><option>Mobile payment (Mauritius)</option><option>Arrange another method directly</option></select></label><div class="full order-summary-box"><strong>Your print selection</strong><br />${cart.map((item) => `${item.title} (${item.size})`).join("<br />")}<br /><br /><strong>Print subtotal: ${formatPrice(total)}</strong><br />Delivery will be confirmed separately.</div><button class="button button-dark full" type="submit">Submit order <span>→</span></button></form>`;
  closeModals(); openModal("checkout-modal");
  document.getElementById("checkout-form").addEventListener("submit", submitOrder);
}

function submitOrder(event) {
  event.preventDefault();
  const form = new FormData(event.target), reference = `AJNA-${Math.floor(1000 + Math.random() * 9000)}`;
  const order = { reference, status: "Pending Confirmation", name: `${form.get("firstName")} ${form.get("lastName")}`, email: form.get("email"), phone: form.get("phone"), address: form.get("address"), country: form.get("country"), payment: form.get("payment"), products: cart, date: new Date().toLocaleDateString("en-GB") };
  const orders = savedOrders(); orders.push(order); saveOrders(orders); cart = []; saveCart();
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
