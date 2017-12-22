var IzxDriveToken = artifacts.require("token/IzxDriveToken");


module.exports = function(deployer) {

    deployer.deploy(IzxDriveToken).then(function() {
        return IzxDriveToken.deployed();
    }).then(function(instance) {
        console.log("Deployed IzxDriveToken at "+instance.address);
    });

};
