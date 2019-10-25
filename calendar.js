const months = [
  'Январь',
  'Февраль',
  'Март',
  'Апрель',
  'Май',
  'Июнь',
  'Июль',
  'Август',
  'Сентябрь',
  'Октябрь',
  'Ноябрь',
  'Декабрь',
];

const daysOfWeek = [
  'Вс',
  'Пн',
  'Вт',
  'Ср',
  'Чт',
  'Пт',
  'Сб',
]

const daysOff = [
  '2019-11-04',

  '2020-01-01',
  '2020-01-02',
  '2020-01-03',
  '2020-01-04',
  '2020-01-05',
  '2020-01-06',
  '2020-01-07',
  '2020-01-08',
  '2020-02-24',
  '2020-03-09',
  '2020-05-01',
  '2020-05-02',
  '2020-05-04',
  '2020-05-05',
  '2020-05-09',
  '2020-05-11',
];

function makeCalendar(beginDate, endDate, selectedDOWs, hollidays) {
  const calendarDates = [];
  for (let date = new Date(beginDate); date < endDate; date.setDate(date.getDate() + 1)) {
    if (selectedDOWs.includes(date.getDay())) {
      if (!hollidays.includes(date.toISOString().slice(0, 10))) {
        calendarDates.push(new Date(date));
      }
    }
  }
  return calendarDates;
}

// eslint-disable-next-line no-unused-vars
function doCalculate(_event, _theForm) {
  const selectedDays = [];
  let locationHash = "d"
  for (let dow = 0; dow < 7; dow += 1) {
    const element = document.getElementById(`dow-${dow.toString()}`);
    if (element.checked) {
      selectedDays.push(dow);
      locationHash = locationHash+"-"+dow.toString();
    }
  }
  window.location.hash = locationHash;
  const beginDate = new Date(document.getElementById('beginDate').value);
  const endDate = new Date(document.getElementById('endDate').value);
  endDate.setDate(endDate.getDate() + 1);
  const output = makeCalendar(beginDate, endDate, selectedDays, daysOff);
  const calendarOutput = document.getElementById('calendarOutput');

  let child = calendarOutput.lastElementChild;
  while (child) {
    calendarOutput.removeChild(child);
    child = calendarOutput.lastElementChild;
  }

  output.forEach((value) => {
    let currentYear = document.getElementById(`year${value.getFullYear()}`);
    if (!currentYear) {
      currentYear = document.createElement('div');
      currentYear.setAttribute('id', `year${value.getFullYear()}`);
      currentYear.setAttribute('class', 'row col-12');
      currentYear.innerHTML = `<h2 class="w-100">${value.getFullYear()}</h2>`;
      calendarOutput.appendChild(currentYear);
    }
    let currentMonth = document.getElementById(`year${value.getFullYear()}-mon${value.getMonth()}`);
    if (!currentMonth) {
      currentMonth = document.createElement('div');
      currentMonth.setAttribute('id', `year${value.getFullYear()}-mon${value.getMonth()}`);
      currentMonth.setAttribute('class', 'col');
      currentMonth.innerHTML = `<h3>${months[value.getMonth()]}</h3>`;
      currentYear.appendChild(currentMonth);
    }
    const currentDay = document.createElement('p');
    currentDay.innerHTML = `<span class="text-primary">${value.getDate().toString()}</span>&nbsp;<span class="small text-secondary">${daysOfWeek[value.getDay()]}</span>`;
    currentMonth.appendChild(currentDay);
  });
  const summary = document.createElement('div');
  summary.setAttribute('class', 'row col-12');
  summary.innerHTML = `<h2 class="w-100">Итого</h2><p>${output.length} часов </p>`;
  calendarOutput.appendChild(summary);
  return false;
}

function fillDate() {
  const curDate = new Date();
  const thresholdDate = new Date(curDate.getFullYear(), 6, 1, 12, 0);
  let beginDate = new Date(curDate.getFullYear(), 8, 1, 12, 0);
  let endDate = new Date(curDate.getFullYear() + 1, 4, 31, 12, 0);
  if (curDate < thresholdDate) {
    beginDate = new Date(curDate.getFullYear() - 1, 8, 1, 12, 0);
    endDate = new Date(curDate.getFullYear(), 4, 31, 12, 0);
  }

  document.getElementById('beginDate').value = beginDate.toISOString().slice(0, 10);
  document.getElementById('endDate').value = endDate.toISOString().slice(0, 10);
}

function addHandlers() {
  const form = document.getElementById('form');
  const elements = form.getElementsByTagName('input');
  for (let input = 0; input < elements.length; input += 1) {
    const element = elements[input];
    if (element.getAttribute('type') === 'checkbox') {
      if (element.addEventListener) {
        element.addEventListener('change', (event) => doCalculate(event, form), false);
      } else {
        element.attachEvent('onchange', (event) => doCalculate(event, form));
      }
    }
  }
}

function fillDow() {
  if(window.location.hash == "") {
    return
  }
  window.location.hash.split("-").slice(1).forEach(function(dow){
    const element = document.getElementById(`dow-${dow}`);
    element.checked = true;
  })
  doCalculate();
}

fillDate();
addHandlers();
fillDow();


