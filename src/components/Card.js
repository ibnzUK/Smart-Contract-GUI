import React, { useState, useEffect } from 'react';
import classes from './Card.module.css';
import ContractExtracted from './ContractExtracted';
import NetworkStates from './NetworkStates';
import Refresh from './Refresh';
import TronlinkFunctions from './TronlinkFunctions';

const TronWeb = require('tronweb');
let privateKey = process.env.PK;
const HttpProvider = TronWeb.providers.HttpProvider;
let tronweb = window.tronWeb;
// tronWeb.setHeader({ 'xxxxxxxxxxxxxxxxxxxxxxxx': 'your api key' });

//Smart Contract Examples
//
//SHASTA Set message, Read message, Read Nnumber, Change Data (add +3 to nmy number)  - TPjGUuQfq6R3FMBmsacd6Z5dvAgrD2rz4n
//shasta - many inputs TMLpuYo3dtMw9q3CWBMH6AqwHM7Pq8eFVZ
//shasta - TEvrLVLkcDpnSZb9G6AwVnWAR91SbTLBa1
//shasta - TLu171ZAKDRGRcnQipLYkyfQGdAJzN7Abv  (Array Demo)
//nile - TQb1aN3aXVoZM2kikSoZfFbXda4hK8R44w
//MAINNET - TSYmsMxx2m9b5o8ZDLXT2fAGSXNY2RgDL6
//MAIN USDT - TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t

