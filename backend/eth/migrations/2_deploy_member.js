const fs = require('fs-extra')
const Base = artifacts.require("./Base.sol");

module.exports = function (deployer) {
    let baseInstance;

    deployer.deploy(Base)
        .then(() => Base.deployed()
            .then((instance) => baseInstance = instance)
        )
        // .then(() => { //Do something } )At this point we have deployed the Base contract and have the address. We could not deploy another contract and make the base contract address the owner of this new contract with luckyInstance.address .
        // Copy files to frontend app.
        .then(() => fs.copy('./build/contracts', '../../frontend/src/contracts')
            .then(() => console.log('Files copied to frontend'))
            .catch(err => console.error(err)) )
};