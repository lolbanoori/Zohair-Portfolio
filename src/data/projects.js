export const projects = [
    {
        id: 1,
        title: "Cyberpunk City",
        description: "A futuristic city environment created in Blender with procedural textures and volumetric lighting.",
        type: "Blender",
        image: "https://images.unsplash.com/photo-1615840287214-7ff58936c4cf?auto=format&fit=crop&q=80&w=800", // Placeholder
        tools: ["Blender", "Cycles", "Photoshop"],
        demoLink: "#",
        modelUrl: "/models/city.glb" // Placeholder path
    },
    {
        id: 2,
        title: "VR Escape Room",
        description: "An immersive VR puzzle game built with Unity and XR Interaction Toolkit.",
        type: "VR",
        image: "https://images.unsplash.com/photo-1592478411213-61535fdd861d?auto=format&fit=crop&q=80&w=800", // Placeholder
        tools: ["Unity", "C#", "Oculus SDK"],
        demoLink: "#",
        modelUrl: null
    },
    {
        id: 3,
        title: "Character Sculpt",
        description: "High-poly character sculpt for a fantasy RPG game.",
        type: "Blender",
        image: "https://images.unsplash.com/photo-1616499370260-485b3e5ed653?auto=format&fit=crop&q=80&w=800", // Placeholder
        tools: ["Blender", "ZBrush", "Substance Painter"],
        demoLink: "#",
        modelUrl: "/models/character.glb"
    },
    {
        id: 4,
        title: "Space Shooter WebGL",
        description: "A fast-paced arcade shooter playable in the browser.",
        type: "Unity",
        image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=800", // Placeholder
        tools: ["Unity", "WebGL", "C#"],
        demoLink: "#",
        modelUrl: null
    },
    {
        id: "dungeon-props",
        title: "Dungeon Attributes & Asset Pack",
        description: "A comprehensive library of modular assets designed for ease of use and maximum flexibility.",
        type: "Unity Asset",
        image: "/images/projects/dungeon/gallery/Thumbnail_chests.png",
        tools: ["Blender", "Unity", "Substance Painter"],
        demoLink: "#",
        videoUrl: "/images/projects/dungeon/trailer.mp4",
        features: [
            { category: "Tables & Chairs", items: ["Table", "Chair", "Stool", "Bench"] },
            { category: "Barrels & Crates", items: ["Barrel", "Bucket (With Water)", "Large Crate", "Small Crate"] },
            { category: "Chests", items: ["Large Chest", "Jewellery Chest"] },
            { category: "Scrolls", items: ["Large Scroll", "Small Scroll", "Sealed Scroll", "Parchment"] },
            { category: "Books", items: ["Books (6 Variations)", "Book Stack"] },
            { category: "Treasure", items: ["Small Gold Pile", "Huge Gold Pile", "Gold Coins (Face up & Face down)", "Silver Plate", "Goblet (Simple)", "Goblet (With Rubies)", "Diamond", "Sapphire", "Opal", "Gold-Ruby Necklace"] },
            { category: "Utensils", items: ["Large Mug", "Small Mug", "Jug", "Bowl", "Spoon"] }
        ],
        gallery: [
            { render: "/images/projects/dungeon/gallery/Thumbnail_chests.png", wireframe: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=1200&grayscale" },
            { render: "/images/projects/dungeon/gallery/Thumbnail_barrels.png", wireframe: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=1200&grayscale" },
            { render: "/images/projects/dungeon/gallery/Thumbnail_books.png", wireframe: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=1200&grayscale" },
            { render: "/images/projects/dungeon/gallery/Thumbnail_scrolls.png", wireframe: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=1200&grayscale" },
            { render: "/images/projects/dungeon/gallery/Thumbnail_table.png", wireframe: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=1200&grayscale" },
            { render: "/images/projects/dungeon/gallery/Thumbnail_treasure.png", wireframe: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=1200&grayscale" },
            { render: "/images/projects/dungeon/gallery/Thumbnail_utensils.png", wireframe: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=1200&grayscale" }
        ]
    }
];
