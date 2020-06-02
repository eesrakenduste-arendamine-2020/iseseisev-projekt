$(function () {
  $("button").click(function () {
    var fired_button = $(this).val();
    var num = parseInt(fired_button);
    console.log(num);
    var city = 35;
    var api =
      "https://esi.evetech.net/dev/markets/10000043/orders/?datasource=tranquility&order_type=all&page=1&type_id=";
    var url = api + num;
    $(document).ready(function () {
      $.getJSON(url, function (data) {
        var info = "";
        $.each(data, function (key, value) {
          info += "<tr>";
          info += "<td>" + value.duration + "</td>";
          info += "<td>" + value.issued + "</td>";
          info += "<td>" + value.range + "</td>";
          info += "<td>" + value.price + "</td>";
          info += "<td>" + value.volume_remain + "</td>";
          info += "<td>" + value.volume_total + "</td>";
          info += "</tr>";
        });
        $("#market_table").append(info).empty();
        $("#market_table").append(info);
      });
    });
  });
});


