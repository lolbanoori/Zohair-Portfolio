import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
    const { pathname, hash } = useLocation();

    useEffect(() => {
        // If there's no hash, standard "scroll to top" for new pages
        if (!hash) {
            window.scrollTo(0, 0);
        }
        // If there IS a hash (e.g. /#about), try to find the element and scroll
        else {
            // Small timeout to allow the DOM to mount/update before scrolling
            const timer = setTimeout(() => {
                const id = hash.replace('#', '');
                const element = document.getElementById(id);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                }
            }, 100); // 100ms delay is usually sufficient for React to render

            return () => clearTimeout(timer);
        }
    }, [pathname, hash]);

    return null;
};

export default ScrollToTop;
