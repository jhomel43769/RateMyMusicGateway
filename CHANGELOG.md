# Registro de Cambios (Changelog)

Todos los cambios notables de este proyecto se documentarán en este archivo.

El formato está basado en [Keep a Changelog](https://keepachangelog.com/es-ES/1.0.0/),
y este proyecto se adhiere a [Versionado Semántico](https://semver.org/spec/v2.0.0.html).

## [1.2.0] - 2026-03-03
### Añadido
- **Dockerización del Gateway**: Se agregó un `Dockerfile` optimizado (multi-stage) y `docker-compose.yml` para ejecutar el Gateway aisladamente, posibilitando la conexión nativa con microservicios hosteados en local (`host.docker.internal`).
- **Skill de Docker**: Integración de nuevas directrices y flujos operativos de la IA para manejar e interactuar con el entorno de contenedores del proyecto usando `pnpm`.
- **Refinamiento de Ignorados**: Agregado de `.dockerignore` y limpieza del `.gitignore` para asegurar configuraciones, credenciales y módulos de dependencias fuera del control de versiones.

## [1.1.0] - 2026-02-28
### Añadido
- **RMM-201**: Configuración inicial y creación de la estructura del API Gateway con Express. Se agregó el endpoint público `/health` para chequeos de estado.
- **RMM-202**: Implementación de rutas dinámicas mediante proxy utilizando `express-http-proxy` para enrutar el tráfico hacia `MUSIC_SERVICE` y `USERS_SERVICE`.
- **RMM-203**: Integración del Middleware de Autenticación Centralizada basado en `jsonwebtoken`. Asegura que el tráfico no verificado sea rechazado y valida los tokens para inyectar los headers `X-User-Id`, `X-User-Role` y `X-User-Genres` hacia los microservicios.
- **RMM-204**: Limitación de Tasa (Rate Limiting) de IP Centralizada. El tráfico del proxy está sujeto a límites estrictos (100 peticiones por minuto) mediante `express-rate-limit`.
- **RMM-205**: Estandarización del registro (logging) centralizado de peticiones asignando el tráfico a formatos HTTP personalizados, ocultando información sensible y rastreando mensajes de error automáticamente utilizando `morgan`.
