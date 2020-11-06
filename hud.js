const app = require('./app.js');

const lanes = require('./lanes.js');
const match = require('./match.js');

class HUD {
  constructor() {
    this.zone = 2
    this.bases = [];
    this.conflictZone = [];
  }

  computeConflictZone(){
    this.conflictZone = [];
    var factionUsed = match.getFactionUsed()
    for (var i = 0;  i < this.bases.lenght - 1; i++) {
      var base = this.bases[i]
      var nextBase = this.bases[i + 1]
      if (factionUsed.includes(base.faction) && factionUsed.includes(nextBase.faction)){
        var newInstance = new lanes.Base(base.id, base.type, base.name, base.home)
        this.conflictZone.push(base)
        var newInstance2 = new lanes.Base(base.id, base.type, base.name, base.home)
        this.conflictZone.push(nextBase)
        return
      } else if (!(factionUsed.includes(base.faction))) {
        var newInstance = new lanes.Base(base.id, base.type, base.name, base.home)
        this.conflictZone.push(base)
        return
      }
    }
  }

  updateBase(facilityId, factionId) {
    for (var i in this.bases) {
      if (facilityId == this.bases[i].id) {
        this.bases[i].faction = factionId
      }
    }
  }

  getBase(facilityId) {
    for (var i in this.bases) {
      if (facilityId == this.bases[i].id) {
        return this.bases[i]
      }
    }
    return undefined
  }

  reset() {
    this.zone = 2
    this.bases = [];
    this.refreshHud()
  }

  setBases(bases) {
    for (var i in bases) {
      var newInstance = new lanes.Base(bases[i].id, bases[i].type, bases[i].name, bases[i].home)
      this.bases.push(newInstance)
    }
  }

  setZone(zone_id) {
    this.zone = zone_id
  }

  getZone() {
    return this.zone
  }

  getBasesIDs() {
    return this.bases.map(base => base.id)
  }

  refreshHud() {
    app.send("refreshHud", {
      bases: this.bases.map(base => base.toJson())
    });
  }

}

module.exports = HUD;
