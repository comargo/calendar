const months = [
    "Январь",
    "Февраль",
    "Март",
    "Апрель",
    "Май",
    "Июнь",
    "Июль",
    "Август",
    "Сентябрь",
    "Октябрь",
    "Ноябрь",
    "Декабрь"
]

let daysOff = [
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
]

function fillDate() {
    let curDate = new Date();
    let thresholdDate = new Date(curDate.getFullYear(), 6, 1, 12, 00);
    let beginDate = new Date(curDate.getFullYear(), 8, 1, 12, 00);
    let endDate = new Date(curDate.getFullYear()+1, 4, 31, 12, 00);
    if(curDate < thresholdDate) {
        beginDate = new Date(curDate.getFullYear()-1, 8, 1, 12, 00);
        endDate = new Date(curDate.getFullYear(), 4, 31, 12, 00);
    }

    document.getElementById('beginDate').value = beginDate.toISOString().slice(0, 10);
    document.getElementById('endDate').value = endDate.toISOString().slice(0, 10);
}

fillDate();

function doCalculate(theForm) {
    let selectedDays = []
    for (let dow = 0; dow < 7; dow++) {
        const element = document.getElementById('dow-'+dow.toString());
        if(element.checked) {
            selectedDays.push(dow);
        }
    }
    let beginDate = new Date(document.getElementById('beginDate').value);
    let endDate = new Date(document.getElementById('endDate').value);
    endDate.setDate(endDate.getDate()+1);
    let output = makeCalendar(beginDate, endDate, selectedDays, daysOff);
    let calendarOutput = document.getElementById('calendarOutput');

    let child = calendarOutput.lastElementChild;
    while(child) {
        calendarOutput.removeChild(child);
        child = calendarOutput.lastElementChild;
    }

    output.forEach(function(value){
        let currentYear = document.getElementById('year'+value.getFullYear());
        if(!currentYear) {
            currentYear = document.createElement('div');
            currentYear.setAttribute('id', 'year'+value.getFullYear());
            currentYear.setAttribute('class', 'row');
            currentYear.innerHTML = '<h2 class="w-100">'+value.getFullYear()+'</h2>';
            calendarOutput.appendChild(currentYear);
        }
        let currentMonth = document.getElementById('year'+value.getFullYear()+'-mon'+value.getMonth());
        if(!currentMonth) {
            currentMonth = document.createElement('div');
            currentMonth.setAttribute('id', 'year'+value.getFullYear()+'-mon'+value.getMonth());
            currentMonth.setAttribute('class', 'col');
            currentMonth.innerHTML = '<h3>'+months[value.getMonth()]+'</h3>';
            currentYear.appendChild(currentMonth);
        }
        let currentDay = document.createElement("p");
        currentDay.innerHTML = value.getDate();
        currentMonth.appendChild(currentDay);
    });
    let summary = document.createElement('div');
    summary.setAttribute('class', 'row');
    summary.innerHTML = '<h2 class="w-100">Итого</h2><p>'+output.length+' часов </p>';
    calendarOutput.appendChild(summary);
    return false;
}

function makeCalendar(beginDate, endDate, selectedDOWs, hollidays)
{
    let calendarDates = []
    for(let date = new Date(beginDate); date < endDate; date.setDate(date.getDate()+1)) {
        if(selectedDOWs.includes(date.getDay())) {
            if(!hollidays.includes(date.toISOString().slice(0,10))) {
                calendarDates.push(new Date(date));
            }
        }
    }
    return calendarDates;
}