function startTimer(display) {
  var timer = 120;
  var interval= setInterval(function ()
  {
    minutes = parseInt(timer / 60, 10);
    seconds = parseInt(timer % 60, 10);

    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    $('#timer').text(minutes + ":" + seconds);

    if (--timer < 0)
    {
      $("body").trigger("finTiempo");
      clearInterval(interval);
      $('.main-titulo').stop();
      tiempoAcabo();
    }
  }, 1000);
}
