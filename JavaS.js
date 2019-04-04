function GetData() {
  var ApiKey = "ddd85b386e1a7c889e468a4933f75f22f52b0755b747bdb637ab39c88a3bc19b";
  var url = "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=100&tsym=USD&api_key=" + ApiKey;
  $.get(url, callback1);
}

function callback1(x) {
  var y = x.Data;
  console.log("y data" + JSON.stringify(y));
  var ticker = [];
  var price = [];
  var supply = [];
  var market_cap = [];

  for (var i = 0; i < y.length; i++) {
    ticker.push(y[i].CoinInfo.Name);
    supply.push(y[i].RAW.USD.SUPPLY);
    market_cap.push(y[i].RAW.USD.MKTCAP);
    price.push(y[i].RAW.USD.PRICE);
  }
  console.log("supply = " + supply);
  var arr = [];

  // for loop that creates a new 2D array with an extra row for column names  
  for (var i = 0; i <= ticker.length; i++) {
    arr.push([]);
    arr[i].push(new Array(2));
  }

  // column names in 2D Array
  arr[0][0] = "Ticker";
  arr[0][1] = "Supply";
  arr[0][2] = "Market Cap";
  arr[0][3] = "What would the price be given bitcoins marketcap? ";
  arr[0][4] = "Actual price in USD";
  arr[0][5] = "Percentage under-valuation";

  // data in 2D Array 
  for (var i = 0; i < ticker.length; i++) {
    arr[i + 1][0] = ticker[i];               // column 1 = ticker
    arr[i + 1][1] = supply[i];               // column 2 = supply
    arr[i + 1][2] = market_cap[i];           // column 3 = market cap 
    arr[i + 1][3] = market_cap[0] / supply[i];    // etc etc 
    arr[i + 1][4] = price[i];
    arr[i + 1][5] = (((market_cap[0] / supply[i]) - price[i]) / price[i]) * 100;
  }
  console.log("Array agsts = " + arr);
  HtmlTable(arr);
  Plot(arr);
}

function HtmlTable(dd) {
  var data = dd;
  var html = '<table><thead><tr></tr></thead><tbody>';

  for (var i = 0; i < data.length; i++) {
    html += '<tr>';
    for (var j = 0; j < data[i].length; j++) {
      html += '<td>' + data[i][j] + '</td>';
    }
    html += "</tr>";
  }
  $(html).appendTo('#div1');
}

function Plot(d) {
  var DD = d;
  console.log("DD plot = " + DD);
  var xx = [];
  var yy = [];
  console.log("DD element plot =" + DD[1][0]);

  for (var i = 1; i < DD.length; i++) {
    xx.push(DD[i][0]);
    yy.push(DD[i][5]);
  }

  var data = [{ x: xx, y: yy, type: 'bar' }];
  console.log("data array plot = " + JSON.stringify(data));
  Plotly.newPlot('div2', data, { showlegend: false, xaxis: { tickmode: "linear", dtick: 1 } }, { displayModeBar: false });
}
