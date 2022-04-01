import { html, nothing } from '../lib.js';

import * as albums from '../services/album.js';
import { albumTemplate } from './Templates/albumTemplate.js';

const searchTemplate = (onClick, albums, showBtn, showResult ) => html`
    <section id="searchPage">
        <h1>Search by Name</h1>
            <div class="search">
            <input id="search-input" type="text" name="search" placeholder="Enter desired albums's name">
            <button @click=${onClick} class="button-list">Search</button>
        </div>
        <h2>Results:</h2>
            ${showResult
                ? resultTemplate(albums, showBtn)
                : nothing
            }        
    </section>`;

const resultTemplate = (albums, showBtn) => html`
    <div class="search-result">
        ${albums.length == 0
        ? html`<p class="no-result">No result.</p>`
        : html`${albums.map(x => albumTemplate(x, showBtn))}`
    }                
    </div>`;


export const searchView = (ctx) => {
    let showBtn = !(ctx.user == undefined);

    const onClick = (e) => {
        let searchValue = e.target.parentNode.children[0].value;
        if (searchValue != '') {
            albums.getByName(searchValue)
            .then(albums => {
                console.log(albums);
                ctx.render(searchTemplate(onClick, albums, showBtn, true));
            })
        }
    }
    ctx.render(searchTemplate(onClick, []));
}
