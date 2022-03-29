import { html } from '../lib.js';
import * as userService from '../services/users.js';

const loginTemplate = (submitHandler) => html`
    <section id="login-page" class="login">
        <form @submit=${submitHandler} id="login-form" action="" method="">
            <fieldset>
                <legend>Login Form</legend>
                <p class="field">
                    <label for="email">Email</label>
                    <span class="input">
                        <input type="text" name="email" id="email" placeholder="Email">
                    </span>
                </p>
                <p class="field">
                    <label for="password">Password</label>
                    <span class="input">
                        <input type="password" name="password" id="password" placeholder="Password">
                    </span>
                </p>
                <input class="button submit" type="submit" value="Login">
            </fieldset>
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
            window.alert('Invalid  empty fields');
        }
    }
    ctx.render(loginTemplate(submitHandler));

}