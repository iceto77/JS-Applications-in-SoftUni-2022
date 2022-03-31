import { html } from '../lib.js';
import { showNotification } from '../services/showNotification.js';
import * as userService from '../services/users.js';

const loginTemplate = (submitHandler) => html`
<section id="login">
    <form @submit=${submitHandler}id="login-form">
        <div class="container">
            <h1>Login</h1>
            <label for="email">Email</label>
            <input id="email" placeholder="Enter Email" name="email" type="text">

            <label for="password">Password</label>
            <input id="password" type="password" placeholder="Enter Password" name="password">

            <input type="submit" class="registerbtn button" value="Login">
            <div class="container signin">
                <p>Dont have an account?<a href="/register">Sign up</a>.</p>
            </div>
        </div>
    </form>
</section>`;

export const loginView = (ctx) => {
    const submitHandler = (e) => {
        e.preventDefault();
        const { email, password } = Object.fromEntries(new FormData(e.currentTarget));
        if (email != '' && password != '') {
            userService.login(email, password)
                .then((res) => {
                    ctx.page.redirect('/catalog');
                })
                .catch(err => {
                    showNotification(err.message);
                    //window.alert(err);
                });
        } else {
            showNotification('Invalid  empty fields');
            //alert('Invalid  empty fields');
        }
    }
    ctx.render(loginTemplate(submitHandler));
}