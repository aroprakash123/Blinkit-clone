const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const Product = require('../models/Product');

/* PRODUCT IMAGES (Stable Unsplash Links) */
const productImages = {
  // Dairy, Bread & Eggs
  Milk: "https://images.unsplash.com/photo-1563636619-e9143da7973b",
  Bread: "https://images.unsplash.com/photo-1608198093002-ad4e005484ec",
  Butter: "https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d",
  Cheese: "https://images.unsplash.com/photo-1552767059-ce182ead6c1b",
  Paneer: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7",
  Eggs: "https://images.unsplash.com/photo-1506976785307-8732e854ad03",
  Yogurt: "https://images.unsplash.com/photo-1584270354949-1e4eec7c2e54",
  Cream: "https://images.unsplash.com/photo-1625944230945-1b7dd3b949ab",
  Curd: "https://images.unsplash.com/photo-1584270354949-1e4eec7c2e54",
  Lassi: "https://images.unsplash.com/photo-1625944230945-1b7dd3b949ab",
  Buttermilk: "https://images.unsplash.com/photo-1625944230945-1b7dd3b949ab",

  // Fruits & Vegetables
  Apple: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6",
  Banana: "https://images.unsplash.com/photo-1574226516831-e1dff420e37c",
  Orange: "https://images.unsplash.com/photo-1582979512210-99b6a53386f9",
  Mango: "https://images.unsplash.com/photo-1553279768-865429fa0078",
  Tomato: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea",
  Potato: "https://images.unsplash.com/photo-1518977676601-b53f82aba655",
  Onion: "https://images.unsplash.com/photo-1587049352851-8d4e89133924",
  Carrot: "https://images.unsplash.com/photo-1447175008436-054170c2e979",
  Broccoli: "https://images.unsplash.com/photo-1582515073490-dc1a9b79f6a1",
  Spinach: "https://images.unsplash.com/photo-1576045057995-568f588f82fb",
  Grapes: "https://images.unsplash.com/photo-1537640538966-79f369143f8f",
  Watermelon: "https://images.unsplash.com/photo-1563114771-84221bd9daa3",
  Pineapple: "https://images.unsplash.com/photo-1550258987-190a2d41a8ba",
  Pomegranate: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5",
  Kiwi: "https://images.unsplash.com/photo-1618897996318-5a901fa6ca71",
  Strawberry: "https://images.unsplash.com/photo-1464965911861-746a04b4bca5",
  Lemon: "https://images.unsplash.com/photo-1589561253896-768c5a61ec56",
  Capsicum: "https://images.unsplash.com/photo-1563565375-f3fdfdbefa83",
  Cabbage: "https://images.unsplash.com/photo-1594282486550-6d22cbfd79b4",
  Cauliflower: "https://images.unsplash.com/photo-1613743983303-b3e89f8a2b80",
  Brinjal: "https://images.unsplash.com/photo-1587838152238-12c1f46f2b24",
  Pumpkin: "https://images.unsplash.com/photo-1574085733277-851d9d856a3a",
  Garlic: "https://images.unsplash.com/photo-1540148426945-6cf22a6b2383",
  Ginger: "https://images.unsplash.com/photo-1575052814086-f385e2e2ad1b",
  Cucumber: "https://images.unsplash.com/photo-1604977042946-1eecc30f269e",
  Beetroot: "https://images.unsplash.com/photo-1593105318004-9f4fa0c5c5c5",
  Corn: "https://images.unsplash.com/photo-1551754655-cd27e38d2076",
  Mushroom: "https://images.unsplash.com/photo-1509624776920-0fac24a9dfda",
  Beans: "https://images.unsplash.com/photo-1597362925123-77861d3fbac7",
  Peas: "https://images.unsplash.com/photo-1587033411391-5d9e51cce126",

  // Cold Drinks & Juices
  Coca: "https://images.unsplash.com/photo-1581636625402-29b2a704ef13",
  Pepsi: "https://images.unsplash.com/photo-1624517452488-04869289c4ca",
  Sprite: "https://images.unsplash.com/photo-1629203851122-3726ecdf080e",
  Fanta: "https://images.unsplash.com/photo-1610878180933-123728745d22",
  Juice: "https://images.unsplash.com/photo-1600271886742-f049cd5bba49",
  ThumsUp: "https://images.unsplash.com/photo-1624517452488-04869289c4ca",
  MountainDew: "https://images.unsplash.com/photo-1624517452488-04869289c4ca",
  Mirinda: "https://images.unsplash.com/photo-1610878180933-123728745d22",
  Limca: "https://images.unsplash.com/photo-1629203851122-3726ecdf080e",
  Water: "https://images.unsplash.com/photo-1548839147-d9c6a6d6a5a5",
  EnergyDrink: "https://images.unsplash.com/photo-1616530940355-351fabd9524b",

  // Snacks & Munchies
  Chips: "https://images.unsplash.com/photo-1585238342028-4c9c7f7f5d2d",
  Nachos: "https://images.unsplash.com/photo-1617191517000-2e5a89b7333c",
  Popcorn: "https://images.unsplash.com/photo-1578849278619-e73505e9610f",
  Namkeen: "https://images.unsplash.com/photo-1604909052743-94e838986d24",
  Kurkure: "https://images.unsplash.com/photo-1606755962773-d324e0a13086",
  Bhujia: "https://images.unsplash.com/photo-1604909052743-94e838986d24",
  Mixture: "https://images.unsplash.com/photo-1604909052743-94e838986d24",
  BananaChips: "https://images.unsplash.com/photo-1585238342028-4c9c7f7f5d2d",
  Mathri: "https://images.unsplash.com/photo-1604909052743-94e838986d24",
  Cookies: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e",
  Biscuits: "https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b",
  Khakhra: "https://images.unsplash.com/photo-1604909052743-94e838986d24",
  Thepla: "https://images.unsplash.com/photo-1604909052743-94e838986d24",

  // Sweet Tooth
  Chocolate: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c",
  Candy: "https://images.unsplash.com/photo-1582058091505-f87a2e55a40f",
  Lollipop: "https://images.unsplash.com/photo-1575223970966-76ae61ee783c",
  DairyMilk: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c",
  KitKat: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c",
  FiveStar: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c",
  Munch: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c",
  Perk: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c",
  Ferrero: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c",
  Snickers: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c",
  Toblerone: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c",
  Muffin: "https://images.unsplash.com/photo-1571115177098-24ec42ed204d",
  Brownie: "https://images.unsplash.com/photo-1587314168485-3236d6710814",
  IceCream: "https://images.unsplash.com/photo-1563805042-7681c019e1b7",
  Cake: "https://images.unsplash.com/photo-1578985545062-69928b1d9587",
  Donut: "https://images.unsplash.com/photo-1551024601-bec78aea704b",
  Pastry: "https://images.unsplash.com/photo-1578985545062-69928b1d9587",

  // Bakery & Biscuits
  Oreo: "https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b",
  Marie: "https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b",
  Croissant: "https://images.unsplash.com/photo-1555507036-ab1f4038808a",
  Rusk: "https://images.unsplash.com/photo-1608198093002-ad4e005484ec",
  Toast: "https://images.unsplash.com/photo-1608198093002-ad4e005484ec",

  // Atta, Rice & Dal
  Rice: "https://images.unsplash.com/photo-1586201375761-83865001e31c",
  Atta: "https://images.unsplash.com/photo-1603048297172-c92544798d5a",
  Dal: "https://images.unsplash.com/photo-1615485737651-9a4cfa7e4d7e",
  Besan: "https://images.unsplash.com/photo-1615485737651-9a4cfa7e4d7e",
  Sooji: "https://images.unsplash.com/photo-1615485737651-9a4cfa7e4d7e",
  Maida: "https://images.unsplash.com/photo-1603048297172-c92544798d5a",
  Poha: "https://images.unsplash.com/photo-1586201375761-83865001e31c",
  Oats: "https://images.unsplash.com/photo-1586201375761-83865001e31c",
  Quinoa: "https://images.unsplash.com/photo-1586201375761-83865001e31c",

  // Masala, Oil & More
  Turmeric: "https://images.unsplash.com/photo-1615485737651-9a4cfa7e4d7e",
  RedChilli: "https://images.unsplash.com/photo-1615485737651-9a4cfa7e4d7e",
  Coriander: "https://images.unsplash.com/photo-1615485737651-9a4cfa7e4d7e",
  GaramMasala: "https://images.unsplash.com/photo-1615485737651-9a4cfa7e4d7e",
  Cumin: "https://images.unsplash.com/photo-1615485737651-9a4cfa7e4d7e",
  Mustard: "https://images.unsplash.com/photo-1615485737651-9a4cfa7e4d7e",
  Oil: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5",
  Ghee: "https://images.unsplash.com/photo-1584270354949-1e4eec7c2e54",

  // Sauces & Spreads
  Ketchup: "https://images.unsplash.com/photo-1594312915251-48db9280c8f1",
  Mayo: "https://images.unsplash.com/photo-1594312915251-48db9280c8f1",
  Jam: "https://images.unsplash.com/photo-1594312915251-48db9280c8f1",
  PeanutButter: "https://images.unsplash.com/photo-1594312915251-48db9280c8f1",
  Honey: "https://images.unsplash.com/photo-1594312915251-48db9280c8f1",
  HotSauce: "https://images.unsplash.com/photo-1594312915251-48db9280c8f1",
  SoySauce: "https://images.unsplash.com/photo-1594312915251-48db9280c8f1",

  // Chicken, Meat & Fish
  Chicken: "https://images.unsplash.com/photo-1604503468506-a8da13d82791",
  Mutton: "https://images.unsplash.com/photo-1604503468506-a8da13d82791",
  Fish: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2",
  Prawn: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2",

  // Organic & Healthy Living
  OrganicVeg: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea",
  OrganicFruit: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6",
  Nuts: "https://images.unsplash.com/photo-1594312915251-48db9280c8f1",
  Seeds: "https://images.unsplash.com/photo-1594312915251-48db9280c8f1",
  Protein: "https://images.unsplash.com/photo-1594312915251-48db9280c8f1",

  // Baby Care
  Diapers: "https://images.unsplash.com/photo-1585435557349-3b092031a4bf",
  BabyLotion: "https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d",
  BabyFood: "https://images.unsplash.com/photo-1585435557349-3b092031a4bf",
  BabyWipes: "https://images.unsplash.com/photo-1585435557349-3b092031a4bf",
  BabyShampoo: "https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d",
  BabyPowder: "https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d",

  // Pharma & Wellness
  Medicine: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae",
  Vitamin: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae",
  PainRelief: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae",
  FirstAid: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae",
  Sanitizer: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae",
  Mask: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae",

  // Cleaning Essentials
  Detergent: "https://images.unsplash.com/photo-1626806787461-102c1bfaaea1",
  FloorCleaner: "https://images.unsplash.com/photo-1626806787461-102c1bfaaea1",
  Dishwash: "https://images.unsplash.com/photo-1626806787461-102c1bfaaea1",
  GlassCleaner: "https://images.unsplash.com/photo-1626806787461-102c1bfaaea1",
  ToiletCleaner: "https://images.unsplash.com/photo-1626806787461-102c1bfaaea1",

  // Home & Office
  Tissue: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae",
  Paper: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae",
  Pen: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae",
  Notebook: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae",
  Battery: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae",
  Bulb: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae",

  // Personal Care
  Soap: "https://images.unsplash.com/photo-1600857062241-98e5dba7f214",
  Shampoo: "https://images.unsplash.com/photo-1631729371254-42c2892f0e6e",
  Conditioner: "https://images.unsplash.com/photo-1631729371254-42c2892f0e6e",
  FaceWash: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571",
  Moisturizer: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571",
  Sunscreen: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571",
  Deodorant: "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9",
  Perfume: "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9",
  Toothpaste: "https://images.unsplash.com/photo-1607613009821-a1f9d1c0154a",
  Toothbrush: "https://images.unsplash.com/photo-1607613009821-a1f9d1c0154a",
  Razor: "https://images.unsplash.com/photo-1607613009821-a1f9d1c0154a",
  SanitaryPads: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae",

  // Pet Care
  PetFood: "https://images.unsplash.com/photo-1561037404-61cd46aa615b",
  PetSnacks: "https://images.unsplash.com/photo-1561037404-61cd46aa615b",
  PetToy: "https://images.unsplash.com/photo-1561037404-61cd46aa615b",
  PetShampoo: "https://images.unsplash.com/photo-1561037404-61cd46aa615b",

  // Hookah/ Rolling Products
  RollingPaper: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae",
  HookahFlavor: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae",
  Charcoal: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae",

  // Tea, Coffee & Milk Drinks
  Tea: "https://images.unsplash.com/photo-1594631252845-29fc4cc8cde9",
  GreenTea: "https://images.unsplash.com/photo-1594631252845-29fc4cc8cde9",
  Coffee: "https://images.unsplash.com/photo-1442512595331-e89e73853f31",
  MilkDrink: "https://images.unsplash.com/photo-1563636619-e9143da7973b",
  Horlicks: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae",
  Bournvita: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae",

  // Chocolates
  DairyMilkSilk: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c",
  KitKat: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c",
  FiveStar: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c",
  Munch: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c",
  Perk: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c",

  // Indian Sweets
  GulabJamun: "https://images.unsplash.com/photo-1589118949245-7a4c3e5b7f1b",
  Jalebi: "https://images.unsplash.com/photo-1589118949245-7a4c3e5b7f1b",
  Rasgulla: "https://images.unsplash.com/photo-1589118949245-7a4c3e5b7f1b",
  Laddu: "https://images.unsplash.com/photo-1589118949245-7a4c3e5b7f1b",
  Barfi: "https://images.unsplash.com/photo-1589118949245-7a4c3e5b7f1b",

  // Frozen Foods
  FrozenVeg: "https://images.unsplash.com/photo-1586201375761-83865001e31c",
  FrozenParatha: "https://images.unsplash.com/photo-1586201375761-83865001e31c",
  FrozenSamosa: "https://images.unsplash.com/photo-1586201375761-83865001e31c",
  FrozenPizza: "https://images.unsplash.com/photo-1586201375761-83865001e31c",

  // Pasta & Noodles
  Maggi: "https://images.unsplash.com/photo-1586201375761-83865001e31c",
  Pasta: "https://images.unsplash.com/photo-1586201375761-83865001e31c",
  Noodles: "https://images.unsplash.com/photo-1586201375761-83865001e31c",
  Ramen: "https://images.unsplash.com/photo-1586201375761-83865001e31c",

  // Health & Fitness
  ProteinPowder: "https://images.unsplash.com/photo-1594312915251-48db9280c8f1",
  EnergyBar: "https://images.unsplash.com/photo-1594312915251-48db9280c8f1",
  Glucose: "https://images.unsplash.com/photo-1594312915251-48db9280c8f1",
  Electrolytes: "https://images.unsplash.com/photo-1594312915251-48db9280c8f1"
};

