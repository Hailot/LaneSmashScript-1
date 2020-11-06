var socket = io();

socket.emit('subscribe');

socket.on('broadcast',function(data) {

});

socket.on('refresh',function(data) {
  $("ul").empty();
  for (var i = 0; i < data.hud.length; i++) {
    var base = data.hud[i]
    var class_str = base.type + " " + base.faction
    if (i <  data.hud.length - 1) {
      if (base.faction == "NS") {
        class_str += " After" +  data.hud[i + 1].faction
      } else {
        if (data.hud[i + 1].faction != "NS" && data.hud[i + 1].faction != base.faction) {
            class_str += " Conflict"
        }
      }
    }
    var li = $("<li>", {"id": base.id, "class": class_str}).text(base.name)
    $("ul").append(li)

    $(".Scoreboard > h5 > span").text(data.round)
  }
});

socket.on('refreshHud',function(data) {
  for (var i = 0; i < data.bases.length; i++) {
    var base = data.bases[i]
    var class_str = base.type + " " + base.faction
    if (i < data.bases.length - 1) {
      if (base.faction == "NS") {
        class_str += " After" +  data.bases[i + 1].faction
      } else {
        if (data.bases[i + 1].faction != "NS" && data.bases[i + 1].faction != base.faction) {
            class_str += " Conflict"
        }
      }
    }
    $("#"+base.id).attr('class', class_str);
  }
});

socket.on('teamsUpdate',function(data) {
  $(".TeamLeft").removeClass("NC")
  $(".TeamLeft").removeClass("VS")
  $(".TeamLeft").removeClass("TR")
  $(".TeamLeft").addClass(data.teamOne.faction)
  $(".TeamLeft > h2").text(data.teamOne.name)
  $(".TeamScoreLeft").text("" + data.teamOne.score)

  $(".TeamRight").removeClass("NC")
  $(".TeamRight").removeClass("VS")
  $(".TeamRight").removeClass("TR")
  $(".TeamRight").addClass(data.teamTwo.faction)
  $(".TeamRight > h2").text(data.teamTwo.name)
  $(".TeamScoreRight").text("" + data.teamTwo.score)
});

socket.on('timerInfo',function(data) {
  $('h1').html(
      (data.minutes < 10 ? '0' : '') + data.minutes
      + ':'
      + (data.seconds < 10 ? '0' : '') + data.seconds );
});
