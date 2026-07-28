import {
    getUser,
    getRepos,
    getEvents,
    getContributions
} from "./githubApi.js";

import { mapGithubData } from "./mapping.js";

async function initGithub() {
    const [user, repos, events, contributions] = await Promise.all([
        getUser(),
        getRepos(),
        getEvents(),
        getContributions(),
    ]);

    const data = mapGithubData(
        user,
        repos,
        events,
        contributions
    );

    console.log(data);
}

initGithub();