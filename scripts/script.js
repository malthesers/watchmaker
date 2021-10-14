"use strict";

document.addEventListener("DOMContentLoaded", () => {
  console.log("DOMContentLoaded");

  //Change fill attributes
  clearPathFills();

  //Load timers
  setCurrentDegrees();

  //Load dial colours
  loadDialColours();

  //Load buttons
  loadButtons();
});

let currentComponent = "band";

const components = {
  band: "base",
  bezel: "base",
  index: "base",
};

const features = {
  gears: false,
  date: false,
  crown1: false,
  crown3: false,
  engraving: "",
};

const colours = {
  bandColour: "rgb(255, 255, 255)",
  dialColour: "rgb(255, 255, 255)",
};

function loadButtons() {
  document.querySelectorAll("img[data-band]").forEach((button) => {
    button.addEventListener("click", changeBand);
  });

  document.querySelectorAll("img[data-bezel]").forEach((button) => {
    button.addEventListener("click", changeBezel);
  });

  document.querySelectorAll("img[data-index]").forEach((button) => {
    button.addEventListener("click", changeIndex);
  });

  document.querySelectorAll("img[data-feature").forEach((button) => {
    button.addEventListener("click", toggleFeature);
  });

  document.querySelectorAll("div[data-panel]").forEach((button) => {
    button.addEventListener("click", switchPanel);
  });

  document.querySelectorAll("#colour-band-container .colour-box").forEach((button) => {
    button.addEventListener("click", switchColour);
  });

  document.querySelectorAll("#colour-dial-container .colour-box").forEach((button) => {
    button.addEventListener("click", switchDial);
  });

  document.querySelector("input").addEventListener("keydown", engraveText);

  document.querySelector("#button-save").addEventListener("click", saveWatch);
  document.querySelector("#button-load").addEventListener("click", loadWatch);

  loadWatchInteractivity();
}

function changeBand(event) {
  const target = event.target;
  const material = target.dataset.band;

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

  //Update components object
  components.band = material;
}

function changeBezel(event) {
  const target = event.target;
  const material = target.dataset.bezel;

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

  //Update components object
  components.bezel = material;
}

function changeIndex(event) {
  const target = event.target;
  const type = target.dataset.index;

  //Update chosen visually
  updateChosen("index", target);

  //Hide other indices
  document.querySelectorAll("#index>*").forEach((index) => {
    index.classList.add("hidden");
  });
  //Show chosen index
  document.querySelector(`#index-${type}`).classList.remove("hidden");

  //Update components object
  components.index = type;
}

function updateChosen(type, target) {
  //Remove border from current
  document.querySelector(`img[data-${type}].chosen`).classList.remove("chosen");

  //Add border to new
  target.classList.add("chosen");
}

function toggleFeature(event) {
  const target = event.target;
  const feature = target.dataset.feature;
  const currentBezel = components.bezel;

  features[feature] = !features[feature];

  if (feature === "gears" || feature === "date") {
    if (features[feature]) {
      document.querySelector(`#feature-${feature}`).classList.remove("hidden");
      target.classList.add("chosen");
    } else {
      document.querySelector(`#feature-${feature}`).classList.add("hidden");
      target.classList.remove("chosen");
    }
  } else {
    if (features[feature]) {
      document.querySelector(`#feature-${feature}-${currentBezel}`).classList.remove("hidden");
      target.classList.add("chosen");
    } else {
      document.querySelector(`#feature-${feature}-${currentBezel}`).classList.add("hidden");
      target.classList.remove("chosen");
    }
  }

  if (feature === "gears") {
    removeText();
  }
}

