import { getUser, getRepos } from "./githubApi.js";
import GitHubCalendar from "github-calendar";

const USERNAME = "kurniawan191008-art";
const PROXY_URL = `https://api.bloggify.net/gh-calendar/?username=${USERNAME}`;

function setStat(selector, value) {
    const el = document.querySelector(
        `[data-stat="${selector}"] .github-stat-card__number`
    );
    if (el) el.textContent = value;
}

export async function initGithub() {
    const container = document.querySelector(".github-calendar");
    if (!container) return;

    const [user, repos] = await Promise.all([
        getUser().catch(() => null),
        getRepos().catch(() => null),
    ]);

    if (user) {
        setStat("repos", user.public_repos);

        const avatar = document.getElementById("github-avatar");
        const usernameLink = document.getElementById("github-username");
        if (avatar) {
            avatar.src = user.avatar_url;
            avatar.alt = user.login;
        }
        if (usernameLink) {
            usernameLink.textContent = `@${user.login}`;
            usernameLink.href = `https://github.com/${user.login}`;
        }
    }
    if (repos) {
        const totalStars = repos.reduce(
            (sum, r) => sum + r.stargazers_count,
            0
        );
        setStat("stars", totalStars);
    }

    try {
        const htmlPromise = fetch(PROXY_URL).then((r) => r.text());

        // Render graph via GitHubCalendar using same fetch
        GitHubCalendar(".github-calendar", USERNAME, {
            responsive: true,
            tooltips: true,
            global_stats: false,
            proxy: () => htmlPromise,
        });

        const html = await htmlPromise;
        const div = document.createElement("div");
        div.innerHTML = html;

        const heading = div.querySelector(
            "#js-contribution-activity-description"
        );
        if (heading) {
            const match = heading.textContent.trim().match(/(\d+)/);
            if (match) {
                setStat("contributions", match[1]);
            }
        }
    } catch (e) {
        console.error("GitHub calendar error:", e);
    }
}
