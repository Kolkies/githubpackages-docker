# DISCONTINUED
# PLEASE USE ANOTHER PACKAGE:
## https://github.com/elgohr/Publish-Docker-Github-Action

# Github Packages Docker

This action deploys an docker image to the github package registy

## Inputs

### `repo-token`

**Required** Access token which is used to deploy the image to the repository. I advise to use `GITHUB_TOKEN`.

### `image-name`

**Required** Name for the docker image

## Outputs

### `url`

This can be used when deploying
