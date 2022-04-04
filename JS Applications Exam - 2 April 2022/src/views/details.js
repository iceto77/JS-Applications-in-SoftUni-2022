import { html, nothing } from '../lib.js';

import * as pets from '../services/pets.js';
import * as donates from '../services/donates.js';

const detailsTemplate = (pet, onClick, petDonates, showEditDelBtn, showDonateBtn) => html`
    <section id="detailsPage">
        <div class="details">
            <div class="animalPic">
                <img src=${pet.image}>
            </div>
            <div>
                <div class="animalInfo">
                    <h1>Name: ${pet.name}</h1>
                    <h3>Breed: ${pet.breed}</h3>
                    <h4>Age: ${pet.age}</h4>
                    <h4>Weight: ${pet.weight}</h4>
                    <h4 class="donation">Donation: ${petDonates}$</h4>
                </div>
                ${showEditDelBtn
                    ? html`<div class="actionBtn">
                                <!-- Only for registered user and creator of the pets-->
                                <a href="/pets/${pet._id}/edit" class="edit">Edit</a>
                                <a href="/pets/${pet._id}/delete" class="remove">Delete</a>
                                
                            </div>`
                    : donateTemplate(onClick, showDonateBtn)
                }
            </div>
        </div>
    </section>`;

const donateTemplate = (onClick, showDonateBtn) => html`
    ${showDonateBtn
        ? html`<div class="actionBtn">
                    <a @click=${onClick} href="#" class="donate">Donate</a>
                </div>`
        : nothing
    }`;

export const detailsView = async (ctx) => {
    let petId = ctx.params.petId;
    let userId = ctx.user;
    let isDonate = true;
    if(ctx.user != undefined){
        userId = ctx.user._id;
        isDonate = await donates.isDonate(userId, petId);
        isDonate =Boolean(isDonate)
    }    
    let petDonates = await donates.count(petId);
    petDonates = Number(petDonates * 100);
    let pet = await pets.getOne(petId); 

    const onClick = async () => {
        await donates.add({ petId })
            .then(() => {
                ctx.page.redirect(`/pets/${petId}`);
            });
    }

    let showEditDelBtn = Boolean(ctx.user != undefined && pet._ownerId == userId);
    let showDonateBtn = Boolean(ctx.user != undefined && pet._ownerId != userId && !isDonate);
 
    ctx.render(detailsTemplate(pet, onClick, petDonates, showEditDelBtn, showDonateBtn));
};