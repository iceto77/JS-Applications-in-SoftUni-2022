import { html } from '../lib.js';
import { showNotification } from '../services/showNotification.js';
import * as userService from '../services/users.js';
import { userValidator } from '../services/validator.js';

const registerTemplate = (submitHandler) => html`
<section id="register">
    <form @submit=${submitHandler} id="register-form">
        <div class="container">
            <h1>Register</h1>
            <label for="username">Username</label>
            <input id="username" type="text" placeholder="Enter Username" name="username">

            <label for="email">Email</label>
            <input id="email" type="text" placeholder="Enter Email" name="email">

            <label for="password">Password</label>
            <input id="password" type="password" placeholder="Enter Password" name="password">

            <label for="repeatPass">Repeat Password</label>
            <input id="repeatPass" type="password" placeholder="Repeat Password" name="repeatPass">

            <div class="gender">
                <input type="radio" name="gender" id="female" value="female">
                <label for="female">Female</label>
                <input type="radio" name="gender" id="male" value="male" checked>
                <label for="male">Male</label>
            </div>

            <input type="submit" class="registerbtn button" value="Register">
            <div class="container signin">
                <p>Already have an account?<a href="/login">Sign in</a>.</p>
            </div>
        </div>
    </form>
</section>`;

export const registerView = (ctx) => {
    const submitHandler = (e) => {
        e.preventDefault();
        const regData = Object.fromEntries(new FormData(e.currentTarget));
        const { password, repeatPass } = regData;
        if (userValidator(regData)) {

            //alert('Invalid  empty fields');
            return showNotification('Invalid  empty fields');
        }
        if (repeatPass != password) {
            //alert('Pass missmatch!');
            return showNotification('Pass missmatch!');
        }
        userService.register(regData)
            .then(() => {
                ctx.page.redirect('/catalog');
            })
            .catch(err => {
                showNotification(err.message);
                //alert(err);
            });
    }
    ctx.render(registerTemplate(submitHandler));
}




