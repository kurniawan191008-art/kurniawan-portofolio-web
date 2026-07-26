export async function initGithubData() {
    const userName = 'kurniawan191008-art'
    const [userResponse, reposResponse] = await Promise.all([
        fetch(`https://api.github.com/users/${userName}`),
        fetch(`https://api.github.com/users/${userName}/repos?per_page=100`)
    ]);
    if (!userResponse.ok) {
        throw new Error(`gagal memuat: ${userResponse.status}`);
    } if (!reposResponse.ok) {
        throw new Error(`gagal memuat: ${reposResponse.statur}`);
    }
    const userData = await userResponse.json();
    const reposData = await reposResponse.json();
    console.log('user:', userData);
    console.log('repos:', reposData);

}
