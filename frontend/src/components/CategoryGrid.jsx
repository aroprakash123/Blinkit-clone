import React from 'react';

const CategoryGrid = ({ activeCategory, setActiveCategory }) => {
  
  const categories = [
    "Paan Corner",
    "Dairy, Bread & Eggs",
    "Fruits & Vegetables",
    "Cold Drinks & Juices",
    "Snacks & Munchies",
    "Breakfast & Instant Food",
    "Sweet Tooth",
    "Bakery & Biscuits",
    "Tea, Coffee & Milk Drinks",
    "Atta, Rice & Dal",
    "Masala, Oil & More",
    "Sauces & Spreads",
    "Chicken, Meat & Fish",
    "Organic & Healthy Living",
    "Baby Care",
    "Pharma & Wellness",
    "Cleaning Essentials",
    "Home & Office",
    "Personal Care",
    "Pet Care"
  ];

  const categoryImages = {
    "Paan Corner": "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/layout-engine/2022-12/paan-corner_web.png",
    "Dairy, Bread & Eggs": "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=225/layout-engine/2022-11/Slice-2_10.png",
    "Fruits & Vegetables": "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=225/layout-engine/2022-11/Slice-3_9.png",
    "Cold Drinks & Juices": "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=225/layout-engine/2022-11/Slice-4_9.png",
    "Snacks & Munchies": "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=225/layout-engine/2022-11/Slice-5_4.png",
    "Breakfast & Instant Food": "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=225/layout-engine/2022-11/Slice-6_5.png",
    "Sweet Tooth": "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=225/layout-engine/2022-11/Slice-7_3.png",
    "Bakery & Biscuits": "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=225/layout-engine/2022-11/Slice-8_4.png",
    "Tea, Coffee & Milk Drinks":"https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=225/layout-engine/2025-11/Slice-7-1_0.png",
    "Atta, Rice & Dal": "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=225/layout-engine/2022-11/Slice-10.png",
    "Masala, Oil & More": "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=225/layout-engine/2022-11/Slice-11.png",
    "Sauces & Spreads": "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=225/layout-engine/2022-11/Slice-12.png",
    "Chicken, Meat & Fish": "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=225/layout-engine/2022-11/Slice-13.png",
    "Organic & Healthy Living": "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=225/layout-engine/2022-11/Slice-14.png",
    "Baby Care": "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=225/layout-engine/2022-11/Slice-15.png",
    "Pharma & Wellness": "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=225/layout-engine/2022-11/Slice-16.png",
    "Cleaning Essentials": "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=225/layout-engine/2022-11/Slice-17.png",
    "Home & Office": "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=225/layout-engine/2022-11/Slice-18.png",
    "Personal Care": "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=225/layout-engine/2022-11/Slice-19.png",
    "Pet Care": "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=225/layout-engine/2022-11/Slice-20.png"
  };

  const handleCategoryClick = (category) => {
    if (category) {
      const encodedCategory = encodeURIComponent(category);
      window.location.href = `/category/${encodedCategory}`;
    }
  };

  return (
    <div className="mt-6 px-2 sm:px-4 md:px-6">

      <div className="
        grid 
        grid-cols-3 
        sm:grid-cols-4 
        md:grid-cols-6 
        lg:grid-cols-8 
        xl:grid-cols-10 
        gap-3 sm:gap-4
      ">
        {categories.map((cat, idx) => {
          const displayImg = categoryImages[cat];
          
          return (
            <div
              key={idx}
              onClick={() => handleCategoryClick(cat)}
              className="flex flex-col items-center cursor-pointer group active:scale-95 transition-transform"
            >

              {/* ICON */}
              <div className="
                bg-[#f3f7fd] dark:bg-gray-800 
                w-[64px] h-[64px] 
                sm:w-[75px] sm:h-[75px] 
                md:w-[85px] md:h-[85px] 
                rounded-2xl flex items-center justify-center 
                mb-1 sm:mb-2 overflow-hidden p-2 
                group-hover:shadow dark:group-hover:shadow-gray-700
              ">
                <img
                  src={displayImg}
                  alt={cat}
                  className="w-full h-full object-contain"
                />
              </div>

              {/* TEXT */}
              <p className="
                text-[9px] 
                sm:text-[10px] 
                md:text-[12px] 
                font-semibold 
                text-gray-700 dark:text-gray-300 
                text-center leading-tight px-1 
                line-clamp-2
                group-hover:text-green-700 dark:group-hover:text-green-500
              ">
                {cat}
              </p>

            </div>
          );
        })}
      </div>

    </div>
  );
};

export default CategoryGrid;