# Intro

For quik iteration over smart contracts and frontend connectors.

# Develop

```npm run frontend``` intitiates webpack vue frontend

```npm run backend``` initiates node express web backend

```npm run eth``` initiates local RPC development eth node

# Getting started

1. Terminal -> ´´´npm run eth´´´. (Opens a Truffle console)
2. In truffle console write -> ´´´migrate´´´. (Deploys contract to local Eth RPC).
2. Open NEW terminal window. Write -> ´´´npm run frontend´´´ (Development frontend in Browser).

Webpack will start you browser on URL http://localhost:8080/#/ and you should see the web application.

After makeing changes to Solidity contracts, just run "migrate --reset" in the truffle console and the frontend should also do a refresh.

![App](http://storage3.static.itmages.com/i/18/0309/h_1520615516_4956393_f30c1f4696.png)

# Troubleshooting

- When "re-booting" the Ethereum RPC, remember to reset your metamask account transaction nounce. ![Metamask transaction nounce](http://storage7.static.itmages.com/i/18/0309/h_1520615869_8453611_ee83786505.png)
- If your getting an error "cannot read address from ... ", run "migrate --reset" in the truffle console.
- When makeing bigger adjustments to some Solidity code that is then reset through migration, if you haveing trouble with unexpected results. Deletes the contracts from ./backend/eth/build/contracts and do a "migrate --reset"*[]:
