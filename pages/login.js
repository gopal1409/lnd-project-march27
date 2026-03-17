function login(){
document.getElementById("app").innerHTML=`
<div class="auth">
<h2>Login</h2>
<input id="email" placeholder="email">
<input id="pass" type="password" placeholder="password">
<button onclick="loginAction()">Login</button>
</div>`;
}