/* COMPLETE CATEGORIES - ALL BLINKIT CATEGORIES */
const categories = [
  { name: "Paan Corner", items: ["Paan", "Gutka", "Tobacco", "Elachi", "Mukhwas", "Saunf", "Supari"] },
  { name: "Dairy, Bread & Eggs", items: ["Milk", "Bread", "Butter", "Cheese", "Paneer", "Eggs", "Yogurt", "Cream", "Curd", "Lassi", "Buttermilk", "Ice Cream", "Ghee", "Butter Milk", "Flavoured Milk", "Condensed Milk"] },
  { name: "Fruits & Vegetables", items: ["Apple", "Banana", "Orange", "Mango", "Tomato", "Potato", "Onion", "Carrot", "Broccoli", "Spinach", "Grapes", "Watermelon", "Pineapple", "Pomegranate", "Kiwi", "Strawberry", "Lemon", "Capsicum", "Cabbage", "Cauliflower", "Brinjal", "Pumpkin", "Garlic", "Ginger", "Cucumber", "Beetroot", "Corn", "Mushroom", "Beans", "Peas", "Radish", "Ridge Gourd", "Bitter Gourd", "Bottle Gourd"] },
  { name: "Cold Drinks & Juices", items: ["Coca Cola", "Pepsi", "Sprite", "Fanta", "Orange Juice", "Apple Juice", "Mango Juice", "ThumsUp", "Mountain Dew", "Mirinda", "Limca", "Water Bottle", "Energy Drink", "Coconut Water", "Soda", "Tonic Water"] },
  { name: "Snacks & Munchies", items: ["Potato Chips", "Nachos", "Popcorn", "Namkeen", "Kurkure", "Bhujia", "Mixture", "Banana Chips", "Mathri", "Cheese Balls", "Corn Chips", "Cookies", "Biscuits", "Khakhra", "Thepla", "Chakli", "Sev", "Gathiya", "Farsan"] },
  { name: "Breakfast & Instant Food", items: ["Cereal", "Oats", "Cornflakes", "Upma Mix", "Poha", "Noodles", "Pasta", "Soup", "Instant Noodles", "Maggi", "Bread Spread", "Pancake Mix", "Idli Mix", "Dosa Mix", "Porridge"] },
  { name: "Sweet Tooth", items: ["Dairy Milk Silk", "KitKat", "5 Star", "Munch", "Perk", "Ferrero Rocher", "Snickers", "Toblerone", "Milkybar", "Milk Chocolate", "Dark Chocolate", "Candy", "Lollipop", "Muffin", "Brownie", "Ice Cream", "Cake", "Donut", "Pastry", "Gulab Jamun", "Jalebi", "Rasgulla", "Laddu", "Barfi"] },
  { name: "Bakery & Biscuits", items: ["Oreo Biscuits", "Marie Biscuits", "Cake", "Cookies", "Croissant", "Donut", "Muffin", "Brownie", "Pastry", "Bread", "Pav", "Rusk", "Toast", "Khari", "Cream Biscuits", "Digestive Biscuits"] },
  { name: "Tea, Coffee & Milk Drinks", items: ["Tea Leaves", "Green Tea", "Coffee Powder", "Instant Coffee", "Horlicks", "Bournvita", "Milk Powder", "Hot Chocolate", "Chai Masala", "Lemon Tea", "Herbal Tea", "Espresso"] },
  { name: "Atta, Rice & Dal", items: ["Basmati Rice", "Brown Rice", "Wheat Atta", "Toor Dal", "Moong Dal", "Chana Dal", "Besan", "Sooji", "Maida", "Poha", "Oats", "Quinoa", "Jowar Atta", "Bajra Atta", "Ragi Atta", "Masoor Dal", "Urad Dal"] },
  { name: "Masala, Oil & More", items: ["Turmeric Powder", "Red Chilli Powder", "Coriander Powder", "Garam Masala", "Cumin Seeds", "Mustard Seeds", "Cooking Oil", "Olive Oil", "Coconut Oil", "Mustard Oil", "Ghee", "Vanaspati", "Fenugreek", "Fennel Seeds", "Cardamom", "Cloves", "Cinnamon"] },
  { name: "Sauces & Spreads", items: ["Tomato Ketchup", "Mayonnaise", "Jam", "Peanut Butter", "Honey", "Hot Sauce", "Soy Sauce", "Chutney", "Pasta Sauce", "Pizza Sauce", "Cheese Spread", "Chocolate Spread"] },
  { name: "Chicken, Meat & Fish", items: ["Chicken Breast", "Chicken Leg", "Chicken Thigh", "Mutton", "Fish", "Prawns", "Eggs", "Crab", "Lamb", "Pork", "Sausages", "Bacon"] },
  { name: "Organic & Healthy Living", items: ["Organic Vegetables", "Organic Fruits", "Nuts", "Seeds", "Protein Powder", "Healthy Snacks", "Gluten Free", "Sugar Free", "Vegan Products", "Superfoods", "Chia Seeds", "Flax Seeds"] },
  { name: "Baby Care", items: ["Baby Diapers", "Baby Lotion", "Baby Food", "Baby Wipes", "Baby Shampoo", "Baby Powder", "Baby Soap", "Baby Oil", "Baby Cream", "Baby Cereal", "Baby Milk Powder"] },
  { name: "Pharma & Wellness", items: ["Medicine", "Vitamins", "Pain Relief Spray", "First Aid Kit", "Hand Sanitizer", "Face Mask", "Thermometer", "Bandages", "Cream", "Syrup", "Tablets", "Cough Drops"] },
  { name: "Cleaning Essentials", items: ["Detergent Powder", "Floor Cleaner", "Dishwash Liquid", "Glass Cleaner", "Toilet Cleaner", "Spray", "Broom", "Mop", "Dustbin", "Trash Bag", "Sponge", "Scrubber"] },
  { name: "Home & Office", items: ["Tissue Paper", "Paper Plate", "Pen", "Notebook", "Battery", "Light Bulb", "Candle", "Matches", "Stapler", "Glue", "Tape", "Scissors", "Sharpener", "Eraser"] },
  { name: "Personal Care", items: ["Bathing Soap", "Shampoo", "Conditioner", "Face Wash", "Moisturizer", "Sunscreen Lotion", "Deodorant", "Perfume", "Toothpaste", "Toothbrush", "Razor", "Sanitary Pads", "Hair Oil", "Body Lotion", "Lip Balm", "Nail Cutter", "Comb", "Hair Brush"] },
  { name: "Pet Care", items: ["Dog Food", "Cat Food", "Pet Snacks", "Pet Treats", "Pet Toy", "Pet Shampoo", "Pet Bed", "Leash", "Collar", "Litter Box", "Bird Food", "Fish Food"] },
  { name: "Hookah & Rolling", items: ["Rolling Paper", "Hookah Flavor", "Charcoal", "Filter Tips", "Pre Rolled Cones", "Hookah Base", "Hookah Hose", "Tobacco", "Herbal Mix"] },
  { name: "Frozen Foods", items: ["Frozen Peas", "Frozen Corn", "Frozen Mixed Veg", "Frozen Paratha", "Frozen Samosa", "Frozen Pizza", "Frozen Fries", "Frozen Nuggets", "Ice Cream", "Frozen Fruit"] },
  { name: "Chocolates & Candies", items: ["Dairy Milk", "KitKat", "5 Star", "Munch", "Perk", "Ferrero", "Snickers", "Toblerone", "Milkybar", "M&Ms", "Hershey's", "Candy", "Lollipop", "Gummy Bears", "Mint"] },
  { name: "Gourmet & World Food", items: ["Pasta", "Olive Oil", "Balsamic Vinegar", "Soy Sauce", "Wasabi", "Sushi", "Tortilla", "Salsa", "Hummus", "Pita Bread", "Falafel"] },
  { name: "Stationery & Craft", items: ["Pen", "Pencil", "Notebook", "Eraser", "Sharpener", "Scale", "Crayons", "Color Pencils", "Marker", "Highlighter", "Sticky Notes", "Tape", "Glue"] },
  { name: "Electronics", items: ["Charger", "Cable", "Power Bank", "Earphone", "Headphone", "Speaker", "USB Drive", "Mouse", "Keyboard", "Adapter"] },
  { name: "Gardening", items: ["Seeds", "Soil", "Fertilizer", "Pot", "Plant", "Watering Can", "Gardening Tools", "Gloves"] },
  { name: "Toys & Games", items: ["Action Figures", "Dolls", "Board Games", "Puzzle", "Cars", "Lego", "Soft Toys", "Remote Control", "Video Games"] },
  { name: "Books & Magazines", items: ["Fiction", "Non-Fiction", "Children Books", "Magazines", "Comics", "Cookbooks", "Self Help"] },
  { name: "Mouth Fresheners", items: ["Mint", "Saunf", "Mukhwas", "Breath Spray", "Chewing Gum", "Happydent", "Eclairs"] },
  { name: "Gifting", items: ["Gift Wrapper", "Gift Box", "Greeting Card", "Ribbon", "Gift Bag", "Tissue Paper"] },
  { name: "Festive & Party", items: ["Balloon", "Confetti", "Party Hat", "Candle", "Decorations", "Party Plates", "Party Cups"] }
];

