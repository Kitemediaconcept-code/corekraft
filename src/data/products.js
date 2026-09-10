// Corekraft Corporate Gifting Database

export const CATEGORIES = [
  { id: 'office-essentials', name: 'Office Essentials', count: 24, icon: 'NotebookPen', image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80' },
  { id: 'drinkware', name: 'Drinkware', count: 18, icon: 'CupSoda', image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=800&q=80' },
  { id: 'tech-gifts', name: 'Tech Gifts', count: 32, icon: 'Zap', image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=800&q=80' },
  { id: 'lifestyle', name: 'Lifestyle', count: 15, icon: 'Briefcase', image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80' },
  { id: 'gift-sets', name: 'Gift Sets', count: 28, icon: 'Gift', image: 'https://images.unsplash.com/photo-1513885535751-8b9238bd345a?auto=format&fit=crop&w=800&q=80' },
  { id: 'eco-friendly', name: 'Eco-Friendly', count: 20, icon: 'Leaf', image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80' },
  { id: 'employee-gifts', name: 'Employee Gifts', count: 40, icon: 'Users', image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80' },
  { id: 'client-gifts', name: 'Client Gifts', count: 25, icon: 'Building2', image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80' },
  { id: 'executive-gifts', name: 'Executive Gifts', count: 14, icon: 'Award', image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80' },
  { id: 'event-gifts', name: 'Event Gifts', count: 30, icon: 'Calendar', image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80' }
];

export const OCCASIONS = [
  { id: 'onboarding', title: 'Employee Onboarding', desc: 'Welcome new hires with branded kits.', icon: 'UserPlus' },
  { id: 'appreciation', title: 'Employee Appreciation', desc: 'Celebrate milestones & high performance.', icon: 'HeartHandshake' },
  { id: 'festive', title: 'Festive Gifting', desc: 'Diwali, New Year, & holiday celebrations.', icon: 'Sparkles' },
  { id: 'client-gifting', title: 'Client Gifting', desc: 'Strengthen business partnerships.', icon: 'Briefcase' },
  { id: 'events', title: 'Corporate Events', desc: 'Conferences, summits & launch parties.', icon: 'Building' },
  { id: 'leadership', title: 'Leadership Gifts', desc: 'Premium luxury items for executives.', icon: 'Crown' },
  { id: 'rewards', title: 'Rewards & Recognition', desc: 'Annual awards & quarterly recognition.', icon: 'Trophy' },
  { id: 'new-year', title: 'New Year Gifts', desc: 'Ring in the new fiscal year with style.', icon: 'PartyPopper' }
];

export const PRODUCTS = [
  {
    id: 'ck-ons-1023',
    name: 'Executive Notebook Set',
    category: 'office-essentials',
    categoryName: 'Office Essentials',
    price: 1299,
    originalPrice: 1699,
    discount: '24% OFF',
    rating: 4.9,
    reviewCount: 18,
    sku: 'CK-ONS-1023',
    featured: true,
    moq: 10,
    inStock: true,
    description: 'A perfect blend of style and functionality. This premium notebook set is an ideal corporate gift designed to leave a lasting impression.',
    fullDescription: 'The Executive Notebook Set is a thoughtfully curated gift that combines everyday essentials with a touch of elegance. Perfect for corporate gifting, client appreciation, team rewards and business events, this set reflects your brand’s commitment to quality.',
    highlights: [
      'Premium quality notebook with soft-touch leatherette cover',
      'Insulated stainless steel bottle (500 ml) with double wall vacuum',
      'Metal ballpoint pen with ultra-smooth writing experience',
      'Matching metal & leather keychain with sturdy ring',
      'Custom laser engraving / UV printing available for logo & text',
      'Delivered in an elegant matte black & Corekraft pink presentation gift box'
    ],
    colors: [
      { name: 'Red', hex: '#D92756' },
      { name: 'Black', hex: '#151515' },
      { name: 'Navy Blue', hex: '#1E293B' },
      { name: 'Olive Grey', hex: '#4A5568' }
    ],
    images: [
      '/Corekraft products/p1/1.jpg',
      '/Corekraft products/p1/2.jpg',
      '/Corekraft products/p1/3.jpg'
    ]
  },
  {
    id: 'ck-vib-1011',
    name: 'Vacuum Insulated Bottle',
    category: 'drinkware',
    categoryName: 'Drinkware',
    price: 899,
    originalPrice: 1199,
    discount: '25% OFF',
    rating: 4.8,
    reviewCount: 24,
    sku: 'CK-VIB-1011',
    featured: true,
    moq: 25,
    inStock: true,
    description: 'Keep beverages hot for 12 hours and cold for 24 hours with our premium double-wall stainless steel bottle.',
    fullDescription: 'Crafted from food-grade 304 stainless steel, the Vacuum Insulated Bottle is a staple corporate gift. It keeps drinks at optimal temperatures throughout long workday schedules while showcasing your company logo in sharp UV print or laser etch.',
    highlights: [
      '500ml capacity with leak-proof lid',
      'Double-wall vacuum insulation technology',
      'Sweat-free matte finish exterior',
      'BPA-free & eco-conscious design'
    ],
    colors: [
      { name: 'Matte Black', hex: '#151515' },
      { name: 'Corekraft Pink', hex: '#EE3364' },
      { name: 'Slate Grey', hex: '#64748B' }
    ],
    images: [
      '/Corekraft products/p2/1.jpg',
      '/Corekraft products/p2/5.jpg',
      '/Corekraft products/p2/6.jpg'
    ]
  },
  {
    id: 'ck-wc-1044',
    name: 'Wireless Fast Charger Pad',
    category: 'tech-gifts',
    categoryName: 'Tech Gifts',
    price: 1150,
    originalPrice: 1499,
    discount: '23% OFF',
    rating: 4.9,
    reviewCount: 32,
    sku: 'CK-WC-1044',
    featured: true,
    moq: 15,
    inStock: true,
    description: 'Ultra-thin 15W MagSafe compatible wireless charging pad with ambient LED indicator and leather texture surface.',
    fullDescription: 'Keep desk setups clutter-free with the Corekraft Wireless Fast Charger Pad. Designed with smart heat dissipation and anti-slip silicone, it charges smartphones and earbuds effortlessly while proudly displaying your company logo.',
    highlights: [
      '15W Qi-certified fast wireless charging',
      'Premium leatherette surface with custom logo embossing',
      'Multi-protect safety system with temperature control',
      'Type-C braided power cable included'
    ],
    colors: [
      { name: 'Charcoal Black', hex: '#151515' },
      { name: 'Blush Pink', hex: '#FAD9E2' }
    ],
    images: [
      '/Corekraft products/p3/8.jpg',
      '/Corekraft products/p3/9.jpg',
      '/Corekraft products/p3/10.jpg'
    ]
  },
  {
    id: 'ck-lb-1088',
    name: 'Executive Laptop Backpack',
    category: 'lifestyle',
    categoryName: 'Lifestyle',
    price: 2499,
    originalPrice: 3299,
    discount: '24% OFF',
    rating: 4.7,
    reviewCount: 27,
    sku: 'CK-LB-1088',
    featured: true,
    moq: 10,
    inStock: true,
    description: 'Water-resistant, ergonomic business backpack with dedicated 15.6" laptop compartment and integrated USB charging port.',
    fullDescription: 'Designed for commuting professionals and corporate travelers, this laptop backpack pairs sleek minimal styling with maximum organizational capacity. Includes anti-theft back pocket and custom metal badge branding.',
    highlights: [
      'Fits up to 15.6-inch laptop + 11-inch tablet',
      'Water-repellent oxford fabric with premium zippers',
      'Built-in external USB charging pass-through port',
      'Custom metal plate branding with company logo'
    ],
    colors: [
      { name: 'Heather Grey', hex: '#686868' },
      { name: 'Midnight Black', hex: '#151515' }
    ],
    images: [
      '/Corekraft products/p4/11.jpg',
      '/Corekraft products/p4/12.jpg',
      '/Corekraft products/p4/13.jpg'
    ]
  },
  {
    id: 'ck-pgh-1099',
    name: 'Premium Gift Hamper Set',
    category: 'gift-sets',
    categoryName: 'Gift Sets',
    price: 3999,
    originalPrice: 4999,
    discount: '20% OFF',
    rating: 5.0,
    reviewCount: 41,
    sku: 'CK-PGH-1099',
    featured: true,
    moq: 5,
    inStock: true,
    description: 'Luxury corporate celebration box featuring gourmet treats, temperature bottle, power bank, and handwritten greeting card.',
    fullDescription: 'Our flagship corporate hamper set is tailored for VIP clients, executive rewards, and festive occasions. Wrapped in Corekraft luxury rigid boxes with custom ribbon foil branding.',
    highlights: [
      '10,000mAh Slim Metal Power Bank',
      'LED Temperature Display Insulated Bottle',
      'A5 Hardbound Planner with Gold Foil edges',
      'Assorted Artisan Gourmet Chocolates & Dry Fruits',
      'Personalized greeting card with custom message'
    ],
    colors: [
      { name: 'Corekraft Royal Pink', hex: '#EE3364' },
      { name: 'Matt Gold & Black', hex: '#151515' }
    ],
    images: [
      '/Corekraft products/p5/14.jpg',
      '/Corekraft products/p5/15.jpg',
      '/Corekraft products/p5/16.jpg'
    ]
  },
  {
    id: 'ck-eco-1055',
    name: 'Eco-Friendly Bamboo Desk Set',
    category: 'eco-friendly',
    categoryName: 'Eco-Friendly',
    price: 1499,
    originalPrice: 1899,
    discount: '21% OFF',
    rating: 4.8,
    reviewCount: 15,
    sku: 'CK-ECO-1055',
    featured: false,
    moq: 20,
    inStock: true,
    description: '100% biodegradable organic bamboo planner notebook, wireless charger, bamboo pen, and plantable seed bookmark.',
    fullDescription: 'Showcase your company’s commitment to ESG and sustainability with this sustainable gift set. All materials are ethically sourced and 100% recyclable.',
    highlights: [
      'Natural bamboo hard cover notebook with FSC-certified recycled paper',
      'Real bamboo ballpoint pen with laser logo etching',
      '5W Bamboo wireless charging dock',
      'Plantable marigold & basil seed paper calendar'
    ],
    colors: [
      { name: 'Natural Bamboo', hex: '#D4A373' }
    ],
    images: [
      '/Corekraft products/p6/17.jpg',
      '/Corekraft products/p6/18.jpg',
      '/Corekraft products/p6/19.jpg'
    ]
  },
  {
    id: 'ck-pn-1022',
    name: 'Premium Leather Notebook',
    category: 'office-essentials',
    categoryName: 'Office Essentials',
    price: 749,
    originalPrice: 999,
    discount: '25% OFF',
    rating: 4.9,
    reviewCount: 16,
    sku: 'CK-PN-1022',
    featured: false,
    moq: 30,
    inStock: true,
    description: 'Hardcover journal with pen loop, magnetic clasp closure, ribbon bookmark, and 192 bleed-resistant cream pages.',
    fullDescription: 'An everyday essential for executives and professionals. Smooth synthetic leather surface provides high contrast debossing for corporate logos.',
    highlights: [
      '80 GSM acid-free cream paper',
      'Magnetic buckle closure with custom logo engraving',
      'Back cover expanding pocket for notes and business cards'
    ],
    colors: [
      { name: 'Jet Black', hex: '#151515' },
      { name: 'Cognac Brown', hex: '#8B4513' },
      { name: 'Corekraft Pink', hex: '#EE3364' }
    ],
    images: [
      '/Corekraft products/p7/20.jpg',
      '/Corekraft products/p7/21.jpg',
      '/Corekraft products/p7/22.jpg'
    ]
  },
  {
    id: 'ck-tbt-1066',
    name: 'Noise Cancelling Earbuds Set',
    category: 'tech-gifts',
    categoryName: 'Tech Gifts',
    price: 3299,
    originalPrice: 4299,
    discount: '23% OFF',
    rating: 4.9,
    reviewCount: 29,
    sku: 'CK-TBT-1066',
    featured: false,
    moq: 10,
    inStock: true,
    description: 'True Wireless Stereo earbuds with Active Noise Cancellation, 30-hour battery life, and custom engraved charging case.',
    fullDescription: 'Deliver studio-quality audio to employees and key clients. The charging case features UV color printing or subtle laser engraving.',
    highlights: [
      'Bluetooth 5.3 instant auto-pairing',
      'Active Noise Cancellation (ANC) up to 28dB',
      'IPX5 water and sweat resistance',
      'Custom logo print on sleek matte case'
    ],
    colors: [
      { name: 'Matte Black', hex: '#151515' },
      { name: 'Ivory White', hex: '#F8F9FA' }
    ],
    images: [
      '/Corekraft products/p8/31.jpg',
      '/Corekraft products/p8/32.jpg',
      '/Corekraft products/p8/33.jpg'
    ]
  },
  {
    id: 'ck-sdp-1102',
    name: 'Smart Temperature Display Flask',
    category: 'drinkware',
    categoryName: 'Drinkware',
    price: 1199,
    originalPrice: 1599,
    discount: '25% OFF',
    rating: 4.8,
    reviewCount: 35,
    sku: 'CK-SDP-1102',
    featured: true,
    moq: 20,
    inStock: true,
    description: 'Smart LED temperature display bottle, double walled stainless steel, keeps beverages hot/cold for hours.',
    fullDescription: 'The Smart Temperature Display Flask features a built-in LED touchscreen that shows the real-time temperature of your beverage without opening the lid.',
    highlights: [
      'Built-in LED temperature touchscreen',
      'Food-grade 304 stainless steel interior',
      'Anti-slip silicone bottom',
      'Tea infuser mesh included'
    ],
    colors: [
      { name: 'Metallic Black', hex: '#151515' },
      { name: 'Rose Gold', hex: '#B76E79' },
      { name: 'Ocean Blue', hex: '#1E3A8A' }
    ],
    images: [
      '/Corekraft products/p9/51.jpg',
      '/Corekraft products/p9/52.jpg',
      '/Corekraft products/p9/53.jpg'
    ]
  },
  {
    id: 'ck-ldp-1103',
    name: 'Premium Leather Desk Pad',
    category: 'office-essentials',
    categoryName: 'Office Essentials',
    price: 1499,
    originalPrice: 1999,
    discount: '25% OFF',
    rating: 4.9,
    reviewCount: 42,
    sku: 'CK-LDP-1103',
    featured: false,
    moq: 15,
    inStock: true,
    description: 'Elegant dual-sided vegan leather desk pad, waterproof and scratch-resistant, perfect for modern workspaces.',
    fullDescription: 'Transform any workspace with this premium vegan leather desk pad. It provides a smooth writing surface and protects your desk from scratches, stains, and spills.',
    highlights: [
      'Large 80x40cm surface area',
      'Dual-sided reversible design',
      'Waterproof and easy to clean',
      'Includes matching leather tie-strap'
    ],
    colors: [
      { name: 'Tan Brown', hex: '#D2B48C' },
      { name: 'Navy Blue', hex: '#1E293B' },
      { name: 'Classic Black', hex: '#151515' }
    ],
    images: [
      '/Corekraft products/p10/72.jpg',
      '/Corekraft products/p10/73.jpg',
      '/Corekraft products/p10/74.jpg',
      '/Corekraft products/p10/75.jpg'
    ]
  },
  {
    id: 'ck-mp-1104',
    name: 'Executive Metal Pen Set',
    category: 'office-essentials',
    categoryName: 'Office Essentials',
    price: 899,
    originalPrice: 1299,
    discount: '30% OFF',
    rating: 4.7,
    reviewCount: 22,
    sku: 'CK-MP-1104',
    featured: false,
    moq: 50,
    inStock: true,
    description: 'Heavyweight brass barrel ballpoint pen with smooth twist mechanism, presented in a luxury velvet box.',
    fullDescription: 'An essential corporate gift for executives. This heavyweight brass ballpoint pen offers a premium writing experience with precise ink flow.',
    highlights: [
      'Solid brass construction with lacquer finish',
      'Ultra-smooth German ink cartridge',
      'Twist-action mechanism',
      'Laser engravable surface'
    ],
    colors: [
      { name: 'Gold', hex: '#FFD700' },
      { name: 'Silver', hex: '#C0C0C0' },
      { name: 'Matte Black', hex: '#151515' }
    ],
    images: [
      '/Corekraft products/p11/76.jpg',
      '/Corekraft products/p11/77.jpg',
      '/Corekraft products/p11/78.jpg'
    ]
  },
  {
    id: 'ck-ws-1105',
    name: 'Compact Bluetooth Speaker',
    category: 'tech-gifts',
    categoryName: 'Tech Gifts',
    price: 1999,
    originalPrice: 2499,
    discount: '20% OFF',
    rating: 4.8,
    reviewCount: 56,
    sku: 'CK-WS-1105',
    featured: true,
    moq: 10,
    inStock: true,
    description: 'Portable, waterproof Bluetooth speaker with 360-degree sound and 12-hour battery life.',
    fullDescription: 'Take your music anywhere with this rugged, compact Bluetooth speaker. Delivering impressive 360-degree sound and deep bass in a portable package.',
    highlights: [
      'Bluetooth 5.0 with 33ft range',
      'IP67 waterproof and dustproof',
      '12-hour continuous playtime',
      'Built-in microphone for calls'
    ],
    colors: [
      { name: 'Crimson Red', hex: '#DC143C' },
      { name: 'Midnight Blue', hex: '#191970' },
      { name: 'Slate Grey', hex: '#708090' }
    ],
    images: [
      '/Corekraft products/p12/79.jpg',
      '/Corekraft products/p12/80.jpg',
      '/Corekraft products/p12/81.jpg'
    ]
  }
];

export const CLIENT_LOGOS = [
  { name: 'Google', logo: 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg' },
  { name: 'Microsoft', logo: 'https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_%282012%29.svg' },
  { name: 'Amazon', logo: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg' },
  { name: 'Deloitte', logo: 'https://upload.wikimedia.org/wikipedia/commons/5/56/Deloitte.svg' },
  { name: 'Salesforce', logo: 'https://upload.wikimedia.org/wikipedia/commons/f/f9/Salesforce.com_logo.svg' },
  { name: 'Infosys', logo: 'https://upload.wikimedia.org/wikipedia/commons/9/95/Infosys_logo.svg' },
  { name: 'Accenture', logo: 'https://upload.wikimedia.org/wikipedia/commons/c/cd/Accenture_logo.svg' }
];

export const TESTIMONIALS = [
  {
    id: 1,
    name: 'Ananya Sharma',
    company: 'TechCorp India',
    designation: 'Head of People & HR',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
    review: 'Corekraft made our annual onboarding kits seamless! The product quality, crisp logo engraving, and prompt PAN-India delivery to 450+ remote employees exceeded our expectations.'
  },
  {
    id: 2,
    name: 'Vikramaditya Roy',
    company: 'FinEdge Solutions',
    designation: 'VP Corporate Procurement',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=200&q=80',
    review: 'Finding premium corporate gifts that don’t look cheap used to be a struggle. Corekraft’s Executive Notebook & Bottle sets received glowing feedback from our C-suite clients during Diwali.'
  },
  {
    id: 3,
    name: 'Priya Nair',
    company: 'InnovateX Events',
    designation: 'Lead Event Manager',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80',
    review: 'The custom branding studio on Corekraft’s platform let us preview our logo before placing a 1,000-unit bulk order. Delivered on time with flawless packaging.'
  }
];
