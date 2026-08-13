import { initNavigation } from "./navigation.js";
import { handleLocationChange } from "./router.js";
import { initGlow } from "./animation.js";
import { initGithub } from "./github/github.js";

initGlow();
initNavigation();
handleLocationChange();

document.addEventListener("page:loaded", () => {
    if (window.location.pathname === "/overview") {
        initGithub();
    }
});

// function initBloom() {
//     const section = document.getElementById("about-web");
//     const container = document.getElementById("home-content");
//     if (!section || !container) return;

//     let triggered = false;

//     function checkScroll() {
//         if (triggered) return;
//         const rect = section.getBoundingClientRect();
//         const containerRect = container.getBoundingClientRect();
//         if (rect.top < containerRect.bottom - 100) {
//             triggered = true;
//             section.classList.add("in-view");
//             container.removeEventListener("scroll", checkScroll);
//         }
//     }

//     checkScroll();
//     container.addEventListener("scroll", checkScroll, { passive: true });
// }
