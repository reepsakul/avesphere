<div align="center">
<!-- INFO: The empty line is required for center to work.-->

[![Node](https://img.shields.io/badge/22.13.1-green?style=for-the-badge&logo=nodedotjs&logoColor=green&labelColor=grey)](https://nodejs.org/en)
[![fnm](https://img.shields.io/badge/fnm-white?style=for-the-badge&logo=rocket)](https://github.com/Schniz/fnm)
[![pnpm](https://img.shields.io/badge/10.0.0-gray?style=for-the-badge&logo=pnpm)](https://pnpm.io/)
</div>

# Project Development Setup

## Fnm
This project makes use of [fnm](https://github.com/Schniz/fnm) to install Node.
The Node version is configured in `.node-version`.
Follow the [official installation instructions](https://github.com/Schniz/fnm/blob/master/README.md#installation).

## Node
Install the configured Node version by running
```bash 
  fnm i 
```

## Pnpm
Install pnpm using [corepack enable](https://github.com/nodejs/corepack/blob/main/README.md#default-installs).
The pnpm version is configured in `package.json`.

## Running the Project
Use
```bash
docker compose up
```
and
```bash
docker compose down
```
to start and stop the database.
To deploy the dev server, use
```bash
  pnpm i
  pnpm dev
```

# Project Deployment
In order to build the final images, run
```bash
docker compose build
```
Now, any time you want to start the app, run
```bash
docker compose --profile production up
```

To stop the application completely (also closing the database and any unsaved changes) run
```bash
docker compose down --profile production -v
```