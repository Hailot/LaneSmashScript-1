const WebSocket   = require('ws');

const match = require('./match.js');

var outfitTrackerWSUrl = "wss://www.outfit-tracker.com:4567/facilities"
var otws = new WebSocket(outfitTrackerWSUrl);

var subAttempt = 0;
var unsubAttempt = 0;


otws.on('open', function open() {
  subAttempt += 1;
});

otws.on('message', function (data) {
  match.dealWithTheData(data)
});

otws.on('close', function (data) {
  otws.close();
  otws = new WebSocket(outfitTrackerWSUrl);
});

otws.on('error', function (data) {
  otws.close();
  otws = new WebSocket(outfitTrackerWSUrl);
});

function subscribe(otws) {
  bases_ids = match.getHud().getBasesIDs()
  zone_id = match.getHud().getZone()
  for (var i in bases_ids) {
    if (otws.readyState == 1) {
      var msg = {subscribe: {worldId: 19, facilityId:bases_ids[i]}};
      console.log(msg)
      otws.send(JSON.stringify(msg));
    }
  }
}

function unsubscribe(otws) {
  // unsubscribes from all events
  unsubAttempt += 1;
  try {
    bases_ids = match.getHud().getBasesIDs()
    for (var i in bases_ids) {
      if (otws.readyState == 1) {
        var msg = {unsubscribe: {worldId: 19, facilityId:bases_ids[i]}};
        console.log(msg)
        otws.send(JSON.stringify(msg));
      }
    }

  }
  catch(err) {
    console.log(err)
    if (otws.readyState == 1) {
      unsubscribe(otws);
    }
  }
}

function setMatch() {
  subscribe(otws);
}

function resetMatch() {
  unsubscribe(otws);
}


exports.setMatch = setMatch;
exports.resetMatch = resetMatch;
