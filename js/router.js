import { routes } from "./pages.js";
const mainContent = document.getElementById("main-content");
const FALLBACK_404_HTML = "<h1>404 - Page Not Found</h1>";
async function notFound(){
    const notFoundRoute = routes["404"];
    if (!notFoundRoute) {
        try{
            const response = await fetch(notFoundRoute.file);
            const html = await response.text();
            const fileMissing = !response.ok || html.includes('id="main-content"');
            if(!fileMissing){
                mainContent.innerHTML = html;
                return;
            }
            console.error("pages/404.html tidak ditemukan atau tidak valid");
        }catch (error) {
            console.error(error)
        }
    }
    mainContent.innerHTML = FALLBACK_404_HTML
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
        // if (!response.ok) {
        //     throw new Error(`file tidak ditemukan`);
        // }
        // const html = await response.text();
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
    const path = route ? route.path : '/${page}';
    history.pushState({}, "", route.path);
    await loadPage(page);
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
