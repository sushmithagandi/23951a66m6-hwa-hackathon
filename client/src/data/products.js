export const categories = [
  { slug: 'dog-food', name: 'Dog Food', icon: '🦴', description: 'Nutritious meals for every pup.', image: 'https://images.unsplash.com/photo-1568640347023-a616a30bc3bd?auto=format&fit=crop&w=900&q=80' },
  { slug: 'cat-food', name: 'Cat Food', icon: '🐟', description: 'Delicious recipes cats crave.', image: 'https://images.unsplash.com/photo-1574158622682-e40e69881006?auto=format&fit=crop&w=900&q=80' },
  { slug: 'toys', name: 'Pet Toys', icon: '🎾', description: 'Playtime favorites for all pets.', image: 'https://images.unsplash.com/photo-1545249390-6bdfa286032f?auto=format&fit=crop&w=900&q=80' },
  { slug: 'accessories', name: 'Accessories', icon: '🦮', description: 'Stylish essentials for daily adventures.', image: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?auto=format&fit=crop&w=900&q=80' },
  { slug: 'grooming', name: 'Grooming', icon: '🛁', description: 'Keep pets fresh, clean, and happy.', image: 'https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=crop&w=900&q=80' },
  { slug: 'beds-clothing', name: 'Beds & Clothing', icon: '🛏️', description: 'Cozy comfort and cute outfits.', image: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&w=900&q=80' }
];

export const products = [
  {
    id: 'p1',
    name: 'Wholesome Chicken & Brown Rice Dog Kibble',
    category: 'dog-food',
    price: 34.99,
    originalPrice: 39.99,
    rating: 4.8,
    reviews: 214,
    badge: 'Best Seller',
    image: 'https://images.unsplash.com/photo-1589924691995-400dc9ecc119?auto=format&fit=crop&w=900&q=80',
    images: [
      'https://images.unsplash.com/photo-1589924691995-400dc9ecc119?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1568640347023-a616a30bc3bd?auto=format&fit=crop&w=900&q=80'
    ],
    description: 'A balanced dry dog food made with real chicken, brown rice, and wholesome vegetables to support energy, digestion, and a shiny coat.',
    features: ['Real chicken first ingredient', 'Supports healthy digestion', 'No artificial colors', 'Suitable for adult dogs'],
    stock: 24,
    featured: true
  },
  {
    id: 'p2',
    name: 'Grain-Free Salmon Puppy Bites',
    category: 'dog-food',
    price: 29.5,
    originalPrice: 32.0,
    rating: 4.7,
    reviews: 168,
    badge: 'Puppy Favorite',
    image: 'https://images.unsplash.com/photo-1601758124510-52d02ddb7cbd?auto=format&fit=crop&w=900&q=80',
    images: [
      'https://images.unsplash.com/photo-1601758124510-52d02ddb7cbd?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?auto=format&fit=crop&w=900&q=80'
    ],
    description: 'Soft, grain-free puppy bites packed with salmon and omega fatty acids for healthy growth and brain development.',
    features: ['Grain-free recipe', 'Omega-3 for brain support', 'Small bite size', 'Great training reward'],
    stock: 30,
    featured: false
  },
  {
    id: 'p3',
    name: 'Ocean Delight Tuna Cat Feast',
    category: 'cat-food',
    price: 24.99,
    originalPrice: 27.99,
    rating: 4.9,
    reviews: 305,
    badge: 'Top Rated',
    image: 'https://images.unsplash.com/photo-1574158622682-e40e69881006?auto=format&fit=crop&w=900&q=80',
    images: [
      'https://images.unsplash.com/photo-1574158622682-e40e69881006?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=900&q=80'
    ],
    description: 'Premium tuna cat food with a savory broth that keeps your feline hydrated, satisfied, and purring for more.',
    features: ['High-protein tuna', 'Hydrating broth', 'Taurine for heart health', 'Irresistible flavor'],
    stock: 40,
    featured: true
  },
  {
    id: 'p4',
    name: 'Indoor Cat Chicken & Pumpkin Recipe',
    category: 'cat-food',
    price: 26.75,
    originalPrice: 29.0,
    rating: 4.6,
    reviews: 142,
    badge: 'Healthy Choice',
    image: 'https://images.unsplash.com/photo-1495360010541-f48722b34f7d?auto=format&fit=crop&w=900&q=80',
    images: [
      'https://images.unsplash.com/photo-1495360010541-f48722b34f7d?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1533738363-b7f9aef128ce?auto=format&fit=crop&w=900&q=80'
    ],
    description: 'Gentle chicken and pumpkin formula crafted for indoor cats, supporting digestion and healthy weight management.',
    features: ['Hairball control support', 'Pumpkin for digestion', 'Made for indoor cats', 'Balanced nutrition'],
    stock: 35,
    featured: false
  },
  {
    id: 'p5',
    name: 'Interactive Rope Tug Toy',
    category: 'toys',
    price: 12.99,
    originalPrice: 15.99,
    rating: 4.5,
    reviews: 98,
    badge: 'Play Time',
    image: 'https://images.unsplash.com/photo-1545249390-6bdfa286032f?auto=format&fit=crop&w=900&q=80',
    images: [
      'https://images.unsplash.com/photo-1545249390-6bdfa286032f?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1535930749574-1399327ce78f?auto=format&fit=crop&w=900&q=80'
    ],
    description: 'Durable cotton rope toy perfect for tug-of-war, fetch, and bonding play sessions with your dog.',
    features: ['Durable cotton fibers', 'Supports dental health', 'Great for interactive play', 'Easy to grip'],
    stock: 50,
    featured: true
  },
  {
    id: 'p6',
    name: 'Feather Chase Cat Wand',
    category: 'toys',
    price: 9.99,
    originalPrice: 12.5,
    rating: 4.7,
    reviews: 187,
    badge: 'Cat Favorite',
    image: 'https://images.unsplash.com/photo-1526336024174-e58f5cdd8e13?auto=format&fit=crop&w=900&q=80',
    images: [
      'https://images.unsplash.com/photo-1526336024174-e58f5cdd8e13?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1511044568932-338cba0ad803?auto=format&fit=crop&w=900&q=80'
    ],
    description: "An engaging feather wand toy that sparks your cat's hunting instincts and keeps them active indoors.",
    features: ['Lightweight wand', 'Natural feathers', 'Encourages exercise', 'Safe for indoor play'],
    stock: 60,
    featured: false
  },
  {
    id: 'p7',
    name: 'Adventure Reflective Dog Leash',
    category: 'accessories',
    price: 18.99,
    originalPrice: 22.99,
    rating: 4.8,
    reviews: 221,
    badge: 'Outdoor Pick',
    image: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?auto=format&fit=crop&w=900&q=80',
    images: [
      'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=900&q=80'
    ],
    description: 'A strong, comfortable reflective leash designed for safe walks day or night with padded handle grip.',
    features: ['Reflective stitching', 'Comfort padded handle', 'Heavy-duty clip', '6-foot length'],
    stock: 45,
    featured: true
  },
  {
    id: 'p8',
    name: 'Travel Water Bottle & Bowl Combo',
    category: 'accessories',
    price: 16.5,
    originalPrice: 19.0,
    rating: 4.6,
    reviews: 134,
    badge: 'Travel Ready',
    image: 'https://images.unsplash.com/photo-1623387641168-d9803ddd3f35?auto=format&fit=crop&w=900&q=80',
    images: [
      'https://images.unsplash.com/photo-1623387641168-d9803ddd3f35?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&w=900&q=80'
    ],
    description: 'Leak-proof portable water bottle with fold-out bowl, perfect for hikes, road trips, and park days.',
    features: ['Leak-proof design', 'One-hand operation', 'BPA-free material', 'Easy to carry'],
    stock: 38,
    featured: false
  },
  {
    id: 'p9',
    name: 'Gentle Oatmeal Pet Shampoo',
    category: 'grooming',
    price: 14.25,
    originalPrice: 17.0,
    rating: 4.7,
    reviews: 173,
    badge: 'Gentle Care',
    image: 'https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=crop&w=900&q=80',
    images: [
      'https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1527526029430-319f10814151?auto=format&fit=crop&w=900&q=80'
    ],
    description: 'Soothing oatmeal shampoo that cleans gently while nourishing sensitive pet skin and leaving a fresh scent.',
    features: ['Oatmeal & aloe formula', 'For sensitive skin', 'Fresh mild scent', 'Suitable for dogs and cats'],
    stock: 55,
    featured: true
  },
  {
    id: 'p10',
    name: 'Premium Slicker Grooming Brush',
    category: 'grooming',
    price: 13.99,
    originalPrice: 16.5,
    rating: 4.5,
    reviews: 109,
    badge: 'Grooming Essential',
    image: 'https://images.unsplash.com/photo-1629740067905-bd3f515aa739?auto=format&fit=crop&w=900&q=80',
    images: [
      'https://images.unsplash.com/photo-1629740067905-bd3f515aa739?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=900&q=80'
    ],
    description: 'Remove loose fur and tangles easily with this ergonomic slicker brush for a healthy, shiny coat.',
    features: ['Ergonomic handle', 'Fine gentle bristles', 'Reduces shedding', 'Easy-clean button'],
    stock: 42,
    featured: false
  },
  {
    id: 'p11',
    name: 'CloudSoft Donut Pet Bed',
    category: 'beds-clothing',
    price: 42.0,
    originalPrice: 49.99,
    rating: 4.9,
    reviews: 264,
    badge: 'Cozy Pick',
    image: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&w=900&q=80',
    images: [
      'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1592194996308-7b43878e84a6?auto=format&fit=crop&w=900&q=80'
    ],
    description: 'Ultra-plush donut bed that gives pets a secure, calming place to curl up and sleep deeply.',
    features: ['Calming donut shape', 'Machine washable cover', 'Non-slip bottom', 'Ultra-soft faux fur'],
    stock: 20,
    featured: true
  },
  {
    id: 'p12',
    name: 'Pastel Raincoat for Small Pets',
    category: 'beds-clothing',
    price: 21.99,
    originalPrice: 25.99,
    rating: 4.4,
    reviews: 76,
    badge: 'New Arrival',
    image: 'https://images.unsplash.com/photo-1530281700549-e82e7bf110d6?auto=format&fit=crop&w=900&q=80',
    images: [
      'https://images.unsplash.com/photo-1530281700549-e82e7bf110d6?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=900&q=80'
    ],
    description: 'Lightweight water-resistant raincoat in cheerful pastel colors to keep your pet dry and stylish on rainy walks.',
    features: ['Water-resistant fabric', 'Adjustable straps', 'Leash opening', 'Lightweight & comfy'],
    stock: 28,
    featured: false
  },
  {
    id: 'p13',
    name: 'Snuffle Puzzle Enrichment Mat for Dogs',
    category: 'toys',
    price: 24.99,
    originalPrice: 29.99,
    rating: 4.8,
    reviews: 143,
    badge: 'Dog Enrichment',
    image: 'https://images.unsplash.com/photo-1601758174114-e711c0cbaa69?auto=format&fit=crop&w=900&q=80',
    images: [
      'https://images.unsplash.com/photo-1601758174114-e711c0cbaa69?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&w=900&q=80'
    ],
    description: 'A stimulating dog enrichment snuffle mat that encourages natural foraging, reduces boredom, and turns treat time into a fun mental workout.',
    features: ['Dog enrichment design', 'Encourages natural foraging', 'Non-slip base', 'Machine washable'],
    stock: 32,
    featured: true
  }
];

export const getProductById = (id) => products.find((p) => p.id === id);
export const getCategoryBySlug = (slug) => categories.find((c) => c.slug === slug);
