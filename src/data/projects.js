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

// Import Global Images
import dungeonThumbnail from '../assets/dungeon-props/Thumbnail_Image_.png';
import dungeonTrailer from '../assets/dungeon-props/Cinematic Trailer/dummy_video.mp4';

// --- CATEGORY THUMBNAILS ---
import tablesThumb from '../assets/dungeon-props/Table & Chairs/Thumbnail_Table & Chairs.png';
import barrelsThumb from '../assets/dungeon-props/Barrels & Crates/Thumbnail_Barrels & Crates.png';
import chestsThumb from '../assets/dungeon-props/Chests/Thumbnail_Chests.png';
import scrollsThumb from '../assets/dungeon-props/Scrolls/Thumbnail_Scrolls.png';
import booksThumb from '../assets/dungeon-props/Books/Thumbnail_Books.png';
import treasureThumb from '../assets/dungeon-props/Treasure/Thumbnail_Treasure.png';
import utensilsThumb from '../assets/dungeon-props/Utensils/Thumbnail_Utensils.png';

// --- ASSET IMPORTS (Render & Wireframe) ---

// 1. Tables & Chairs
import renderTable from '../assets/dungeon-props/Table & Chairs/Render_Table.png';
import wireTable from '../assets/dungeon-props/Table & Chairs/Wireframe_Table.png';
import renderChair from '../assets/dungeon-props/Table & Chairs/Render_Chair.png';
import wireChair from '../assets/dungeon-props/Table & Chairs/Wireframe_Chair.png';
import renderStool from '../assets/dungeon-props/Table & Chairs/Render_Stool.png';
import wireStool from '../assets/dungeon-props/Table & Chairs/Wireframe_Stool.png';
import renderBench from '../assets/dungeon-props/Table & Chairs/Render_Bench.png';
import wireBench from '../assets/dungeon-props/Table & Chairs/Wireframe_Bench.png';

// 2. Barrels & Crates
import renderBarrel from '../assets/dungeon-props/Barrels & Crates/Render_Barrel.png';
import wireBarrel from '../assets/dungeon-props/Barrels & Crates/Wireframe_Barrel.png';
import renderBucket from '../assets/dungeon-props/Barrels & Crates/Render_Bucket.png';
import wireBucket from '../assets/dungeon-props/Barrels & Crates/Wireframe_Bucket.png';
import renderLargeCrate from '../assets/dungeon-props/Barrels & Crates/Render_LargeCrate.png';
import wireLargeCrate from '../assets/dungeon-props/Barrels & Crates/Wireframe_LargeCrate.png';
import renderSmallCrate from '../assets/dungeon-props/Barrels & Crates/Render_SmallCrate.png';
import wireSmallCrate from '../assets/dungeon-props/Barrels & Crates/Wireframe_SmallCrate.png';

// 3. Chests
import renderLargeChest from '../assets/dungeon-props/Chests/Render_LargeChest.png';
import wireLargeChest from '../assets/dungeon-props/Chests/Wireframe_LargeChest.png';
import renderJewelChest from '../assets/dungeon-props/Chests/Render_JewelleryChest.png';
import wireJewelChest from '../assets/dungeon-props/Chests/Wireframe_JewelleryChest.png';
import renderTreasureChest from '../assets/dungeon-props/Chests/Render_TreasureChest.png';
import wireTreasureChest from '../assets/dungeon-props/Chests/Wireframe_TreasureChest.png';

// 4. Scrolls
import renderLargeScroll from '../assets/dungeon-props/Scrolls/Render_LargeScroll.png';
import wireLargeScroll from '../assets/dungeon-props/Scrolls/Wireframe_LargeScroll.png';
import renderSmallScroll from '../assets/dungeon-props/Scrolls/Render_SmallScroll.png';
import wireSmallScroll from '../assets/dungeon-props/Scrolls/Wireframe_SmallScroll.png';

