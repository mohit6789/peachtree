# Peachtree

Application is developed in angular and scss, no external UI library were used. Some of the provided icons are not proper so `font-awasome.min.css` were used for icons.

## Setup Application

Navigate to `cd peachtree`, then run `npm install`.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build. You can check [Demo](https://peachtree-1672f.web.app) here.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

---

## Project Strcture

### Angular

- All new `page(route)` created inside the pages folder.
- All components requires by particular page(route) are available inside the `pages/<page>/components` folder.
- All shared functionality are available inside the shared folder like `components`, `constants`, `interfaces`, and `utility`.

### Styles

- Component specific styles are available at `component/component.scss`
- Common functionality are available inside the `assests/scss/` folder.
