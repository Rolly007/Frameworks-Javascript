var puntuacionTotal = 0;
var cantidadMovimientos =0;
var cantidadClicks = 0;


$('.btn-reinicio').click(function(){
  startTimer($('#timer'));
  animarTitulo();
  empezarJuego();
});


function animarTitulo()
{
  //cambia el color del título a blanco
  $('.main-titulo').animate({fontSize:"3em"},500,function()
  {
    $('.main-titulo').css('color','red')
    //cambia el color del título a amarillo
    $('.main-titulo').animate({fontSize:"3em"},500,function()
    {
      $('.main-titulo').css('color','yellow')
      $('.main-titulo').animate({fontSize:"3em"},500,animarTitulo)
    })
  })
};

function empezarJuego()
{
  cantidadClicks++;
  if(cantidadClicks==1)
  {
    $('.btn-reinicio').text('Reiniciar');
    llenarTodos();
    startTimer();
    luegoDeJugar();
  }
  else
  {
    location.reload();
  }
}

function llenarTodos()
{
  var columna;
  for (var i = 1; i <= 7; i++)
  {
    columna = ".col-"+i;
    llenarElemento($(columna), 7);
  }
}


function llenarElemento(columna, espacios)
{
  for (var i = 0; i < espacios; i++)
  {
    var elemento = document.createElement("img");
    $(elemento)
    .attr("src", rutaImagenAleatoria())
    .addClass("elemento")
    .draggable(
      {
        grid: [120,90],
        revert: "valid"
      })
    .droppable(
      {
        accept: ".elemento",
        drop: function(event, ui)
        {
          var srcFrom = $(this).attr("src");
          var srcTo = $(ui.draggable).attr("src");
          $(this).attr("src", srcTo);
          $(ui.draggable).attr("src", srcFrom);
          window.setTimeout(luegoDeJugar, 500);
          sumarMovimiento();
        }
      })
    $(columna).prepend(elemento);
  }
}

function rutaImagenAleatoria(){
  var sources = ['./image/1.png', './image/2.png', './image/3.png', './image/4.png', './image/5.png'];
  return sources[obtenerNumAleatorio()]
}


function obtenerNumAleatorio()
{
  return Math.floor(Math.random() * 5);
}


function luegoDeJugar()
{
  verificarCombinacion();
  window.setTimeout(eliminarElementos,2100);
  window.setTimeout(llenarDespuesTurno, 2200);
}


function verificarCombinacion()
{
  var elementoCompara;
  var actual;
  var matchIzquierda = false;
  var matchDerecha = false;
  var matchAbajo = false;
  var matchArriba = false;
  for (var col = 1; col <= 7; col++)
  {
    for (var row = 0; row < 7; row++)
    {
      matchArriba=matchAbajo=matchDerecha=matchIzquierda=false;
      actual = $(".col-"+col).find("img")[row]

      //Verficacion a la Izquierda
      if($(".col-"+(col-1)).length > 0)
      {
        //Verifica si existe elemento a la izquierda
        elementoCompara = $(".col-"+(col-1)).find("img")[row]
        if (verificarDosCombinaciones(actual, elementoCompara))
        {
          matchIzquierda = true;
          if($(".col-"+(col-2)).length > 0)
          {
            //Verifica si existen dos columnas a la izquierda
            elementoCompara = $(".col-"+(col-2)).find("img")[row]
            if(verificarDosCombinaciones(actual, elementoCompara))
            {
              adicionarPunto(actual, $(".col-"+(col-1)).find("img")[row], elementoCompara)
            }
          }
        }
      }

      //Verificacion a la Derecha
      if($(".col-"+(col+1)).length > 0)
      {
        //Verifica si existe elemento a la izquierda
        elementoCompara = $(".col-"+(col+1)).find("img")[row]
        if (verificarDosCombinaciones(actual, elementoCompara))
        {
          matchDerecha = true;
          if($(".col-"+(col+2)).length > 0)
          {
            //Verifica si existen dos columnas a la izquierda
            elementoCompara = $(".col-"+(col+2)).find("img")[row]
            if(verificarDosCombinaciones(actual, elementoCompara))
            {
              adicionarPunto(actual, $(".col-"+(col+1)).find("img")[row], elementoCompara)
            }
          }
        }
      }

      //Verificacion ambos izquierda y Derecha
      if (matchIzquierda == true && matchDerecha == true)
      {
        adicionarPunto(actual, $(".col-"+(col-1)).find("img")[row], $(".col-"+(col+1)).find("img")[row])
      }

      //Verificación hacia arriba
      if($(".col-"+col).find("img")[row-1])
      {
        //Verifica si existe elemento arriba
        elementoCompara = $(".col-"+col).find("img")[row-1]
        if (verificarDosCombinaciones(actual, elementoCompara))
        {
          matchArriba = true;
          if($(".col-"+col).find("img")[row-2])
          {
            //Verifica si existen dos filas hacia arriba
            elementoCompara = $(".col-"+col).find("img")[row-2]
            if(verificarDosCombinaciones(actual, elementoCompara))
            {
              adicionarPunto(actual, $(".col-"+col).find("img")[row-1], elementoCompara)
            }
          }
        }
      }

      //Verificacion hacia abajo
      if($(".col-"+col).find("img")[row+1])
      {
        //Verifica si existe elemento abajo
        elementoCompara = $(".col-"+col).find("img")[row+1]
        if (verificarDosCombinaciones(actual, elementoCompara))
        {
          matchAbajo = true;
          if($(".col-"+col).find("img")[row+2])
          {
            //Verifica si existen dos filas hacia abajo
            elementoCompara = $(".col-"+col).find("img")[row+2]
            if(verificarDosCombinaciones(actual, elementoCompara))
            {
              adicionarPunto(actual, $(".col-"+col).find("img")[row+1], elementoCompara)
            }
          }
        }
      }

      //Verificacion ambos Arriba y Abajo
      if (matchArriba == true && matchAbajo == true)
      {
        adicionarPunto(actual, $(".col-"+col).find("img")[row+1], $(".col-"+col).find("img")[row-1])
      }
    }
  }
}

function verificarDosCombinaciones(elemento1, elemento2)
{
  if ($(elemento1).attr("src")==$(elemento2).attr("src"))
  {
    return true;
  }
  else return false;
}

function adicionarPunto(elemento1, elemento2, elemento3)
{
  puntuacionTotal= puntuacionTotal + 10;
  $("#score-text").text(puntuacionTotal);
  $(elemento1).hide('pulsate', 2000)
  $(elemento2).hide('pulsate', 2000)
  $(elemento3).hide('pulsate', 2000)
}

function eliminarElementos()
{
  $("img:hidden").each(function(index)
  {
    $(this).remove()
  })
}

function llenarDespuesTurno()
{
  var numeroElementos = numeroFalta = 0;
  for (var i = 1; i <= 7; i++)
  {
    numeroElementos=$(".col-"+i).find("img").length;
    numeroFalta = 7 - numeroElementos;
    llenarElemento($(".col-"+i), numeroFalta);
  }
  window.setTimeout(luegoDeJugar, 500)
}

function sumarMovimiento()
{
  cantidadMovimientos++;
  $('#movimientos-text').text(cantidadMovimientos);
}

function tiempoAcabo()
{
  $('.panel-tablero').hide(900);
  $('.panel-score')
  .animate({
    width: '100%'
  }, 1000, function()
    {
      $(this).prepend("<h2 class='titulo-over'>GAME OVER</h2>")
    })
  $('.time').hide(500)
  $('#score-text').hide()
  $('.score').append("<span class='data-info' id='score-final'>"+puntuacionTotal+"</span>")
}
