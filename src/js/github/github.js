import {
    getUser,
    getRepos,
    getContributions
} from "./githubApi.js";

import { mapGithubData } from "./mapping.js";

async function initGithub() {
    const [user, repos, contributions] = await Promise.all([
        getUser(),
        getRepos(),
        getContributions(),
    ]);

    const data = mapGithubData(
        user,
        repos,
        contributions
    );

    console.log(data);
}

initGithub();