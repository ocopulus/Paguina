var test =

$.get( '/GetTweets',{}, function(data) {
    texto  = "";

    data.forEach(function(element) {
      if(element['type'] == "Text"){
        tt = "";
        element['lista'].forEach(function(entidad){
          tt += entidad + ", "
        });
        div = `<div class="panel panel-default">
                  <div class="panel-heading">
                    <h3 class="panel-title">${element['user']}</h3>
                  </div>
                  <div class="panel-body">
                    <p class="lead">${element['message']}</p>
                    <p class="lead">Entidades: ${tt}</p>
                  </div>
                </div>`;
        texto += div;
      } else {
        tt = "";
        element['lista'].forEach(function(label){
          tt += "#" + label + "  "
        });
        div = `<div class="panel panel-default">
                  <div class="panel-heading">
                    <h3 class="panel-title">${element['user']}</h3>
                  </div>
                  <div class="panel-body">
                    <img src="${element['message']}" class="img-responsive" alt="Responsive image">
                    <p class="lead">Etiquetas: ${tt}</p>
                  </div>
                </div>`;
        texto += div;
      }
    });
    $('#tweets').html(texto);
});
