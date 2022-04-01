import { html } from '../lib.js';
import * as userService from '../services/users.js';


const loginTemplate = (submitHandler) => html`
    <section id="login">
        <div class="container">
            <form @submit=${submitHandler} id="login-form" action="POST" method="post">
                <h1>Login</h1>
                <p>Please enter your credentials.</p>
                <hr>

                <p>Username</p>
                <input placeholder="Enter Username" name="username" type="text">

                <p>Password</p>
                <input type="password" placeholder="Enter Password" name="password">
                <input type="submit" class="registerbtn" value="Login">
            </form>
            <div class="signin">
                <p>Dont have an account?
                    <a href="/register">Sign up</a>.
                </p>
            </div>
        </div>
    </section>`;


export const loginView = (ctx) => {
    const submitHandler = (e) => {
        e.preventDefault();
        const { username, password } = Object.fromEntries(new FormData(e.currentTarget));
        if (username != '' && password != '') {

            userService.login(username, password)
                .then(() => {
                    ctx.page.redirect('/catalog');
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