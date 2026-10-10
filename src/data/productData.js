const products = [
    {
        id: 1,
        slug: "lavender-cotton-kurti",
        name: "Lavender Cotton Kurti",
        category: "Women",
        subcategory: "Kurti",
        badge: "BEST SELLER",
        price: 1499,
        originalPrice: 1899,
        rating: 4.9,
        reviews: 126,
        stock: 18,
        sizes: ["S", "M", "L", "XL"],
        colors: [
            { name: "Lavender", code: "#C8B6FF" },
            { name: "Black", code: "#000000" },
            { name: "White", code: "#FFFFFF" }
        ],
        material: "100% Cotton",
        fit: "Regular Fit",
        washCare: "Machine Wash Cold",
        description:
            "Premium breathable cotton kurti designed for everyday elegance and comfort.",
        images: [
            "https://picsum.photos/700/900?random=1",
            "https://picsum.photos/700/900?random=2",
            "https://picsum.photos/700/900?random=3",
            "https://picsum.photos/700/900?random=4"
        ]
    },

    {
        id: 2,
        slug: "floral-maxi-dress",
        name: "Floral Maxi Dress",
        category: "Women",
        subcategory: "Maxi",
        badge: "NEW",
        price: 1799,
        originalPrice: 2199,
        rating: 4.8,
        reviews: 92,
        stock: 20,
        sizes: ["S", "M", "L"],
        colors: [
            { name: "Pink", code: "#F7A8B8" },
            { name: "White", code: "#FFFFFF" }
        ],
        material: "Rayon",
        fit: "Relaxed Fit",
        washCare: "Machine Wash",
        description:
            "Elegant floral maxi dress for casual and festive occasions.",
        images: [
            "https://picsum.photos/700/900?random=5",
            "https://picsum.photos/700/900?random=6",
            "https://picsum.photos/700/900?random=7",
            "https://picsum.photos/700/900?random=8"
        ]
    },

    {
        id: 3,
        slug: "printed-short-top",
        name: "Printed Short Top",
        category: "Women",
        subcategory: "Short Tops",
        badge: "TRENDING",
        price: 999,
        originalPrice: 1299,
        rating: 4.7,
        reviews: 84,
        stock: 25,
        sizes: ["S", "M", "L", "XL"],
        colors: [
            { name: "Black", code: "#000000" },
            { name: "White", code: "#FFFFFF" }
        ],
        material: "Cotton",
        fit: "Slim Fit",
        washCare: "Machine Wash",
        description:
            "Soft premium cotton short top with stylish modern print.",
        images: [
            "https://picsum.photos/700/900?random=9",
            "https://picsum.photos/700/900?random=10",
            "https://picsum.photos/700/900?random=11",
            "https://picsum.photos/700/900?random=12"
        ]
    },

    {
        id: 4,
        slug: "kids-party-frock",
        name: "Kids Party Frock",
        category: "Kids",
        subcategory: "Frocks",
        badge: "BEST SELLER",
        price: 1199,
        originalPrice: 1499,
        rating: 4.9,
        reviews: 63,
        stock: 15,
        sizes: ["2Y", "4Y", "6Y", "8Y"],
        colors: [
            { name: "Lavender", code: "#C8B6FF" },
            { name: "Pink", code: "#F7A8B8" }
        ],
        material: "Cotton Blend",
        fit: "Regular Fit",
        washCare: "Machine Wash",
        description:
            "Beautiful premium kids frock perfect for birthdays and parties.",
        images: [
            "https://picsum.photos/700/900?random=13",
            "https://picsum.photos/700/900?random=14",
            "https://picsum.photos/700/900?random=15",
            "https://picsum.photos/700/900?random=16"
        ]
    },

    {
        id: 5,
        slug: "elegant-women-co-ord-set",
        name: "Elegant Women Co-ord Set",
        category: "Women",
        subcategory: "Co-ord Set",
        badge: "TRENDING",
        price: 2199,
        originalPrice: 2999,
        rating: 4.7,
        reviews: 85,
        stock: 16,
        sizes: ["S", "M", "L", "XL"],
        colors: [
            { name: "Beige", code: "#D8C3A5" },
            { name: "Black", code: "#000000" }
        ],
        material: "Cotton Blend",
        fit: "Relaxed Fit",
        washCare: "Machine Wash",
        description:
            "Modern women's co-ord set designed for a stylish and comfortable look.",
        images: [
            "https://picsum.photos/700/900?random=17",
            "https://picsum.photos/700/900?random=18",
            "https://picsum.photos/700/900?random=19",
            "https://picsum.photos/700/900?random=20"
        ]
    },

    {
        id: 6,
        slug: "traditional-ethnic-anarkali",
        name: "Traditional Ethnic Anarkali",
        category: "Women",
        subcategory: "Ethnic Wear",
        badge: "BEST SELLER",
        price: 2499,
        originalPrice: 3499,
        rating: 4.8,
        reviews: 112,
        stock: 12,
        sizes: ["S", "M", "L", "XL"],
        colors: [
            { name: "Maroon", code: "#800000" },
            { name: "Green", code: "#356859" }
        ],
        material: "Rayon",
        fit: "Regular Fit",
        washCare: "Dry Clean",
        description:
            "Elegant traditional ethnic wear designed for festive occasions.",
        images: [
            "https://picsum.photos/700/900?random=21",
            "https://picsum.photos/700/900?random=22",
            "https://picsum.photos/700/900?random=23",
            "https://picsum.photos/700/900?random=24"
        ]
    },

    {
        id: 7,
        slug: "kids-casual-co-ord-set",
        name: "Kids Casual Co-ord Set",
        category: "Kids",
        subcategory: "Co-ord",
        badge: "NEW",
        price: 1299,
        originalPrice: 1799,
        rating: 4.4,
        reviews: 67,
        stock: 18,
        sizes: ["2Y", "4Y", "6Y", "8Y"],
        colors: [
            { name: "Blue", code: "#6FA8DC" },
            { name: "Yellow", code: "#F4D35E" }
        ],
        material: "Cotton",
        fit: "Regular Fit",
        washCare: "Machine Wash",
        description:
            "Comfortable kids co-ord set for everyday casual wear.",
        images: [
            "https://picsum.photos/700/900?random=25",
            "https://picsum.photos/700/900?random=26",
            "https://picsum.photos/700/900?random=27",
            "https://picsum.photos/700/900?random=28"
        ]
    },

    {
        id: 8,
        slug: "kids-ethnic-festive-wear",
        name: "Kids Ethnic Festive Wear",
        category: "Kids",
        subcategory: "Ethnic Wear",
        badge: "FESTIVE",
        price: 1599,
        originalPrice: 2199,
        rating: 4.7,
        reviews: 78,
        stock: 14,
        sizes: ["2Y", "4Y", "6Y", "8Y"],
        colors: [
            { name: "Red", code: "#C0392B" },
            { name: "Gold", code: "#D4AF37" }
        ],
        material: "Cotton Blend",
        fit: "Regular Fit",
        washCare: "Dry Clean",
        description:
            "Festive ethnic wear for kids with a comfortable premium finish.",
        images: [
            "https://picsum.photos/700/900?random=29",
            "https://picsum.photos/700/900?random=30",
            "https://picsum.photos/700/900?random=31",
            "https://picsum.photos/700/900?random=32"
        ]
    }
];

export default products;