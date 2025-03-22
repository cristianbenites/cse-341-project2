const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Project 2',
    description: 'Project 2 Api of movies and books'
  },
  schemes: [ 'http', 'https' ],
  host: 'localhost:3000'
};

const outputFile = './swagger.json';
const routes = ['./routes/index.js'];

/* NOTE: If you are using the express Router, you must pass in the 'routes' only the
root file where the route starts, such as index.js, app.js, routes.js, etc ... */

swaggerAutogen(outputFile, routes, doc);
