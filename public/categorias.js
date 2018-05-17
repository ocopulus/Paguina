function grafica(){
  $.get( '/GetEtiquetas',{}, function(items) {
    console.log(items);
    items.sort(function (a, b) {
      if (a.value < b.value) {
        return 1;
      }
      if (a.value > b.value) {
        return -1;
      }
      return 0;
    });
      var texto ="";
       google.charts.load('current', {'packages':['corechart']});
       google.charts.setOnLoadCallback(drawChart);

      function drawChart() {
        var tama = 50;
        if(items.length<tama){

          tama = items.length-1;
        }
        let informacion = [];

        for (let i = 0; i < tama; i++){
    let info = [];
    info.push(items[i].name);
    info.push(items[i].value);
    informacion.push(info);
  }

        var data = new google.visualization.DataTable();
        data.addColumn('string', 'Etiqueta');
        data.addColumn('number', 'Cantidad');
        data.addRows(informacion);

        var options = {
          title: 'Categorias'
        };

        var chart = new google.visualization.PieChart(document.getElementById('piechart'));

        chart.draw(data, options);
      }
      console.log(items);


  });
}


window.setInterval(function(){
	grafica();
},10000);
