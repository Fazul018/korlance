const products = [
 {id:1,name:"Studio Wireless Headphones",category:"Electronics",price:2499,original:3999,rating:4.7,reviews:284,badge:"BESTSELLER",image:"https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=85",description:"Rich sound, all-day comfort"},
 {id:2,name:"Everyday Smart Watch",category:"Electronics",price:3299,original:4999,rating:4.5,reviews:193,badge:"SAVE 34%",image:"https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=85",description:"A smarter daily routine"},
 {id:3,name:"Minimal Carry Tote",category:"Fashion",price:899,original:1299,rating:4.6,reviews:146,badge:"EVERYDAY PICK",image:"https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=800&q=85",description:"Room for all your essentials"},
 {id:4,name:"Soft Knit Everyday Tee",category:"Fashion",price:649,original:999,rating:4.3,reviews:88,badge:"SAVE 35%",image:"https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=800&q=85",description:"An easy wardrobe favourite"},
 {id:5,name:"Ceramic Pour-Over Set",category:"Home",price:1199,original:1699,rating:4.8,reviews:121,badge:"TOP RATED",image:"https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=800&q=85",description:"Make slow mornings special"},
 {id:6,name:"Scented Candle Trio",category:"Home",price:799,original:1099,rating:4.4,reviews:74,badge:"GIFT PICK",image:"https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=800&q=85",description:"Warm light, calm evenings"},
 {id:7,name:"Botanical Face Care Kit",category:"Beauty",price:999,original:1499,rating:4.5,reviews:167,badge:"SAVE 33%",image:"https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=800&q=85",description:"A gentle everyday ritual"},
 {id:8,name:"Daily Hydration Bottle",category:"Sports",price:549,original:799,rating:4.6,reviews:203,badge:"CUSTOMER LOVE",image:"https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=800&q=85",description:"Hydration that goes places"},
 {id:9,name:"Pocket Bluetooth Speaker",category:"Electronics",price:1799,original:2499,rating:4.4,reviews:159,badge:"SAVE 28%",image:"https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=800&q=85",description:"Small speaker, big sound"},
 {id:10,name:"Everyday Smartphone Stand",category:"Mobiles",price:399,original:599,rating:4.2,reviews:92,badge:"UNDER ₹500",image:"https://images.unsplash.com/photo-1512499617640-c74ae3a79d37?auto=format&fit=crop&w=800&q=85",description:"Hands-free, desk-friendly"},
 {id:11,name:"The Art of Small Habits",category:"Books",price:399,original:599,rating:4.7,reviews:312,badge:"READER FAVOURITE",image:"https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=800&q=85",description:"A little inspiration each day"},
 {id:12,name:"Resistance Band Set",category:"Sports",price:699,original:999,rating:4.3,reviews:111,badge:"SAVE 30%",image:"https://images.unsplash.com/photo-1598289431512-b97b0917affc?auto=format&fit=crop&w=800&q=85",description:"Move well, wherever you are"}
];
const slides = [
 {eyebrow:"THE EVERYDAY EDIT · 01",title:"A little upgrade<br>goes a long way.",text:"Good design, useful tech and feel-good finds — all in one place.",symbol:"✦",tag:"GOOD FINDS",bg:"linear-gradient(112deg,#e8f0db 0%,#f5e8d6 52%,#e2e9dd 100%)"},
 {eyebrow:"SMALL JOYS · 02",title:"Make room for<br>the good stuff.",text:"Thoughtful home and lifestyle picks to make everyday feel special.",symbol:"❋",tag:"SLOW MORNINGS",bg:"linear-gradient(112deg,#f4e4d6 0%,#f3eddb 54%,#dce8d6 100%)"},
 {eyebrow:"SMART PICKS · 03",title:"Your next favourite<br>is right here.",text:"Discover clever essentials and little luxuries at feel-good prices.",symbol:"◈",tag:"SMARTER DAYS",bg:"linear-gradient(112deg,#dce9e6 0%,#e9eedb 55%,#f3e5d5 100%)"}
];
let activeCategory = "all";
let searchTerm = "";
let sortMode = "featured";
let cart = {};
let currentSlide = 0;
let toastTimer;

const $ = (selector) => document.querySelector(selector);
const money = (amount) => new Intl.NumberFormat("en-IN",{style:"currency",currency:"INR",maximumFractionDigits:0}).format(amount);
const productGrid = $("#productGrid");

