const readline = require('readline');
const fs = require('fs');


var lineReaderC = require('readline').createInterface({
    input: require('fs').createReadStream('cognomi.txt')
});

var lineReaderM = require('readline').createInterface({
    input: require('fs').createReadStream('nomi_maschili.txt')
});

var lineReaderF = require('readline').createInterface({
    input: require('fs').createReadStream('nomi_femminili.txt')
});

cognomi = [];
nomi_m = [];
nomi_f = [];
count = 3;
n = Number(process.argv[2]);
if (isNaN(n)) {
    console.log("usage: n = number of rows");
    process.exit(1);
}
console.log(n);


lineReaderC.on('line', function (line) {
    cognomi.push(line);
});

lineReaderM.on('line', function (line) {
    nomi_m.push(line);
});

lineReaderF.on('line', function (line) {
    nomi_f.push(line);
});

lineReaderC.on('close', function (line) {
    count--;
    if (count == 0) stampa(n);
});

lineReaderM.on('close', function (line) {
    count--;
    if (count == 0) stampa(n);
});

lineReaderF.on('close', function (line) {
    count--;
    if (count == 0) stampa(n);
});

function stampa(n) {
    var logger = fs.createWriteStream(n + "_" + 'nomi_casuali.csv', {
        flags: 'w' 
      })
    
    let k=0;

    logger.write("[\n");
    
    for (k = 1; k < (n+1)/2; k++) {
        logger.write("{" + '"id":' + k + ',"nome":"' + rnd(nomi_m) + '","cognome":"' + rnd(cognomi) + '","sesso":' + '"M"' + ',"eta":' + rndn(18,65) +"},\n");
    }

    for (; k < n+1; k++) {
        logger.write("{" + '"id":' + k + ',"nome":"' + rnd(nomi_f) + '","cognome":"' + rnd(cognomi) + '","sesso":' + '"M"' + ',"eta":' + rndn(18,65) +"}");
        if(k<n) logger.write(",");
        logger.write("\n");
    }

    logger.write("]\n");
}

function rnd(gruppo) {
    min = 0;
    max = gruppo.length - 1;
    v = Math.floor(Math.random() * (max - min + 1)) + min;
    return gruppo[v];
}

function rndn(min,max){
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
