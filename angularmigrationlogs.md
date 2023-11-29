UPDATE package.json (1552 bytes)
✔ Packages successfully installed.
** Executing migrations of package '@angular/cli' **

> Remove polyfills required only for Internet Explorer which is no longer supported.
UPDATE src/polyfills.ts (2636 bytes)
  Migration completed (1 file modified).

> Remove no longer valid Angular schematic options from `angular.json`.
  Migration completed (No changes made).

> Remove deprecated options from 'angular.json' that are no longer present in v13.
UPDATE angular.json (8825 bytes)
  Migration completed (1 file modified).

> Updating '.gitignore' to include '.angular/cache'.
    Could not find '.gitignore'.
  Migration completed (No changes made).

> Update library projects to be published in partial mode and removed deprecated options from ng-packagr configuration.
  Migration completed (No changes made).

** Executing migrations of package '@angular/core' **

> Migrates `[routerLink]=""` in templates to `[routerLink]="[]"` because these links are likely intended to route to the current page with updated fragment/query params.
  Migration completed (No changes made).

> In Angular version 13, the `teardown` flag in `TestBed` will be enabled by default.
  This migration automatically opts out existing apps from the new teardown behavior.
UPDATE src/test.ts (827 bytes)
  Migration completed (1 file modified).

> As of Angular version 13, `entryComponents` are no longer necessary.
  Migration completed (No changes made).



  UPDATE package.json (1552 bytes)
✔ Packages successfully installed.
** Executing migrations of package '@angular/core' **

> As of Angular version 13, `entryComponents` are no longer necessary.
  Migration completed.

> In Angular version 14, the `pathMatch` property of `Routes` was updated to be a strict union of the two valid options: `'full'|'prefix'`.
  `Routes` and `Route` variables need an explicit type so TypeScript does not infer the property as the looser `string`.
  Migration completed.

> As of Angular version 14, Forms model classes accept a type parameter, and existing usages must be opted out to preserve backwards-compatibility.
UPDATE src/app/command/command-service-template/command-service-template.component.ts (7406 bytes)
UPDATE src/app/rule-engine/rules/sinks/sink-base-properties/sink-base-properties.component.ts (3678 bytes)
  Migration completed.

  ** Executing migrations of package '@angular/cli' **

> Remove 'defaultProject' option from workspace configuration.
  The project to use will be determined from the current working directory.
UPDATE angular.json (8797 bytes)
  Migration completed.

> Remove 'showCircularDependencies' option from browser and server builders.
  Migration completed.

> Replace 'defaultCollection' option in workspace configuration with 'schematicCollections'.
  Migration completed.

> Update Angular packages 'dependencies' and 'devDependencies' version prefix to '^' instead of '~'.
UPDATE package.json (1552 bytes)
✔ Packages installed successfully.
  Migration completed.

> Remove 'package.json' files from library projects secondary entrypoints.
  Migration completed.

> Update TypeScript compilation target to 'ES2020'.
UPDATE tsconfig.json (764 bytes)
  Migration completed.



  UPDATE package.json (1562 bytes)
✔ Packages successfully installed.
** Executing migrations of package '@angular/cli' **

> Remove 'defaultProject' option from workspace configuration.
  The project to use will be determined from the current working directory.
  Migration completed (No changes made).

> Replace removed 'defaultCollection' option in workspace configuration with 'schematicCollections'.
  Migration completed (No changes made).

> Update the '@angular-devkit/build-angular:server' builder configuration to disable 'buildOptimizer' for non optimized builds.     
  Migration completed (No changes made).

** Executing migrations of package '@angular/core' **

> In Angular version 15.2, the guard and resolver interfaces (CanActivate, Resolve, etc) were deprecated.
  This migration removes imports and 'implements' clauses that contain them.
UPDATE src/app/guards/auth/guard/auth.guard.ts (2066 bytes)
UPDATE src/app/guards/health/metadata-alive.guard.ts (2267 bytes)
UPDATE src/app/guards/health/coredata-alive.guard.ts (2251 bytes)
UPDATE src/app/guards/health/notification-alive.guard.ts (2285 bytes)
UPDATE src/app/guards/health/scheduler-alive.guard.ts (2277 bytes)
UPDATE src/app/guards/health/rule-engine-alive.guard.ts (2274 bytes)
UPDATE src/app/guards/health/registry-center-alive.guard.ts (2288 bytes)
UPDATE src/app/guards/health/system-agent-alive.guard.ts (2281 bytes)
  Migration completed (8 files modified).

> As of Angular v16, the `moduleId` property of `@Component` is deprecated as it no longer has any effect.
  Migration completed (No changes made).
