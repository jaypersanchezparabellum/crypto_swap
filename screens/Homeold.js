import { StatusBar } from 'expo-status-bar';
import { ethers } from 'ethers';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, FlatList } from 'react-native';
import {Picker} from '@react-native-picker/picker';
import  DropDownPicker  from 'react-native-dropdown-picker';
import { parseEther } from 'ethers/lib/utils';
const Web3 = require('web3');
import PropertiesArtifact from '../bcartifacts/Properties.json';
const BigNumber = require('bignumber.js');
import {
    WALLET_ADDRESS,
    PRIVATE_KEY,
    PROPERTY_VALUE,
    PROPERTY_ID,
    DEFAULT_ACCOUNT,
    HTTPPROVIDER
 } from "../appconfig.json";

function Homeold({navigation}) {

    //Test data
    /*const WALLET_ADDRESS =  APPCONFIG.WALLET_ADDRESS;
    const PRIVATE_KEY =  APPCONFIG.PRIVATE_KEY;
    const PROPERTY_VALUE =  APPCONFIG.PROPERTY_VALUE;
    const PROPERTY_ID =  APPCONFIG.PROPERTY_ID;
    const DEFAULT_ACCOUNT =  APPCONFIG.DEFAULT_ACCOUNT;
    const HTTPPROVIDER =  APPCONFIG.HTTPPROVIDER;*/
    
       
    const [ethaddress, setEthAddress] = useState(WALLET_ADDRESS);
    const [ethbalance, setEthBalance] = useState(0);
    const [latestblock, setLatestBlock] = useState();
    const [propertycontractaddress, setPropertyContractAddress] = useState('0X0');
    const [propertyowneraddress, setPropertyOwnerAddress] = useState('0X0');
    const [propertyvalue, setPropertyValue] = useState(0);
    const [tokensource, settokensource] = useState();
    const [transferamount, settransferamount] = useState();
    const [tokendest, settokendest] = useState();
    const [tokendestamount, settokendestamount] = useState();

    useEffect(() => {
        //effect
        const web3 = new Web3( new Web3.providers.HttpProvider(HTTPPROVIDER) );
        web3.eth.defaultAccount = DEFAULT_ACCOUNT;
        web3.eth.getBlock('latest')
        .then(function(latestBlock) {
            setLatestBlock(JSON.stringify(latestBlock));
        });
        web3.eth.getBalance(ethaddress)
        .then(function(balance) {
            //balance is in wei, can convert to ether
            let balanceInEther = web3.utils.fromWei(balance,'ether')
            setEthBalance(balanceInEther);
        })
        .then(function() {
          //deployPropertiesContract(web3);
          createPropertiesInstanceEther();
          //createContractInstanceEther('0x186e6c56a661aA43E7788AAe051253D2fc9280b5')
        }).catch(function(e) {
            console.log(`Error ${e}`)
        })
        
        //setEthBalance( balance );
        //return () => {
        //    cleanup
       // }
    }, [])

    /*
    * Create an instance of a contract using only the smart contract address
    */
    function createContractInstanceEther(contractaddress) {
      setPropertyContractAddress(contractaddress)
      let abi = PropertiesArtifact.abi;
      let bin = PropertiesArtifact.bytecode;
      let provider = new ethers.providers.JsonRpcProvider(HTTPPROVIDER);
      let wallet = new ethers.Wallet(PRIVATE_KEY, provider);
        let contractInstance = new ethers.Contract(contractaddress, abi, wallet);
          //get owner of
        contractInstance.ownerOf(PROPERTY_ID)
        .then(result =>
        {
              setPropertyOwnerAddress(result)
        })
        .catch(error =>
        {
              console.log(`Unable to get Owner ${error}`);
        });

        //get property value
        contractInstance.balanceOf(WALLET_ADDRESS)
        .then(result =>
        {
                let _result = result.toString();
                setPropertyValue( _result )
                console.log(`Value ${result}`)
        })
        .catch(error =>
        {
                console.log(`Unable to get Property Value ${error}`);
        });
    }//createContractInstanceEther

    /*
    * Deploy smart contract and interact with it using ethers library
    */
    function createPropertiesInstanceEther() {
      let abi = PropertiesArtifact.abi;
      let bin = PropertiesArtifact.bytecode;
      let provider = new ethers.providers.JsonRpcProvider(HTTPPROVIDER);
      let wallet = new ethers.Wallet(PRIVATE_KEY, provider);
      let factory = new ethers.ContractFactory(abi,bin,wallet);
      let num = PROPERTY_VALUE;
      factory.deploy(WALLET_ADDRESS, num, PROPERTY_ID)
      .then(contract => {
        setPropertyContractAddress(contract.address);
        let contractInstance = new ethers.Contract(contract.address, abi, wallet);
        //get owner of
        contractInstance.ownerOf(PROPERTY_ID)
        .then(result =>
        {
              setPropertyOwnerAddress(result)
        })
        .catch(error =>
        {
              console.log(`Unable to get Owner ${error}`);
        });

        //get property value
        contractInstance.balanceOf(WALLET_ADDRESS)
        .then(result =>
        {
                let _result = result.toString();
                setPropertyValue( _result )
        })
        .catch(error =>
        {
                console.log(`Unable to get Property Value ${error}`);
        });

      })
      .catch(error => {
        console.log(`Unable to get owner information= ${error}`)
      })
    }//createPropertiesInstanceEther

    /*
    * This function will show how to deploye a smart contract on the network and interface with it
    */
   function deployPropertiesContract(web3) {
      let abi = PropertiesArtifact.abi;
      let bin = PropertiesArtifact.bytecode
      let contractInstance = new web3.eth.Contract(abi);
      contractInstance.deploy({
        data : bin,
        arguments : [WALLET_ADDRESS, PROPERTY_VALUE, PROPERTY_ID]
      })
      .send({
        from : WALLET_ADDRESS,
        gas : 1500000,
        gasPrice : '20000000000000'
      })
      .on('error', function(error) {
        console.log(`Deploy Error ${error}`)
      })
      .on('receipt', function(receipt) {
        setPropertyContractAddress(receipt.contractAddress)
        createPropertiesInstance(web3);
      })
    }//deployPropertiesContract

    /*
    * This function will show how to create an instance of an already deployed smart contract
    * and interface with it.
    * BUG = have to figure out why owneraddress and propertyvalue is returning 
    */
    function createPropertiesInstance(web3) {
        let abi = PropertiesArtifact.abi;
        let property = new web3.eth.Contract(abi, propertycontractaddress,{
          from : WALLET_ADDRESS,
          gas : 1500000,
          gasPrice : '20000000000000'
        });
        let _owneraddress = property.methods.ownerOf(PROPERTY_ID)
        let _propertyvalue = property.methods.balanceOf(WALLET_ADDRESS)
        console.log(`${_owneraddress} == ${_propertyvalue}`)
    }//createPropertiesInstance

    return (
        <View style={styles.container}>
            <View>
            <View>
                <View style={styles.fieldLabel}>
                    <Text style={styles.fieldLabel}>Ethereum Address</Text>
                    <Text>{ethaddress}</Text>
                </View>
                <View style={styles.fieldLabel}>
                    <Text style={styles.fieldLabel}>Account Balance in Ether</Text>
                    <Text>{ethbalance}</Text>
                </View>
            </View>
            <View>
                <View style={styles.fieldLabel}>
                    <Text style={styles.fieldLabel}>Contract Address</Text>
                    <Text>{propertycontractaddress}</Text>
                </View>
            </View>
            <View>
                <View style={styles.fieldLabel}>
                    <Text style={styles.fieldLabel}>Property Owner Address</Text>
                    <Text>{propertyowneraddress}</Text>
                </View>
            </View>
            <View>
                <View style={styles.fieldLabel}>
                    <Text style={styles.fieldLabel}>Property Value</Text>
                    <Text>{propertyvalue}</Text>
                </View>
            </View>
            </View>
            <View style={styles.taisho_container}>
                  <DropDownPicker
                      items={[
                          {label: 'ChainLink', value: "0x514910771AF9Ca656af840dff83E8264EcF986CA"},
                          {label: 'BTC', value: 'btc'},
                          {label: 'DAI', value: '0x6b175474e89094c44da98b954eedeac495271d0f'},
                          {label: 'ETH', value: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE'},
                      ]}
                      defaultValue={tokensource}
                      containerStyle={{height: 40}}
                      style={{backgroundColor: '#fafafa'}}
                      itemStyle={{
                          justifyContent: 'flex-start'
                      }}
                      dropDownStyle={{backgroundColor: '#fafafa'}}
                      onChangeItem={item => settokensource({
                          token: item.value
                      })}
                  /> 
                  <TextInput
                    style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                    onChangeText={text =>settransferamount(text)}
                    value={transferamount}
                    placeholder={"Amount To Transfer From"}
                  />  
                  <DropDownPicker
                      items={[
                          {label: 'ChainLink', value: "0x514910771AF9Ca656af840dff83E8264EcF986CA"},
                          {label: 'BTC', value: 'btc'},
                          {label: 'DAI', value: '0x6b175474e89094c44da98b954eedeac495271d0f'},
                          {label: 'ETH', value: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE'},
                      ]}
                      defaultValue={tokendest}
                      containerStyle={{height: 40}}
                      style={{backgroundColor: '#fafafa'}}
                      itemStyle={{
                          justifyContent: 'flex-start'
                      }}
                      dropDownStyle={{backgroundColor: '#fafafa'}}
                      onChangeItem={item => settokendest({
                          token: item.value
                      })}
                  />
                  <View style={styles.fieldLabel}>
                    <Text style={styles.fieldLabel}>Token Target Amount</Text>
                    <Text>{tokendestamount}</Text>
                </View>   
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container : {
      flex : 1,
      alignItems : 'left',
      //justifyContent= 'center'
    },
    taisho_container : {
      flex : 1,
      alignItems : 'left',
      backgroundColor : '#fff'
    },
    fieldLabel : {
        flex : 2, 
        flexDirection : 'row',
        fontSize : 18,
        color : '#000000',
        fontFamily : 'Times New Roman',
        paddingLeft : 30,
        paddingRight : 30,
        textShadowColor : '#585858',
        textShadowOffset : {width : 5, height : 5},
        textShadowRadius : 10,
    },
    fieldValue : {
        paddingRight : 30,
        textAlign : 'center'
    }
})

export default Home
