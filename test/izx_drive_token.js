var IzxDriveToken = artifacts.require("IzxDriveToken");

contract('IzxDriveToken', function(accounts) {


    it("should be deployed", function (done) {

        IzxDriveToken.deployed().then(function (instance) {
            assert.isTrue(!!instance.address);
        }).then( function(){
            done();
        });

    });


    it("should compute sha", function (done) {

        var token,v1;
        IzxDriveToken.deployed().then(function (instance) {
            token = instance;
        }).then( function(){
            return token.key_hash('0x1');
        }).then( function(value){
            v1 = value;
            return token.key_hash('0x2');
        }).then( function(value){
            assert.isTrue(v1!=value);
            done();
        });

    });



});
