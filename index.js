const { exec } = require("@actions/exec");
const core = require("@actions/core");

const run = async () => {
  const githubToken = core.getInput("repo-token");

  const repoUser = process.env.GITHUB_ACTOR;

  const imageName = core.getInput("image-name").toLowerCase();

  const githubRepo = process.env.GITHUB_REPOSITORY.toLowerCase();

  const tag = process.env.GITHUB_SHA.substring(0, 7);

  const imageText = `docker.pkg.github.com/${githubRepo}/${imageName}`;

  await exec(`docker login docker.pkg.github.com -u ${repoUser} -p ${githubToken}`).catch(error => core.setFailed(error));

  await exec(`docker build -t ${imageText}:${tag} .`).catch(error => core.setFailed(error));

  await exec(`docker tag ${imageText}:${tag} ${imageName}:latest`).catch(error => core.setFailed(error));


  await exec(`docker push ${imageText}:${tag}`).catch(error => core.setFailed(error));
  await exec(`docker push ${imageText}:latest`).catch(error => core.setFailed(error));

  core.setOutput("url", `${imageText}:${tag}`);
}

run();