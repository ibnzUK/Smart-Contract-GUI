import React, { useState, useEffect } from 'react';
import classes from './Card.module.css';

const TronWeb = require('tronweb');
let privateKey =
  'xxx';
const HttpProvider = TronWeb.providers.HttpProvider;

// tronWeb.setHeader({ 'f51b366a-80b4-44de-8b35-5d0f26370900': 'your api key' });

// shasta - TEvrLVLkcDpnSZb9G6AwVnWAR91SbTLBa1
//nile - TQb1aN3aXVoZM2kikSoZfFbXda4hK8R44w

// let tronlinkAddress = getAddressFromTronlink;

const Card = () => {
  const [myAddress, setmyAddress] = useState('n');
  const [contrAdrress, setcontrAdrress] = useState('');
  const [contractName, setcontractName] = useState('null');
  const [network, setNetwork] = useState('SHASTA Testnet');
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
    doSomething();
  });

  const changeNetworkHandler = () => {
    if (network === 'SHASTA Testnet') {
      setfullNode(new HttpProvider('https://api.trongrid.io'));
      setSolidityNode(new HttpProvider('https://api.trongrid.io'));
      setEventServer(new HttpProvider('https://api.trongrid.io'));

      setNetwork('MAINNET');
    } else {
      setfullNode('https://api.shasta.trongrid.io');
      setSolidityNode('https://api.shasta.trongrid.io');
      setEventServer('https://api.shasta.trongrid.io');
      setNetwork('SHASTA Testnet');
    }
  };

  const doSomething = async () => {
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
    try {
      //   let contract = await tronWeb.contract().at(contrAdrress);
      //   let result = await contract.name().call();
      let contract = await tronWeb.trx.getContract(contrAdrress);
      let result = await contract.name;
      setcontractName(result);

      console.log(contract.abi.entrys[1].name);
    } catch (error) {
      console.error('trigger smart contract error', error);
      setcontractName(error);
    }
  };

  const contractImputHandler = (event) => {
    event.preventDefault();
    setcontrAdrress(event.target.value);
  };

  return (
    <div className={classes.cardGrid}>
      <div className={classes.card}>
        <div className={classes.header}>
          <h1>SMART CONTRACT GUI</h1>
        </div>
        <div className={classes.content}>
          <p>selected network: {network}</p>
          <button onClick={changeNetworkHandler}>
            Change to{' '}
            {network === 'SHASTA Testnet' ? `MAINNET` : 'SHASTA Testnet'}{' '}
          </button>

          <p>{myAddress}</p>
          <button onClick={doSomething}>Fetch Address</button>
          <br></br>
          <p>Smart contract name: {contractName}</p>
          <input
            type="text"
            onChange={contractImputHandler}
            className={classes.inputField}
          ></input>
          <div>
            <br></br>
          </div>
          <button onClick={getContractName}>Get smart contract name</button>
        </div>

        <div className={classes.foot}>
          <h4>App Version - 00.01 beta</h4>
        </div>
      </div>
    </div>
  );
};

export default Card;
