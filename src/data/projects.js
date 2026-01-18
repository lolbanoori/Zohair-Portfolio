/**
 * Project Data Store
 * 
 * Defines the schema for all portfolio projects.
 * Used by the ProjectDetails dispatcher to load the correct template and data.
 * 
 * Schema:
 * @property {string} id - Unique URL slug (e.g., "dungeon-props").
 * @property {string} title - Display title.
 * @property {string} description - Brief summary.
 * @property {string} type - Template type ("Blender", "Unity", "VR").
 * @property {string} image - Hero/Atlas background image.
 * @property {string} videoUrl - Cinematic trailer URL.
 * @property {Array} features - (Blender Only) Categories for the Asset Gallery.
 */

// Import Images
import dungeonThumbnail from '../assets/dungeon-props/Thumbnail_Image_.png';
import dungeonTrailer from '../assets/dungeon-props/Cinematic Trailer/dummy_video.mp4';

// Category Thumbnails
import tablesThumb from '../assets/dungeon-props/Table & Chairs/Thumbnail_Table & Chairs.png';
import barrelsThumb from '../assets/dungeon-props/Barrels & Crates/Thumbnail_Barrels & Crates.png';
import chestsThumb from '../assets/dungeon-props/Chests/Thumbnail_Chests.png';
import scrollsThumb from '../assets/dungeon-props/Scrolls/Thumbnail_Scrolls.png';
import booksThumb from '../assets/dungeon-props/Books/Thumbnail_Books.png';
import treasureThumb from '../assets/dungeon-props/Treasure/Thumbnail_Treasure.png';
import utensilsThumb from '../assets/dungeon-props/Utensils/Thumbnail_Utensils.png';

export const projects = [
    {
        id: "dungeon-props",
        title: "Dungeon Props - Complete Asset Pack",
        description: "Complete pack of dungeon props for real-time applications and VR/AR projects. Each asset is fully game-ready, optimized for Unity, Unreal, and XR platforms.",
        type: "Blender",
        image: dungeonThumbnail,
        tools: ["Blender"],
        demoLink: "/projects/dungeon-props",
        isInternalLink: true,
        modelUrl: null,
        videoUrl: dungeonTrailer,
        features: [
            {
                category: "Tables & Chairs",
                image: tablesThumb,
                items: [
                    { name: "Table", image: "https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?auto=format&fit=crop&q=80&w=800" },
                    { name: "Chair", image: "https://images.unsplash.com/photo-1596162955779-9c927c02b339?auto=format&fit=crop&q=80&w=800" },
                    { name: "Stool", image: "https://images.unsplash.com/photo-1503602642458-23211144584b?auto=format&fit=crop&q=80&w=800" },
                    { name: "Bench", image: "https://images.unsplash.com/photo-1555699897-987820465345?auto=format&fit=crop&q=80&w=800" }
                ]
            },
            {
                category: "Barrels & Crates",
                image: barrelsThumb,
                items: [
                    { name: "Barrel", image: "https://images.unsplash.com/photo-1610444582845-a7b539f15049?auto=format&fit=crop&q=80&w=800" },
                    { name: "Bucket (Water)", image: "https://images.unsplash.com/photo-1527799820374-dcf8d9d4a3e9?auto=format&fit=crop&q=80&w=800" },
                    { name: "Large Crate", image: "https://images.unsplash.com/photo-1589362304975-d4e5eb3266bd?auto=format&fit=crop&q=80&w=800" },
                    { name: "Small Crate", image: "https://images.unsplash.com/photo-1590740050819-3f436e4f3a47?auto=format&fit=crop&q=80&w=800" }
                ]
            },
            {
                category: "Chests",
                image: chestsThumb,
                items: [
                    { name: "Large Chest", image: "https://images.unsplash.com/photo-1519074069444-1ba4fff9a09c?auto=format&fit=crop&q=80&w=800" },
                    { name: "Jewellery Chest", image: "https://images.unsplash.com/photo-1582201942988-13e60e4556ee?auto=format&fit=crop&q=80&w=800" }
                ]
            },
            {
                category: "Scrolls",
                image: scrollsThumb,
                items: [
                    { name: "Large", image: "https://images.unsplash.com/photo-1586551846467-33acb8f3621d?auto=format&fit=crop&q=80&w=800" },
                    { name: "Small", image: "https://images.unsplash.com/photo-1579781354189-a29fe497c270?auto=format&fit=crop&q=80&w=800" },
                    { name: "Sealed", image: "https://images.unsplash.com/photo-1577083552431-6e5fd01988ec?auto=format&fit=crop&q=80&w=800" },
                    { name: "Parchment", image: "https://images.unsplash.com/photo-1628155930542-3c7a64e2c833?auto=format&fit=crop&q=80&w=800" }
                ]
            },
            {
                category: "Books",
                image: booksThumb,
                items: [
                    { name: "Book Stack", image: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?auto=format&fit=crop&q=80&w=800" },
                    { name: "Ancient Tome", image: "https://images.unsplash.com/photo-1541963463532-d68292c34b19?auto=format&fit=crop&q=80&w=800" },
                    { name: "Grimoire", image: "https://images.unsplash.com/photo-1585146629732-44039d6785e5?auto=format&fit=crop&q=80&w=800" }
                ]
            },
            {
                category: "Treasure",
                image: treasureThumb,
                items: [
                    { name: "Gold Piles", image: "https://images.unsplash.com/photo-1620574387735-3624d75b2dbc?auto=format&fit=crop&q=80&w=800" },
                    { name: "Coins", image: "https://images.unsplash.com/photo-1634547466858-a90a294871e4?auto=format&fit=crop&q=80&w=800" },
                    { name: "Silver Plate", image: "https://images.unsplash.com/photo-1627585098048-ae9c9860471a?auto=format&fit=crop&q=80&w=800" },
                    { name: "Goblets", image: "https://images.unsplash.com/photo-1601614271032-45e69e0000a4?auto=format&fit=crop&q=80&w=800" },
                    { name: "Gems", image: "https://images.unsplash.com/photo-1617050587747-e23be293158c?auto=format&fit=crop&q=80&w=800" },
                    { name: "Necklace", image: "https://images.unsplash.com/photo-1599643478518-17488fbbcd75?auto=format&fit=crop&q=80&w=800" }
                ]
            },
            {
                category: "Utensils",
                image: utensilsThumb,
                items: [
                    { name: "Mugs", image: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?auto=format&fit=crop&q=80&w=800" },
                    { name: "Jug", image: "https://images.unsplash.com/photo-1602755255018-b2031a0e8822?auto=format&fit=crop&q=80&w=800" },
                    { name: "Bowl", image: "https://images.unsplash.com/photo-1567058236209-4171d1568285?auto=format&fit=crop&q=80&w=800" },
                    { name: "Spoon", image: "https://images.unsplash.com/photo-1619623830209-646a78465dc0?auto=format&fit=crop&q=80&w=800" }
                ]
            }
        ]
    }
];
