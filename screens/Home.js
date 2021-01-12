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

function Home({navigation}) {

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
    const [swapprice, setswapprice] = useState();
    const [pickertokenfrom, setpickertokenfrom] = useState();
    const [targetpricelabel, settargetpricelabel] = useState('Target Token')
    const [targetprice, settargetprice] = useState(0);
    const [ourprice, setourprice] = useState(0);
    const [targettokenaddress, settargettokenaddress] = useState();

    useEffect(() => {
        //effect
        const web3 = new Web3( new Web3.providers.HttpProvider(HTTPPROVIDER) );
        web3.eth.defaultAccount = DEFAULT_ACCOUNT;
        web3.eth.getBlock('latest')
        .then(function(latestBlock) {
            setLatestBlock(JSON.stringify(latestBlock));
        });
        
        

        return () => {
            //cleanup
        }

    }, [])

    function convertTokenPrice(_targetTokenLabel, _targettokenaddress) {
        setswapprice(transferamount);
        settargetpricelabel(_targetTokenLabel)
        settargettokenaddress(_targettokenaddress)
        console.log(`${_targetTokenLabel} :: ${targettokenaddress} ${transferamount}`)
    }

    function setBestDexPrice(_price) {
            settargetprice(price)
    }

    function setOurPrice(_price) {
        setourprice(ourprice)
    }
    /*
    * Create an instance of a contract using only the smart contract address
    */
    function createContractInstanceEther() {
      let abi = PropertiesArtifact.abi;
      let bin = PropertiesArtifact.bytecode;
      let provider = new ethers.providers.JsonRpcProvider(HTTPPROVIDER);
      let wallet = new ethers.Wallet(PRIVATE_KEY, provider);
        let contractInstance = new ethers.Contract("0x514910771AF9Ca656af840dff83E8264EcF986CA", abi, wallet);
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
    }

    
    return (
        <View style={styles.container}>
            
            <View style={styles.taisho_container}>
                  <DropDownPicker
                      items={[
                          {label: 'BTC', value: 'btc'},
                          {label: 'DAI', value: '0x6b175474e89094c44da98b954eedeac495271d0f'},
                          {label: 'ETH', value: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE'},
                      ]}
                      //defaultValue={tokensource}
                      containerStyle={{height: 40}}
                      style={{backgroundColor: '#fafafa'}}
                      itemStyle={{
                          justifyContent: 'flex-start'
                      }}
                      dropDownStyle={{backgroundColor: '#fafafa'}}
                      onChangeItem={item => settokensource({
                          tokensource: item.value
                      })}
                  /> 
                  <TextInput
                    style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                    onChangeText={text =>settransferamount(text)}
                    value={transferamount}
                    placeholder={"Amount To Transfer"}
                  />  
                  <DropDownPicker
                      items={[
                          {label: 'BTC', value: 'btc'},
                          {label: 'DAI', value: '0x6b175474e89094c44da98b954eedeac495271d0f'},
                          {label: 'ETH', value: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE'},
                      ]}
                      containerStyle={{height: 40}}
                      style={{backgroundColor: '#fafafa'}}
                      itemStyle={{
                          justifyContent: 'flex-start'
                      }}
                      dropDownStyle={{backgroundColor: '#fafafa'}}
                      onChangeItem={item => settokendest({
                          tokendest: item.value
                      }, convertTokenPrice(item.label, item.value), settargettokenaddress(item.value))}
                  />
                  <TextInput
                    style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                    onChangeText={text =>setswapprice(text)}
                    value={swapprice}
                    placeholder={"Swap Price"}
                  /> 
                  
            </View>
            <View style={styles.taisho_container}>
            <View>
                <View style={styles.taisho_price}>
                    <View style={styles.taisho_price}>
                        <Text>{targetpricelabel} Price</Text>
                        <Text>{targetprice}</Text>
                    </View>
                </View> 
                <View style={styles.taisho_price}>
                    <View style={styles.taisho_price}>
                        <Text>Our Price</Text>
                        <Text>{ourprice}</Text>
                    </View>
                </View>
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
      flexDirection : 'row',
      alignItems : 'left',
      backgroundColor : '#fff',
      margin : 50
    },
    taisho_price : {
        flex : 1,
        flexDirection : 'column',
        margin : 50
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