/* FUNCTION TO GET IMAGE FOR PRODUCT */
function getProductImage(itemName, categoryName) {
  let key = itemName.split(" ")[0];
  
  const specialMappings = {
    "Coca Cola": "Coca",
    "Orange Juice": "Juice",
    "Apple Juice": "Juice",
    "Mango Juice": "Juice",
    "Potato Chips": "Chips",
    "Dairy Milk Silk": "DairyMilk",
    "Ferrero Rocher": "Ferrero",
    "Oreo Biscuits": "Oreo",
    "Marie Biscuits": "Marie",
    "Basmati Rice": "Rice",
    "Brown Rice": "Rice",
    "Wheat Atta": "Atta",
    "Toor Dal": "Dal",
    "Moong Dal": "Dal",
    "Chana Dal": "Dal",
    "Bathing Soap": "Soap",
    "Detergent Powder": "Detergent",
    "Floor Cleaner": "FloorCleaner",
    "Dishwash Liquid": "Dishwash",
    "Face Wash": "FaceWash",
    "Sunscreen Lotion": "Sunscreen",
    "Baby Diapers": "Diapers",
    "Baby Lotion": "BabyLotion",
    "Baby Food": "BabyFood",
    "Baby Wipes": "BabyWipes",
    "Dog Food": "PetFood",
    "Cat Food": "PetFood",
    "Ice Cream": "IceCream",
    "Frozen Peas": "FrozenVeg",
    "Tea Leaves": "Tea",
    "Coffee Powder": "Coffee",
    "Green Tea": "GreenTea",
    "Turmeric Powder": "Turmeric",
    "Red Chilli Powder": "RedChilli",
    "Coriander Powder": "Coriander",
    "Garam Masala": "GaramMasala",
    "Cooking Oil": "Oil",
    "Olive Oil": "Oil",
    "Coconut Oil": "Oil",
    "Tomato Ketchup": "Ketchup",
    "Mayonnaise": "Mayo",
    "Peanut Butter": "PeanutButter",
    "Rolling Paper": "RollingPaper",
    "Pre Rolled Cones": "RollingPaper",
    "Dairy Milk": "DairyMilk",
    "5 Star": "FiveStar",
    "Gulab Jamun": "GulabJamun",
    "Protein Powder": "ProteinPowder"
  };
  
  if (specialMappings[itemName]) {
    key = specialMappings[itemName];
  }
  
  return (productImages[key] || productImages["Milk"]) + "?auto=format&fit=crop&w=300&q=80";
}

