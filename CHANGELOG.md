# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.1.0] - 2026-02-28
### Added
- **RMM-201**: Initial Express Gateway setup and structure creation. Added an unrestricted `/health` configuration check.
- **RMM-202**: Implemented dynamic proxy routing capabilities leveraging `express-http-proxy` to route endpoints to upstream `MUSIC_SERVICE` and `USERS_SERVICE`.
- **RMM-203**: Included Centralized `jsonwebtoken`-based Authentication Middleware. Ensures unverified traffic is rejected and verifies payloads to pass `X-User-Id`, `X-User-Role`, and `X-User-Genres` downward.
- **RMM-204**: Centralized IP Rate Limiting. Proxied traffic is subjected to strict limits (e.g. 100 max per minute) via `express-rate-limit`.
- **RMM-205**: Standarized Central Request logging integration mapping traffic through custom HTTP formats, masking sensitive content and tracking error messages automatically by modifying Express and utilizing `morgan`.
