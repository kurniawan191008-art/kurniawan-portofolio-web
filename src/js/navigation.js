import { handleLocationChange, navigate } from "./router.js";

export function initNavigation() {

    const folder = document.querySelector(".folder");
    const button = document.querySelector(".folder-btn");

    if (button && folder) {
        button.addEventListener("click", () => {
            folder.classList.toggle("show");
        });
    }

    document.addEventListener("click", (event) => {

        // 1. Handle link untuk pindah halaman SPA (Router)
        const pageLink = event.target.closest("[data-page]");
        if (pageLink) {
            event.preventDefault();
            navigate(pageLink.dataset.page);
            return; // Berhenti di sini, jangan lanjut ke bawah
        }

        // 2. Handle link untuk dropdown / scroll section (Anchor / Hashtag)
        const anchorLink = event.target.closest('a[href^="#"]');
        if (anchorLink) {
            event.preventDefault(); 
            
            const targetId = anchorLink.getAttribute("href").substring(1);
            
            if (targetId) { 
                const targetElement = document.getElementById(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({ behavior: "smooth" });
                }
            }
        }
    });

    window.addEventListener("popstate", handleLocationChange);

    document.addEventListener('scroll', (event) => {
        if (event.target && event.target.id === 'about-page') {
            const aboutPage = event.target;
            const nav = document.getElementById('dynamic-nav');
            const placeholder = document.getElementById('nav-placeholder');

            if (nav && placeholder) {
                const placeholderRect = placeholder.getBoundingClientRect();
                const containerRect = aboutPage.getBoundingClientRect();
                
                const computedStyle = window.getComputedStyle(aboutPage);
                const paddingLeft = parseFloat(computedStyle.paddingLeft);
                const paddingRight = parseFloat(computedStyle.paddingRight);

                if (placeholderRect.top <= containerRect.top) {
                    nav.classList.add('is-stuck');
                    
                    // Titik ikat kiri (aman dari sidebar)
                    const exactLeft = containerRect.left + paddingLeft;
                    
                    // Titik ikat kanan (dihitung dari lebar layar dikurangi posisi kanan kontainer)
                    const rightOffset = window.innerWidth - containerRect.right + paddingRight;

                    nav.style.top = `${containerRect.top}px`;
                    nav.style.left = `${exactLeft}px`;
                    nav.style.right = `${rightOffset}px`;
                    nav.style.width = 'auto'; // Biar browser yang bentangkan otomatis
                    
                } else {
                    nav.classList.remove('is-stuck');
                    nav.style.top = 'auto';
                    nav.style.left = 'auto';
                    nav.style.right = 'auto';
                    nav.style.width = '100%'; 
                }
            }
        }
    }, true); 

    // Sesuaikan juga untuk event resize
    window.addEventListener('resize', () => {
        const nav = document.getElementById('dynamic-nav');
        const aboutPage = document.getElementById('about-page');
        
        if (nav && aboutPage && nav.classList.contains('is-stuck')) {
            const containerRect = aboutPage.getBoundingClientRect();
            const computedStyle = window.getComputedStyle(aboutPage);
            const paddingLeft = parseFloat(computedStyle.paddingLeft);
            const paddingRight = parseFloat(computedStyle.paddingRight);
            
            const exactLeft = containerRect.left + paddingLeft;
            const rightOffset = window.innerWidth - containerRect.right + paddingRight;

            nav.style.top = `${containerRect.top}px`;
            nav.style.left = `${exactLeft}px`;
            nav.style.right = `${rightOffset}px`;
            nav.style.width = 'auto';
        }
    });
}