/* GENERATE PRODUCTS - 3000+ ITEMS */
let products = [];

categories.forEach((category) => {
  // Generate 2-3 variants per item
  const variants = [1, 2];
  
  variants.forEach(variant => {
    category.items.forEach(item => {
      const price = Math.floor(Math.random() * 500) + 20;
      const originalPrice = price + Math.floor(Math.random() * 150);
      
      // Different quantities based on category
      let quantity = "1 pack";
      if (category.name === "Fruits & Vegetables") {
        quantity = ["250g", "500g", "1kg"][Math.floor(Math.random() * 3)];
      } else if (category.name === "Atta, Rice & Dal") {
        quantity = ["1kg", "2kg", "5kg"][Math.floor(Math.random() * 3)];
      } else if (category.name === "Masala, Oil & More") {
        quantity = ["100g", "200g", "500g", "1L"][Math.floor(Math.random() * 4)];
      } else if (category.name === "Personal Care") {
        quantity = ["100ml", "200ml", "50ml"][Math.floor(Math.random() * 3)];
      } else if (category.name === "Cold Drinks & Juices") {
        quantity = ["250ml", "500ml", "1L", "2L"][Math.floor(Math.random() * 4)];
      } else if (category.name === "Baby Care") {
        quantity = ["10 pcs", "20 pcs", "50 pcs"][Math.floor(Math.random() * 3)];
      } else if (category.name === "Chicken, Meat & Fish") {
        quantity = ["250g", "500g", "1kg"][Math.floor(Math.random() * 3)];
      }
      
      // Different delivery times
      const deliveryTimes = ["17 mins", "15 mins", "20 mins", "10 mins", "12 mins"];
      const deliveryTime = deliveryTimes[Math.floor(Math.random() * deliveryTimes.length)];
      
      products.push({
        name: `${item}${variant > 1 ? ` - Pack ${variant}` : ''}`,
        price: price,
        originalPrice: originalPrice,
        quantity: quantity,
        category: category.name,
        image: getProductImage(item, category.name),
        deliveryTime: deliveryTime,
        rating: (Math.random() * (5 - 3.5) + 3.5).toFixed(1),
        stock: Math.floor(Math.random() * 500) + 50,
        inStock: Math.random() > 0.05
      });
    });
  });
});

