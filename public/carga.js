
$('#tweets').html('yolo');
$('#tweets').append('yolo2');

$.get( '/tweets',{}, function(data) {
    texto  = "";
    data.forEach(function(element) {
      div = '<div class="alert alert-secondary" role="alert">' +
            element['user'] + ' @ ' + element['message'] +
            '</div>';
      texto += div;
    });
    $('#tweets').html(texto);

    Numero_tweets = data.length;
    usuarios = new Array();
    Numero_usuarios = 0;
    data.forEach(function(element){
      exite = usuarios.find(function(ele){
        return ele == element['user'];
      });
      if(exite != element['user']){
        Numero_usuarios++;
      }
    });
    $('#usuario').html('Numero de Usuarios: ' + Numero_usuarios);
    $('#numtweet').html('Total de Tweets: ' + Numero_tweets);
    console.log(Numero_usuarios);
});
