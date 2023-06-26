const express = require('express');
const app = express();

const dbTodosRouter = require('./routes/dbTodos');

app.use('/dbTodos', dbTodosRouter);

app.listen(8000, () => {
  console.log('Server started on port 8000');
});
