// i18n.js - basic client-side translation strings (expandable)
window.I18N = {
  "en": {
    "freeDelivery": "Free delivery on orders over ₹999 • Extra 10% with code WELCOME10",
    "account": "Hello, sign in",
    "accountSmall": "Account",
    "cart": "Cart"
  },
  "hi": {
    "freeDelivery": "₹999 से अधिक पर फ्री डिलीवरी • WELCOME10 से 10% अतिरिक्त",
    "account": "नमस्ते, साइन इन करें",
    "accountSmall": "खाता",
    "cart": "कार्ट"
  },
  "bn": {
    "freeDelivery": "₹999-এর বেশি অর্ডারে আইটেম বিনামূল্যে • WELCOME10 কোড ১০% ছাড়",
    "account": "হ্যালো, সাইন ইন করুন",
    "accountSmall": "অ্যাকাউন্ট",
    "cart": "কার্ট"
  },
  "mr": {
    "freeDelivery": "₹999 पे विनामूल्य वितरण • WELCOME10 कोडने अतिरिक्त 10%",
    "account": "नमस्कार, साइन इन करा",
    "accountSmall": "अकाउंट",
    "cart": "कार्ट"
  }
};

// populate language select
(function populateLang(){
  const sel = document.getElementById('language-select');
  if(!sel) return;
  const langs = [
    {code:'en', label:'English'},
    {code:'hi', label:'हिंदी'},
    {code:'bn', label:'বাংলা'},
    {code:'te', label:'తెలుగు'},
    {code:'mr', label:'मराठी'},
    {code:'ta', label:'தமிழ்'},
    {code:'ur', label:'اردو'},
    {code:'gu', label:'ગુજરાતી'},
    {code:'kn', label:'ಕನ್ನಡ'},
    {code:'ml', label:'മലയാളം'}
  ];
  langs.forEach(l => {
    const opt = document.createElement('option');
    opt.value = l.code;
    opt.textContent = l.label;
    sel.appendChild(opt);
  });

  sel.addEventListener('change', () => {
    applyLang(sel.value);
  });
  applyLang('en');
})();

function applyLang(code){
  const root = window.I18N[code] || window.I18N['en'];
  // ribbon
  const ribbon = document.getElementById('promo-ribbon');
  if(ribbon) ribbon.textContent = root.freeDelivery;
  // account text
  const acc = document.querySelector('.right-menu .clickable');
  if(acc) {
    acc.innerHTML = `${root.account}<br /><span class="bold-text">${root.accountSmall}</span>`;
  }
  // cart button label
  const cartBtn = document.getElementById('cart-toggle');
  if(cartBtn) cartBtn.textContent = `🛒 ${root.cart} (${getCartCount()})`;
}
