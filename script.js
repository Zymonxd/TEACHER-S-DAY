/* ==========================================
ELEMENTS
========================================== */

const music =
document.getElementById("music");

const mainTitle =
document.getElementById("mainTitle");

const subTitle =
document.getElementById("subTitle");

const startButton =
document.getElementById("startButton");

const notesContinue =
document.getElementById("notesContinue");

const stickyArea =
document.getElementById("stickyArea");

const envelope =
document.getElementById("envelope");

const envelopeHint =
document.getElementById("envelopeHint");

const scenes =
document.querySelectorAll(".scene");

/* ==========================================
SCENE SWITCHER
========================================== */

function showScene(number) {

scenes.forEach(scene => {

    scene.classList.remove("active");

});

document
    .querySelector(".scene-" + number)
    .classList.add("active");

}

/* ==========================================
PARTICLES
========================================== */

function createParticles() {

const container =
    document.getElementById("particles");

for (let i = 0; i < 45; i++) {

    const particle =
        document.createElement("div");

    particle.className =
        "particle";

    particle.style.left =
        Math.random() * 100 + "%";

    particle.style.animationDuration =
        8 + Math.random() * 12 + "s";

    particle.style.animationDelay =
        Math.random() * 10 + "s";

    particle.style.opacity =
        .2 + Math.random() * .8;

    container.appendChild(particle);
}

}

createParticles();

/* ==========================================
TYPEWRITER
========================================== */

function typeWriter(
element,
text,
speed
) {

return new Promise(resolve => {

    let index = 0;

    function write() {

        if (index < text.length) {

            element.textContent +=
                text[index];

            index++;

            setTimeout(
                write,
                speed
            );

        } else {

            resolve();

        }

    }

    write();

});

}

/* ==========================================
START INTRO
========================================== */

async function intro() {

await new Promise(resolve =>
    setTimeout(resolve, 900)
);


await typeWriter(
    mainTitle,
    "HAPPY TEACHER'S DAY",
    95
);


await new Promise(resolve =>
    setTimeout(resolve, 500)
);


await typeWriter(
    subTitle,
    "THANK YOU FOR BEING THE BEST TEACHER",
    55
);


startButton.classList.remove(
    "hidden"
);

}

intro();

/* ==========================================
MUSIC

Mobile browsers require interaction.
========================================== */

function startMusic() {

music.volume = .35;

music.play()
    .catch(() => {});

}

document.body.addEventListener(
"click",
startMusic,
{ once: true }
);

/* ==========================================
SCENE 1 → SCENE 2
========================================== */

startButton.addEventListener(
"click",
() => {

    showScene(2);

    startStickyAnimation();

}

);

/* ==========================================
STICKY NOTE CONTENT
========================================== */

const messages = [

"You are the best teacher!",

"Thank you for teaching us!",

"Thank you for believing in us!",

"You inspire us every day!",

"We appreciate you!",

"Thank you for your patience!",

"You make learning meaningful!",

"Thank you for every lesson!",

"You helped us grow!",

"You make a difference!",

"Thank you for guiding us!",

"You make every class brighter!",

"Your lessons stay with us!",

"Thank you for encouraging us!",

"We are grateful for you!",

"You are truly one of a kind!",

"Thank you for never giving up on us!",

"Thank you for making school memorable!",

"You inspire us to do better!",

"Thank you for always being there!",

"We will remember your lessons!",

"Thank you for making learning fun!",

"You believed in us!",

"Your effort never goes unnoticed!",

"We appreciate everything you do!",

"Thank you for being part of our journey!",

"You make a difference in our lives!",

"Thank you for helping us become better!",

"Your kindness means so much!",

"Happy Teacher's Day!"

];

/* ==========================================
GENERATE POSITIONS
========================================== */

function generatePositions() {

const positions = [];

const columns = 5;

const rows = 5;

const cellWidth =
    100 / columns;

const cellHeight =
    100 / rows;


for (
    let row = 0;
    row < rows;
    row++
) {

    for (
        let column = 0;
        column < columns;
        column++
    ) {

        positions.push({

            x:
                column * cellWidth +
                cellWidth / 2,

            y:
                row * cellHeight +
                cellHeight / 2

        });

    }

}


// Shuffle

positions.sort(
    () => Math.random() - .5
);

return positions;

}

/* ==========================================
STICKY NOTE ANIMATION
========================================== */

function startStickyAnimation() {

stickyArea.innerHTML = "";

notesContinue.classList.add(
    "hidden"
);


const positions =
    generatePositions();


messages.forEach(
    (message, index) => {

        setTimeout(
            () => {

                createSticky(
                    message,
                    positions[index % positions.length]
                );

            },

            index * 280
        );

    }
);


// Show button after animation

setTimeout(
    () => {

        notesContinue.classList.remove(
            "hidden"
        );

    },

    messages.length * 280 + 1200
);

}

/* ==========================================
CREATE STICKY
========================================== */

function createSticky(
message,
position
) {

const note =
    document.createElement("div");

note.className =
    "sticky";


note.textContent =
    message;


/*
   Small random movement around
   the target position.
*/

const x =
    position.x +
    (Math.random() * 10 - 5);

const y =
    position.y +
    (Math.random() * 10 - 5);


const rotation =
    Math.random() * 18 - 9;


/*
   Start from different directions.
*/

const directions = [

    [-window.innerWidth, -window.innerHeight],

    [window.innerWidth, -window.innerHeight],

    [-window.innerWidth, window.innerHeight],

    [window.innerWidth, window.innerHeight],

    [0, -window.innerHeight],

    [0, window.innerHeight],

    [-window.innerWidth, 0],

    [window.innerWidth, 0]

];


const direction =
    directions[
        Math.floor(
            Math.random() *
            directions.length
        )
    ];


note.style.left =
    x + "%";

note.style.top =
    y + "%";


note.style.setProperty(
    "--rotate",
    rotation + "deg"
);


note.style.setProperty(
    "--fromX",
    direction[0] + "px"
);


note.style.setProperty(
    "--fromY",
    direction[1] + "px"
);


stickyArea.appendChild(
    note
);

}

/* ==========================================
SCENE 2 → SCENE 3
========================================== */

notesContinue.addEventListener(
"click",
() => {

    showScene(3);

}

);

/* ==========================================
ENVELOPE
========================================== */

envelope.addEventListener(
"click",
() => {

    if (
        envelope.classList.contains(
            "open"
        )
    ) {

        return;

    }


    envelope.classList.add(
        "open"
    );


    envelopeHint.style.opacity =
        "0";


    /*
       Wait for letter animation.
    */

    setTimeout(
        () => {

            envelopeHint.textContent =
                "CLICK OUTSIDE TO CONTINUE";

            envelopeHint.style.opacity =
                "1";

        },

        1800
    );

}

);

/* ==========================================
GO TO FINAL
========================================== */

document
.querySelector(".scene-3")
.addEventListener(
"click",
event => {

        if (
            !envelope.classList.contains(
                "open"
            )
        ) {

            return;

        }


        if (
            event.target.closest(
                ".envelope"
            )
        ) {

            return;

        }


        showScene(4);

    }
);