function showToast(message) {
  const toast = $("#toast");
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2300);
}
function productCard(product) {
  const discount = Math.round((1-product.price/product.original)*100);
  return `<article class="product-card">
    <div class="product-image-wrap"><img class="product-image" src="${product.image}" alt="${product.name}" loading="lazy" onerror="this.style.opacity='.15';this.alt='Product image unavailable'">
      <span class="product-badge">${product.badge}</span><button class="wish-button" type="button" data-wish="${product.id}" aria-label="Save ${product.name} to wishlist">♡</button></div>
    <div class="product-info"><span class="product-category">${product.category}</span><h3 class="product-name">${product.name}</h3>
      <div class="rating" aria-label="${product.rating} out of 5 stars">★★★★★ <span>${product.rating} (${product.reviews})</span></div>
      <div class="price-row"><strong class="current-price">${money(product.price)}</strong><span class="original-price">${money(product.original)}</span><span class="discount">${discount}% off</span></div>
      <button class="add-button" type="button" data-add="${product.id}">＋ Add to cart</button></div></article>`;
}
function getVisibleProducts() {
  let list = products.filter(p => (activeCategory==="all" || activeCategory==="deals" || p.category===activeCategory) &&
    (activeCategory!=="deals" || p.original>p.price) &&
    (`${p.name} ${p.category} ${p.description}`.toLowerCase().includes(searchTerm)));
  if(sortMode==="price-low") list.sort((a,b)=>a.price-b.price);
  if(sortMode==="price-high") list.sort((a,b)=>b.price-a.price);
  if(sortMode==="rating") list.sort((a,b)=>b.rating-a.rating);
  if(sortMode==="discount") list.sort((a,b)=>(b.original-b.price)/b.original-(a.original-a.price)/a.original);
  return list;
}
function renderProducts() {
  const visible = getVisibleProducts();
  productGrid.innerHTML = visible.map(productCard).join("");
  $("#emptyState").hidden = visible.length!==0;
  productGrid.hidden = visible.length===0;
  $("#resultCount").textContent = `${visible.length} ${visible.length===1?"find":"hand-picked finds"}`;
  $("#productTitle").textContent = activeCategory==="all" ? (searchTerm ? `Results for “${searchTerm}”` : "Good things, right this way.") : activeCategory==="deals" ? "Today's good deals." : `${activeCategory==="Home"?"Home & Kitchen":activeCategory} finds.`;
  $("#activeFilters").innerHTML = `${activeCategory!=="all"?`<button class="filter-chip" data-clear-category>Category: ${activeCategory==="deals"?"Today's Deals":activeCategory} ×</button>`:""}${searchTerm?`<button class="filter-chip" data-clear-search>Search: ${searchTerm} ×</button>`:""}`;
  document.querySelectorAll(".category-tile").forEach(el=>el.classList.toggle("selected",el.dataset.category===activeCategory));
  document.querySelectorAll(".nav-link").forEach(el=>el.classList.toggle("active",el.dataset.category===activeCategory));
}
function chooseCategory(category) {
  activeCategory=category;
  renderProducts();
  if(window.innerWidth<650) $("#products").scrollIntoView({behavior:"smooth",block:"start"});
}
function addToCart(id) {
  cart[id]=(cart[id]||0)+1;
  updateCart();
  showToast(`${products.find(p=>p.id===id).name} added to your cart`);
}
function updateCart() {
  const count=Object.values(cart).reduce((sum,n)=>sum+n,0);
  $("#cartCount").textContent=count;
  $("#drawerCount").textContent=`(${count})`;
  const items=Object.entries(cart).filter(([,qty])=>qty>0).map(([id,qty])=>({product:products.find(p=>p.id===Number(id)),qty}));
  $("#cartItems").innerHTML=items.map(({product:p,qty})=>`<div class="cart-line"><img src="${p.image}" alt=""><div><h4>${p.name}</h4><p>${money(p.price)}</p><div class="quantity-controls"><button data-qty="${p.id}" data-delta="-1" aria-label="Decrease quantity">−</button><span>${qty}</span><button data-qty="${p.id}" data-delta="1" aria-label="Increase quantity">+</button></div></div><button class="remove-item" data-remove="${p.id}" aria-label="Remove ${p.name}">×</button></div>`).join("");
  $("#cartEmpty").hidden=items.length>0;
  $("#cartSummary").hidden=items.length===0;
  $("#cartSubtotal").textContent=money(items.reduce((sum,item)=>sum+item.product.price*item.qty,0));
}
function openCart(){ $("#cartOverlay").hidden=false; document.body.style.overflow="hidden"; $("#closeCart").focus(); }
function closeCart(){ $("#cartOverlay").hidden=true; document.body.style.overflow=""; $("#cartButton").focus(); }
function renderSlide(index) {
  currentSlide=(index+slides.length)%slides.length;
  const slide=slides[currentSlide];
  $("#heroEyebrow").textContent=slide.eyebrow;
  $("#heroTitle").innerHTML=slide.title;
  $("#heroText").textContent=slide.text;
  $("#heroArt").style.background="transparent";
  $("#heroArt").querySelector(".hero-product").textContent=slide.symbol;
  $("#heroArt").querySelector(".floating-tag").innerHTML=`${slide.tag}<br><b>SHOP THE FEELING</b>`;
  $(".hero").style.background=slide.bg;
  $("#slideCount").textContent=`0${currentSlide+1} / 0${slides.length}`;
}
$("#searchForm").addEventListener("submit",e=>{
  e.preventDefault(); searchTerm=$("#searchInput").value.trim().toLowerCase();
  const selected=$("#searchCategory").value;
  activeCategory=selected==="all"?"all":selected;
  renderProducts(); $("#products").scrollIntoView({behavior:"smooth"});
});
$("#searchInput").addEventListener("input",e=>{searchTerm=e.target.value.trim().toLowerCase();renderProducts();});
$("#searchCategory").addEventListener("change",e=>{activeCategory=e.target.value==="all"?"all":e.target.value;renderProducts();});
$("#sortSelect").addEventListener("change",e=>{sortMode=e.target.value;renderProducts();});
$("#categoryGrid").addEventListener("click",e=>{const btn=e.target.closest("[data-category]");if(btn)chooseCategory(btn.dataset.category);});
$("#navLinks").addEventListener("click",e=>{const btn=e.target.closest("[data-category]");if(btn){chooseCategory(btn.dataset.category);if(btn.dataset.category==="all"&&btn.textContent.trim()==="Best Sellers"){sortMode="rating";$("#sortSelect").value="rating";renderProducts();}}});
productGrid.addEventListener("click",e=>{
  const add=e.target.closest("[data-add]"); if(add){addToCart(Number(add.dataset.add));return;}
  const wish=e.target.closest("[data-wish]"); if(wish){const on=wish.textContent==="♥";wish.textContent=on?"♡":"♥";wish.style.color=on?"":"#cf6262";showToast(on?"Removed from wishlist":"Saved to your wishlist");}
});
$("#activeFilters").addEventListener("click",e=>{if(e.target.closest("[data-clear-category]"))activeCategory="all";if(e.target.closest("[data-clear-search]")){searchTerm="";$("#searchInput").value="";}renderProducts();});
$("#resetFilters").addEventListener("click",()=>{activeCategory="all";searchTerm="";$("#searchInput").value="";$("#searchCategory").value="all";renderProducts();});
$("#cartButton").addEventListener("click",openCart);
$("#closeCart").addEventListener("click",closeCart);
$("#closeCartBackdrop").addEventListener("click",closeCart);
$("#cartItems").addEventListener("click",e=>{
  const qty=e.target.closest("[data-qty]"); const remove=e.target.closest("[data-remove]");
  if(qty){const id=qty.dataset.qty;cart[id]=(cart[id]||0)+Number(qty.dataset.delta);if(cart[id]<=0)delete cart[id];updateCart();}
  if(remove){delete cart[remove.dataset.remove];updateCart();}
});
$("#checkoutButton").addEventListener("click",()=>showToast("Demo only — no payment or order is processed."));
$("#prevSlide").addEventListener("click",()=>renderSlide(currentSlide-1));
$("#nextSlide").addEventListener("click",()=>renderSlide(currentSlide+1));
$("#menuToggle").addEventListener("click",()=>{const open=$("#navLinks").classList.toggle("open");$("#menuToggle").setAttribute("aria-expanded",String(open));});
$("#accountButton").addEventListener("click",()=>{$("#accountPopover").hidden=!$("#accountPopover").hidden;});
$("#closeAccount").addEventListener("click",()=>$("#accountPopover").hidden=true);
$("#languageButton").addEventListener("click",()=>showToast("Language selector is a visual demo."));
$("#ordersButton").addEventListener("click",()=>showToast("No demo orders yet — add an item to explore the cart."));
$("#newsletterForm").addEventListener("submit",e=>{e.preventDefault();$("#newsletterMessage").textContent="Thanks for joining the ShopNova list (demo)!";$("#emailInput").value="";});
document.addEventListener("keydown",e=>{if(e.key==="Escape"&&!$("#cartOverlay").hidden)closeCart();});
renderProducts();updateCart();renderSlide(0);
