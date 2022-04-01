import { html } from '../lib.js';
import * as userService from '../services/users.js';

const registerTemplate = (submitHandler) => html`
    <section id="register">
        <div class="container">
            <form @submit=${submitHandler} id="register-form">
                <h1>Register</h1>
                <p>Please fill in this form to create an account.</p>
                <hr>

                <p>Username</p>
                <input type="text" placeholder="Enter Username" name="username" required>

                <p>Password</p>
                <input type="password" placeholder="Enter Password" name="password" required>

                <p>Repeat Password</p>
                <input type="password" placeholder="Repeat Password" name="repeatPass" required>
                <hr>

                <input type="submit" class="registerbtn" value="Register">
            </form>
            <div class="signin">
                <p>Already have an account?
                    <a href="/login">Sign in</a>.
                </p>
            </div>
        </div>
    </section>`;

export const registerView = (ctx) => {
    const submitHandler = (e) => {
        e.preventDefault();
        const { username, password, repeatPass } = Object.fromEntries(new FormData(e.currentTarget));
        if (username == '' || password == '') {
            alert('Invalid  empty fields');
            return;
        }
        if (repeatPass != password) {
            alert('Pass missmatch!');
            return;
        }
        userService.register({ username, password })
            .then(() => {
                ctx.page.redirect('/catalog');
            })
            .catch(err => {
                alert(err);
            });
    }
    ctx.render(registerTemplate(submitHandler));
}




