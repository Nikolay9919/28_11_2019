var user = require('./src/user');
const crypto = require('crypto');

document.getElementById("signUp").onclick = function() {
    // var email = document.getElementById("emailSignUp").innerHTML
    // var pass = document.getElementById("passSignUp").innerHTML
    // var md5sum = crypto.createHash('md5')
    // var hash = md5sum.update(email + pass)
    // var digest = hash.digest("hex")
    // var generatedObj = user.generateWallet(digest)
    // user.saveUser(generatedObj);
    var userName = document.getElementById("userNameSignUp").value
    console.log(userName);

    var userObject = user.generateUser(userName)
    console.log(userObject);

    user.saveUser(userObject)
}

document.getElementById("signIn").onclick = function() {
    var userName = document.getElementById("Hash").value;
    console.log(userName);
    user.checkForLogin(userName)
    if (user.isValidSession) window.location.replace("./main.html");
    else alert("Error 1")
}