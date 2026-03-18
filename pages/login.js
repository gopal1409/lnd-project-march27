function login(){
document.getElementById("app").innerHTML=`
<div class="auth">
<h2>Admin Login</h2>
<p class="form-copy">Use your admin username and password to add new course details.</p>
<input id="email" placeholder="Admin username">
<input id="pass" type="password" placeholder="Password">
<button id="loginSubmit" onclick="loginAction()">Login</button>
<p id="loginFeedback" class="form-feedback"></p>
</div>`;
}
