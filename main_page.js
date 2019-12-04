// var myWallet = require('./src/wallet');
var myBlockchain = require('./src/blockchain');
var myUtil = require('./util/util');
var myUser = require('./src/user')
var fs = require('fs');
var uiWalletTransaction = document.getElementById("wallet-transaction-panel");
var modal = document.getElementById("myModal");
var span = document.getElementsByClassName("close")[0];

var filePath = "_meta/"

var currentUserSession;

function checkForuserSession() {


    if (currentUserSession == null) window.location.replace("./index.html")

    var unicFilePath = filePath + "currentSession.json"

    var user;

    if (!fs.existsSync(unicFilePath)) {

        console.log(unicFilePath);

        alert("Error")

    } else {


        console.log(unicFilePath);

        fs.readFile(unicFilePath, 'utf8', (err, jsonString) => {
            if (err) {
                alert(err)
                console.log(err)

            } else {
                const user = JSON.parse(jsonString)
                console.log(user);
                if (user == null) window.close()
                else {
                    currentUserSession = user
                }

            }
        })

    }
}


function openSlideMenu() {
    document.getElementById('menu').style.width = '250px';
    document.getElementById('content').style.marginLeft = '250px';
    console.log(currentUserSession);

}

function closeSlideMenu() {
    console.log(currentUserSession);
    document.getElementById('menu').style.width = '0';
    document.getElementById('content').style.marginLeft = '0';
}

function showFirtsCoin() {
    closeSlideMenu()
    deleteWalletPanel()

    var array = readAllFile(currentUserSession.user.name, "First Coin")

    showList(array, "First Coin")
}

function showList(array, walletName) {
    var template = '';
    var stringBuilder = [];

    setTimeout(function() {
        console.log(array);

        for (i = 0; i < array.length; i++) {
            var id = 0;
            console.log(array[i].wallets);
            var username = array[i].user.name;
            for (e = 0; e < array[i].wallets.length; e++) {
                if (array[i].wallets[e].name == walletName) {
                    id = array[i].wallets[e].walletId;
                }


            }
            template = '<a href="#" class="list-group-item"><small>' + "Username: " + username + '</small>' +
                '<button id=' + id + ' onclick="openModal(this.id)" data-counter">Send</button>' +
                '</a>'
            stringBuilder.push(template);
        }

        uiWalletTransaction.innerHTML = stringBuilder.join('');
    }, 500)


}

function openModal(id) {

    var money = document.getElementById("money");
    var sendMoneyButton = document.getElementById("sendMoney");

    console.log(id);
    modal.style.display = "block";

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
    span.onclick = function() {
        modal.style.display = "none";

    }

    sendMoneyButton.onclick = function() {
        console.log(money.value);

        sendMoneyTo(id, money.value)
    }
}





function showSecondCoin() {
    closeSlideMenu()
    deleteWalletPanel()

    var array = readAllFile(currentUserSession.user.name, "second Coin")

    showList(array, "second Coin")

}

function showThirdCoin() {
    closeSlideMenu()
    deleteWalletPanel()

    var array = readAllFile(currentUserSession.user.name, "Third Coin")

    showList(array, "Third Coin")

}

function deleteWalletPanel() {
    uiWalletTransaction.innerHTML = ''
}


window.onbeforeunload = function() {
    myUser.deleteCurrentSession()
}

function readAllFile(userName, wallet) {
    var stringBasic = [];

    fs.readdirSync(filePath).forEach(file => {
        if (file != userName) {

            if (fs.statSync(filePath + file).isDirectory()) {
                var buffer;

                fs.readFile(filePath + file + '/' + file + '.json', 'utf8', (err, jsonString) => {
                    if (err) {
                        alert(err)
                        console.log(err)
                    } else {


                        const user = JSON.parse(jsonString + ' ')

                        var index = takeIndex(user, wallet);


                        if (wallet == user.wallets[index].name) {
                            stringBasic.push(user)
                        }
                    }
                })


            }
        }
    });
    console.log(stringBasic);

    return stringBasic;
}

function sendMoneyTo(walletId, money) {
    fs.readdirSync(filePath).forEach(file => {

        if (fs.statSync(filePath + file).isDirectory()) {
            var buffer;

            fs.readFile(filePath + file + '/' + file + '.json', 'utf8', (err, jsonString) => {
                if (err) {
                    alert(err)
                    console.log(err)
                } else {


                    const user = JSON.parse(jsonString + ' ')

                    console.log(user);

                    var index = takeIndexForWalletId(user, walletId);

                    console.log(index);

                    if (walletId == user.wallets[index].walletId) {
                        console.log(user.wallets[index].walletId);
                        console.log(currentUserSession.wallets[index].amount);

                        console.log(filePath + file + '/' + file + '.json')
                        if (currentUserSession.wallets[index].amount < money) {
                            alert("NO MONEY")
                        } else {

                            currentUserSession.wallets[index].amount -= parseInt(money)
                            console.log(currentUserSession.wallets[index].amount);
                            fs.writeFileSync(filePath + currentUserSession.user.name + '/' + currentUserSession.user.name + '.json', JSON.stringify(currentUserSession))
                            user.wallets[index].amount += parseInt(money)
                            console.log(user.wallets[index].amount);

                            fs.writeFileSync(filePath + file + '/' + file + '.json', JSON.stringify(user))
                            alert("SUCCES")
                        }

                    }
                }
            })


        }

    });
}

function takeIndex(object, wallet) {


    for (i = 0; i < object.wallets.length; i++) {
        if (object.wallets[i].name == wallet) return i
    }
    return null
}

function takeIndexForWalletId(object, wallet) {


    for (i = 0; i < object.wallets.length; i++) {
        if (object.wallets[i].walletId == wallet) return i
    }
    return null
}

function readFromFile(unicFilePath) {
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
}