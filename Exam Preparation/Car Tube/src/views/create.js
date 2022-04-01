import { html } from '../lib.js';

import * as cars from '../services/cars.js';
import { dataValidator, positiveValue } from '../services/validator.js';

const createTemplate = (submitHandler) => html`
    <section id="create-listing">
        <div class="container">
            <form @submit=${submitHandler}  id="create-form">
                <h1>Create Car Listing</h1>
                <p>Please fill in this form to create an listing.</p>
                <hr>

                <p>Car Brand</p>
                <input type="text" placeholder="Enter Car Brand" name="brand">

                <p>Car Model</p>
                <input type="text" placeholder="Enter Car Model" name="model">

                <p>Description</p>
                <input type="text" placeholder="Enter Description" name="description">

                <p>Car Year</p>
                <input type="number" placeholder="Enter Car Year" name="year">

                <p>Car Image</p>
                <input type="text" placeholder="Enter Car Image" name="imageUrl">

                <p>Car Price</p>
                <input type="number" placeholder="Enter Car Price" name="price">

                <hr>
                <input type="submit" class="registerbtn" value="Create Listing">
            </form>
        </div>
    </section>`;

export const createView = (ctx) => {
    const submitHandler = (e) => {
        e.preventDefault();

        const carData = Object.fromEntries(new FormData(e.currentTarget));
        if (dataValidator(carData)) {
            return alert('All fileds should be filled');
        };
        carData.year = Number(carData.year);
        carData.price = Number(carData.price);
        if (!positiveValue(carData.year) || !positiveValue(carData.price)) {
            return alert('Field must be positive!');
        };
        cars.create(carData)
            .then(() => {
                ctx.page.redirect('/catalog');
            })
            .catch(err => {
                alert(err);
            });
    }
    ctx.render(createTemplate(submitHandler));
}