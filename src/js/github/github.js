import { getUser, getRepos, getRecentEvents } from "./githubApi.js";
import GitHubCalendar from "github-calendar";

const USERNAME = "kurniawan191008-art";
const PROXY_URL = `https://proxy.cors.sh/https://github.com/users/${USERNAME}/contributions`;

function setStat(selector, value) {
    const el = document.querySelector(
        `[data-stat="${selector}"] .github-stat-card__number`
    );
    if (el) el.textContent = value;
}

function fillProfileField(id, value) {
    const el = document.getElementById(id);
    if (!el) return;
    if (value) {
        el.textContent = value;
        el.style.display = "";
    } else {
        el.style.display = "none";
    }
}

const LANGUAGE_COLORS = {
    JavaScript: "#f1e05a",
    TypeScript: "#3178c6",
    HTML: "#e34c26",
    CSS: "#563d7c",
    Python: "#3572a5",
    Java: "#b07219",
    "C++": "#f34b7d",
    C: "#555555",
    CSharp: "#178600",
    PHP: "#4f5d95",
    Shell: "#89e051",
    Go: "#00add8",
    Rust: "#dea584",
    Ruby: "#701516",
    Kotlin: "#a97bff",
    Swift: "#f05138",
    Vue: "#41b883",
    "SCSS": "#c6538c",
    Dart: "#00b4ab",
    Elixir: "#6e4a7e",
};

function languageColor(lang) {
    return lang && LANGUAGE_COLORS[lang] ? LANGUAGE_COLORS[lang] : "#7c6f64";
}

function escapeHtml(str) {
    const div = document.createElement("div");
    div.textContent = str;
    return div.innerHTML;
}

const MAX_REPOS_SHOWN = 6;

function renderRepos(repos) {
    const container = document.getElementById("repo-list");
    if (!container || !repos || repos.length === 0) return;

    const sorted = [...repos].sort(
        (a, b) => new Date(b.updated_at) - new Date(a.updated_at)
    );

    const shown = sorted.slice(0, MAX_REPOS_SHOWN);

    const viewAllLink =
        repos.length > MAX_REPOS_SHOWN
            ? `<a href="https://github.com/${USERNAME}?tab=repositories" target="_blank" rel="noopener noreferrer" class="btn btn--primary repo-view-all">View all on GitHub</a>`
            : "";

    container.innerHTML =
        shown
            .map(
                (repo) => `
            <a href="${escapeHtml(repo.html_url)}" target="_blank" rel="noopener noreferrer" class="repo-card">
                <h3 class="repo-card__name">${escapeHtml(repo.name)}</h3>
                <p class="repo-card__desc">${repo.description
                        ? escapeHtml(repo.description)
                        : "No description"
                    }</p>
                <div class="repo-card__meta">
                    ${repo.language
                        ? `<span class="repo-card__lang"><span class="repo-card__dot" style="background-color: ${languageColor(
                            repo.language
                        )}"></span>${escapeHtml(repo.language)}</span>`
                        : ""
                    }
                    <span class="repo-card__stars"><svg class="repo-card__icon"><use href="src/assets/icon/sprite.svg#star-icon"></use></svg>${repo.stargazers_count}</span>
                    <span class="repo-card__forks"><svg class="repo-card__icon"><use href="src/assets/icon/sprite.svg#git-fork-icon"></use></svg>${repo.forks_count}</span>
                </div>
            </a>
        `
            )
            .join("") + viewAllLink;
}

const MAX_ACTIVITY_ITEMS = 1;

function timeAgo(iso) {
    const date = new Date(iso);
    const diff = Date.now() - date.getTime();
    const min = Math.floor(diff / 60000);

    if (min < 1) return "just now";
    if (min < 60) return `${min}m ago`;

    const hours = Math.floor(min / 60);
    if (hours < 24) return `${hours}h ago`;

    const days = Math.floor(hours / 24);
    if (days < 7) return `${days}d ago`;

    const weeks = Math.floor(days / 7);
    if (weeks < 5) return `${weeks}w ago`;

    return date.toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
    });
}

const ACTIVITY_ICONS = {
    PushEvent: "git-icon",
    CreateEvent: "terminal-icon",
    DeleteEvent: "terminal-icon",
    WatchEvent: "star-icon",
    ForkEvent: "git-fork-icon",
    PullRequestEvent: "git-icon",
    IssuesEvent: "code-icon",
    IssueCommentEvent: "code-icon",
    ReleaseEvent: "terminal-icon",
    PublicEvent: "network-icon",
};

function formatActivity(event) {
    const repoName = event.repo.name;
    const repoUrl = `https://github.com/${repoName}`;
    const repoLink = `<a href="${escapeHtml(repoUrl)}" target="_blank" rel="noopener noreferrer" class="activity-item__link">${escapeHtml(repoName)}</a>`;

    switch (event.type) {
        case "PushEvent": {
            const commits = event.payload.commits;
            if (!commits || commits.length === 0) return null;
            const count = commits.length;
            return `Pushed ${count} commit${count > 1 ? "s" : ""} to ${repoLink}`;
        }
        case "CreateEvent": {
            const { ref_type: refType, ref } = event.payload;
            return `Created ${refType}${ref ? ` <span class="activity-item__hl">${escapeHtml(ref)}</span>` : ""} in ${repoLink}`;
        }
        case "DeleteEvent": {
            const { ref_type: refType, ref } = event.payload;
            return `Deleted ${refType}${ref ? ` <span class="activity-item__hl">${escapeHtml(ref)}</span>` : ""} in ${repoLink}`;
        }
        case "WatchEvent":
            return `Starred ${repoLink}`;
        case "ForkEvent": {
            const forkee = event.payload.forkee.full_name;
            const forkLink = `<a href="${escapeHtml(event.payload.forkee.html_url)}" target="_blank" rel="noopener noreferrer" class="activity-item__link">${escapeHtml(forkee)}</a>`;
            return `Forked ${forkLink}`;
        }
        case "PullRequestEvent":
            if (event.payload.action !== "opened") return null;
            return `Opened PR "<a href="${escapeHtml(event.payload.pull_request.html_url)}" target="_blank" rel="noopener noreferrer" class="activity-item__link">${escapeHtml(event.payload.pull_request.title)}</a>" in ${repoLink}`;
        case "IssuesEvent":
            if (event.payload.action !== "opened")
                return null;
                return `Opened issue "<a href="${escapeHtml(event.payload.issue.html_url)}" target="_blank" rel="noopener noreferrer" class="activity-item__link">${escapeHtml(event.payload.issue.title)}</a>" in ${repoLink}`;
        case "IssueCommentEvent":
            return `Commented on "<a href="${escapeHtml(event.payload.issue.html_url)}" target="_blank" rel="noopener noreferrer" class="activity-item__link">${escapeHtml(event.payload.issue.title)}</a>" in ${repoLink}`;
        case "ReleaseEvent":
            return `Released <span class="activity-item__hl">${escapeHtml(event.payload.release.tag_name)}</span> in ${repoLink}`;
        case "PublicEvent":
            return `Made ${repoLink} public`;
        default:
            return null;
    }
}

