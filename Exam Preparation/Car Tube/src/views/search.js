import { html, nothing } from '../lib.js';

import * as cars from '../services/cars.js';
import { carTemplate } from './carTemplate.js';

const searchTemplate = (onClick, cars, showResult) => html`
    <section id="search-cars">
        <h1>Filter by year</h1>

        <div class="container">
                <input id="search-input" type="text" name="search" placeholder="Enter desired production year">
                <button @click=${onClick} class="button-list">Search</button>
        </div>

        <h2>Results:</h2>
        <div class="listings">
            ${showResult
                ? resultTemplate(cars)
                : nothing
            }
        </div>
    </section>`;

const resultTemplate = (cars) => html`
    ${cars.length == 0
        ? html`<p class="no-cars"> No results.</p>`
        : html`${cars.map(x => carTemplate(x))}`
    }`;


    export const searchView = (ctx) => {    
        const onClick = (e) => {
            let searchValue = e.target.parentNode.children[0].value;
            if (searchValue != '') {
                cars.getByYear(searchValue)
                .then(cars => {
                    ctx.render(searchTemplate(onClick, cars, true));
                })
            }
        }
        ctx.render(searchTemplate(onClick, []));
    }