/* =========================================
   YOU MADE IT TODAY
   Main JavaScript
========================================= */


/* ================= SCREEN SYSTEM ================= */

function showScreen(id) {

  document.querySelectorAll(".screen").forEach(screen => {
    screen.classList.remove("active");
  });

  const screen = document.getElementById(id);

  screen.classList.add("active");

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}


/* ================= TYPEWRITER ================= */

const openingText =
  "Hey.\nBefore you leave...\nI just want you to know something.";

let charIndex = 0;
let lineBreakPause = false;

function typeOpening() {

  if (charIndex < openingText.length) {

    const character = openingText.charAt(charIndex);

    if (character === "\n") {

      document.getElementById("openingText").innerHTML += "<br>";

    } else {

      document.getElementById("openingText").innerHTML += character;

    }

    charIndex++;

    setTimeout(typeOpening, 55);

  } else {

    setTimeout(() => {

      document
        .getElementById("startBtn")
        .classList.remove("hidden");

      document
        .getElementById("startBtn")
        .style.animation = "fadeIn 1s ease";

    }, 500);

  }

}


/* Start typing when page loads */

window.addEventListener("load", () => {

  setTimeout(typeOpening, 800);

});


/* ================= START ================= */

document.getElementById("startBtn").addEventListener("click", () => {

  showScreen("mainMessage");

});


/* ================= CHOICES ================= */

function showChoices() {

  showScreen("choices");

}


const messages = {

  tired: {

    icon: "☁️",

    title: "It's okay to rest.",

    text:
      "You don't have to be productive every second. Rest isn't failure. Sometimes continuing means allowing yourself to breathe."
  },

  difficult: {

    icon: "🌧️",

    title: "Today was difficult.",

    text:
      "A difficult day doesn't mean every day will feel like this. You made it through today, and tomorrow gives you another chance."
  },

  overthinking: {

    icon: "💭",

    title: "You can let your mind rest.",

    text:
      "Not every thought needs an answer tonight. Some things can wait until tomorrow."
  },

  encouragement: {

    icon: "🌱",

    title: "Keep going.",

    text:
      "You don't have to see the entire road ahead. Sometimes you only need enough strength for the next step."
  }

};


function chooseMessage(type) {

  const selected = messages[type];

  document.getElementById("choiceIcon").textContent =
    selected.icon;

  document.getElementById("choiceTitle").textContent =
    selected.title;

  document.getElementById("choiceText").textContent =
    selected.text;

  showScreen("choiceMessage");

}


/* ================= BREATHING ================= */

function startBreathing() {

  showScreen("breathing");

  const breathText =
    document.getElementById("breathText");

  let cycle = 0;

  const breathingWords = [
    "Breathe in",
    "Hold",
    "Breathe out",
    "Rest"
  ];

  function changeBreath() {

    if (cycle >= breathingWords.length) {

      setTimeout(() => {

        showScreen("achievement");

      }, 1000);

      return;

    }

    breathText.textContent =
      breathingWords[cycle];

    cycle++;

    setTimeout(changeBreath, 2000);

  }

  changeBreath();

}


/* ================= FINAL ================= */

let finalStep = 1;


function showFinal() {

  finalStep = 1;

  document
    .querySelectorAll("#final [id^='finalStep']")
    .forEach(element => {
      element.classList.add("hidden");
    });

  document
    .getElementById("finalStep1")
    .classList.remove("hidden");

  showScreen("final");

}


function nextFinal() {

  const current =
    document.getElementById(
      "finalStep" + finalStep
    );

  current.classList.add("hidden");

  finalStep++;

  const next =
    document.getElementById(
      "finalStep" + finalStep
    );

  if (next) {

    next.classList.remove("hidden");

    next.style.animation =
      "fadeIn 1.2s ease";

  }

}


/* ================= GOODNIGHT ================= */

function goodnight() {

  const goodbye =
    document.getElementById("goodnight");

  goodbye.classList.add("active");

}
