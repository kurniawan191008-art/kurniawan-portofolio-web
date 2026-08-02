const USERNAME = "kurniawan191008-art";

async function fetchJson(url) {
    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`HTTP Error ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error("Fetch Error:", error);
        return null;
    }
}

export function getUser() {
    return fetchJson(
        `https://api.github.com/users/${USERNAME}`
    );
}

export function getRepos() {
    return fetchJson(
        `https://api.github.com/users/${USERNAME}/repos?per_page=100`
    );
}

export function getRecentEvents(perPage = 30) {
    return fetchJson(
        `https://api.github.com/users/${USERNAME}/events/public?per_page=${perPage}`
    );
}


export function getContributions() {
    return fetchJson(
        `https://github-contributions-api.deno.dev/${USERNAME}.json`
    );
}