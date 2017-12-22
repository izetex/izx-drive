var IzxGame = artifacts.require("game/IzxGame");


module.exports = function(deployer) {

    deployer.deploy(IzxGame).then(function() {
        return IzxGame.deployed();
    }).then(function(instance) {
        console.log("Deployed IzxGame at "+instance.address);
    });

};
