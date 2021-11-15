# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.9.0] - 2021-11-14
### Added
- Distinct support via `query.context`.
- Support for Oracle. not yet supported `returning` data from SML for Oracle. Cannot get knex.js to build functional query. Will revisit at later date.

## [1.8.0] - 2021-10-28
### Note
    skipping this to sync tags between NPM package & Docker image.

## [1.7.0] - 2021-10-30
### Added
- Support for Oracle

## [1.6.0] - 2021-07-02
### Added
- Support for MSSQL (sql-server)
- Support for Redshift
### Patched
- Fixed bug with permissions when set to `permit.none()`

## [1.5.0] - 2020-12-13
### Patched
- Bumped NPM package for better GraphQL & gRPC interfaces for `in` & `not_in`.

## [1.4.0] - 2020-12-07
### Patched
- Bumped NPM package for service-engine (adding psql partition support)

## [1.3.1] - 2020-12-06
### Patched
- Bumped NPM package for service-engine (patching `metadata.appShortName` bug)

## [1.3.0] - 2020-12-06
### Added
- Support for redacted fields
- Bumped NPM package for service-engine (patching premissions & seperator bugs)

## [1.2.0] - 2020-12-04
### Added
- Bumped NPM package for service-engine

## [1.1.1] - 2020-12-01
### Added
- Bumped NPM package for service-engine (contained a patch)

## [1.1.0] - 2020-11-28
### Added
- Support for modular schema migration scripts. SQL content for related migrations are held within `migrations/sql/{id}` & **up**/**down** directories.
- Initial Changelog

## [1.0.0] - 2020-11-08
### Added
- Initial Release

[Unreleased]: https://github.com/sudowing/service-engine-docker/compare/v1.9.0...HEAD
[1.9.0]: https://github.com/sudowing/service-engine-docker/compare/v1.8.0...v1.9.0
[1.8.0]: https://github.com/sudowing/service-engine-docker/compare/v1.7.0...v1.8.0
[1.7.0]: https://github.com/sudowing/service-engine-docker/compare/v1.6.0...v1.7.0
[1.6.0]: https://github.com/sudowing/service-engine-docker/compare/v1.5.0...v1.6.0
[1.5.0]: https://github.com/sudowing/service-engine-docker/compare/v1.4.0...v1.5.0
[1.4.0]: https://github.com/sudowing/service-engine-docker/compare/v1.3.1...v1.4.0
[1.3.1]: https://github.com/sudowing/service-engine-docker/compare/v1.3.0...v1.3.1
[1.3.0]: https://github.com/sudowing/service-engine-docker/compare/v1.3.0...v1.3.0
[1.2.0]: https://github.com/sudowing/service-engine-docker/compare/v1.1.1...v1.2.0
[1.1.1]: https://github.com/sudowing/service-engine-docker/compare/v1.1.0...v1.1.1
[1.1.0]: https://github.com/sudowing/service-engine-docker/compare/v1.0.0...v1.1.0
[1.0.0]: https://github.com/sudowing/service-engine-docker/releases/tag/v1.0.0