// 5. Books
import renderBookStack from '../assets/dungeon-props/Books/Render_BookStack.png';
import wireBookStack from '../assets/dungeon-props/Books/Wireframe_BookStack.png';
import renderBook1 from '../assets/dungeon-props/Books/Render_Book1.png';
import wireBook1 from '../assets/dungeon-props/Books/Wireframe_Book1.png';
import renderBook2 from '../assets/dungeon-props/Books/Render_Book2.png';
import wireBook2 from '../assets/dungeon-props/Books/Wireframe_Book2.png';
import renderBook3 from '../assets/dungeon-props/Books/Render_Book3.png';
import wireBook3 from '../assets/dungeon-props/Books/Wireframe_Book3.png';
import renderBook4 from '../assets/dungeon-props/Books/Render_Book4.png';
import wireBook4 from '../assets/dungeon-props/Books/Wireframe_Book4.png';
import renderBook5 from '../assets/dungeon-props/Books/Render_Book5.png';
import wireBook5 from '../assets/dungeon-props/Books/Wireframe_Book5.png';
import renderBook6 from '../assets/dungeon-props/Books/Render_Book6.png';
import wireBook6 from '../assets/dungeon-props/Books/Wireframe_Book6.png';

// 6. Treasure
import renderHugeGold from '../assets/dungeon-props/Treasure/Render_HugeGoldPile.png';
import wireHugeGold from '../assets/dungeon-props/Treasure/Wireframe_HugeGoldPile.png';
import renderSmallGold from '../assets/dungeon-props/Treasure/Render_SmallGoldPile.png';
import wireSmallGold from '../assets/dungeon-props/Treasure/Wireframe_SmallGoldPile.png';
import renderSilverPlate from '../assets/dungeon-props/Treasure/Render_SilverPlate.png';
import wireSilverPlate from '../assets/dungeon-props/Treasure/Wireframe_SilverPlate.png';
import renderGoblet from '../assets/dungeon-props/Treasure/Render_Goblet.png';
import wireGoblet from '../assets/dungeon-props/Treasure/Wireframe_Goblet.png';
import renderRubyGoblet from '../assets/dungeon-props/Treasure/Render_RubyGoblet.png';
import wireRubyGoblet from '../assets/dungeon-props/Treasure/Wireframe_RubyGoblet.png';
import renderDiamond from '../assets/dungeon-props/Treasure/Render_Diamond.png';
import wireDiamond from '../assets/dungeon-props/Treasure/Wireframe_Diamond.png';
import renderOpal from '../assets/dungeon-props/Treasure/Render_Opal.png';
import wireOpal from '../assets/dungeon-props/Treasure/Wireframe_Opal.png';
import renderSapphire from '../assets/dungeon-props/Treasure/Render_Sapphire.png';
import wireSapphire from '../assets/dungeon-props/Treasure/Wireframe_Sapphire.png';
import renderRubyNecklace from '../assets/dungeon-props/Treasure/Render_RubyNecklace.png';
import wireRubyNecklace from '../assets/dungeon-props/Treasure/Wireframe_RubyNecklace.png';

