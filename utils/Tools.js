const fs = require('fs');

function getABI() {

    let rawdata = fs.readFileSync('./bcartifacts/Properties.json');
    let abi = JSON.parse(rawdata);
    console.log(abi.abi);
    return (abi.abi)
}

function getBIN() {

    let rawdata = fs.readFileSync('./bcartifacts/Properties.json');
    let abi = JSON.parse(rawdata);
    console.log(abi.bytecode);
    return (abi.bytecode)
}


module.exports = {
    getABI:getABI,
    getBIN:getBIN
}
