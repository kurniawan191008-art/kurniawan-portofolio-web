import { routes } from "./pages.js";
const mainContent = document.getElementById("main-content");
export async function loadPage(page) 

{

    const route = routes[page];

    if (!route) {
        mainContent.innerHTML = "<h1>404 - Page Not Found</h1>";
        console.error("Route tidak ditemukan");
        return;
    }
    try{

        const response = await fetch(route.file);

        if (!response.ok) {
            throw new Error(`file tidak ditemukan`);
        }
        const html = await response.text();
        mainContent.innerHTML = html;
        console.log(html.slice(0, 200));

    }catch (error) {
        mainContent.innerHTML = "<h1>500 - Internal Server Error</h1>";
        console.error(error);
        return;
    }
}
export async function navigate(page) {

    // console.log("navigate:", page);

    const route = routes[page];

    // console.log(route);

    if (!route) return;

    history.pushState({}, "", route.path);

    // console.log("sebelum loadPage");

    await loadPage(page);

    // console.log("sesudah loadPage");
}
export function handleLocationChange() {
    const path = window.location.pathname;
    console.log("handleLocationChange:", path);
    const page = Object.keys(routes).find(key => routes[key].path === path);
    console.log(page);
    if (page) {
        loadPage(page);
    } else {
        loadPage("404");
    }
}
