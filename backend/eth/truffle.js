module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
    // contracts_build_directory: "../../../frontend/src/contracts",
    networks: {
        development: {
            host: "localhost",
            port: 8545,
            network_id: "*", // Match any network id // 19071 / *
            gas: 4712388
        }
    },

    solc: {
        optimizer: {
            enabled: true,
            runs: 200
        }
    }
};
