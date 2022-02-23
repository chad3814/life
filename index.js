import Express from 'express';

const app = new Express();

const birth = new Date('1976-08-01T21:01:00-0700');
const baseline_years = 87;
const risk = 3;
const health = -5;
const years = baseline_years + (health * baseline_years / 100) + (risk * baseline_years / 100);
const time_ms = years * 365.25 * 24 * 60 * 60 * 1000;
const end = new Date(birth.getTime() + time_ms);

app.get('/', (req, res) => {
  res.end(`So Far: ${100 * (Date.now() - birth.getTime()) / time_ms}`);
});

app.listen(80);
