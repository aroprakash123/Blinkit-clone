const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const Product = require('../models/Product');

/* PRODUCT IMAGES (Stable Unsplash Links) */
const productImages = {
  // Dairy, Bread & Eggs
  Milk: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/da/cms-assets/cms/product/9e60fbd7-c8ec-435d-b64b-e82f8661d3bd.png",
  Bread: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=450/da/cms-assets/cms/product/4144f716-70e7-4bf0-ab61-3454d8d1fd5d.png",
  Butter: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=450/da/cms-assets/cms/product/613787ac-f983-4cfb-b534-e219c8d47b39.png",
  Cheese: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=450/da/cms-assets/cms/product/52377f0e-2ee1-4d3f-a0d6-f34934b71f0f.png",
  Paneer: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=450/da/cms-assets/cms/product/57907d31-1101-4387-baea-374cdb4e6bd6.png",
  Eggs: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=450/da/cms-assets/cms/product/eb04df97-d12d-492d-b869-829d756774a0.png",
  Yogurt: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=450/da/cms-assets/cms/product/2193ef66-aa68-4736-9467-4d0e6e2b1376.png",
  Cream: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=450/da/cms-assets/cms/product/c8761398-9abc-4d51-9f40-2cda28b9581f.png",
  Curd: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=450/da/cms-assets/cms/product/03baaad3-4c11-472a-b715-b87b4893260d.png",
  Lassi: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=450/da/cms-assets/cms/product/b4a29aa1-1585-451e-afee-130cd0c29849.png",
  Buttermilk: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=450/da/cms-assets/cms/product/76a28c0d-0821-40a3-9e5f-8f073ddc5694.png",
  CondensedMilk:"https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=360/da/cms-assets/cms/product/rc-upload-1772432402055-568.png",
  FlavouredMilk:"https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/da/cms-assets/cms/product/c786b5fe-e955-48f2-bf25-f30ebb7f9727.png",

  // Fruits & Vegetables
  Apple: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=360/da/cms-assets/cms/product/f490c9b4-7b4a-4dba-875b-337da787a281.png",
  Banana: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=360/da/cms-assets/cms/product/b89fe4bd-2018-4502-a80e-d8dc274955b8.png",
  Orange: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=360/da/cms-assets/cms/product/e284d5d5-bac3-4aa8-9df3-6413175730e0.png",
  Mango: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=360/da/cms-assets/cms/product/aaf460ce-7baa-4227-b9e2-422f13ba3b69.png",
  Tomato: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=360/da/cms-assets/cms/product/27a22d9c-469e-483d-bebf-7a2b1e86a64c.png",
  Potato: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=360/da/cms-assets/cms/product/097061a9-9b7e-4d7e-88d1-4e3f58fc51e0.png",
  Onion: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=360/da/cms-assets/cms/product/1b2ccf0a-2720-4828-b3f8-0ddaa4b6ff17.png",
  Carrot: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=450/da/cms-assets/cms/product/3de12ff4-882f-40c0-98d8-ff082ecdcf58.png",
  Broccoli: "https://instamart-media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,h_544,w_504/NI_CATALOG/IMAGES/CIW/2026/3/24/3017ee71-d809-44f2-8bb9-2dd8c4141c6d_1025_1.JPG",
  Spinach: "https://instamart-media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,h_544,w_504/7faac0b9ed58f4e7306646613d92a42a.png",
  Grapes: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=360/da/cms-assets/cms/product/ae7f1718-19cc-4334-9182-61ecfdf92cb0.png",
  Watermelon: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=360/da/cms-assets/cms/product/rc-upload-1772165621532-12.png",
  Pineapple: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=360/da/cms-assets/cms/product/7654ecdf-bd1d-4d0c-b6de-34e4dcc5e047.png",
  Pomegranate:"https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=450/da/cms-assets/cms/product/b19d2d54-65f3-4414-b2b8-954e2dddc9e7.png",
  Kiwi: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=450/da/cms-assets/cms/product/d354b145-e461-41ef-9a1e-e23e13612d19.png",
  Strawberry: "https://instamart-media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,h_544,w_504/NI_CATALOG/IMAGES/CIW/2026/3/25/37545d0f-8fbf-443b-a64c-4fa52fc9efeb_515988_1.png",
  Lemon: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=450/da/cms-assets/cms/product/2d79def7-60ff-4d91-a80d-c99112fd2639.png",
  Capsicum: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=450/da/cms-assets/cms/product/0908a205-26bf-4135-969a-9002b302069c.png",
  Cabbage: "https://instamart-media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,h_544,w_504/NI_CATALOG/IMAGES/ciw/2025/12/18/778dfcaa-c82d-4260-8c39-84568e7a95a9_9VMC2NN0US_MN_18122025.png",
  Cauliflower:"https://instamart-media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,h_544,w_504/NI_CATALOG/IMAGES/CIW/2026/3/24/ebcc6bec-d4a6-4d6e-8b11-6a53296a592d_1037_1.JPG",
  Brinjal: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=450/da/cms-assets/cms/product/49ac30ac-04bd-4e2e-b4bd-84f3594fe2ed.png",
  Pumpkin: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-892-892,pr-true,f-auto,q-40,dpr-2/cms/product_variant/10d92017-63d3-4ec1-adeb-e040cecdbe9b/Pumpkin-Green.jpeg",
  Garlic: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=450/da/cms-assets/cms/product/4fcbc1fe-5a04-465f-9558-7ea73e9f8b1f.png",
  Ginger: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=450/da/cms-assets/cms/product/e7c9461c-4a81-46cc-8215-5f9155026a6e.png",
  Cucumber: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-3000-3000,pr-true,f-auto,q-40,dpr-2/cms/product_variant/aa05ce3f-60b8-4332-b5f6-840ea3abe4cd/Cucumber-English.jpeg",
  Beetroot: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=450/da/cms-assets/cms/product/54f29f85-51ef-4f56-9d8a-e3c3fbb2109e.png",
  Corn: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=450/da/cms-assets/cms/product/0d9a1a24-6687-4e79-87a2-49cf11ebbd62.png",
  Mushroom: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=450/da/cms-assets/cms/product/9bc0b3fd-3aac-4f5f-a8f7-0c0b63cef1bb.png",
  Beans: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=450/da/cms-assets/cms/product/a6e9854e-4946-4f5d-bcb8-7abfa99ed9a8.png",
  Peas: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=450/da/cms-assets/cms/product/e4759283-cbb7-47d4-b854-ec69ae54893c.png",

  // Cold Drinks & Juices
  Coca: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=360/da/cms-assets/cms/product/rc-upload-1772682797673-118.png",
  Pepsi: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=360/da/cms-assets/cms/product/347cf10e-19e6-472d-b426-5a05891c5d84.png",
  Sprite: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=360/da/cms-assets/cms/product/rc-upload-1772682797673-127.png",
  Fanta: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=360/da/cms-assets/cms/product/rc-upload-1772682797673-145.png",
  Juice: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=450/da/cms-assets/cms/product/rc-upload-1773044527074-6.png",
  ThumsUp: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=360/da/cms-assets/cms/product/rc-upload-1770356946958-58.png",
  MountainDew: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=360/da/cms-assets/cms/product/aa76fc04-92f2-4a24-9950-23d8abaa57a9.png",
  Mirinda: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=450/da/cms-assets/cms/product/f089e1e5-639a-4fec-80a0-5e3f5ff953c3.png",
  Limca: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=450/da/cms-assets/cms/product/rc-upload-1772682797673-136.png",
  Water: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=450/da/cms-assets/cms/product/2faf253a-7e5b-4d53-9774-350add8d50b5.png",
  EnergyDrink:"https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=450/da/cms-assets/cms/product/rc-upload-1772003211466-46.png",

  // Snacks & Munchies
  Chips: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=450/da/cms-assets/cms/product/rc-upload-1776398906000-172.png",
  Nachos: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=450/da/cms-assets/cms/product/9dd553cd-086a-4a48-b60f-7224bde20bc7.png",
  Popcorn: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=450/da/cms-assets/cms/product/rc-upload-1773909116319-1034.png",
  Namkeen: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=450/da/cms-assets/cms/product/rc-upload-1776224931608-187.png",
  Kurkure: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=450/da/cms-assets/cms/product/61edcf2c-0371-4541-917c-866ac6f18b44.png",
  Bhujia: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=450/da/cms-assets/cms/product/68dfb1b6-44ef-45a8-a49e-abd290fc1829.png",
  Mixture: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=450/da/cms-assets/cms/product/c084c35e-73e8-42c9-af26-067d236d65ac.png",
  BananaChips:"https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=450/da/cms-assets/cms/product/725621bb-dbdb-40be-8683-34c8c87e7868.png",
  Mathri: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=450/da/cms-assets/cms/product/7b31f744-c71b-47d2-a49a-e0fdf9f4c25b.png",
  Cookies: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=450/da/cms-assets/cms/product/b68b12e9-8cd9-4ce7-ba9b-ab8bd02af27b.png",
  Biscuits: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=450/da/cms-assets/cms/product/rc-upload-1775457726381-231.png",
  Khakhra: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=450/da/cms-assets/cms/product/rc-upload-1775477947829-472.png",
  Thepla: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-4167-4167,pr-true,f-auto,q-40,dpr-2/cms/product_variant/2da8e30e-c9b7-42bb-b0d0-24a3d3cf4f0f/iD-Fresh-Methi-Thepla-Ready-To-Eat-.jpeg",

  // Sweet Tooth
  Chocolate: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=450/da/cms-assets/cms/product/rc-upload-1771595609969-1309.png",
  Candy: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=450/da/cms-assets/cms/product/57054f97-f774-4df7-af74-6f4621a1f647.png",
  Lollipop: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=450/da/cms-assets/cms/product/rc-upload-1774841859469-504.png",
  DairyMilk: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=360/da/cms-assets/cms/product/rc-upload-1774424113908-152.png",
  KitKat: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=360/da/cms-assets/cms/product/rc-upload-1772423114429-212.png",
  FiveStar: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=360/da/cms-assets/cms/product/rc-upload-1772169697746-55.png",
  Munch: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=360/da/cms-assets/cms/product/rc-upload-1776312707599-212.png",
  Perk: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=360/da/cms-assets/cms/product/rc-upload-1771600886677-803.png",
  Ferrero: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=360/da/cms-assets/cms/product/rc-upload-1776321270999-338.png",
  Snickers: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=450/da/cms-assets/cms/product/rc-upload-1776058612378-608.png",
  Toblerone: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=450/da/cms-assets/cms/product/be81d5b3-57f2-43aa-b962-b82899110b1a.png",
  Muffin: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=450/da/cms-assets/cms/product/35013418-67db-4401-9049-898cf62fbfee.png",
  Brownie: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=450/da/cms-assets/cms/product/ce1b3fb7-d513-4c8a-9cf4-17a4ca5456b1.png",
  IceCream: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=450/da/cms-assets/cms/product/b3a281d9-6bce-4151-a633-06e1ef2b4c15.png",
  Cake: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=450/da/cms-assets/cms/product/28b41781-aca9-4536-887d-83d388e09743.png",
  Donut: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=450/da/cms-assets/cms/product/07cdf18f-8c34-4991-8d80-6e19c2104611.png",
  Pastry: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1001-1001,pr-true,f-auto,q-40,dpr-2/cms/product_variant/e244455a-e421-4c35-84f5-b609dbaeffa2/Get-A-Way-Black-Forest-Ice-Cream-Pastry-Soft-Premium.jpeg",

  // Bakery & Biscuits
  Oreo: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=450/da/cms-assets/cms/product/rc-upload-1776337624447-174.png",
  Marie: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=450/da/cms-assets/cms/product/c5470f17-7b5c-4b99-bda4-1866424653e9.png",
  Croissant: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=450/da/cms-assets/cms/product/cd178cad-bd99-46c9-a0fa-66520fafc670.png",
  Rusk: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=450/da/cms-assets/cms/product/9192da32-319b-406a-8030-76e1000a8372.png",
  Toast: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=450/da/cms-assets/cms/product/e750b55d-d284-4e99-ae9a-2844c19e4b65.png",

  // Atta, Rice & Dal
  Rice: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=450/da/cms-assets/cms/product/381e1978-2bbf-4aa4-9251-9111fad05e9b.png",
  Atta: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=450/da/cms-assets/cms/product/rc-upload-1776471758958-226.png",
  Dal: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=450/da/cms-assets/cms/product/rc-upload-1771077457557-24.png",
  Besan: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=450/da/cms-assets/cms/product/rc-upload-1776471758958-15.png",
  Sooji: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=450/da/cms-assets/cms/product/1e90ba14-1c45-4cc8-944d-6090c9d9a441.png",
  Maida: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=450/da/cms-assets/cms/product/c2760781-1709-4eb4-82b3-7ebbda91fcbc.png",
  Poha: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=450/da/cms-assets/cms/product/fbe4abe0-6082-4dce-9eaa-2b0b1c3b50a4.png",
  Oats: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=450/da/cms-assets/cms/product/b686f1ce-2d75-46da-9493-ed5cec832ac7.png",
  Quinoa: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=4",

  // Masala, Oil & More
  Turmeric: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=360/da/cms-assets/cms/product/rc-upload-1771991783673-922.png",
  RedChilli: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=360/da/cms-assets/cms/product/9dea2d22-108f-4021-aeec-e95b4e271e16.png",
  Coriander: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=360/da/cms-assets/cms/product/434d863f-688f-41c2-b8c5-a84d9452e375.png",
  GaramMasala: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=360/da/cms-assets/cms/product/69a31956-f8d0-478e-ba19-64c61b2e4635.png",
  Cumin: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=360/da/cms-assets/cms/product/f4df29bb-1d61-476d-b771-58314a538778.png",
  Mustard: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=450/da/cms-assets/cms/product/761a05e6-1f52-40be-9bad-6b65190a2b23.png",
  Oil: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=360/da/cms-assets/cms/product/9aeb0ccc-6a54-43ff-ac9a-a8006b66cc27.png",
  Ghee: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=360/da/cms",

  // Sauces & Spreads
  Ketchup: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=450/da/cms-assets/cms/product/44ff1d2b-7c78-403e-ba93-0ab49f72e8e1.png",
  Mayo: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=450/da/cms-assets/cms/product/rc-upload-1775048805727-41.png",
  Jam: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=450/da/cms-assets/cms/product/rc-upload-1770013136174-289.png",
  PeanutButter: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=450/da/cms-assets/cms/product/rc-upload-1775446787912-343.png",
  Honey: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=450/da/cms-assets/cms/product/85f8e546-0b4e-4239-8007-f8a0db4a44cc.png",
  HotSauce: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=450/da/cms-assets/cms/product/9bda1c1c-e5c6-4a20-a809-c62a8effab0f.png",
  SoySauce: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=450/da/cms-assets/cms/product/f2e7792d-acfd-4b10-96a7-85d18f75b428.png",

  // Chicken, Meat & Fish
  Chicken: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=450/da/cms-assets/cms/product/6e127fad-f3f8-4d35-9a4c-420dc7025fc2.png",
  Mutton: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=450/da/cms-assets/cms/product/e530f970-f528-4c12-9730-62288eb8313a.png",
  Fish: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1500-1500,pr-true,f-auto,q-40,dpr-2/cms/product_variant/f069494d-cd2a-4601-861c-a669a662b278/Relish-Rohu-Curry-Cut-With-Head.jpeg",
  Prawn: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=450/da/cms-assets/cms/product/79725b12-0409-4f69-9cde-0924965a4e39.png",

  // Organic & Healthy Living
  OrganicVeg: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=450/da/cms-assets/cms/product/55b60fb8-ab99-491c-89df-08aa8959f060.png",
  OrganicFruit:"https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=450/da/cms-assets/cms/product/a285c923-5a02-459d-b4ca-51cec43ce9b6.png",
  Nuts: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=450/da/cms-assets/cms/product/rc-upload-1772432009525-364.png",
  ChiaSeeds: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=450/da/cms-assets/cms/product/5ec28702-42e1-4561-b354-850420d57576.png",
  Protein: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=450/da/cms-assets/cms/product/a275f1a2-7cdf-4e7c-a8cc-1df15d0f2d3a.png",
  HealthySnacks:"https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=360/da/cms-assets/cms/product/rc-upload-1773731588465-288.png",

  // Baby Care
  Diapers: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=360/da/cms-assets/cms/product/86066024-a504-46aa-a0ae-08809ad118ec.png",
  BabyLotion: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=450/da/cms-assets/cms/product/5993dc7a-0de3-4bd6-ae9a-259273308a86.png",
  BabyFood: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=450/da/cms-assets/cms/product/rc-upload-1770878460978-619.png",
  BabyWipes: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=450/da/cms-assets/cms/product/7233cb70-7480-41a3-9c7e-0e9ed5e068d9.png",
  BabyShampoo: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=450/da/cms-assets/cms/product/rc-upload-1771923717021-1126.png",
  BabyPowder: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=450/da/cms-assets/cms/product/81ceed87-4a3f-4ec0-a8e3-7b5c067d855c.png",

  // Pharma & Wellness
  Medicine: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=450/da/cms-assets/cms/product/024d874f-a94a-4b42-b78c-cf29e0574e4e.png",
  Vitamin: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=450/da/cms-assets/cms/product/ba8b22d0-95e2-42aa-8a2d-d3c7f291c9a3.png",
  PainReliefSpray: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=450/da/cms-assets/cms/product/c9b39795-ebd4-4b28-b9e6-e76f33558e45.png",
  FirstAid: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=450/da/cms-assets/cms/product/64d14ee6-c3e9-492a-ac86-44cb148c4ccd.png",
  HandSanitizer: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=450/da/cms-assets/cms/product/5e861d97-44d7-4cd5-a579-17d5b8933e63.png",
  Mask: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=450/da/cms",

  // Cleaning Essentials
  Detergent: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=450/da/cms-assets/cms/product/83ec4dd2-72f6-4c64-9a37-c38b32612db8.png",
  FloorCleaner: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=450/da/cms-assets/cms/product/69ddb2e0-cb3e-4f1a-87ec-1841b5214c48.png",
  Dishwash: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=450/da/cms-assets/cms/product/56c4f6bf-3b2b-4229-9c10-0fe0f6134072.png",
  GlassCleaner: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=450/da/cms-assets/cms/product/rc-upload-1772092271786-248.png",
  ToiletCleaner: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=450/da/cms-assets/cms/product/rc-upload-1772682797673-247.png",

  // Home & Office
  Tissue: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=450/da/cms-assets/cms/product/50200bc4-c772-4d60-95ac-761b71b2ffb0.png",
  Paper: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=450/da/cms-assets/cms/product/rc-upload-1771991783673-334.png",
  Pen: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=450/da/cms-assets/cms/product/rc-upload-1770096717878-270.png",
  Notebook: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=450/da/cms-assets/cms/product/2f2a6079-990a-4a26-8151-aa57ee34fbae.png",
  Battery: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=450/da/cms-assets/cms/product/12bab861-7b8a-44f8-8a74-88636c5f09b1.png",
  Bulb: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=450/da/cms-as",

  // Personal Care
  Soap: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=450/da/cms-assets/cms/product/92077089-b1a8-422a-ae62-89dc8ec76d24.png",
  Shampoo: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=450/da/cms-assets/cms/product/rc-upload-1771923717021-1559.png",
  Conditioner: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=450/da/cms-assets/cms/product/rc-upload-1771992965724-3385.png",
  FaceWash: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=450/da/cms-assets/cms/product/rc-upload-1770638287400-1139.png",
  Moisturizer: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=450/da/cms-assets/cms/product/28246ff4-a793-4e28-b8d4-7e6fbe6553b7.png",
  Sunscreen: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=450/da/cms-assets/cms/product/rc-upload-1775622045566-644.png",
  Deodorant: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=450/da/cms-assets/cms/product/ecf00862-7683-422e-b1e5-0d4002191c75.png",
  Perfume: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=450/da/cms-assets/cms/product/9ede30e0-98e1-451b-a212-e6577595b894.png",
  Toothpaste: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=450/da/cms-assets/cms/product/5bdc70bf-4b27-448e-8169-d17b26335b10.png",
  Toothbrush: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=450/da/cms-assets/cms/product/c7f9bbd9-1ae8-46b1-8078-a1720d80de5e.png",
  Razor: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=450/da/cms-assets/cms/product/489c81b4-3e58-4fc0-a892-c00d426e4bbf.png",
  SanitaryPads: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=450/da/cms-as",

  // Pet Care
  PetFood: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=450/da/cms-assets/cms/product/rc-upload-1773828136868-25.png",
  PetSnacks: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1021-1021,pr-true,f-auto,q-40,dpr-2/cms/product_variant/38568491-1569-4b9a-99ac-07c763176f65/Dogsee-Chew-Small-Bars.jpeg",
  PetToy: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1500-1500,pr-true,f-auto,q-40,dpr-2/cms/product_variant/cf43cec3-4bcf-4019-98cb-3f32e45ea9c7/Nootie-Squeaky-Toy-Multicolour.jpg",
  PetShampoo: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-3000-3000,pr-true,f-auto,q-40,dpr-2/cms/product_variant/c9e9b15d-6b82-4c27-8a4f-806f3674189d/Foodie-Puppies-Detangling-Shampoo-for-Dogs-and-Puppies.jpeg",

  // Hookah/ Rolling Products
  RollingPaper: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=450/da/cms-assets/cms/product/11cff76d-e1f4-45ad-85bd-b9c5e0539357.png",
  HookahFlavor: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-819-1024,pr-true,f-auto,q-40,dpr-2/cms/product_variant/46c54051-78b7-472f-b546-13070b4a06bce5dde7e6-c2c2-4f35-b55f-f82ae4a3b3df2023-11-16%2015:50:55.410713117%20+0000%20UTC%20m=+28838.074751864/Stash-Pro-Premium-Magic-Coal.jpg",
  Charcoal: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=45",

  // Tea, Coffee & Milk Drinks
  Tea: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=450/da/cms-assets/cms/product/c497a887-aadb-4fd4-a7d3-e3b5241adeb4.png",
  GreenTea: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=450/da/cms-assets/cms/product/rc-upload-1770013136174-404.png",
  Coffee: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=450/da/cms-assets/cms/product/36410997-f69f-4225-9acc-3ad80421a249.png",
  MilkDrink:"https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=450/da/cms-assets/cms/product/d991a261-ae1a-483f-8c1c-a25b4e1916bb.png",
  Horlicks: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=450/da/cms-assets/cms/product/3c868907-840f-4368-97e1-6836a883f101.png",
  Bournvita: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=450/da/cms-assets/cms/product/rc-upload-1774802324726-56.png",

  // Chocolates
  DairyMilkSilk: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=450/da/cms-assets/cms/product/rc-upload-1771841412291-319.png",
  KitKat: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=450/da/cms-assets/cms/product/rc-upload-1775015351734-115.png",
  FiveStar: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=450/da/cms-assets/cms/product/dc5ebc3e-9ba0-4c8a-97a4-5613b7f41ecc.png",
  Munch: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=450/da/cms-assets/cms/product/rc-upload-1771904678029-588.png",
  Perk: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=450/da/cms-assets/cms/product/51d43b78-e1d4-4f19-8a68-f7d3af9d5188.png",

  // Indian Sweets
  GulabJamun: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=450/da/cms-assets/cms/product/rc-upload-1775816565267-278.png",
  Jalebi: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1200-1200,pr-true,f-auto,q-40,dpr-2/cms/product_variant/db13f09d-c41a-4877-a52a-a737b3c131e9/Gits-Dessert-Mix-Jalebi-With-Maker.jpeg",
  Rasgulla: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=450/da/cms-assets/cms/product/rc-upload-1775816565267-264.png",
  Laddu: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=450/da/cms-assets/cms/product/rc-upload-1776238823132-944.png",
  Barfi: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=450/da/cms-assets/cms/product/688855d6-4ff5-4eba-9c2b-1000ce3bc03d.png",

  // Frozen Foods
  FrozenVeg: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=450/da/cms-assets/cms/product/47ce3df9-097d-4b98-957e-f1077591d019.png",
  FrozenParatha: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=450/da/cms-assets/cms/product/fa9dac22-8c06-448a-91aa-7fbfe7702c78.png",
  FrozenSamosa: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=450/da/cms-assets/cms/product/rc-upload-1771819828195-192.png",
  FrozenPizza: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=450/da/cms",

  // Pasta & Noodles
  Maggi: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=450/da/cms-assets/cms/product/rc-upload-1771553348655-939.png",
  Pasta: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=450/da/cms-assets/cms/product/rc-upload-1770025149490-240.png",
  Noodles: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=450/da/cms-assets/cms/product/rc-upload-1775107293742-1150.png",
  Ramen: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=45",

  // Health & Fitness
  ProteinPowder: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=450/da/cms-assets/cms/product/6b46a9c1-0d6f-4ecc-8a5b-36dfa433903d.png",
  EnergyBar: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=450/da/cms-assets/cms/product/rc-upload-1772169697746-873.png",
  Glucose: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=450/da/cms-assets/cms/product/rc-upload-1775816565267-375.png?bg_token=Colour%2Fsurface%2F00FFFFFF",
  Electrolytes: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=450/da/cms-assets/cms/product/rc-upload-1773287661476-351.png",

  //Paan Corner
  Paan:"https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/da/cms-assets/cms/product/30340a50-8a63-4003-9a6c-f76fb40e7e41.png",
  Elachi:"https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/da/cms-assets/cms/product/13d6bbf4-5529-4894-8e24-cb6b7bdac17b.png",
  Saunf:"https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/da/cms-assets/cms/product/41c5543e-b703-4614-acf4-cfeb5be61346.png",
  Supari:"https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/da/cms-assets/cms/product/a208f940-e9d1-4e27-9bb2-780d821c1534.png",
  Mukhwas:"https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/da/cms-assets/cms/product/42adad2f-205f-4af1-b787-b8f3484bdb4e.png",
};

