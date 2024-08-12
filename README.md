# Proxy Service

This tool sets up a local proxy server to forward API calls to development or QA environments based on configuration files.

## Prerequisites

- Node.js and npm installed

## Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd proxy-service

2. Install dependencies

    ```bash
    npm install

## Usage

Run the proxy service with the following command:
    ```bash
    npm install
    npm start -- --env <environment> [--exclude-port <port>]

### Options

- `--env <environment>`: The environment to proxy to. Valid values are `dev` or `qa`.
- `--exclude-port <port>`: The port of the service to not proxy. If not specified, all ports will be proxied.

### Example

To start the proxy server for the dev environment:
    ```bash
    npm start -- --env dev

To start the proxy server for the QA environment, excluding port 3003:
    ```bash
    npm start -- --env qa --exclude-port 3003

### Configuration

Configuration files are located in the config/ directory. Each file should contain a mapping of localhost ports to target URLs.

- `config/dev.json`
- `config/qa.json`
