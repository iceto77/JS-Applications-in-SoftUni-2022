import { html } from '../lib.js';
import * as userService from '../services/users.js';

const loginTemplate = (submitHandler) => html`
    <section id="loginPage">
        <form @submit=${submitHandler} class="loginForm">
            <img src="./images/logo.png" alt="logo" />
            <h2>Login</h2>

            <div>
                <label for="email">Email:</label>
                <input id="email" name="email" type="text" placeholder="steven@abv.bg" value="">
            </div>

            <div>
                <label for="password">Password:</label>
                <input id="password" name="password" type="password" placeholder="********" value="">
            </div>

            <button class="btn" type="submit">Login</button>

            <p class="field">
                <span>If you don't have profile click <a href="/register">here</a></span>
            </p>
        </form>
    </section>`;

export const loginView = (ctx) => {
    const submitHandler = (e) => {
        e.preventDefault();
        const { email, password } = Object.fromEntries(new FormData(e.currentTarget));
        if (email != '' && password != '') {

            userService.login(email, password)
                .then(() => {
                    ctx.page.redirect('/');
                })
                .catch(err => {
                    window.alert(err);
                });
        } else {
            alert('Invalid  empty fields');
        }
    }
    ctx.render(loginTemplate(submitHandler));
}