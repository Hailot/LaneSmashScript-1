const WebSocket   = require('ws');
const match = require('./match.js');

var subAttempt = 0;
var unsubAttempt = 0;

let ws = new WebSocket('wss://push.planetside2.com/streaming?environment=ps2&service-id=s:' + "pil");

ws.on('open', function open() {
  subAttempt += 1;
  console.log('Stream opened... [' + subAttempt + ']');
});

ws.on('message', function (data) {
  if (data.indexOf("payload") === 2) {
    console.log(data)
    match.dealWithTheDataFromCensus(data)
  }
});

ws.on('close', function (data) {
  console.log('Stream closed...');
  console.log(data);
  ws.close();
  ws = new WebSocket('wss://push.planetside2.com/streaming?environment=ps2&service-id=s:' + "pil");
});

const allXpIds = [
  272,
];

function addXpIdToXpGainString(xpID, xpGainString) {
  if (xpGainString === '' || xpGainString === null || xpGainString === undefined) {
    return makeXpIdString(xpID);
  }
  return xpGainString.concat(',',makeXpIdString(xpID));
}

function makeXpIdString(xpID) {
  return '"GainExperience_experience_id_' + xpID + '"';
}

function getExperienceIds(revives) {
  var xpGainString = '';
  if (revives === true) {
    for (xpIdx = 0; xpIdx < allXpIds.length; xpIdx++) {
      let xpID = allXpIds[xpIdx];
      xpGainString = addXpIdToXpGainString(xpID, xpGainString);
    }
  }
  return xpGainString;
}

function subscribe(ws) {
  var xpGainString = getExperienceIds(true);
  zone_id = match.getZone();
  server_id = 19;
  ws.send('{"service":"event","action":"subscribe","characters":["all"],"eventNames":[' + xpGainString + '],"worlds":["' + server_id +'"], "zones":["' + zone_id +'"],"logicalAndCharactersWithWorlds":true}')
  console.log("Subscribe to server "+ server_id + ", Zone "+ zone_id + ", To XP " +xpGainString);
}

function unsubscribe(ws) {
  // unsubscribes from all events
  unsubAttempt += 1;
  try {
    ws.send('{"service":"event","action":"clearSubscribe","all":"true"}');
    console.log('Unsubscribed from facility and kill/death events');
  }
  catch(err) {
    console.log('Unsubscribe failed... [' + unsubAttempt + ']');
    console.log(err);
    if (ws.getRunning() === true) {
      unsubscribe(ws);
    }
  }
}

function startTheMatch() {
  subscribe(ws);
}

function stopTheMatch() {
  unsubscribe(ws);
}

exports.startTheMatch = startTheMatch;
exports.stopTheMatch = stopTheMatch;
