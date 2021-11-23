const express = require('express');
const path = require('path');
const nunjucks = require('nunjucks');
const indexRouter = require('./routes/index');

const app = express();

app.set('view engine', 'njk')
nunjucks.configure(['views', 'node_modules/govuk-frontend/'], {
    autoescape: true,
    express: app
});

app.use(express.json());
app.use(express.urlencoded({extended: false}));
['/assets', '/node_modules/govuk-frontend/govuk/assets'].forEach(dir => {
    app.use('/assets', express.static(path.join(__dirname, dir)))
})

app.use('/', indexRouter);

module.exports = app;
