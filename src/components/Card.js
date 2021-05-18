import React, { useState, useEffect } from 'react';
import classes from './Card.module.css';
import ContractExtracted from './ContractExtracted';
import NetworkStates from './NetworkStates';
import Refresh from './Refresh';
import TronlinkFunctions from './TronlinkFunctions';

const TronWeb = require('tronweb');
let privateKey = process.env.PK;
const HttpProvider = TronWeb.providers.HttpProvider;

// tronWeb.setHeader({ 'xxxxxxxxxxxxxxxxxxxxxxxx': 'your api key' });

// shasta - TEvrLVLkcDpnSZb9G6AwVnWAR91SbTLBa1
//nile - TQb1aN3aXVoZM2kikSoZfFbXda4hK8R44w
//MAINNET - TSYmsMxx2m9b5o8ZDLXT2fAGSXNY2RgDL6
//MAIN USDT - TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t

const Card = () => {
  const [myAddress, setmyAddress] = useState('Loading...');
  const [contrAdrress, setcontrAdrress] = useState('');
  const [contractName, setcontractName] = useState('null');
  const [fetchedFuncs, setFetchedFuncs] = useState([]);
  const [network, setNetwork] = useState('SHASTA');
  //set nodes
  const [fullNode, setfullNode] = useState('https://api.shasta.trongrid.io');
  const [solidityNode, setSolidityNode] = useState(
    'https://api.shasta.trongrid.io'
  );
  const [eventServer, setEventServer] = useState(
    'https://api.shasta.trongrid.io'
  );
  const tronWeb = new TronWeb(fullNode, solidityNode, eventServer, privateKey);

  useEffect(() => {
    fetchAddressfromTronlink();
  });

  const changeNetworkHandler = (net) => {
    if (net === 'SHASTA') {
      setfullNode('https://api.shasta.trongrid.io');
      setSolidityNode('https://api.shasta.trongrid.io');
      setEventServer('https://api.shasta.trongrid.io');

      setNetwork('SHASTA');
    } else if (net === 'MAIN') {
      setfullNode(new HttpProvider('https://api.trongrid.io'));
      setSolidityNode(new HttpProvider('https://api.trongrid.io'));
      setEventServer(new HttpProvider('https://api.trongrid.io'));

      setNetwork('MAIN');
    } else if (net === 'NILE') {
      setfullNode('https://api.nileex.io');
      setSolidityNode('https://api.nileex.io');
      setEventServer('https://api.nileex.io');
      setNetwork('NILE');
    }
  };

  const fetchAddressfromTronlink = async () => {
    try {
      setTimeout(() => {
        setmyAddress(window.tronWeb.defaultAddress.base58);
      }, 1000);
    } catch (error) {
      console.error('not able to fetch ', error);
      setmyAddress(error);
    }
  };

  const getContractName = async () => {
    fetchAddressfromTronlink();
    try {
      //   let contract = await tronWeb.contract().at(contrAdrress);
      //   let result = await contract.name().call();
      let contract = await tronWeb.trx.getContract(contrAdrress);
      let result = await contract.name;
      setcontractName(result);
      setFetchedFuncs(contract.abi.entrys);
    } catch (error) {
      console.error('trigger smart contract error', error);
      setcontractName(error);
    }
  };

  const contractImputHandler = (event) => {
    event.preventDefault();
    setcontrAdrress(event.target.value);
  };

  const doSomething = async () => {
    var tronweb = window.tronWeb;
    const tx = await tronweb.transactionBuilder.sendTrx(
      'TGupi94VaCpm9DaTvne6WaytYbTLA69m5Y',
      1000000,
      myAddress
    );
    const signedTx = await tronweb.trx.sign(tx);
    const broastTx = await tronweb.trx.sendRawTransaction(signedTx);
    console.log(broastTx);
  };

  const sendTokens = async () => {
    const privateKey = 'XXX';

    const addressList = [
      { userAdr: 'TGupi94VaCpm9DaTvne6WaytYbTLA69m5Y', userAmount: 1000000 },
    ];
    const timInterval = 2;

    // var toAddress = 'TGupi94VaCpm9DaTvne6WaytYbTLA69m5Y'; //address _to
    // var amount = 10000000; //amount 10,000000 = 10 TRX

    //Creates an unsigned TRX transfer transaction
    console.log('Loading..');
    const promises = addressList.map(
      (address, i) =>
        new Promise((resolve) =>
          setTimeout(async () => {
            const tradeobj = await tronWeb.transactionBuilder.sendTrx(
              address.userAdr,
              address.userAmount,
              myAddress
            );
            const signedtxn = await tronWeb.trx.sign(tradeobj, privateKey);
            const receipt = await tronWeb.trx.sendRawTransaction(signedtxn);
            console.log('- Output:', receipt, '\n');

            console.log(
              'address:' + address.userAdr,
              'amount to send: ' + address.userAmount + ' TRX'
            );

            resolve();
          }, timInterval * 1000 * addressList.length - timInterval * 1000 * i)
        )
    );
    Promise.all(promises).then(() => console.log('all done'));
  };

  return (
    <div className={classes.cardGrid}>
      <div className={classes.card}>
        <div className={classes.header}>
          <div className={classes.headerTop}>
            <NetworkStates
              networkState={network}
              changeNetwork={changeNetworkHandler}
            />
            <Refresh fetchAddress={fetchAddressfromTronlink} />
          </div>
          <h1>SMART CONTRACT GUI</h1>
        </div>
        <p className={classes.myAddress}>
          Network (<b>{network}</b>): {myAddress}
        </p>

        <div className={classes.content}>
          <h4>Smart contract name: {contractName}</h4>

          <div className={classes.functionLi}>
            {fetchedFuncs.map((func) => (
              <ContractExtracted
                functionName={func.name}
                id={func.id}
                key={Math.random()}
                stateMutability={func.stateMutability}
              />
            ))}
          </div>

          <input
            type="text"
            onChange={contractImputHandler}
            className={classes.inputField}
          ></input>
          <div>
            <br></br>
          </div>
          <button onClick={getContractName} className={classes.contrctButton}>
            Get smart contract details
          </button>
          <div>
            <button onClick={sendTokens} className={classes.contrctButton2}>
              SendToken without tronlink
            </button>
          </div>
          <TronlinkFunctions clicked={doSomething} />
        </div>

        <div className={classes.foot}>
          <h4>App Version - 0.03 beta</h4>
        </div>
      </div>
    </div>
  );
};

export default Card;
