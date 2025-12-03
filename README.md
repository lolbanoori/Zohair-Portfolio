# Zohair - 3D Artist & VR Developer Portfolio

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-B73C92?style=for-the-badge&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Three.js](https://img.shields.io/badge/Three.js-black?style=for-the-badge&logo=three.js&logoColor=white)

My personal portfolio website showcasing my 3D art and VR development projects and demonstrating my growth as a creator and developer.

This repository contains the source code for my portfolio, built to be an immersive digital showcase. 

## Features

- **Interactive 3D Hero Section**: A stunning entry point featuring floating 3D elements rendered with **React Three Fiber**.
- **Dynamic Project Showcase**: A filterable grid layout to display Blender, Unity, and VR projects, complete with detailed modals.
- **Smooth Animations**: Enhanced user experience with fluid transitions and micro-interactions using **Framer Motion** and **GSAP**.
- **Responsive Design**: Fully optimized for all devices, from large desktop screens to mobile phones.
- **Dark/Light Mode**: Built-in theme toggling support for user preference.
- **Modern UI/UX**: Clean, professional aesthetic with custom components and iconography from **Lucide React**.

## Tech Stack

- **Core**: [React](https://reactjs.org/) (v18), [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **3D & Graphics**: [Three.js](https://threejs.org/), [@react-three/fiber](https://docs.pmnd.rs/react-three-fiber), [@react-three/drei](https://github.com/pmndrs/drei)
- **Animations**: [Framer Motion](https://www.framer.com/motion/), [GSAP](https://gsap.com/)
- **Routing**: [React Router DOM](https://reactrouter.com/)
- **Icons**: [Lucide React](https://lucide.dev/)

## Getting Started

Follow these steps to set up the project locally on your machine.

### Prerequisites

- **Node.js** (v16 or higher)
- **npm** (v8 or higher)

### Installation

1.  **Clone the repository** (if applicable) or navigate to the project directory.
2.  **Install dependencies**:
    ```bash
    npm install
    ```

### Running Locally

Start the development server with hot-reload:
```bash
npm run dev
```
This will automatically open [http://localhost:5173](http://localhost:5173) in your default browser.

### Building for Production

Create an optimized production build:
```bash
npm run build
```
The output will be in the `dist` folder, ready for deployment.

### Previewing Production Build

Locally preview the production build:
```bash
npm run preview
```

## Project Structure

```text
src/
├── components/
│   ├── About/          # About section components
│   ├── Contact/        # Contact form and info
│   ├── Hero/           # 3D Hero section and Scene configuration
│   ├── Layout/         # Main layout wrapper, Navbar, Footer
│   └── Portfolio/      # Project grid and Project card components
├── data/
│   └── projects.js     # Data file for portfolio projects
├── App.jsx             # Main application component
├── main.jsx            # Entry point
└── index.css           # Global styles and Tailwind directives
```

## Customization

### Adding/Editing Projects
Navigate to `src/data/projects.js`. You can add new projects to the array following the existing structure:
```javascript
{
  id: 1,
  title: "Project Name",
  category: "VR", // or "3D Modeling", "Unity"
  image: "/path/to/image.jpg",
  description: "Project description...",
  tools: ["Unity", "C#"],
  link: "https://..."
}
```

### Changing the 3D Scene
The 3D scene is located in `src/components/Hero/Scene.jsx`. You can modify the `<Canvas>` elements or replace the 3D models used there.

### Styling & Colors
Global styles are in `src/index.css`. You can also customize the Tailwind theme configuration in `tailwind.config.js`.

## Deployment

This project is optimized for deployment on platforms like **Netlify**, **Vercel**, or **GitHub Pages**.

**Netlify/Vercel**:
1.  Connect your repository.
2.  Set the **Build Command** to `npm run build`.
3.  Set the **Publish Directory** to `dist`.

## License

This project is licensed under the MIT License.
