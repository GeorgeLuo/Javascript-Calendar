# Javascript Calendar Sample Project
Basic calendar application using CSS and HTML with minimal jquery.

## How To Use

Open index.html in the browser. Within the browser console, you can run 

```
layoutDay(events);
```

to display your daily schedule. You can define the calendar in your console first using the format

```
var events = [
  {
    start: 30,
    end: 150
  },
  {
    start: 540,
    end: 600
  },
  {
    start: 560,
    end: 620
  },
  {
    start: 610,
    end: 670
  }
]
```

where the start and end time is number of minutes from 9:00 AM. You may insert as many entries into the array as you please in this format.
