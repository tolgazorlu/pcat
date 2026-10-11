# pcat

A small Express + MongoDB photo catalog CRUD app built on a TemplateMo video catalog template.

## About

A learning project from May 2023: server-rendered photo catalog with create, view, edit and
delete, built with Express, EJS and Mongoose on top of a TemplateMo HTML/CSS template.

## Features

- List photos with pagination
- View a single photo's detail page
- Add, edit and delete photos with file upload (`express-fileupload`)

## Tech stack

- Node.js, Express
- EJS templates
- MongoDB / Mongoose
- Front-end: TemplateMo "Video Catalog" template, Bootstrap, Font Awesome

## Project structure

```
index.js                  # app entry, routes, DB connection
controllers/
  pageController.js        # static pages (about, add, edit)
  photoControllers.js        # photo CRUD
models/Photo.js            # Mongoose schema
views/                      # EJS templates and partials
public/                     # vendored template assets (css, js, fontawesome)
```

## Getting started

```bash
npm install
npm start
```

Set a MongoDB connection string before running (the app calls `mongoose.connect` in `index.js`).

## Status

Learning project, not actively maintained.

## License

The front-end is based on a TemplateMo template with its own license
(see `public/fontawesome/LICENSE.txt` for the bundled Font Awesome license);
the application code has no separate license file.
