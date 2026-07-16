import { handleLocationChange, navigate } from "./router.js";

export function initNavigation() {

    const folder = document.querySelector(".folder");
    const button = document.querySelector(".folder-btn");

    if (button && folder) {
        button.addEventListener("click", () => {
            folder.classList.toggle("show");
        });
    }

    const hamburger = document.getElementById("hamburger");
    const sidebar = document.getElementById("sidebar");

    if (hamburger && sidebar) {
        hamburger.addEventListener("click", () => {
            hamburger.classList.toggle("active");
            sidebar.classList.toggle("show");
        });

        sidebar.querySelectorAll("a[data-page]").forEach(link => {
            link.addEventListener("click", () => {
                hamburger.classList.remove("active");
                sidebar.classList.remove("show");
            });
        });
    }

    document.addEventListener("click", (event) => {
        if (sidebar && sidebar.classList.contains("show") && !sidebar.contains(event.target) && !hamburger.contains(event.target)) {
            hamburger.classList.remove("active");
            sidebar.classList.remove("show");
        }

        const pageLink = event.target.closest("[data-page]");
        if (pageLink) {
            event.preventDefault();
            navigate(pageLink.dataset.page);
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
}
