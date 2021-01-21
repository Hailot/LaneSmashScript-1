const Faction = require('./faction.js');
const match = require('./match.js');

class Base {
  constructor(id, type, name, home) {
    this.id = id;
    this.type = type;
    this.name = name;
    this.home = home;
    this.faction = Faction.NS
  }

  toJson() {
    return {
      id:this.id,
      type:this.type,
      name:this.name,
      home:this.home,
      faction:match.isFactionUsed(this.faction) ? Faction.name(this.faction) : Faction.name(Faction.NS)
    }
  }
}

let lanes = {
  1: {"id":1, "min":30, "zone":6, "bases": [
    new Base(206000, "TechPlant", "Heyoka Tech Plant", true),
    new Base(206002, "SmallOutPost", "Heyoka Chemical", false),
    new Base(222180, "SmallOutPost", "Chimney Rock Depot", false),
    new Base(211001, "SmallOutPost", "Tumas Skylance Battery", false),
    new Base(211000, "TechPlant", "Tumas Tech Plant", true)
  ]},
  2: {"id":2, "min":30, "zone":6, "bases": [
    new Base(216000, "LargeOutPost", "Crux Headquarters", true),
    new Base(222120, "SmallOutPost", "Blackshard Tungsten Mine", false),
    new Base(260004, "SmallOutPost", "Amerish ARX Reserve", false),
    new Base(222130, "SmallOutPost", "Shadespire Farms", false),
    new Base(215000, "LargeOutPost", "Crux Mining Operation", true)
  ]},
  3: {"id":3, "min":30, "zone":2, "bases": [
    new Base(3201, "AmpStation", "Dahaka Amp Station", true),
    new Base(3230, "SmallOutPost", "Dahaka Southern Post", false),
    new Base(214, "SmallOutPost", "Indar Comm. Array", false),
    new Base(4020, "SmallOutPost", "Allatum Broadcast Hub", false),
    new Base(4001, "BioLab", "Allatum Bio Lab", true)
  ]},
  4: {"id":4,"min":30, "zone":4, "bases": [
    new Base(302000, "BioLab", "Acan Bio Lab", true),
    new Base(302030, "SmallOutPost", "Acan Southern Labs", false),
    new Base(276000, "SmallOutPost", "Woodman ASE Labs", false),
    new Base(287090, "SmallOutPost", "Mossridge Command Center", false),
    new Base(294000, "LargeOutPost", "Bravata PMC Compound", true)
  ]},
  5: {"id":5, "min":30, "zone":4, "bases": [
    new Base(304000, "BioLab", "Zotz Bio Lab", true),
    new Base(304030, "SmallOutPost", "Zotz Agriculture Lab", false),
    new Base(282000, "SmallOutPost", "The Ziggurat", false),
    new Base(287060, "SmallOutPost", "Eastern Substation", false),
    new Base(293000, "BioLab", "Genesis Terraforming Plant", true)
  ]}
}


function getLane(id) {
    return lanes[id]
}

function toJson(lane) {
  return {
      id:lane.id,
      min:lane.min,
      zone:lane.zone,
      bases:lane.bases.map(base => base.toJson())
  }
}

exports.Base = Base;
exports.getLane = getLane;
exports.toJson = toJson;
