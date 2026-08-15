import { handleLocationChange, navigate } from "./router.js";

function setActive(page) {
    document.querySelectorAll(".nav-bar a[data-page]").forEach((link) => {
        link.classList.toggle("active", link.dataset.page === page);
    });
}

export function initNavigation() {

    const folder = document.querySelector(".folder");
    const button = document.querySelector(".folder-btn");

    if (button && folder) {
        button.addEventListener("click", () => {
            folder.classList.toggle("show");
        });
    }

    document.addEventListener("click", (event) => {

        const pageLink = event.target.closest("[data-page]");
        if (pageLink) {
            event.preventDefault();
            const page = pageLink.dataset.page;
            navigate(page);
            setActive(page);
            return;
        }

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

    document.addEventListener("page:loaded", (e) => {
        setActive(e.detail.page);
    });

}