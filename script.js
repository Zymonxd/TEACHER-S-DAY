/* =====================================================
   TEACHER'S DAY WEBSITE
===================================================== */


/* =====================================================
   ELEMENTS
===================================================== */

const music = document.getElementById("music");

const scene1 = document.getElementById("scene1");
const scene2 = document.getElementById("scene2");
const scene3 = document.getElementById("scene3");
const scene4 = document.getElementById("scene4");

const mainTitle = document.getElementById("mainTitle");
const subTitle = document.getElementById("subTitle");

const startButton = document.getElementById("startButton");

const stickyArea = document.getElementById("stickyArea");
const notesContinue = document.getElementById("notesContinue");

const envelope = document.getElementById("envelope");
const envelopeHint = document.getElementById("envelopeHint");
const finalButton = document.getElementById("finalButton");

const goldLine = document.querySelector(".gold-line");


/* =====================================================
   SCENE SWITCHER
===================================================== */

function showScene(number) {

    document.querySelectorAll(".scene").forEach(scene => {
        scene.classList.remove("active");
    });

    const selected = document.getElementById(`scene${number}`);

    if (selected) {
        selected.classList.add("active");
    }
}


/* =====================================================
   MUSIC
===================================================== */

let musicStarted = false;

function startMusic() {

    if (musicStarted) return;

    musicStarted = true;

    music.volume = 0.45;

    music.play().catch(() => {
        /*
          Some mobile browsers require another interaction.
          The website will continue working even if music
          is blocked.
        */
    });
}


/* Start music whenever user first touches the page */

document.addEventListener(
    "pointerdown",
    startMusic,
    { once: true }
);


/* =====================================================
   PARTICLES
===================================================== */

function createParticles() {

    const container = document.getElementById("particles");

    for (let i = 0; i < 45; i++) {

        const particle = document.createElement("div");

        particle.className = "particle";

        particle.style.left =
            Math.random() * 100 + "%";

        particle.style.animationDuration =
            (5 + Math.random() * 9) + "s";

        particle.style.animationDelay =
            (-Math.random() * 10) + "s";

        particle.style.opacity =
            (0.2 + Math.random() * 0.7);

        container.appendChild(particle);
    }
}

createParticles();


/* =====================================================
   TYPEWRITER
===================================================== */

function typeText(element, text, speed = 55) {

    return new Promise(resolve => {

        element.textContent = "";

        let index = 0;

        const timer = setInterval(() => {

            element.textContent += text[index];

            index++;

            if (index >= text.length) {

                clearInterval(timer);

                resolve();
            }

        }, speed);

    });
}


/* =====================================================
   INTRO
===================================================== */

async function runIntro() {

    await new Promise(resolve =>
        setTimeout(resolve, 700)
    );

    await typeText(
        mainTitle,
        "HAPPY TEACHER'S DAY",
        80
    );

    goldLine.classList.add("show");

    await new Promise(resolve =>
        setTimeout(resolve, 400)
    );

    await typeText(
        subTitle,
        "THANK YOU FOR BEING THE BEST TEACHER",
        45
    );

    startButton.classList.add("show");
}

runIntro();


/* =====================================================
   START BUTTON
===================================================== */

startButton.addEventListener("click", () => {

    startMusic();

    showScene(2);

    startStickyAnimation();

});


/* =====================================================
   STICKY NOTES
===================================================== */

const messages = [

    "You are the best teacher!",
    "Thank you for teaching us!",
    "Thank you for believing in us!",
    "You inspire us every day!",
    "We appreciate you!",
    "Thank you for your patience!",
    "You make learning fun!",
    "Thank you for always helping us!",
    "You make a difference!",
    "We are grateful for you!",
    "Thank you for guiding us!",
    "You motivate us to do better!",
    "Your lessons stay with us!",
    "Thank you for understanding us!",
    "You inspire us to dream big!",
    "Thank you for never giving up on us!",
    "You make our classroom special!",
    "We are lucky to have you!",
    "Thank you for your kindness!",
    "You bring out the best in us!",
    "Thank you for every lesson!",
    "You are appreciated more than you know!",
    "Thank you for encouraging us!",
    "You make a lasting impact!",
    "Thank you for everything you do!",
    "You help us believe in ourselves!",
    "Your hard work inspires us!",
    "Thank you for making a difference!",
    "You will always be remembered!",
    "Happy Teacher's Day!"
];


/* Shuffle */

function shuffle(array) {

    const copy = [...array];

    for (
        let i = copy.length - 1;
        i > 0;
        i--
    ) {

        const j =
            Math.floor(Math.random() * (i + 1));

        [copy[i], copy[j]] =
            [copy[j], copy[i]];
    }

    return copy;
}


/* Create grid positions */

function generatePositions(count) {

    const positions = [];

    /*
      6 columns × 5 rows gives enough coverage
      for both desktop and mobile.
    */

    const columns = 6;
    const rows = 5;

    for (let row = 0; row < rows; row++) {

        for (let col = 0; col < columns; col++) {

            const x =
                ((col + 0.5) / columns) * 100;

            const y =
                ((row + 0.5) / rows) * 100;

            positions.push({
                x,
                y
            });
        }
    }

    return shuffle(positions).slice(0, count);
}


/* Create one note */

function createSticky(text, position) {

    const note = document.createElement("div");

    note.className = "sticky-note";

    note.textContent = text;

    note.style.left = position.x + "%";
    note.style.top = position.y + "%";

    /*
      Random entrance direction
    */

    const directions = [

        [-120, -120],
        [120, -120],
        [-120, 120],
        [120, 120],
        [0, -150],
        [0, 150],
        [-180, 0],
        [180, 0]

    ];

    const direction =
        directions[
            Math.floor(
                Math.random() * directions.length
            )
        ];

    note.style.setProperty(
        "--startX",
        direction[0] + "vw"
    );

    note.style.setProperty(
        "--startY",
        direction[1] + "vh"
    );

    note.style.setProperty(
        "--rotation",
        (Math.random() * 12 - 6) + "deg"
    );

    note.style.setProperty(
        "--startRotation",
        (Math.random() * 80 - 40) + "deg"
    );

    stickyArea.appendChild(note);
}


/* Start notes */

function startStickyAnimation() {

    stickyArea.innerHTML = "";

    notesContinue.classList.remove("show");

    const shuffledMessages = shuffle(messages);

    const positions =
        generatePositions(shuffledMessages.length);

    let index = 0;

    const interval = setInterval(() => {

        if (index >= shuffledMessages.length) {

            clearInterval(interval);

            setTimeout(() => {

                notesContinue.classList.remove("hidden");
                notesContinue.classList.add("show");

            }, 1300);

            return;
        }

        createSticky(
            shuffledMessages[index],
            positions[index]
        );

        index++;

    }, 230);
}


/* =====================================================
   STICKY NOTES CONTINUE
===================================================== */

notesContinue.addEventListener("click", () => {

    showScene(3);

});


/* =====================================================
   ENVELOPE
===================================================== */

let envelopeOpened = false;

envelope.addEventListener("click", () => {

    if (!envelopeOpened) {

        envelopeOpened = true;

        envelope.classList.add("open");

        envelopeHint.textContent =
            "YOUR MESSAGE IS INSIDE 💙";

        setTimeout(() => {

            envelopeHint.style.opacity = "0";

            finalButton.classList.remove("hidden");

        }, 1100);

    }

});


/* =====================================================
   FINAL BUTTON
===================================================== */

finalButton.addEventListener("click", () => {

    showScene(4);

});
