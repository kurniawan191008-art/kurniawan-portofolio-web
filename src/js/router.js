import { routes } from "./pages.js";
const mainContent = document.getElementById("main-content");
const FALLBACK_404_HTML = "<h1>404 - Page Not Found</h1>";
async function notFound() {
    const notFoundRoute = routes["404"];
    if (notFoundRoute) {
        try {
            const response = await fetch(notFoundRoute.file);
            if (response.ok) {
                mainContent.innerHTML = await response.text();
                return;
            }
        } catch (error) {
            console.error(error);
        }
    }
    mainContent.innerHTML = FALLBACK_404_HTML;

}
export async function loadPage(page) 
{
    const route = routes[page];
    if (!route) {
        console.error("route tidak ditemukan", page);
        await notFound();
        return;
    }
    try{
        const response = await fetch(route.file);
        const html = await response.text()
        const fileMissing = !response.ok || html.includes('id="main-parent"');
            if(fileMissing){
                console.error("file not found:", route.file);
                await notFound();
                return;
            }
        mainContent.innerHTML = html;
        console.log(html.slice(0, 200));
    }catch (error) {
        mainContent.innerHTML = "<h1>500 - Internal Server Error</h1>";
        console.error(error);
        return;
    }
}
export async function navigate(page) {

    const route = routes[page];
    if (!route) {
        history.pushState({}, "", `/${page}`);
        await notFound();
        return;
    }
    history.pushState(
        { page },
        "",
        route.path
    );
    await loadPage(page);
}
export function handleLocationChange() {
    const path = window.location.pathname;
    console.log("handleLocationChange:", path);
    const page = Object.keys(routes).find(key => routes[key].path === path);
    console.log(page);
    loadPage(page)
}