function renderActivity(events) {
    const container = document.getElementById("activity-list");
    if (!container) return;

    if (!events || events.length === 0) {
        container.innerHTML = `<li class="activity-item"><span class="activity-item__text">No recent activity</span></li>`;
        return;
    }

    const sorted = [...events].sort(
        (a, b) => new Date(b.created_at) - new Date(a.created_at)
    );

    const items = [];
    for (const event of sorted) {
        let text;
        try {
            text = formatActivity(event);
        } catch (e) {
            console.error("Activity format error:", e);
            continue;
        }
        if (!text) continue;
        const icon = ACTIVITY_ICONS[event.type] || "git-icon";
        items.push(`
            <li class="activity-item">
                <span class="activity-item__icon"><svg class="activity-item__icon-svg"><use href="src/assets/icon/sprite.svg#${icon}"></use></svg></span>
                <p class="activity-item__text">${text}</p>
                <time class="activity-item__time" datetime="${escapeHtml(event.created_at)}">${timeAgo(event.created_at)}</time>
            </li>
        `);
        if (items.length >= MAX_ACTIVITY_ITEMS) break;
    }

    container.innerHTML =
        items.length > 0
            ? items.join("")
            : `<li class="activity-item"><span class="activity-item__text">No recent activity</span></li>`;
}

export async function initGithub() {
    const container = document.querySelector(".github-calendar");
    if (!container) return;

    const [user, repos, events] = await Promise.all([
        getUser().catch(() => null),
        getRepos().catch(() => null),
        getRecentEvents().catch(() => null),
    ]);

    if (user) {
        setStat("repos", user.public_repos);
        setStat("follower", user.followers);

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
        fillProfileField("github-name", user.name || user.login);
        fillProfileField("github-bio", user.bio);

        const locationEl = document.getElementById("github-location");
        if (locationEl) {
            const locationRow = locationEl.closest(".github-profile__location");
            if (user.location) {
                locationEl.textContent = user.location;
                if (locationRow) locationRow.style.display = "";
            } else if (locationRow) {
                locationRow.style.display = "none";
            }
        }
    }
    if (repos) {
        const totalStars = repos.reduce(
            (sum, r) => sum + r.stargazers_count,
            0
        );
        setStat("stars", totalStars);
        renderRepos(repos);
    }

    renderActivity(events);

    try {
        const htmlPromise = fetch(PROXY_URL).then((r) => r.text());

        GitHubCalendar(".github-calendar", USERNAME, {
            responsive: true,
            tooltips: true,
            global_stats: false,
            proxy: () => htmlPromise,
            getCalendar: () => htmlPromise,
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
