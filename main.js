// main.js - handles frontend behaviors: fetch products, search, banner, cart
(async function(){
  // small helpers
  function $(sel){ return document.querySelector(sel) }
  function create(tag, attrs={}){ const el = document.createElement(tag); Object.assign(el, attrs); return el }

  // fetch products once
  let products = [];
  try {
    products = await (await fetch('/api/products')).json();
  } catch(e){
    console.error('products fetch failed', e);
    products = [];
  }

  // FEATURED: show product category cards on home
  const featured = $('#featured');
  if(featured){
    const cats = ['electronics','clothes','books'];
    const images = {
      electronics: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=1200&q=80',
      clothes: 'https://images.unsplash.com/photo-1521334884684-d80222895322?auto=format&fit=crop&w=1200&q=80',
      books: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=1200&q=80'
    };
    cats.forEach(cat=>{
      const card = create('a', {className:'category-card', href:`/subcategory.html?cat=${cat}`, innerHTML:
        `<img src="${images[cat]}"><span>${cat.charAt(0).toUpperCase()+cat.slice(1)}</span>`
      });
      featured.appendChild(card);
    });
  }

  // BANNER: autoplay & 3d-parallax tilt on mouse
  const banner = document.getElementById('banner');
  if(banner){
    const imgs = banner.querySelectorAll('img');
    const dots = document.getElementById('banner-dots');
    imgs.forEach((img,i)=>{
      const d = create('button',{className:'banner-dot', 'data-i':i});
      d.addEventListener('click', ()=>setBanner(i));
      dots.appendChild(d);
    });
    let cur = 0;
    function setBanner(i){
      imgs.forEach(img => img.classList.remove('active'));
      imgs[i].classList.add('active');
      dots.querySelectorAll('.banner-dot').forEach((b,idx)=> b.classList.toggle('active', idx===i));
      cur = i;
    }
    setBanner(0);
    setInterval(()=> setBanner((cur+1)%imgs.length), 5000);

    // subtle tilt effect
    banner.addEventListener('mousemove', (ev)=>{
      const rect = banner.getBoundingClientRect();
      const x = (ev.clientX - rect.left) / rect.width - 0.5;
      const y = (ev.clientY - rect.top) / rect.height - 0.5;
      banner.querySelector('.banner-inner').style.transform = `rotateY(${x*6}deg) rotateX(${ -y*6 }deg)`;
    });
    banner.addEventListener('mouseleave', ()=> banner.querySelector('.banner-inner').style.transform = 'rotateY(0deg) rotateX(0deg)');
  }

  // SEARCH
  const searchForm = $('#search-form');
  if(searchForm){
    searchForm.addEventListener('submit', async (e)=>{
      e.preventDefault();
      const q = $('#search-input').value.trim();
      const category = $('#category').value;
      const url = `/api/search?q=${encodeURIComponent(q)}&category=${encodeURIComponent(category)}`;
      const res = await fetch(url);
      const items = await res.json();
      // navigate to subcategory page with results passed via sessionStorage
      sessionStorage.setItem('searchResults', JSON.stringify({ items, q, category }));
      location.href = '/subcategory.html';
    });
  }

  // CATEGORY PAGE logic
  if(location.pathname.endsWith('/subcategory.html') || location.pathname.endsWith('/subcategory.html/')){
    const params = new URLSearchParams(location.search);
    const catFromQuery = params.get('cat');
    const storageResults = sessionStorage.getItem('searchResults');
    const titleEl = document.getElementById('category-title');
    const grid = document.getElementById('products-grid');
    let toShow = products;
    if(storageResults){
      const parsed = JSON.parse(storageResults);
      toShow = parsed.items || products;
      titleEl.textContent = parsed.q ? `Results for "${parsed.q}"` : (parsed.category || 'Results');
      sessionStorage.removeItem('searchResults');
    } else if(catFromQuery){
      toShow = products.filter(p => p.category === catFromQuery);
      titleEl.textContent = catFromQuery.charAt(0).toUpperCase() + catFromQuery.slice(1);
    } else {
      titleEl.textContent = 'All Products';
    }
    grid.innerHTML = '';
    if(toShow.length === 0) grid.innerHTML = '<p>No products found.</p>';
    toShow.forEach(p=>{
      const card = create('div', {className:'product-card'});
      card.innerHTML = `
        <img src="${p.image}" alt="${p.name}">
        <h3>${p.name}</h3>
        <p>₹${p.price}</p>
        <button class="add-btn" data-id="${p.id}">Add to cart</button>
        <a href="/product.html?id=${p.id}">View</a>
      `;
      grid.appendChild(card);
    });
    grid.addEventListener('click', (ev)=>{
      const btn = ev.target.closest('.add-btn');
      if(!btn) return;
      const id = btn.dataset.id;
      const item = products.find(x=>x.id===id);
      addToCart(item);
    });
  }

  // product page
  if(location.pathname.endsWith('/product.html')){
    const params = new URLSearchParams(location.search);
    const id = params.get('id');
    const target = document.getElementById('product-detail');
    if(!id){ target.textContent = 'Product not found'; }
    else{
      const res = await fetch(`/api/product/${id}`);
      if(!res.ok){ target.textContent = 'Not found'; return; }
      const p = await res.json();
      target.innerHTML = `
        <div class="product-card"><img src="${p.image}"><h2>${p.name}</h2><p>${p.description}</p><strong>₹${p.price}</strong><div><button id="add-product">Add to cart</button></div></div>
      `;
      $('#add-product').addEventListener('click', ()=> addToCart(p));
    }
  }

  // checkout page
  if(location.pathname.endsWith('/checkout.html')){
    const info = document.getElementById('checkout-info');
    const saved = localStorage.getItem('shopme_cart');
    const cart = saved ? JSON.parse(saved) : [];
    if(cart.length===0) info.innerHTML = '<p>No items in cart.</p>';
    else {
      info.innerHTML = '<ul>' + cart.map(i=>`<li>${i.name} x ${i.qty} — ₹${i.price}</li>`).join('') + '</ul>';
    }
  }

  // CART: localStorage persistence + UI
  function loadCart(){ return JSON.parse(localStorage.getItem('shopme_cart')||'[]') }
  function saveCart(arr){ localStorage.setItem('shopme_cart', JSON.stringify(arr)); updateCartUI(); }
  function getCartCount(){ return loadCart().reduce((s,it)=>s+it.qty,0) }

  window.getCartCount = getCartCount; // used by i18n

  function addToCart(product){
    const cart = loadCart();
    const found = cart.find(it=> it.id===product.id);
    if(found) found.qty++;
    else cart.push({ id:product.id, name:product.name, price:product.price, qty:1 });
    saveCart(cart);
    // optional: sync to server by POST /api/cart/save
  }

  // cart UI
  const cartBtn = document.getElementById('cart-toggle');
  const cartPanel = document.getElementById('cart-panel');
  const cartItemsList = document.getElementById('cart-items');
  const clearCartBtn = document.getElementById('clear-cart');
  const checkoutBtn = document.getElementById('checkout-btn');
  const closeCart = document.getElementById('close-cart');

  function updateCartUI(){
    const cart = loadCart();
    cartItemsList.innerHTML = '';
    if(cart.length===0) cartItemsList.innerHTML = '<li>Your cart is empty</li>';
    else cart.forEach((it, idx)=>{
      const li = create('li'); li.textContent = `${it.name} x${it.qty} — ₹${it.price}`;
      const rem = create('button'); rem.textContent='Remove'; rem.style.marginLeft='8px';
      rem.addEventListener('click', ()=>{ cart.splice(idx,1); saveCart(cart); });
      li.appendChild(rem);
      cartItemsList.appendChild(li);
    });
    cartBtn.textContent = `🛒 Cart (${getCartCount()})`;
  }
  updateCartUI();

  cartBtn.addEventListener('click', ()=>{
    const open = cartPanel.style.display === 'block';
    cartPanel.style.display = open ? 'none' : 'block';
    cartBtn.setAttribute('aria-expanded', String(!open));
  });
  closeCart.addEventListener('click', ()=> {cartPanel.style.display='none'; cartBtn.setAttribute('aria-expanded','false')});
  clearCartBtn && clearCartBtn.addEventListener('click', ()=> { if(confirm('Clear cart?')){ localStorage.removeItem('shopme_cart'); updateCartUI(); }} );
  checkoutBtn && checkoutBtn.addEventListener('click', ()=> location.href='/checkout.html');

  // expose addToCart for other inline buttons
  window.addToCart = addToCart;
  window.updateCartUI = updateCartUI;
  window.getCartCount = getCartCount;
})();