const Card = () => {
  const [myAddress, setmyAddress] = useState(null);

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
  let tronWeb = new TronWeb(fullNode, solidityNode, eventServer, privateKey);

  const [contractValue, setContractValue] = useState('null');
  const [contractExtracted, setContractExtracted] = useState([]);

  useEffect(() => {
    //connecting to tron blockchain
    const tronlinkEnabled = async () => {
      fetchAddressfromTronlink();
    };

    tronlinkEnabled();
  }, []);

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
        if (window.tronWeb) {
          setmyAddress(window.tronWeb.defaultAddress.base58);
        } else {
          setmyAddress(null);
        }
      }, 1000);
    } catch (error) {
      console.error('not able to fetch ', error);
      setmyAddress(error);
    }
  };

  const getContractName = async () => {
    fetchAddressfromTronlink();
    try {
      let contract = await tronWeb.trx.getContract(contrAdrress);

      let contractextracted = await tronWeb.contract().at(contrAdrress);
      let result = await contract.name;
      setcontractName(result);
      setContractExtracted(contractextracted.methodInstances);
      setFetchedFuncs(contract.abi.entrys);
      setContractValue(``);
    } catch (error) {
      console.error('trigger smart contract error', error);
      setcontractName(error);
      setFetchedFuncs('');
      setContractExtracted('');
      setContractValue('');
    }
  };

  const contractImputHandler = (event) => {
    event.preventDefault();
    setcontrAdrress(event.target.value);
  };

  const tronlinkTest = async () => {
    const tx = await tronweb.transactionBuilder.sendTrx(
      'TBNZd3tqJuPYTtVGwDeR4wPNgBseX1QbAH',
      100000000,
      myAddress
    );
    const signedTx = await tronweb.trx.sign(tx);
    const broastTx = await tronweb.trx.sendRawTransaction(signedTx);
    console.log(broastTx);
  };

  const callFunctions = async (args, type) => {
    let contract = await tronWeb.contract().at(contrAdrress);
    tronWeb.setAddress(myAddress);

    if (type === 'Free') {
      console.log(args);
      let currentValue = await contract[args].call().call();
      setContractValue(currentValue.toString());
    } else if (type === 'Nonpayable') {
      let contract = await window.tronWeb.contract().at(contrAdrress);
      tronWeb.setAddress(myAddress);

      let transaction = await contract[args].call().send({
        feeLimit: 1000000,
      });

      setContractValue(`Success: ${transaction}`);
    } else {
      const contractFunction = contract.methodInstances[args].functionSelector;

      const options = {
        feeLimit: 100000000,
        callValue: 0,
      };

      // tronlink building transaction
      console.log('type:', type);
      console.log('args:', args);
      const transaction =
        await window.tronWeb.transactionBuilder.triggerSmartContract(
          contrAdrress,
          contractFunction,
          options,
          type,
          myAddress
        );

      //tronlink signing transaction
      const signedTx = await tronweb.trx.sign(transaction.transaction);
      //tronlink broadcasting transaction
      const broastTx = await tronweb.trx.sendRawTransaction(signedTx);
      //need to handle some error here
      // console.log(`Success: ${transaction}`);
      // console.log(`Success: ${broastTx}`);

      console.log(`Success: ${transaction}`);
      // setContractValue(`Success: ${broastTx.txid}`);
    }
  };

  const tesFunction = async () => {
    let contract = await window.tronWeb.contract().at(contrAdrress);
    
    tronWeb.setAddress(myAddress);

    // console.log(contract);
    // let currentValue = await contract.myArray().call('2');

    const parameter = [{type: "uint256", value: 2}];

    const transaction = await tronWeb.transactionBuilder.triggerSmartContract(
      contrAdrress,
      'myArray()',
      {},
      parameter,
      myAddress
    );

    console.log(transaction);





    
  };

  return (
    <div className={classes.cardGrid}>
      <div className={classes.first_border}></div>
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
        {myAddress ? (
          <p className={classes.myAddress}>
            Network (<b>{network}</b>): {myAddress}
          </p>
        ) : (
          <p className={classes.myAddress}>
            <a
              href="https://chrome.google.com/webstore/detail/tronlink%EF%BC%88%E6%B3%A2%E5%AE%9D%E9%92%B1%E5%8C%85%EF%BC%89/ibnejdfjmmkpcnlpebklmnkoeoihofec"
              target="_blank"
              rel="noreferrer"
            >
              TRONLINK NOT DETECTED
            </a>
          </p>
        )}

        <div className={classes.content}>
          <div>
            {contractValue === 'null' ? <p></p> : <p>{contractValue}</p>}
          </div>
          {contractName === 'null' ? (
            <h4>Enter smart contract address</h4>
          ) : (
            <h4>Contract name: {contractName}</h4>
          )}

          <div className={classes.functionLi}>
            {fetchedFuncs
              ? fetchedFuncs.map((func) => (
                  <ContractExtracted
                    functionName={func.name}
                    id={func.id}
                    key={Math.random()}
                    stateMutability={func.stateMutability}
                    type={func.type}
                    inputs={func.inputs}
                    callFunctions={callFunctions}
                    allFunctions={contractExtracted}
                  />
                ))
              : null}
          </div>

          <input
            type="text"
            onChange={contractImputHandler}
            className={classes.inputField}
          ></input>
          <div>
            <br></br>
          </div>
          {myAddress === null || myAddress === false ? (
            <button className={classes.contrctButtonDisabled}>
              Get smart contract details
            </button>
          ) : (
            <button onClick={getContractName} className={classes.contrctButton}>
              Get smart contract details
            </button>
          )}
          {/* <p>
            <b>TLu171ZAKDRGRcnQipLYkyfQGdAJzN7Abv</b>
          </p>
          <p>TPjGUuQfq6R3FMBmsacd6Z5dvAgrD2rz4n</p>
          <br></br>
          <p>TEvrLVLkcDpnSZb9G6AwVnWAR91SbTLBa1</p>
          <p>TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t</p>
          <div></div>
          <button onClick={tesFunction}>TEST</button> */}
          <TronlinkFunctions clicked={tronlinkTest} />
        </div>
        <div className={classes.foot}>
          <h4>V 0.07 / 2021 &copy; IBNZ DEVELOPERS</h4>
        </div>
      </div>
      <div className={classes.last_border}></div>
    </div>
  );
};

export default Card;
