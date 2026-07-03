import { navigate } from "./router.js";

export function initNavigation() {

    const folder = document.querySelector(".folder");
    const button = document.querySelector(".folder-btn");

    button.addEventListener("click", () => {
        folder.classList.toggle("show");
    });

    const menu = document.querySelector(".menu-list");

    menu.addEventListener("click", (event) => {

        const link = event.target.closest("[data-page]");

        if (!link) return;

        event.preventDefault();

        navigate(link.dataset.page);

    });

}