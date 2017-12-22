var IzxDriveToken = artifacts.require("token/IzxDriveToken");

contract('IzxDriveToken', function(accounts) {


    it("should be deployed", function (done) {

        IzxDriveToken.deployed().then(function (instance) {
            assert.isTrue(!!instance.address);
        }).then( function(){
            done();
        });

    });

    it("should compute sha256", function (done) {

        var token,v1;
        IzxDriveToken.deployed().then(function (instance) {
            token = instance;
        }).then( function(){
            return token.key_hash256('0x1');
        }).then( function(value){
            v1 = value.toString(16);
            return token.key_hash256('0x2');
        }).then( function(value){
            var v2 = value.toString(16);
            assert.isTrue(v1!=v2);
            done();
        });

    });

});
