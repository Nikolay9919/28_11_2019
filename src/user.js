var fs = require('fs');
var filePath = "_meta/"
var util = require('../util/util');

var generateUser = function(userName) {

    return {
        user: {
            name: userName,
            id: util.encryptWith.sha256(userName)
        },
        wallets: [{
                walletId: util.encryptWith.sha256(userName + "First Coin"),
                name: "First Coin",
                amount: 0
            },
            {
                walletId: util.encryptWith.sha256(userName + "second Coin"),
                name: "second Coin",
                amount: 0
            },
            {
                walletId: util.encryptWith.sha256(userName + "Third Coin"),
                name: "Third Coin",
                amount: 0
            }
        ]

    };
}



var saveUser = function(userObject) {

    var userStringRepresentation = JSON.stringify(userObject);
    // console.log(userObject.user.name);
    var userDirectory = filePath + userObject.user.name
    console.log(unicFilePath);

    if (fs.existsSync(userDirectory)) {
        alert("Registered user")
    } else {
        fs.mkdirSync(userDirectory)
        var unicFilePath = userDirectory + "/" + userObject.user.name + ".json"
        fs.writeFileSync(unicFilePath, userStringRepresentation)
    }
};

var writeUserSession = function(userObject) {
    var unicFilePath = filePath + "currentSession.json"
    console.log(unicFilePath);

    if (fs.existsSync(unicFilePath)) {
        fs.unlinkSync(unicFilePath)
    }
    console.log(userObject);
    var userStringRepresentation = JSON.stringify(userObject);

    fs.writeFileSync(unicFilePath, userStringRepresentation)
}

var checkForLogin = function(userName) {
    var unicFilePath = filePath + "/" + userName + "/" + userName + ".json"
    console.log(unicFilePath);

    if (fs.existsSync(unicFilePath)) {
        fs.readFile(unicFilePath, 'utf8', (err, jsonString) => {
            if (err) {
                alert(err)
            } else {
                const userObject = JSON.parse(jsonString)
                console.log(userObject)
                writeUserSession(userObject)
            }
        })

    }
}

var deleteCurrentSession = function() {
    var unicFilePath = filePath + "currentSession.json"
    fs.unlinkSync(unicFilePath)
}

var getUserObjectForCurrentSession = function() {
    var unicFilePath = filePath + "currentSession.json"

    var user;

    if (fs.existsSync(unicFilePath)) {

        console.log(unicFilePath);

        fs.readFileSync(unicFilePath, 'utf8', (err, jsonString) => {
            if (err) {
                alert(err)
                console.log(err)

            } else {
                const user = JSON.parse(jsonString)
                console.log(user)
                return user;
            }
        })
    } else {
        console.log(unicFilePath);

        alert("Error")
        return null
    }

}




var isValidSession = function() {
    var unicFilePath = filePath + "currentSession.json"
    if (fs.exists(unicFilePath)) return true
    else return false
}



var loginUser = function(id) {
    var unicFilePath = filePath
}

module.exports = {
    saveUser: saveUser,
    generateUser: generateUser,
    checkForLogin: checkForLogin,
    getUserObjectForCurrentSession: getUserObjectForCurrentSession,
    deleteCurrentSession: deleteCurrentSession,
    isValidSession: isValidSession
}