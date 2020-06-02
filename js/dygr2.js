/*g = new Dygraph(document.getElementById("stock_div"), stockData, {
    customBars: true,
    logscale: true,
  });
  
  function setLog(val) {
    g.updateOptions({ logscale: val });
    document.getElementById("linear").disabled = !val;
    document.getElementById("log").disabled = val;
  }
*/
  s = new Dygraph(
    document.getElementById("noroll"),
    data_temp,
    {
      customBars: true,      
      ylabel: 'Plex Muutus',
      legend: 'always',
      customBars: true,
      showRangeSelector: true
      
    }
);
  
  v = new Dygraph(
    document.getElementById("volume_div"),
    volume_div,
  
    {
      connectSeparatedPoints: true,
      labels: [
        "Date",
        "Sell volume",
        "Buy volume",
        "Buys from Sells",
        "Sells to buys",
        "ESI traded vol",
      ],
      showRangeSelector: false,
      axisLabelFontSize: 10,
      labelsDiv: "volume_legend",
      legend: "always",
      labelsDivWidth: 700,
      labelsSeparateLines: false,
      customBars: true,
      errorBars: true,      
      
      axes: {
        x: {
          valueFormatter: function (x) {
            d = new Date();
            d.setTime(x);
            return d.toLocaleDateString("en");
          },
        },
        y: {
          axisLabelFormatter: function (y) {
            return abbreviate(y, 2, 0, false, false);
          },
          valueFormatter: function (val) {
            return abbreviate(val, 2, 0, false, false);
          },
        },
      },
    }
  );