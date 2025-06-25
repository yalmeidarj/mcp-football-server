# MCP Football Server

This project implements a small [Model Context Protocol](https://github.com/modelcontextprotocol) (MCP) server that exposes football (soccer) data through simple tools. The server retrieves data from the [API-Football](https://www.api-football.com) service and is written in TypeScript.

## Features

- **get-fixtures-by-date** &ndash; list all fixtures for a specific date.
- **get-team** &ndash; basic information about a team by its id.
- **get-standings** &ndash; league standings for a given season.

These tools are registered when the server starts and communicate over MCP\'s standard IO transport.

## Setup

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Environment variables**

   Copy the example file and fill in your [RapidAPI](https://rapidapi.com/) credentials:

   ```bash
   cp src/.env.example .env
   # edit .env and provide RAPIDAPI_KEY and RAPIDAPI_HOST values
   ```

   The server uses these variables to authenticate with API-Football.

## Development

To run the TypeScript code directly, use:

```bash
npm run dev
```

This starts the server with `ts-node` and watches standard input/output for MCP messages.

## Production

Build the project and execute the generated JavaScript:

```bash
npm run build
npm start
```

The `build` script compiles files from `src/` to `build/` using `tsc`. The resulting binary can also be invoked via the `football` command defined in `package.json`.

## Project Structure

```
src/
  application/    # business logic services
  domain/         # data transfer objects
  infrastructure/ # external API calls
  interface/      # MCP tool controllers
  main.ts         # server entry point
```

## License

This project is released under the ISC license.
