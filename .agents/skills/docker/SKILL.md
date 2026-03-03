---
name: Docker Master Skill
description: Instructions and best practices for creating, managing, and debugging Docker containers and images in Node.js projects, especially API gateways and microservices.
---

# Docker Master Skill

This skill provides the AI agent with the required knowledge, best practices, and standard operating procedures to handle Docker effectively in this project.

## Core Best Practices for Node.js / pnpm Projects
1. **Use Multi-Stage Builds**: Optimize the final image size by building the app in a `builder` stage and only keeping the production dependencies and build artifacts in the final stage.
2. **Handle `pnpm` specifically**: Since this project uses pnpm, you need to enable it via `corepack enable pnpm` or install it globally in the Dockerfile.
3. **Use `.dockerignore`**: Always create a `.dockerignore` file mirroring `.gitignore` to avoid copying `node_modules`, `.env`, `.git`, etc., to the image.
4. **Environment Variables**: Do NOT bake sensitive variables into images. Use `docker-compose.yml` or runtime injected env variables.

## Standard Dockerfile Template for pnpm
```dockerfile
FROM node:20-alpine AS base
WORKDIR /app
RUN corepack enable pnpm

FROM base AS dependencies
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

FROM base AS build
COPY . .
COPY --from=dependencies /app/node_modules ./node_modules
# RUN pnpm build # (if a build step is required)

FROM base AS production
ENV NODE_ENV=production
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --prod --frozen-lockfile
# Copy source files
COPY src ./src
# COPY --from=build /app/dist ./dist # (if a build step was performed)

# Replace 3000 with your application's expected port
EXPOSE 3000
CMD ["pnpm", "start"]
```

## Recommended docker-compose.yml Template
```yaml
version: '3.8'

services:
  gateway:
    build:
      context: .
      target: production
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      # Other env vars can be injected here or from an env_file
    env_file:
      - .env
    restart: unless-stopped
```

## Useful Commands

### Docker Compose
- **Start services in background**: `docker-compose up -d`
- **Rebuild and start**: `docker-compose up -d --build`
- **Stop services**: `docker-compose down`
- **View logs**: `docker-compose logs -f gateway`

### Docker CLI
- **Build an image**: `docker build -t ratemymusic-gateway .`
- **Run a container**: `docker run -p 3000:3000 --env-file .env ratemymusic-gateway`
- **List running containers**: `docker ps`
- **Execute a shell inside a running container**: `docker exec -it <container_id> /bin/sh`
- **Clean up unused resources**: `docker system prune -a --volumes`

## Troubleshooting Checklist
1. **Container exits immediately?** Check `docker logs <container_id>`. It usually means a missing environment variable, failed DB connection, or a syntax syntax error causing a crash.
2. **Ports not accessible?** Make sure the `EXPOSE` port matches the ones mapped in docker `run -p HOST:CONTAINER` and the application logic binds its server to `0.0.0.0` rather than `localhost` or `127.0.0.1`.
3. **Local development with volumes not updating?** Check if you're using volumes (`volumes: - .:/app`) properly for local development. Ensure you prevent the local `node_modules` from overwriting the container's version by including a dummy volume mount like `- /app/node_modules` in `docker-compose.yml`.
