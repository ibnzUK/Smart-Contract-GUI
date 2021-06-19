![Preview](src/assets/screenshot.png)


Working Demo: https://tron-gui.ibnz.dev/

This is a React, Tronweb, Tronlink experimental application to fetch Smart contract details and interact with smart contracts on TRON blockchain, Main Net, Nile Test Net, Shasta Test Net. 

## Community coders, please commit

Feel free to add extra functions or improvements, This helps me to familiarise myself with source control and open source project managing. By contributing you also help to build yet another open-source tool on TRON Network. 

-----

## Experimental contracts for GUI testing:

* SHASTA   - `TWZYhE3WWAupJQ7KxKiwQDPkn1BGeM7PDJ` (Multiple Input Test, Set message, Read the message, Read Number, Change Data, Addition)
* SHASTA - `TKWrw9VyRuvqg9n4oLdPMhbDLLgGutt1YV`  (Array Demo for payable and nonpayable functions)
* NILE - `TEjqDGMwDHqrXCzq7fWH8J63L1MWhc1msw` (NILE - Multiple Input Test, Set message, Read the message, Read Number, Change Data, Addition)
* MAINNET - `TSYmsMxx2m9b5o8ZDLXT2fAGSXNY2RgDL6` (HummingDrop trc20 Token Airdrop)
* MAIN  - `TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t` (USDT Token)




## Running instructions

- Copy project to your directory ( git clone https://github.com/ibnzUK/smart-contract-gui )
- navigate to _smart-contract-gui_ project directory
- make sure you have node.js installed on your machine
- install project packages (npm install)
- replace privateKey = 'xxx'; with your PK and store it in .env file
- if you planning to use trongrid API add your keys to .env
- start a project (npm run start)
- make sure you have Tronlink wallet installed (https://www.tronlink.org/)
- select network for your contract and enter smart contract address 
- if tronlink is not initialised, or you change wallet, refresh page or click on refresh button on the application right corner 




## Changes in V 0.02

- Integrated ability to refresh GUI (mainly after Tronlink address swap)
- Added experimental Tronlink trigger option for cryptocurrency sending
- Added ability to select test net Nile, Shasta or Main Tron network
- UI Improvements

## Changes in V 0.03

- Added ability to get Smart contract details
- Added ability to fetch and render Smart contract functions
- Added grid for Smart contract rendering
- Optimised UI for a large list of functions

## Changes in V 0.04

- Sorting functions into read-only, trigger and input
- Implemented ability to check free contract functions 

## Changes in V 0.05

- Added ability to trigger functions without input with tronlink
- Added input argument number counter
- Sorting inputs by type


## Changes in V 0.06

- Added placeholders for the user to identify type and name
- Mapping inputs as new components 
- Fixed issue with a contract when not able to load after a quick swap
- Ability to detect when contract does not exist on chain
- Displaying transaction hash after function trigger

## Changes in V 0.07

- Added ability to submit multiple fields at once 
- Implemented project support (donation)
- Fixed styling
- Optimised for mobile experience

## Changes in V 0.08

- Added ability to view array elements
- Added ability to submit arrays on payable functions
- Implemented Return values for array triggering






