import Express from 'express';

const app = new Express();

app.get('/', (req, res) => {
  res.end('Hello World!');
});

app.listen(80);