console.log(`📊 Generating ${products.length} products...`);

/* SEED FUNCTION */
async function seedProducts() {
  try {
    console.log("🚀 Seeding Products...\n");
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB Connected\n");
    await Product.deleteMany({});
    console.log("🧹 Old products removed\n");
    
    // Insert in batches for better performance
    const batchSize = 500;
    for (let i = 0; i < products.length; i += batchSize) {
      const batch = products.slice(i, i + batchSize);
      await Product.insertMany(batch);
      console.log(`   Inserted ${i + batch.length}/${products.length} products`);
    }
    
    console.log(`\n🎉 ${products.length} products inserted successfully!\n`);
    
    // Log statistics
    console.log("📊 Category-wise breakdown:");
    const categoryCount = {};
    products.forEach(p => {
      categoryCount[p.category] = (categoryCount[p.category] || 0) + 1;
    });
    Object.entries(categoryCount).forEach(([cat, count]) => {
      console.log(`   - ${cat}: ${count} products`);
    });
    
    console.log(`\n📈 Total Categories: ${Object.keys(categoryCount).length}`);
    console.log(`📈 Total Products: ${products.length}`);
    
    console.log("\n✅ Seeding completed successfully!");
    process.exit();
  } catch (error) {
    console.error("❌ Seeding failed");
    console.error(error);
    process.exit(1);
  }
}

seedProducts();