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
