// db.js
// Product database and helpers
// Note: images use Unsplash sources for demo purposes.

window.PRODUCTS = [
  // ELECTRONICS (10)
  { id: 'e1', category: 'electronics', name: 'Smartphone X1', price: 14999, img: 'https://images.unsplash.com/photo-1510552776732-729e0667b493?auto=format&fit=crop&w=600&q=80', desc: 'Fast phone, great camera.' },
  { id: 'e2', category: 'electronics', name: 'Laptop Pro 14"', price: 59999, img: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=600&q=80', desc: 'Compact and powerful.' },
  { id: 'e3', category: 'electronics', name: 'Wireless Headphones', price: 2999, img: 'https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?auto=format&fit=crop&w=600&q=80', desc: 'Noise-canceling.' },
  { id: 'e4', category: 'electronics', name: 'Smartwatch S', price: 4999, img: 'https://images.unsplash.com/photo-1518221351248-1f0b09b6f3f9?auto=format&fit=crop&w=600&q=80', desc: 'Track your fitness.' },
  { id: 'e5', category: 'electronics', name: 'Bluetooth Speaker', price: 1999, img: 'https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?auto=format&fit=crop&w=600&q=80', desc: 'Big sound in compact size.' },
  { id: 'e6', category: 'electronics', name: '4K Action Camera', price: 8999, img: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=600&q=80', desc: 'Record adventures.' },
  { id: 'e7', category: 'electronics', name: 'Gaming Mouse', price: 1299, img: 'https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=600&q=80', desc: 'High precision.' },
  { id: 'e8', category: 'electronics', name: 'Mechanical Keyboard', price: 2299, img: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=600&q=80', desc: 'Tactile & durable.' },
  { id: 'e9', category: 'electronics', name: 'Portable SSD 1TB', price: 4999, img: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=600&q=80', desc: 'Fast storage.' },
  { id: 'e10', category: 'electronics', name: 'Drone Mini', price: 12999, img: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=600&q=80', desc: 'Aerial photography.' },

  // FASHION (10)
  { id: 'f1', category: 'fashion', name: 'Leather Jacket', price: 4999, img: 'https://images.unsplash.com/photo-1520975698516-6bfeaa04b2b9?auto=format&fit=crop&w=600&q=80', desc: 'Stylish & warm.' },
  { id: 'f2', category: 'fashion', name: 'Denim Jeans', price: 1499, img: 'https://images.unsplash.com/photo-1495020689067-958852a7765e?auto=format&fit=crop&w=600&q=80', desc: 'Comfort fit.' },
  { id: 'f3', category: 'fashion', name: 'Silk Scarf', price: 799, img: 'https://images.unsplash.com/photo-1514996937319-344454492b37?auto=format&fit=crop&w=600&q=80', desc: 'Elegant accessory.' },
  { id: 'f4', category: 'fashion', name: 'Sneakers Run', price: 2499, img: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80', desc: 'Everyday comfort.' },
  { id: 'f5', category: 'fashion', name: 'Evening Dress', price: 3999, img: 'https://images.unsplash.com/photo-1503342452485-86f7f0ff1d33?auto=format&fit=crop&w=600&q=80', desc: 'For special nights.' },
  { id: 'f6', category: 'fashion', name: 'Sunglasses', price: 699, img: 'https://images.unsplash.com/photo-1504198453319-5ce911bafcde?auto=format&fit=crop&w=600&q=80', desc: 'UV protection.' },
  { id: 'f7', category: 'fashion', name: 'Canvas Bag', price: 499, img: 'https://images.unsplash.com/photo-1530845641109-6d2a5a0a7c58?auto=format&fit=crop&w=600&q=80', desc: 'Day-to-day bag.' },
  { id: 'f8', category: 'fashion', name: 'Wool Sweater', price: 1799, img: 'https://images.unsplash.com/photo-1520975698516-6bfeaa04b2b9?auto=format&fit=crop&w=600&q=80', desc: 'Cozy & soft.' },
  { id: 'f9', category: 'fashion', name: 'Cufflinks', price: 599, img: 'https://images.unsplash.com/photo-1532634896-26909d0d5b0e?auto=format&fit=crop&w=600&q=80', desc: 'Polish your look.' },
  { id: 'f10', category: 'fashion', name: 'Leather Belt', price: 399, img: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=600&q=80', desc: 'Durable leather.' },

  // BOOKS (10)
  { id: 'b1', category: 'books', name: 'Classic Novel', price: 299, img: 'https://images.unsplash.com/photo-1529655683826-aba9b3e77383?auto=format&fit=crop&w=600&q=80', desc: 'A timeless story.' },
  { id: 'b2', category: 'books', name: 'Self-help Guide', price: 399, img: 'https://images.unsplash.com/photo-1476958526483-36efcaa80f58?auto=format&fit=crop&w=600&q=80', desc: 'Improve your life.' },
  { id: 'b3', category: 'books', name: 'Biography', price: 349, img: 'https://images.unsplash.com/photo-1526045612212-70caf35c14df?auto=format&fit=crop&w=600&q=80', desc: 'Inspiring life story.' },
  { id: 'b4', category: 'books', name: 'Children Story', price: 199, img: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=600&q=80', desc: 'Fun & educational.' },
  { id: 'b5', category: 'books', name: 'Comic Collection', price: 249, img: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=600&q=80', desc: 'Adventure & fun.' },
  { id: 'b6', category: 'books', name: 'Cookbook', price: 329, img: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=600&q=80', desc: 'Delicious recipes.' },
  { id: 'b7', category: 'books', name: 'Travel Guide', price: 279, img: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&w=600&q=80', desc: 'Plan adventures.' },
  { id: 'b8', category: 'books', name: 'History Book', price: 399, img: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&w=600&q=80', desc: 'Back in time.' },
  { id: 'b9', category: 'books', name: 'Poetry', price: 199, img: 'https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&w=600&q=80', desc: 'Short and deep.' },
  { id: 'b10', category: 'books', name: 'Science Fiction', price: 349, img: 'https://images.unsplash.com/photo-1496307042754-b4aa456c4a2d?auto=format&fit=crop&w=600&q=80', desc: 'Future worlds.' },

  // HOME & KITCHEN (10)
  { id: 'h1', category: 'homekitchen', name: 'Cookware Set', price: 3999, img: 'https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?auto=format&fit=crop&w=600&q=80', desc: 'Non-stick set.' },
  { id: 'h2', category: 'homekitchen', name: 'Coffee Maker', price: 3499, img: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=600&q=80', desc: 'Fresh coffee.' },
  { id: 'h3', category: 'homekitchen', name: 'Knife Set', price: 1499, img: 'https://images.unsplash.com/photo-1556911073-52527ac43796?auto=format&fit=crop&w=600&q=80', desc: 'Sharp & durable.' },
  { id: 'h4', category: 'homekitchen', name: 'Bedding Set', price: 2599, img: 'https://images.unsplash.com/photo-1505691723518-36a67b1b4a11?auto=format&fit=crop&w=600&q=80', desc: 'Soft & comfy.' },
  { id: 'h5', category: 'homekitchen', name: 'Blender', price: 1999, img: 'https://images.unsplash.com/photo-1515125520142-7f5f25a9f2ef?auto=format&fit=crop&w=600&q=80', desc: 'Smoothies made easy.' },
  { id: 'h6', category: 'homekitchen', name: 'Air Fryer', price: 4999, img: 'https://images.unsplash.com/photo-1601050690596-6f0d9a3651b3?auto=format&fit=crop&w=600&q=80', desc: 'Crispy but healthy.' },
  { id: 'h7', category: 'homekitchen', name: 'Wall Clock', price: 699, img: 'https://images.unsplash.com/photo-1495121605193-b116b5b09f6d?auto=format&fit=crop&w=600&q=80', desc: 'Minimal design.' },
  { id: 'h8', category: 'homekitchen', name: 'Floor Lamp', price: 1299, img: 'https://images.unsplash.com/photo-1505691723518-36a67b1b4a11?auto=format&fit=crop&w=600&q=80', desc: 'Ambient lighting.' },
  { id: 'h9', category: 'homekitchen', name: 'Storage Boxes', price: 499, img: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=600&q=80', desc: 'Organize easily.' },
  { id: 'h10', category: 'homekitchen', name: 'Cutting Board', price: 299, img: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80', desc: 'Durable wood.' },

  // CLOTHES (10)
  { id: 'c1', category: 'clothes', name: "Men's T-Shirt", price: 499, img: 'https://images.unsplash.com/photo-1520975911034-6b6b4a7f9e66?auto=format&fit=crop&w=600&q=80', desc: 'Casual tee.' },
  { id: 'c2', category: 'clothes', name: "Women's Top", price: 699, img: 'https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?auto=format&fit=crop&w=600&q=80', desc: 'Trendy top.' },
  { id: 'c3', category: 'clothes', name: "Kids Hoodie", price: 799, img: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=600&q=80', desc: 'Warm & fun.' },
  { id: 'c4', category: 'clothes', name: "Men's Shorts", price: 399, img: 'https://images.unsplash.com/photo-1515592928155-1a7b7b5b6fcb?auto=format&fit=crop&w=600&q=80', desc: 'Summer ready.' },
  { id: 'c5', category: 'clothes', name: "Women's Skirt", price: 899, img: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=600&q=80', desc: 'Flowy & pretty.' },
  { id: 'c6', category: 'clothes', name: "Formal Shirt", price: 1299, img: 'https://images.unsplash.com/photo-1503342452485-86f7f0ff1d33?auto=format&fit=crop&w=600&q=80', desc: 'Office wear.' },
  { id: 'c7', category: 'clothes', name: "Pajama Set", price: 699, img: 'https://images.unsplash.com/photo-1542300058-4b6f6f6b6b6a?auto=format&fit=crop&w=600&q=80', desc: 'Comfortable sleepwear.' },
  { id: 'c8', category: 'clothes', name: "Denim Jacket", price: 2499, img: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=600&q=80', desc: 'Classic denim.' },
  { id: 'c9', category: 'clothes', name: "Athletic Trackpants", price: 999, img: 'https://images.unsplash.com/photo-1520975630200-9a2d7f2a6cde?auto=format&fit=crop&w=600&q=80', desc: 'Move freely.' },
  { id: 'c10', category: 'clothes', name: "Cap", price: 299, img: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=600&q=80', desc: 'Shade & style.' },

  // SPORTS (10)
  { id: 's1', category: 'sports', name: 'Cricket Bat', price: 2999, img: 'https://images.unsplash.com/photo-1521412644187-c49fa049e84d?auto=format&fit=crop&w=600&q=80', desc: 'Powerful stroke.' },
  { id: 's2', category: 'sports', name: 'Football', price: 999, img: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=600&q=80', desc: 'Premier match ball.' },
  { id: 's3', category: 'sports', name: 'Tennis Racket', price: 2499, img: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=600&q=80', desc: 'Lightweight.' },
  { id: 's4', category: 'sports', name: 'Yoga Mat', price: 799, img: 'https://images.unsplash.com/photo-1519750157634-bbb9be2b1530?auto=format&fit=crop&w=600&q=80', desc: 'Non-slip.' },
  { id: 's5', category: 'sports', name: 'Dumbbell Set', price: 3499, img: 'https://images.unsplash.com/photo-1558611848-73f7eb4001d4?auto=format&fit=crop&w=600&q=80', desc: 'Home workout.' },
  { id: 's6', category: 'sports', name: 'Running Shoes', price: 3499, img: 'https://images.unsplash.com/photo-1542293787938-c9e299b880b3?auto=format&fit=crop&w=600&q=80', desc: 'Light & cushioned.' },
  { id: 's7', category: 'sports', name: 'Water Bottle', price: 299, img: 'https://images.unsplash.com/photo-1508264165352-cd4b1a9db2f3?auto=format&fit=crop&w=600&q=80', desc: 'Stay hydrated.' },
  { id: 's8', category: 'sports', name: 'Basketball', price: 1299, img: 'https://images.unsplash.com/photo-1508609349937-5ec4ae374ebf?auto=format&fit=crop&w=600&q=80', desc: 'Court ready.' },
  { id: 's9', category: 'sports', name: 'Cycling Helmet', price: 1999, img: 'https://images.unsplash.com/photo-1508182315875-92b0b7d9f9fa?auto=format&fit=crop&w=600&q=80', desc: 'Safety first.' },
  { id: 's10', category: 'sports', name: 'Skipping Rope', price: 199, img: 'https://images.unsplash.com/photo-1526403224749-41423a6a3b1f?auto=format&fit=crop&w=600&q=80', desc: 'Cardio & fun.' },
];

// small helper: get products by category
window.getProductsByCategory = function(category) {
  if (!category) return window.PRODUCTS.slice();
  return window.PRODUCTS.filter(p => p.category === category.toLowerCase());
};

// get product by id
window.getProductById = function(id) {
  return window.PRODUCTS.find(p => p.id === id);
};
