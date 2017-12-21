var IzxDriveToken = artifacts.require("IzxDriveToken");


module.exports = function(deployer) {

    deployer.deploy(IzxDriveToken).then(function() {
        return IzxDriveToken.deployed();
    }).then(function(instance) {
        console.log("Deployed IzxDriveToken at "+instance.address);
    });

};
