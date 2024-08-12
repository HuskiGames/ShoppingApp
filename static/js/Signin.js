function ToggleSignInPage() {
    if (document.getElementById("SignInPage").getAttribute("SignInPageVisible") == "true") {
        document.getElementById("SignInPage").setAttribute("SignInPageVisible", false);
        document.getElementById("SignInPage").classList.remove("SignInPageVisible")
    }
    else {
        document.getElementById("SignInPage").setAttribute("SignInPageVisible", true);
        document.getElementById("SignInPage").classList.add("SignInPageVisible")
    }

}

function SignInButton_Clicked() {
    fname = fUsername.value;
    fpass = fPassword.value;

    $.ajax({
        type: 'POST',
        url: '/Signin',
        data: { name: fname, pass: fpass },
        success: function (response) {
            if (response.SignedIn == "True") {
                document.getElementById("SignInPage").setAttribute("SignInPageVisible", false);
                document.getElementById("SignInPage").classList.remove("SignInPageVisible")
                document.getElementById("AdminControls").removeAttribute("hidden")
                window.localStorage.setItem("key", response.Token);
            }
            else {
                document.getElementById("fErrors").innerHTML = response.Message;
            }
            SignedIn = true;
        }
    })
};
