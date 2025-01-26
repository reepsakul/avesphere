# Project Setup

## fnm
This project makes use of [fnm](https://github.com/Schniz/fnm) to install Node.
The Node version is configured in `.node-version`.
Follow the [official installation instructions](https://github.com/Schniz/fnm/blob/master/README.md#installation).

## Node
Install the configured Node version by running
```bash 
  fnm i 
```

## pnpm
Install pnpm using [corepack enable](https://github.com/nodejs/corepack/blob/main/README.md#default-installs).
The pnpm version is configured in `package.json`.

# Running the Project
Use `pnpm i` and `pnpm run dev` to deploy the dev server.