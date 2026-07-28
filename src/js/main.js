import { initNavigation } from "./navigation.js";
import { handleLocationChange } from "./router.js";
import { initGlow } from "./animation.js";
// import { initGithubData } from "./github.js";
initGlow();
initNavigation();
handleLocationChange();
// initGithubData();

