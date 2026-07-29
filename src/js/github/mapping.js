export function mapGithubData(user, repos, contributions) {
    return {
        name: user.login,
        totalRepos: user.public_repos,
        totalStars: repos.reduce(
            (sum, repo) => sum + repo.stargazers_count,
            0
        ),
        totalContributions: contributions.totalContributions,
    };
}
