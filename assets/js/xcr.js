/*

FLOW:
get ALL coins, store NAME and SYMBOL into an object.
loop over the names object comparing to $SYMBOL text from form, return the NAME when found.
create a table row.
insert data from second API hit, into table row
SOMEWHERE in there, do the USD conversion from BTC.
*/

//var name = getName();
var bitcoinValue = 0;
var coins = new Array;
var form = ""; // Value pulled from the form
var symbol = ""; // "id" on the table
var id = ""; // value pulled from the table at coins[i].id matched to coins[i].symbol
var finished = false;
var formSym = "";
var formUSD = 0;
var formBTC = 0;
var form24h = 0;

function run() {
  getFormData();
  allTheCoins("https://api.coinmarketcap.com/v1/ticker/");
}

//getSymbol();
//matchSymName(symbol);
//getValues(SYMBOL);
//addRow(sym, usd, btc, perc);

function getFormData(){ //This function works GREAT!
  form = document.getElementById("symbol").value //THIS WORKS
  form = form.toUpperCase(); //THIS WORKS
  //return form; // I don't need a return here, the global variable "form" works.
  /*
  var entry = document.getElementById("symbol"); //THIS doesn't actually return a string
  form = symbol.value; // SO what we have here, isnt' a string either
  form = form.toUpperCase(); //which is why this failed to modify the string (it was an object instead)
  */
}

function allTheCoins(URL) {
  finished = false;
  var tickerRequest = new XMLHttpRequest();
  tickerRequest.open('GET', URL);
  tickerRequest.send();
  tickerRequest.onload = function() {
    if (tickerRequest.status >= 200 && tickerRequest.status < 400) {
      var input = JSON.parse(tickerRequest.responseText);
      //console.table(input); //Keeping this here for quick access to the table headers
      for(var i in input)
      coins.push(input[i]);
      for (var i = 0; i < coins.length; i++) { //beginning of loop

        if (coins[i].symbol == form) { // But right here, I get an error.
          formSym = coins[i].name;
          formUSD = coins[i].price_usd;
          formBTC = coins[i].price_btc;
          form24h = coins[i].percent_change_24h;
          console.log(formSym);
          console.log(formUSD);
          console.log(formBTC);
          console.log(form24h);
          finished = true;
          //DO EVERYTHING RIGHT HERE! On second thought, no, this needs fixed.
        }
        else if (i == coins.length - 1 && !finished) {
          formSym = "ERROR!";
          formUSD = 0;
          formBTC = 0;
          form24h = 0;
        }
      }
      //Try to do stuff here?
      var table = document.getElementById("table");
      var row = table.insertRow(0);
      var cell1 = row.insertCell(0);
      var cell2 = row.insertCell(1);
      var cell3 = row.insertCell(2);
      var cell4 = row.insertCell(3);
      cell1.innerHTML = formSym;
      cell2.innerHTML = formUSD;
      cell3.innerHTML = formBTC;
      cell4.innerHTML = form24h;
      //end of loop
    }
    else {
      console.log("We connected to the server, but it returned an error.");
    }
    //console.log(formSym); // NOPE NOPE NOPE
    //console.log(formUSD); // NOPE NOPE NOPE
    //console.log(formBTC); // NOPE NOPE NOPE
    //console.log(form24h); // NOPE NOPE NOPE
    //Nothing below here.
  }
  //return coins; //Does "returning" a value "update it" in the global scope? Nope.
}


//function getData(coins) {

//}


/*
function matchSymName(form) { //This never worked
  //console.log(this.symbol + " Line 71"); //This line is stupid, where does symbol come from this early?
  var length = coins.length + 1;
  console.log(length);
  for (var i = 0; i < length; i++) {
    if (coins[i].symbol == form) {
      formSym = coins[i].name;
      formUSD = coins[i].price_usd;
      formBTC = coins[i].price_btc;
      form24h = coins[i].percent_change_24h;
      console.log(formSym);
      console.log(formUSD);
      console.log(formBTC);
      console.log(form24h);
    }
    else if (i > coins.length) {
      formSym = "Error";
      formUSD = 0;
      formBTC = 0;
      form24h = 0;
    }
  }
}

*/
/*
for (var i = 0; i < coins.length; i++) {
//console.table(coins[i]);
console.log(coins[i].symbol)
}
*/
//THIS SYMBOL NOT FOUND
/*
loop ONE GREATER THAN LENGTH
if coins[i].symbol == symbol {
shorthand = coins[i].shorthand
}
else if (length > 956) {
return error
}
else {
return error
}

*/

/*  var symbol = "";
  var symURL = "https://min-api.cryptocompare.com/data/generateAvg?fsym=PASC&tsym=BTC&markets=Poloniex";
  symURL = symURL.concat(getSymURL());
  var btcURL = "https://api.coinmarketcap.com/v1/ticker/ethereum/?convert=BTC";
}
function getSymURL(){
  var entry = document.getElementById("symbol");
  symbol = symbol.value;
  console.log(symbol);
  return symbol;
  }
*/

/*

if (24h >= 0) {
colorRED
}
else {
colorGreen
}

*/
