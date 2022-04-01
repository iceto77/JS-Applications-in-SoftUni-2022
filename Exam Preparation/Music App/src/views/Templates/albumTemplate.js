import { html, nothing } from '../../lib.js';

export const albumTemplate = (album, showBtn) => html`
    <div class="card-box">
        <img src=${album.imgUrl}>
        <div>
            <div class="text-center">
                <p class="name">Name: ${album.name}</p>
                <p class="artist">Artist: ${album.artist}</p>
                <p class="genre">Genre: ${album.genre}</p>
                <p class="price">Price: $${album.price}</p>
                <p class="date">Release Date: ${album.releaseDate}</p>
            </div>
            <div class="btn-group">
                ${showBtn
                    ? html`<a href="/albums/${album._id}" id="details">Details</a>`
                    : nothing
                }                
            </div>
        </div>
    </div>`;