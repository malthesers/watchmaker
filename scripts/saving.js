"use strict";

function saveWatch() {
  localStorage.clear();

  localStorage.setItem("band", components.band);
  localStorage.setItem("bezel", components.bezel);
  localStorage.setItem("index", components.index);

  localStorage.setItem("gears", features.gears);
  localStorage.setItem("date", features.date);
  localStorage.setItem("crown1", features.crown1);
  localStorage.setItem("crown3", features.crown3);
  localStorage.setItem("engraving", features.engraving);

  localStorage.setItem("bandColour", colours.bandColour);
  localStorage.setItem("dialColour", colours.dialColour);
}

function loadWatch() {
  components.band = localStorage.getItem("band");
  components.bezel = localStorage.getItem("bezel");
  components.index = localStorage.getItem("index");

  features.gears = localStorage.getItem("gears");
  features.date = localStorage.getItem("date");
  features.crown1 = localStorage.getItem("crown1");
  features.crown3 = localStorage.getItem("crown3");
  features.engraving = localStorage.getItem("engraving");

  colours.bandColour = localStorage.getItem("bandColour");
  colours.dialColour = localStorage.getItem("dialColour");

  displayLoadedWatch();
}

function displayLoadedWatch() {
  loadWatchBand();
  loadWatchBezel();
  loadWatchIndex();

  loadFeatures();
  loadEngraving();

  loadBandColour();
  loadDialColour();
}

function loadWatchBand() {
  const material = components.band;
  const target = document.querySelector(`img[data-band=${material}]`);

  //Update chosen visually
  updateChosen("band", target);

  //Switch band palette
  switchBandPalette(material);

  //Hide other bands
  document.querySelectorAll("#band>g").forEach((band) => {
    band.classList.add("hidden");
  });
  //Show chosen band
  document.querySelector(`#band-${material}`).classList.remove("hidden");
}

function loadWatchBezel() {
  const material = components.bezel;
  const target = document.querySelector(`img[data-bezel=${material}]`);

  //Update chosen visually
  updateChosen("bezel", target);

  //Hide crowns
  hideCrowns();

  //Hide other bezels
  document.querySelectorAll("#bezel>*").forEach((bezel) => {
    bezel.classList.add("hidden");
  });
  //Show chosen bezel
  document.querySelector(`#bezel-${material}`).classList.remove("hidden");
}

function loadWatchIndex() {
  const type = components.index;
  const target = document.querySelector(`img[data-index=${type}]`);

  //Update chosen visually
  updateChosen("index", target);

  //Hide other indices
  document.querySelectorAll("#index>*").forEach((index) => {
    index.classList.add("hidden");
  });
  //Show chosen index
  document.querySelector(`#index-${type}`).classList.remove("hidden");
}

function loadFeatures() {
  const featureArray = ["gears", "date", "crown1", "crown3"];
  const currentBezel = components.bezel;

  featureArray.forEach((feature) => {
    const target = document.querySelector(`img[data-feature=${feature}]`);

    if (feature === "gears" || feature === "date") {
      if (features[feature] === true) {
        document.querySelector(`#feature-${feature}`).classList.remove("hidden");
        target.classList.add("chosen");
      } else {
        document.querySelector(`#feature-${feature}`).classList.add("hidden");
        target.classList.remove("chosen");
      }
    } else {
      if (features[feature] === true) {
        document.querySelector(`#feature-${feature}-${currentBezel}`).classList.remove("hidden");
        target.classList.add("chosen");
      }
    }
  });
}

function loadEngraving() {
  //Get getInputText and engraveTextField
  const text = features.engraving;
  const engrave = document.querySelector("#engrave-text");
  const input = document.querySelector("input");

  //Insert text
  engrave.textContent = text;
  input.value = text;
}

function loadBandColour() {
  //Declare target, target colour and component element
  const colour = colours.bandColour;
  const target = document.querySelector(`div[style="background-color: ${colour};"]`);
  const component = document.querySelector(`#band-${components.band}`);

  //Update chosen colour
  updateChosenColour("band", target);

  //Change colour
  component.setAttribute("fill", colour);
}

function loadDialColour() {
  const colour = colours.dialColour;
  const target = document.querySelector(`div[style="background-color: ${colour};"]`);
  const dial = document.querySelector("#dial");

  //Update chosen colour
  updateChosenColour("dial", target);

  //Switch dial colour
  dial.setAttribute("fill", colour);
}
