

import { Configuration } from '@alephium/cli'

const configuration: Configuration = {
  // The `networks` field specifies configurations for different networks. It supports three types of networks: devnet, testnet, and mainnet
  networks: {
    mainnet: {
      // The `nodeUrl` is the url of the full node
          //   nodeUrl: 'http://localhost:22973',
        nodeUrl: 'https://node.mainnet.alephium.org',
      // The purpose of private key is for deploying contracts. Since Alephium currently has 4 groups,
      // the maximum length of `privateKeys` is 4, and each group can have at most one private key.
      // If you only need to deploy contracts to one group, you only need to specify one private key.
      privateKeys: ['a642942e67258589cd2b1822c631506632db5a12aabcf413604e785300d762a5'],
      // The `confirmations` field is used to specify the number of block confirmations to wait for
      // after contract deployment. This is an optional config. If it is not specified, it defaults
      // to 1 for devnet and 2 for testnet and mainnet.
      confirmations: 1
    }
  }
}

// You must export the `configuration` from the config file
export default configuration