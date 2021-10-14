"use strict";

function switchColour(event) {
  //Declare target, target colour and component element
  const target = event.target;
  const colour = target.style.backgroundColor;
  const component = document.querySelector(`#${currentComponent}-${components[currentComponent]}`);

  //Update chosen colour
  updateChosenColour("band", target);

  //Save colour to object
  colours.bandColour = colour;

  //Change colour
  component.setAttribute("fill", colour);
}

function loadDialColours() {
  document.querySelector(".colour-dial-1").style.backgroundColor = "#fff";
  document.querySelector(".colour-dial-2").style.backgroundColor = "#bebebe";
  document.querySelector(".colour-dial-3").style.backgroundColor = "#513e4f";
  document.querySelector(".colour-dial-4").style.backgroundColor = "#191970";
  document.querySelector(".colour-dial-5").style.backgroundColor = "#000000";
}

function switchDial(event) {
  const target = event.target;
  const colour = target.style.backgroundColor;
  const dial = document.querySelector("#dial");

  //Update chosen colour
  updateChosenColour("dial", target);

  //Save colour to object
  colours.dialColour = colour;

  //Switch dial colour
  dial.setAttribute("fill", colour);
}

function updateChosenColour(component, button) {
  document.querySelectorAll(`#colour-${component}-container .colour-box`).forEach((colour) => {
    colour.classList.remove("chosen");
  });

  button.classList.add("chosen");
}

function switchBandPalette(material) {
  const palette = getBandPalette(material);
  const numbers = [1, 2, 3, 4, 5];

  numbers.forEach((number) => {
    if (palette[number] === "#000000") {
      document.querySelector(`.colour-band-${number}`).classList.add("hidden");
    } else {
      document.querySelector(`.colour-band-${number}`).classList.remove("hidden");
      document.querySelector(`.colour-band-${number}`).style.backgroundColor = palette[number];
    }
  });
}

function getBandPalette(material) {
  let palette = {};

  if (material === "base") {
    palette = {
      1: "#fff",
      2: "#000000",
      3: "#000000",
      4: "#000000",
      5: "#000000",
    };
  } else if (material === "leather") {
    palette = {
      1: "#513734",
      2: "#2B190D",
      3: "#2F1F1D",
      4: "#221C1B",
      5: "#220907",
    };
  } else if (material === "nylon") {
    palette = {
      1: "#1D1D4E",
      2: "#11112D",
      3: "#1D294E",
      4: "#282834",
      5: "#1C1D21",
    };
  } else if (material === "rubber") {
    palette = {
      1: "#1C1C21",
      2: "#252528",
      3: "#3A393C",
      4: "#1F232E",
      5: "#1F1F2E",
    };
  } else if (material === "steel") {
    palette = {
      1: "#646264",
      2: "#3E3D3E",
      3: "#171717",
      4: "#ECD8BB",
      5: "#FDFAF7",
    };
  }

  return palette;
}
