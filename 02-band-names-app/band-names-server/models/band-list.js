const Band = require("./band");

class BandList {
  constructor() {
    this.bands = [
      new Band("Metallica"),
      new Band("Linkin Park"),
      new Band("Green Day"),
      new Band("One Republic"),
    ];
  }

  createBand(name) {
    const newBand = new Band(name);
    this.bands.push(newBand);

    return this.bands;
  }

  deleteBand(id) {
    this.bands = this.bands.filter((band) => band.id !== id);
  }

  getAllBands() {
    return this.bands;
  }

  voteUp(id) {
    this.bands = this.bands.map((band) => {
      if (band.id === id) band.votes += 1;

      return band;
    });
  }

  updateBandName(id, newName) {
    this.bands = this.bands.map((band) => {
      if (band.id === id) band.name = newName;

      return band;
    });
  }
}

module.exports = BandList;
