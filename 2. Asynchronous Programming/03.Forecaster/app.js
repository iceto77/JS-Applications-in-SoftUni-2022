function attachEvents() {
    const inputTextElement = document.getElementById('location');
    const inputBtnElement = document.getElementById('submit');
    const forecastElement = document.getElementById('forecast');
    const currentConditionElement = document.getElementById('current');
    const upcomingElement = document.getElementById('upcoming');

    let symbol = {
        'Sunny': '☀',   //'&#x2600', // ☀
        'Partly sunny': '⛅', //'&#x26C5', // ⛅
        'Overcast': '☁', //'&#x2601', // ☁
        'Rain': '☂', //&#x2614', // ☂
        'Degrees': '°',	//'&#176'   // °

    };

    inputBtnElement.addEventListener('click', submitBtnClickHandler);


    async function submitBtnClickHandler() {
        forecastElement.style.display = 'block';
        let clearForecast = currentConditionElement.children[1];
        let clearForecastInfo = upcomingElement.children[1];
        if (clearForecast) {
            currentConditionElement.removeChild(clearForecast);
            if (clearForecastInfo) {
                upcomingElement.removeChild(clearForecastInfo);                
            }
        }
        const url = 'http://localhost:3030/jsonstore/forecaster/locations';
        const res = await fetch(url);
        if (res.status !== 200) {
            let newDiv = createElement('div', 'forecasts');
            let errorElm = createElement('span', 'condition','Error');
            newDiv.appendChild(errorElm);
            currentConditionElement.appendChild(newDiv);
           return;
        };
        const data = await res.json();
        let locationCode = '';
        for (const location of data) {
            if (inputTextElement.value == location.name) {
                locationCode = location.code;
            }
        }
        if (!locationCode) {
            let newDiv = createElement('div', 'forecasts');
            let errorElm = createElement('span', 'condition','Error');
            newDiv.appendChild(errorElm);
            currentConditionElement.appendChild(newDiv);
        } else {
            getCurrentConditions(locationCode);
            getUpcomingConditions(locationCode);
        };
    };

    async function getCurrentConditions(locationCode) {
        const url2 = `http://localhost:3030/jsonstore/forecaster/today/${locationCode}`;
        const resToday = await fetch(url2);
        const currentConditions = await resToday.json();
        let { name, forecast } = currentConditions;
        let { condition, high, low } = forecast;

        let newDiv = createElement('div', 'forecasts');
        let symbolElm = createElement('span', 'condition symbol', symbol[condition]);
        let conditionElm = createElement('span', 'condition');
        let location = createElement('span', 'forecast-data', name);
        let temperature = createElement('span', 'forecast-data', `${low}°/${high}°`);
        let conditionSpan = createElement('span', 'forecast-data', condition);

        conditionElm.appendChild(location);
        conditionElm.appendChild(temperature);
        conditionElm.appendChild(conditionSpan);
        newDiv.appendChild(symbolElm);
        newDiv.appendChild(conditionElm);

        currentConditionElement.appendChild(newDiv);
    };

    async function getUpcomingConditions(locationCode) {
        const url3 = `http://localhost:3030/jsonstore/forecaster/upcoming/${locationCode}`;
        const resUpcoming = await fetch(url3);
        const upcoming = await resUpcoming.json();

        let { name, forecast } = upcoming;
        let newDiv = createElement('div', 'forecast-info');
        for (const key in forecast) {
            let { condition, high, low } = forecast[key];
            let upcomingElm = createElement('span', 'upcoming');
            let symbolElm = createElement('span', 'symbol', symbol[condition]);
            let temperature = createElement('span', 'forecast-data', `${low}°/${high}°`);
            let conditionSpan = createElement('span', 'forecast-data', condition);

            upcomingElm.appendChild(symbolElm);
            upcomingElm.appendChild(temperature);
            upcomingElm.appendChild(conditionSpan);
            newDiv.appendChild(upcomingElm);
        }
        upcomingElement.appendChild(newDiv);
    };

    function createElement(type, attribute, content) {
        const element = document.createElement(type);
        if (attribute) {
            element.setAttribute('class', attribute);
        }
        if (content) {
            element.textContent = content;
        }
        return element;
    }
}

attachEvents();