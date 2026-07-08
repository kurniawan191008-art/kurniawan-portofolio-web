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
            event.preventDefault(); // Nahan URL biar nggak berubah ditambahin #
            
            // Ambil ID target (misal "#about-web" jadi "about-web")
            const targetId = anchorLink.getAttribute("href").substring(1);
            
            if (targetId) { // Pastikan href nya nggak cuma "#" kosong
                const targetElement = document.getElementById(targetId);
                if (targetElement) {
                    // Scroll mulus ke target elemennya
                    targetElement.scrollIntoView({ behavior: "smooth" });
                }
            }
        }
    });

    window.addEventListener("popstate", handleLocationChange);
}