let loadouts = {
  1 : {"id":1, "faction":2, "name":"Infiltrator", "class": "infil"},
  3 : {"id":3, "faction":2, "name":"Light Assault", "class": "la"},
  4 : {"id":4, "faction":2, "name":"Medic", "class": "medic"},
  5 : {"id":5, "faction":2, "name":"Engineer", "class": "engy"},
  6 : {"id":6, "faction":2, "name":"Heavy Assault", "class": "heavy"},
  7 : {"id":7, "faction":2, "name":"MAX", "class": "max"},
  8 : {"id":8, "faction":3, "name":"Infiltrator", "class": "infil"},
  10 : {"id":10, "faction":3, "name":"Light Assault", "class": "la"},
  11 : {"id":11, "faction":3, "name":"Medic", "class": "medic"},
  12 : {"id":12, "faction":3, "name":"Engineer", "class": "engy"},
  13 : {"id":13, "faction":3, "name":"Heavy Assault", "class": "heavy"},
  14 : {"id":14, "faction":3, "name":"MAX", "class": "max"},
  15 : {"id":15, "faction":1, "name":"Infiltrator", "class": "infil"},
  17 : {"id":17, "faction":1, "name":"Light Assault", "class": "la"},
  18 : {"id":18, "faction":1, "name":"Medic", "class": "medic"},
  19 : {"id":19, "faction":1, "name":"Engineer", "class": "engy"},
  20 : {"id":20, "faction":1, "name":"Heavy Assault", "class": "heavy"},
  21 : {"id":21, "faction":1, "name":"MAX", "class": "max"},
  28 : {"id":28, "faction":4, "name":"Infiltrator", "class": "infil"},
  29 : {"id":29, "faction":4, "name":"Light Assault", "class": "la"},
  30 : {"id":30, "faction":4, "name":"Medic", "class": "medic"},
  31 : {"id":31, "faction":4, "name":"Engineer", "class": "engy"},
  32 : {"id":32, "faction":4, "name":"Heavy Assault", "class": "heavy"},
  45 : {"id":45, "faction":4, "name":"MAX", "class": "max"}
}

function getFactionForLoadout(id) {
  if (loadouts[id] != undefined) {
    return loadouts[id].faction
  }
  return 0
}


function getClassForLoadout(id) {
  if (loadouts[id] != undefined) {
    return loadouts[id].class
  }
  return "unknwon"
}


function getLoadout(id) {
    return loadouts[id]
}

exports.getFactionForLoadout  = getFactionForLoadout;
exports.getClassForLoadout  = getClassForLoadout;
exports.getLoadout            = getLoadout;
