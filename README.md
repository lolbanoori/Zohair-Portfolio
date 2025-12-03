# Zohair - 3D Artist & VR Developer Portfolio

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-B73C92?style=for-the-badge&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Three.js](https://img.shields.io/badge/Three.js-black?style=for-the-badge&logo=three.js&logoColor=white)

**Live Demo:** [zohair-banoori-portfolio.vercel.app](https://zohair-banoori-portfolio.vercel.app)

My personal portfolio website showcasing my 3D art and VR development projects. This site uses a **Hybrid Architecture** to balance immersive 3D visuals with raw performance.

## Key Features

- **Hybrid Routing Architecture**: Combines a seamless Single Page Application (SPA) flow for the main content with dedicated routes for projects to ensure maximum WebGL performance.
- **Interactive 3D Hero**: A physics-based floating entry point rendered with **React Three Fiber**.
- **Performance Optimized**: Uses **Draco compression** for 3D assets and **Lazy Loading** for routes to maintain a high frame rate.
- **Smart Contact Form**: Integrated with **EmailJS** for auto-replies and instant notifications.
- **Responsive & Accessible**: Fully optimized for mobile, tablet, and desktop with dark/light mode support.

## Tech Stack

- **Core**: React (v18), Vite, React Router DOM
- **Styling**: Tailwind CSS
- **3D & Graphics**: Three.js, @react-three/fiber, @react-three/drei
- **Animation**: Framer Motion
- **Services**: EmailJS (Contact functionality)

## Installation & Setup

1. **Clone the repository:**
   ```
   git clone [https://github.com/lolbanoori/Zohair-Portfolio.git](https://github.com/lolbanoori/Zohair-Portfolio.git)
   cd Zohair-Portfolio
```

2. **Install dependencies:**
   ```bash
   npm install

3. **Configure Environment Variables:** Create a ```.env``` file in the root directory and add your EmailJS credentials:

Code snippet

VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
VITE_EMAILJS_TEMPLATE_NOTIFICATION_ID=your_notification_template_id
VITE_EMAILJS_TEMPLATE_AUTOREPLY_ID=your_autoreply_template_id
Start the development server:

Bash

npm run dev
Architecture Note
To prevent WebGL context loss and GPU overload, this project unmounts the heavy home screen 3D scene when navigating to individual project details. This allows heavy content (like Unity WebGL builds or Marmoset Viewers) to utilize 100% of available resources without crashing the browser.

License
This project is licensed under the MIT License.