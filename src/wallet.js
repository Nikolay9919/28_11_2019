var glob = require("glob");
var fs = require("fs");

var generateWallet = function() {

    return {
        id: 'Mihail Petrov',
        amount: 0
    };
};


var saveWallet = function(walletObject) {

    var walletStringRepresentation = JSON.stringify(walletObject);
    fs.writeFileSync('_meta/_wallet', walletStringRepresentation);
};


var getWallets = function(walletId) {

}

module.exports = {
    generateWallet: generateWallet,
    saveWallet: saveWallet
}

var _inArray = function(needle, haystack) {
    for (var k in haystack) {
        if (haystack[k] === needle) {
            return true;
        }
    }
    return false;
}

// function getWallets(walletId) {
//     glob("_meta/", function(err, files) { // read the folder or folders if you want: example json/**/*.json
//         if (err) {
//             console.log("cannot read the folder, something goes wrong with glob", err);
//         }
//         var matters = [("", "")];
//         files.forEach(function(file) {
//             fs.readFile(file, 'utf8', function(err, data) { // Read each file
//                 if (err) {
//                     console.log("cannot read the file, something goes wrong with the file", err);
//                 }
//                 var user = JSON.parse(data);
//                 user.wallets.forEach(function(crud) {
//                     if (crud.walletId == walletId) {
//                         matters.push((crud.name, crud.id))
//                     }
//                     // for(var k in crud) {
//                     //   if(_inArray(crud[k].providedAction, matters)) {
//                     //     // do your magic HERE
//                     //     console.log("duplicate founded!");
//                     //     // you want to return here and cut the flow, there is no point in keep reading files.
//                     //     break;
//                     //   }
//                     //   matters.push(crud[k].providedAction);
//                     // }

//                 })
//             });
//         });
//     });
// }

// # Valid way of writing exports
// module.exports = {
//     generateWallet  : genefunction() {

//         return {
//             id      : 'Mihail Petrov',
//             amount  : 0
//         };
//     }ateWallet,
//     saveWallet      : function(walletObject) {
//         fs.writeFileSync('_meta/_wallet', walletObject);
//     }
// }