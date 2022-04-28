# 📚 Tutorial: Angular - Build Once, Run Anywhere
[![Node.js CI](https://github.com/ueberfuhr-tutorials/ng-buildonce-deployanywhere/actions/workflows/node.js.yml/badge.svg)](https://github.com/ueberfuhr-tutorials/ng-buildonce-deployanywhere/actions/workflows/node.js.yml)

## The challenge

Like backends, also frontends are installed into several stages, and each stage needs its own configuration.
The most common setting is the URL to the backend, but there can also be settings for authentication, theming and so on...

### The Angular Way _(and what's the problem with that)_

When creating an Angular project, there is already a solution for this: [Environments](https://angular.io/guide/build).
The essence of this approach is the following:
- Create an `environment.<stage>.ts` file for each stage and define the same constant in it (with differing values).
- `environment.ts` is the file that is used as default. It is imported by the application's sources whenever the constant is needed.
- Create a configuration for each stage in the `angular.json` file. Replace `environment.ts` by `environment.<stage>.ts` during build. (The content of the file is then compiled and compressed within the `main.js` file and therefore not replaceable afterneath.)
- Run the build with `ng b -c <stage>`. (Since Angular 12, `production` is the default build mode.)

But the downside of this solution is setting the stage while building. This means that each stage has to be built separately.
Ultimately, this is only partially practical, especially in the context of a CI/CD pipeline.

### The Requirements for a Suitable Solution

_Build Once, Run Anywhere_ is the name of the principle that would match our needs.
So the solution should allow to deploy the application in several stages without rebuilding it.
At most, replacing or adapting individual configuration files would be acceptable.

But there are further requirements to a possible solution:
- The configuration must be **available at the client`s browser**. _(Setting environment variables at the server-side is not a possible way unless these variables are not provided for the client.)_
- **Only** the configuration for **the current stage** should be available at the client's browser. _(So providing all stage's configurations at the client and using a switch specific to the stage could get safety relevant.)_
- It is **independent of any deployment infrastructure** (like nginx), it should only use Angular/NPM/TS/JS resources.
- It should deal correctly with the browser cache. _(Changes to the configuration should affect the application immediately.)_
- It should also **work within the development environment** (`ng serve`). We should be able to switch the stage for testing purposes locally.
