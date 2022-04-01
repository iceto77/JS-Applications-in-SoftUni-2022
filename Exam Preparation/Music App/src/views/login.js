import { html } from "../lib.js";
import * as userService from "../services/users.js";

const loginTemplate = (submitHandler) => html`
  <section id="loginPage">
    <form @submit=${submitHandler}>
        <fieldset>
            <legend>Login</legend>

            <label for="email" class="vhide">Email</label>
            <input id="email" class="email" name="email" type="text" placeholder="Email">

            <label for="password" class="vhide">Password</label>
            <input id="password" class="password" name="password" type="password" placeholder="Password">

            <button type="submit" class="login">Login</button>

            <p class="field">
                <span>If you don't have profile click <a href="/register">here</a></span>
            </p>
        </fieldset>
    </form>
  </section>`;

export const loginView = (ctx) => {
  const submitHandler = (e) => {
    e.preventDefault();
    const { email, password } = Object.fromEntries(
      new FormData(e.currentTarget)
    );
    if (email != "" && password != "") {
      userService
        .login(email, password)
        .then(() => {
          ctx.page.redirect("/");
        })
        .catch((err) => {
          alert(err);
        });
    } else {
      alert("Invalid  empty fields");
    }
  };
  ctx.render(loginTemplate(submitHandler));
};
