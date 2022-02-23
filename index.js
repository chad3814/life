import Express from 'express';

const app = new Express();

const birth = new Date('1976-08-01T21:01:00-0700');
const baseline_years = 87;
const risk = 3;
const health = -5;
const years = baseline_years + (health * baseline_years / 100) + (risk * baseline_years / 100);
const a_year_ms = 365.25 * 24 * 60 * 60 * 1000;
const decade_ms = 10 * a_year_ms;
const time_ms = years * a_year_ms;
const end = new Date(birth.getTime() + time_ms);
const jan_1 = new Date();
jan_1.setUTCMonth(0, 1);
jan_1.setUTCHours(0, 0, 0, 0);
const dec_31 = new Date();
dec_31.setUTCMonth(11, 31);
dec_31.setUTCHours(23, 59, 59, 999);
const MONTH_NAMES = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];
app.get('/', (req, res) => {
  const now = new Date;
  const month_1 = new Date(now);
  month_1.setUTCDate(1);
  month_1.setUTCHours(0, 0, 0, 0);
  const month_last = new Date(now);
  month_last.setUTCMonth(month_last.getUTCMonth() + 1, 1);
  month_last.setUTCHours(0, 0, 0, 0);
  month_last.setUTCMilliseconds(-1);
  const sunday = new Date(now);
  sunday.setUTCDate(sunday.getUTCDate() - sunday.getUTCDay());
  sunday.setUTCHours(0, 0, 0, 0);
  const saturday = new Date(sunday);
  saturday.setUTCDate(saturday.getUTCDate() + 7);
  saturday.setUTCMilliseconds(-1);
  const midnight = new Date(now);
  midnight.setUTCHours(0, 0, 0, 0);
  const tomorrow = new Date(midnight);
  tomorrow.setUTCHours(24);
  tomorrow.setUTCMilliseconds(-1);
  const life_ms = (Date.now() - birth.getTime());
  const life_per = 100 * life_ms / time_ms;
  const decade_per = 100 * (life_ms % decade_ms) / decade_ms;
  const decade = Math.floor(life_ms / decade_ms);
  const year_per = 100 * (life_ms % a_year_ms) / a_year_ms;
  const year = Math.floor(life_ms / a_year_ms);
  const this_year_per = 100 * (now.getTime() - jan_1.getTime()) / (dec_31.getTime() - jan_1.getTime());
  const this_year = now.getUTCFullYear();
  const this_month_per = 100 * (now.getTime() - month_1.getTime()) / (month_last.getTime() - month_1.getTime());
  const this_month = MONTH_NAMES[now.getUTCMonth()];
  const this_week_per = 100 * (now.getTime() - sunday.getTime()) / (saturday.getTime() - sunday.getTime());
  const today_per = 100 * (now.getTime() - midnight.getTime()) / (tomorrow.getTime() - midnight.getTime());
  const html = `<html>
  <head>
    <title>Life</title>
    <style>
      div {
        background-color: green;
        color: white;
        padding: 0;
        margin: 0;
      }
    </style>
  </head>
  <body>
    <div style="background-color: white; border: 1px solid black; margin-bottom: 5px;">
      <div style="width: ${life_per}%">Life</div>
    </div>
    <div style="background-color: white; border: 1px solid black; margin-bottom: 5px;">
      <div style="width: ${decade_per}%">${decade}s</div>
    </div>
    <div style="background-color: white; border: 1px solid black; margin-bottom: 5px;">
      <div style="width: ${year_per}%">${year}</div>
    </div>
    <div style="background-color: white; border: 1px solid black; margin-bottom: 5px;">
      <div style="width: ${this_year_per}%">${this_year}</div>
    </div>
    <div style="background-color: white; border: 1px solid black; margin-bottom: 5px;">
      <div style="width: ${this_month_per}%">${this_month}</div>
    </div>
    <div style="background-color: white; border: 1px solid black; margin-bottom: 5px;">
      <div style="width: ${this_week_per}%">this week</div>
    </div>
    <div style="background-color: white; border: 1px solid black; margin-bottom: 5px;">
      <div style="width: ${today_per}%">today</div>
    </div>
  </body>
</html>`;
  res.end(html);
});

app.listen(80);