/* COMPLETE CATEGORIES - ALL BLINKIT CATEGORIES */
const categories = [
  { name: "Paan Corner", items: ["Paan","Elachi", "Mukhwas", "Saunf", "Supari"] },
  { name: "Dairy, Bread & Eggs", items: ["Milk", "Bread", "Butter", "Cheese", "Paneer", "Eggs", "Yogurt", "Cream", "Curd", "Lassi", "Buttermilk", "Ice Cream", "Ghee", "Butter Milk", "FlavouredMilk", "CondensedMilk"] },
  { name: "Fruits & Vegetables", items: ["Apple", "Banana", "Orange", "Mango", "Tomato", "Potato", "Onion", "Carrot", "Broccoli", "Spinach", "Grapes", "Watermelon", "Pineapple", "Pomegranate", "Kiwi", "Strawberry", "Lemon", "Capsicum", "Cabbage", "Cauliflower", "Brinjal", "Pumpkin", "Garlic", "Ginger", "Cucumber", "Beetroot", "Corn", "Mushroom", "Beans", "Peas"] },
  { name: "Cold Drinks & Juices", items: ["Coca Cola", "Pepsi", "Sprite", "Fanta", "Apple Juice", "ThumsUp", "MountainDew", "Mirinda", "Limca", "Water Bottle", "EnergyDrink"] },
  { name: "Snacks & Munchies", items: ["Potato Chips", "Nachos", "Popcorn", "Namkeen", "Kurkure", "Bhujia", "Mixture", "BananaChips", "Mathri", "Cheese Balls", "Corn Chips", "Cookies", "Biscuits", "Khakhra", "Thepla"] },
  { name: "Breakfast & Instant Food", items: ["Oats",  "Poha", "Noodles", "Pasta", "Maggi", "Bread Spread"] },
  { name: "Sweet Tooth", items: ["Dairy Milk Silk", "KitKat", "5 Star", "Munch", "Perk", "Ferrero Rocher", "Snickers", "Toblerone", "Candy", "Lollipop", "Muffin", "Brownie", "Ice Cream", "Cake", "Donut", "Pastry", "Gulab Jamun", "Jalebi", "Rasgulla", "Laddu", "Barfi"] },
  { name: "Bakery & Biscuits", items: ["Oreo Biscuits", "Marie Biscuits", "Cake", "Cookies", "Croissant", "Donut", "Muffin", "Brownie", "Pastry", "Bread","Rusk", "Toast","Cream Biscuits"] },
  { name: "Tea, Coffee & Milk Drinks", items: ["Tea", "Green Tea", "Coffee Powder" ,"Horlicks", "Bournvita"] },
  { name: "Atta, Rice & Dal", items: ["Basmati Rice", "Brown Rice", "Wheat Atta", "Toor Dal", "Moong Dal", "Chana Dal", "Besan", "Sooji", "Maida", "Poha", "Oats"] },
  { name: "Masala, Oil & More", items: ["Turmeric Powder", "Red Chilli Powder", "Coriander Powder", "Garam Masala", "Cumin Seeds", "Mustard Seeds", "Cooking Oil"] },
  { name: "Sauces & Spreads", items: ["Tomato Ketchup", "Mayonnaise", "Jam", "Peanut Butter", "Honey",  "Pasta Sauce",  "Cheese Spread", "Chocolate Spread"] },
  { name: "Chicken, Meat & Fish", items: ["Chicken Breast", "Chicken Leg", "Chicken Thigh", "Mutton", "Fish", "Eggs"] },
  { name: "Organic & Healthy Living", items: ["OrganicVeg", "OrganicFruit", "Nuts", "ChiaSeeds", "Protein Powder", "HealthySnacks"] },
  { name: "Baby Care", items: ["Baby Diapers", "Baby Lotion", "Baby Food", "Baby Wipes"] },
  { name: "Pharma & Wellness", items: ["Medicine", "Vitamin", "PainReliefSpray", "FirstAid", "HandSanitizer"] },
  { name: "Cleaning Essentials", items: ["Detergent Powder", "Floor Cleaner", "Dishwash Liquid"] },
  { name: "Home & Office", items: ["Tissue Paper", "Paper Plate", "Pen", "Notebook", "Battery"] },
  { name: "Personal Care", items: ["Bathing Soap", "Shampoo", "Conditioner", "Face Wash", "Moisturizer", "Sunscreen Lotion", "Deodorant", "Perfume", "Toothpaste", "Toothbrush", "Razor"] },
  { name: "Pet Care", items: ["Dog Food", "Cat Food", "PetSnacks"] },
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
  
  const variants = [1];
  
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