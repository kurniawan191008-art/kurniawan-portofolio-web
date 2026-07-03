import { routes } from "./pages.js";
const mainContent = document.getElementById("main-content");
export async function loadPage(page) {

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

    }catch (error) {
        mainContent.innerHTML = "<h1>500 - Internal Server Error</h1>";
        console.error(error);
        return;
    }
}