function clearPathFills() {
  document.querySelectorAll("#watch-container path").forEach((path) => {
    path.setAttribute("fill", "inherit");
  });

  document.querySelectorAll("#watch-container #index").forEach((path) => {
    path.setAttribute("fill", "none");
  });

  document.querySelectorAll("#watch-container #index path").forEach((path) => {
    path.setAttribute("fill", "none");
  });

  document.querySelectorAll("#watch-container #feature-crown3 path").forEach((path) => {
    path.setAttribute("fill", "silver");
  });

  document.querySelectorAll("#bezel path").forEach((path) => {
    path.setAttribute("fill", "none");
  });

  document.querySelectorAll("#watch-container g").forEach((g) => {
    g.style.transitionDuration = "0.3s";
  });
}

function switchPanel() {
  const panel = this.dataset.panel;
  currentComponent = panel;

  //Show crowns
  displayCrownButtons();

  document.querySelectorAll(".panel").forEach((panel) => {
    panel.classList.add("hidden");
  });

  document.querySelector(`#${panel}-panel`).classList.remove("hidden");
}

function displayCrownButtons() {
  const bezel = components.bezel;
  const crown1 = document.querySelector('img[data-feature="crown1"');
  const crown3 = document.querySelector('img[data-feature="crown3"');

  if (bezel === "base") {
    crown1.classList.add("hidden");
    crown3.classList.add("hidden");
  } else if (bezel === "simple") {
    crown1.classList.remove("hidden");
    crown3.classList.remove("hidden");
  } else if (bezel === "diamond") {
    crown1.classList.remove("hidden");
    crown3.classList.add("hidden");
  } else if (bezel === "fluted") {
    crown1.classList.remove("hidden");
    crown3.classList.remove("hidden");
  } else if (bezel === "large") {
    crown1.classList.add("hidden");
    crown3.classList.remove("hidden");
  }
}

function hideCrowns() {
  //Declare array of ID strings
  const crowns = [
    "feature-crown1-fluted",
    "feature-crown1-simple",
    "feature-crown1-diamond",
    "feature-crown3-simple",
    "feature-crown3-large",
    "feature-crown3-fluted",
  ];

  //Hide all crowns
  crowns.forEach((crown) => {
    document.querySelector(`#${crown}`).classList.add("hidden");
  });
}

function loadWatchInteractivity() {
  const interactiveComponents = ["#band", "#bezel", "#index"];

  //Add panelSwitching
  interactiveComponents.forEach((comp) => {
    document.querySelector(`${comp}`).addEventListener("click", switchPanel);
    document.querySelector(`${comp}`).addEventListener("mouseleave", removeHighlight);
    document.querySelector(`${comp}`).addEventListener("mouseenter", addHighlight);
  });

  function addHighlight() {
    interactiveComponents.forEach((comp) => {
      document.querySelector(`${comp}`).style.filter = "brightness(30%)";
    });

    if (this.dataset.panel !== "index") {
      document.querySelector("#dial").style.filter = "brightness(30%)";
    }

    document.querySelector(`#${this.dataset.panel}`).style.filter = "brightness(100%)";
  }

  function removeHighlight() {
    interactiveComponents.forEach((comp) => {
      document.querySelector(`${comp}`).style.filter = "brightness(100%)";
    });

    document.querySelector("#dial").style.filter = "brightness(100%)";
  }
}

function engraveText() {
  //Get getInputText and engraveTextField
  const text = getInputText();
  const engrave = document.querySelector("#engrave-text");

  //Remove gears
  removeGears();

  //Save text to object
  features.engraving = text;

  //Insert text
  engrave.textContent = text;
}

function getInputText() {
  return document.querySelector("input").value;
}

function removeGears() {
  //Remove gears from dial
  document.querySelector("#feature-gears").classList.add("hidden");

  //Remove gears from feature list
  features.gears = false;

  //Remove chosen from gears button
  document.querySelector('img[data-feature="gears"]').classList.remove("chosen");
}

function removeText() {
  //Get engraveTextField and inputTextField
  const engrave = document.querySelector("#engrave-text");
  const input = document.querySelector("input");

  //Remove text from engraveTextField and inputTextField
  engrave.textContent = "";
  input.value = "";
}
