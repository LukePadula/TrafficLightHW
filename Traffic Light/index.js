// FORK THIS PEN

// 1. Wire up the buttons to the lights

// You'll have to select and store the lights as a variable (although it may help you later to have a reference to all of them at once via the 'light' class)

// You'll have to select and store the buttons as separate variables

// then, add an event listener to each of the buttons

// in the 'handler' (the function you give to the listener) you add a class of 'on' to the relevant light

// Also make the lights go on and off on hover (of the light!!)

// 2. (Extra credit): Have a go at making it so that only one light can be on at one time

// 3. (wild&crazy credit) See if you can set up a timer of some sort to do that automatically (You'll have to add new start and stop buttons to the page)

const { log } = console;
const buttonDiv = document.getElementById("buttonDiv");
const lightsDiv = document.getElementById("lightDiv");
const lightsElements = document
  .getElementById("lightDiv")
  .querySelectorAll(".light");

// Convert node array into JS array.
let lightsArray = [...lightsElements];
const lightObj = {};
let interval;

// Gets random Int for disco.
const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
};

const lightStartNumber = {
  auto: 0,
  reverse: lightsArray.length,
  disco: getRandomInt(1, lightsArray.length),
};

// Puts lights into object so they can easily be retrieved by setLights() function.
for (let index = 0; index < lightsArray.length; index++) {
  lightObj[lightsArray[index].id] = lightsArray[index];
}

// Listent to parent. Pass ID to give on class.
buttonDiv.addEventListener("click", (e) => {
  if (e.target.tagName === "BUTTON") {
    handleButtonClick(e.target.id);
  }
});

// Add listener to each light.
lightsDiv.addEventListener("mouseover", (e) => {
  handleButtonClick(e.target.id);
});
lightsDiv.addEventListener("mouseout", () => {
  resetLights();
});

const handleButtonClick = (buttonTagId) => {
  resetLights();
  stopTimer();
  // Checks if button is connected to light. Else if it requires interval. else reset lights
  if (buttonTagId in lightObj) {
    setLights(buttonTagId);
  } else if (
    buttonTagId === "auto" ||
    buttonTagId === "reverse" ||
    buttonTagId === "disco"
  ) {
    automateLights(buttonTagId);
  }
};

// Sets interval.
const automateLights = (buttonTagId) => {
  let count = lightStartNumber[buttonTagId];

  interval = setInterval(() => {
    if (buttonTagId === "auto") {
      setLights(lightsArray[count].id);
      count++;

      if (count === lightsArray.length) {
        count = lightStartNumber[buttonTagId];
      }
    } else if (buttonTagId === "reverse") {
      setLights(lightsArray[count - 1].id);
      count--;

      if (count == 0) {
        count = lightStartNumber[buttonTagId];
      }
    } else if (buttonTagId === "disco") {
      setLights(lightsArray[getRandomInt(0, lightsArray.length)].id);
    }
  }, 500);
};

const stopTimer = () => {
  clearInterval(interval);
};

// Sets on for selected light.
const setLights = (buttonTagId) => {
  resetLights();
  lightObj[buttonTagId].classList.add("on");
};

// Resets lights.
const resetLights = () => {
  for (let light in lightObj) {
    lightObj[light].classList.remove("on");
  }
};
