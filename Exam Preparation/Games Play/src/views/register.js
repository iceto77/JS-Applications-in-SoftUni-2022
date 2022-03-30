import { html } from '../lib.js';
import * as userService from '../services/users.js';

const registerTemplate = (submitHandler) => html`
    <section id="register-page" class="content auth">
        <form @submit=${submitHandler} id="register">
            <div class="container">
                <div class="brand-logo"></div>
                <h1>Register</h1>

                <label for="email">Email:</label>
                <input type="email" id="email" name="email" placeholder="maria@email.com">

                <label for="pass">Password:</label>
                <input type="password" name="password" id="register-password">

                <label for="con-pass">Confirm Password:</label>
                <input type="password" name="confirm-password" id="confirm-password">

                <input class="btn submit" type="submit" value="Register">

                <p class="field">
                    <span>If you already have profile click <a href="/login">here</a></span>
                </p>
            </div>
        </form>
    </section>`;


export const registerView = (ctx) => {
    const submitHandler = (e) => {
        e.preventDefault();
        const { email, password, ['confirm-password']: repeatPass } = Object.fromEntries(new FormData(e.currentTarget));
        if (email == '' || password == '') {
            alert('Invalid  empty fields');
            return;
        }
        if (repeatPass != password) {
            alert('Pass missmatch!');
            return;
        }
        userService.register(email, password)
            .then(() => {
                ctx.page.redirect('/');
            })
            .catch(err => {
                alert(err);
            });
    }
    ctx.render(registerTemplate(submitHandler));
}