// 7. Utensils
import renderFatMug from '../assets/dungeon-props/Utensils/Render_FatMug.png';
import wireFatMug from '../assets/dungeon-props/Utensils/Wireframe_FatMug.png';
import renderThinMug from '../assets/dungeon-props/Utensils/Render_ThinMug.png';
import wireThinMug from '../assets/dungeon-props/Utensils/Wireframe_ThinMug.png';
import renderJug from '../assets/dungeon-props/Utensils/Render_Jug.png';
import wireJug from '../assets/dungeon-props/Utensils/Wireframe_Jug.png';
import renderBowl from '../assets/dungeon-props/Utensils/Render_Bowl.png';
import wireBowl from '../assets/dungeon-props/Utensils/Wireframe_Bowl.png';
import renderSpoon from '../assets/dungeon-props/Utensils/Render_Spoon.png';
import wireSpoon from '../assets/dungeon-props/Utensils/Wireframe_Spoon.png';
import renderPlate from '../assets/dungeon-props/Utensils/Render_Plate.png';
import wirePlate from '../assets/dungeon-props/Utensils/Wireframe_Plate.png';


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
                    { name: "Table", image: renderTable, wireframe: wireTable },
                    { name: "Chair", image: renderChair, wireframe: wireChair },
                    { name: "Stool", image: renderStool, wireframe: wireStool },
                    { name: "Bench", image: renderBench, wireframe: wireBench }
                ]
            },
            {
                category: "Barrels & Crates",
                image: barrelsThumb,
                items: [
                    { name: "Barrel", image: renderBarrel, wireframe: wireBarrel },
                    { name: "Bucket (Water)", image: renderBucket, wireframe: wireBucket },
                    { name: "Large Crate", image: renderLargeCrate, wireframe: wireLargeCrate },
                    { name: "Small Crate", image: renderSmallCrate, wireframe: wireSmallCrate }
                ]
            },
            {
                category: "Chests",
                image: chestsThumb,
                items: [
                    { name: "Large Chest", image: renderLargeChest, wireframe: wireLargeChest },
                    { name: "Jewellery Chest", image: renderJewelChest, wireframe: wireJewelChest },
                    { name: "Treasure Chest", image: renderTreasureChest, wireframe: wireTreasureChest }
                ]
            },
            {
                category: "Scrolls",
                image: scrollsThumb,
                items: [
                    { name: "Large Scroll", image: renderLargeScroll, wireframe: wireLargeScroll },
                    { name: "Small Scroll", image: renderSmallScroll, wireframe: wireSmallScroll }
                ]
            },
            {
                category: "Books",
                image: booksThumb,
                items: [
                    { name: "Book Stack", image: renderBookStack, wireframe: wireBookStack },
                    { name: "Book I", image: renderBook1, wireframe: wireBook1 },
                    { name: "Book II", image: renderBook2, wireframe: wireBook2 },
                    { name: "Book III", image: renderBook3, wireframe: wireBook3 },
                    { name: "Book IV", image: renderBook4, wireframe: wireBook4 },
                    { name: "Book V", image: renderBook5, wireframe: wireBook5 },
                    { name: "Book VI", image: renderBook6, wireframe: wireBook6 }
                ]
            },
            {
                category: "Treasure",
                image: treasureThumb,
                items: [
                    { name: "Huge Gold Pile", image: renderHugeGold, wireframe: wireHugeGold },
                    { name: "Gold Coins", image: renderSmallGold, wireframe: wireSmallGold },
                    { name: "Silver Plate", image: renderSilverPlate, wireframe: wireSilverPlate },
                    { name: "Goblet", image: renderGoblet, wireframe: wireGoblet },
                    { name: "Ruby Goblet", image: renderRubyGoblet, wireframe: wireRubyGoblet },
                    { name: "Ruby Necklace", image: renderRubyNecklace, wireframe: wireRubyNecklace },
                    { name: "Diamond", image: renderDiamond, wireframe: wireDiamond },
                    { name: "Opal", image: renderOpal, wireframe: wireOpal },
                    { name: "Sapphire", image: renderSapphire, wireframe: wireSapphire }
                ]
            },
            {
                category: "Utensils",
                image: utensilsThumb,
                items: [
                    { name: "Fat Mug", image: renderFatMug, wireframe: wireFatMug },
                    { name: "Thin Mug", image: renderThinMug, wireframe: wireThinMug },
                    { name: "Jug", image: renderJug, wireframe: wireJug },
                    { name: "Bowl", image: renderBowl, wireframe: wireBowl },
                    { name: "Plate", image: renderPlate, wireframe: wirePlate },
                    { name: "Spoon", image: renderSpoon, wireframe: wireSpoon }
                ]
            }
        ]
    }
];
