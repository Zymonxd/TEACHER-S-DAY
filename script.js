/* =====================================================
   TEACHER'S DAY WEBSITE
===================================================== */


/* =========================================
   ELEMENTS
========================================= */

const music =
    document.getElementById("music");

const mainTitle =
    document.getElementById("mainTitle");

const subTitle =
    document.getElementById("subTitle");

const startButton =
    document.getElementById("startButton");

const goldLine =
    document.querySelector(".gold-line");

const stickyArea =
    document.getElementById("stickyArea");

const notesContinue =
    document.getElementById("notesContinue");

const envelope =
    document.getElementById("envelope");

const envelopeHint =
    document.getElementById("envelopeHint");

const finalButton =
    document.getElementById("finalButton");


/* =========================================
   SCENE FUNCTION
========================================= */

function showScene(number) {

    document
        .querySelectorAll(".scene")
        .forEach(scene => {

            scene.classList.remove("active");

        });

    const target =
        document.getElementById(
            "scene" + number
        );

    if (target) {
        target.classList.add("active");
    }
}


/* =========================================
   MUSIC
========================================= */

let musicHasStarted = false;

async function playMusic() {

    if (musicHasStarted) {
        return;
    }

    try {

        /*
         * Reset the audio in case the browser
         * previously rejected playback.
         */

        music.currentTime = 0;

        music.volume = 0.5;

        await music.play();

        musicHasStarted = true;

        console.log(
            "Teacher's Day music is playing."
        );

    } catch (error) {

        console.error(
            "Music could not play.",
            error
        );

        /*
         * The website itself will continue working.
         */

    }
}


/* =========================================
   PARTICLES
========================================= */

function createParticles() {

    const container =
        document.getElementById(
            "particles"
        );

    for (let i = 0; i < 45; i++) {

        const particle =
            document.createElement("div");

        particle.className =
            "particle";

        particle.style.left =
            Math.random() * 100 + "%";

        particle.style.animationDuration =
            5 + Math.random() * 9 + "s";

        particle.style.animationDelay =
            -Math.random() * 10 + "s";

        particle.style.opacity =
            .2 + Math.random() * .7;

        container.appendChild(
            particle
        );
    }
}

createParticles();


/* =========================================
   TYPEWRITER
========================================= */

function typeWriter(
    element,
    text,
    speed
) {

    return new Promise(resolve => {

        element.textContent = "";

        let index = 0;

        const timer =
            setInterval(() => {

                element.textContent +=
                    text[index];

                index++;

                if (
                    index >=
                    text.length
                ) {

                    clearInterval(timer);

                    resolve();

                }

            }, speed);

    });

}


/* =========================================
   INTRO
========================================= */

async function startIntro() {

    await wait(700);

    await typeWriter(
        mainTitle,
        "HAPPY TEACHER'S DAY",
        80
    );

    goldLine.classList.add("show");

    await wait(400);

    await typeWriter(
        subTitle,
        "THANK YOU FOR BEING THE BEST TEACHER",
        45
    );

    startButton.classList.add(
        "show"
    );
}

startIntro();


/* =========================================
   WAIT FUNCTION
========================================= */

function wait(milliseconds) {

    return new Promise(resolve => {

        setTimeout(
            resolve,
            milliseconds
        );

    });

}


/* =========================================
   START WEBSITE
========================================= */

startButton.addEventListener(
    "click",
    async function () {

        /*
         * IMPORTANT:
         *
         * This is the user's actual click.
         * Mobile browsers allow audio playback
         * much more reliably from here.
         */

        await playMusic();

        showScene(2);

        startStickyAnimation();

    }
);


/* =========================================
   STICKY MESSAGES
========================================= */

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


/* =========================================
   SHUFFLE
========================================= */

function shuffle(array) {

    const result =
        [...array];

    for (
        let i = result.length - 1;
        i > 0;
        i--
    ) {

        const j =
            Math.floor(
                Math.random() *
                (i + 1)
            );

        [
            result[i],
            result[j]
        ] = [
            result[j],
            result[i]
        ];

    }

    return result;
}


/* =========================================
   GRID POSITIONS
========================================= */

function createPositions(
    amount
) {

    const positions = [];

    const columns = 6;
    const rows = 5;

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
                    ((column + .5) /
                    columns) * 100,

                y:
                    ((row + .5) /
                    rows) * 100

            });

        }

    }

    return shuffle(
        positions
    ).slice(
        0,
        amount
    );
}


/* =========================================
   CREATE NOTE
========================================= */

function createNote(
    text,
    position
) {

    const note =
        document.createElement(
            "div"
        );

    note.className =
        "sticky-note";

    note.textContent =
        text;

    note.style.left =
        position.x + "%";

    note.style.top =
        position.y + "%";


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
                Math.random() *
                directions.length
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
        (
            Math.random() * 12 - 6
        ) + "deg"
    );


    note.style.setProperty(
        "--startRotation",
        (
            Math.random() * 80 - 40
        ) + "deg"
    );


    stickyArea.appendChild(
        note
    );
}


/* =========================================
   START STICKY ANIMATION
========================================= */

function startStickyAnimation() {

    stickyArea.innerHTML = "";

    notesContinue.classList.add(
        "hidden"
    );

    const shuffled =
        shuffle(messages);

    const positions =
        createPositions(
            shuffled.length
        );

    let index = 0;

    const timer =
        setInterval(() => {

            if (
                index >=
                shuffled.length
            ) {

                clearInterval(
                    timer
                );

                setTimeout(() => {

                    notesContinue.classList.remove(
                        "hidden"
                    );

                    notesContinue.classList.add(
                        "show"
                    );

                }, 1200);

                return;
            }


            createNote(
                shuffled[index],
                positions[index]
            );

            index++;

        }, 230);

}


/* =========================================
   STICKY CONTINUE
========================================= */

notesContinue.addEventListener(
    "click",
    function () {

        showScene(3);

    }
);


/* =========================================
   ENVELOPE
========================================= */

let envelopeOpened = false;

envelope.addEventListener(
    "click",
    function () {

        if (envelopeOpened) {
            return;
        }

        envelopeOpened = true;

        envelope.classList.add(
            "open"
        );


        envelopeHint.style.opacity =
            "0";


        /*
         * Wait until the letter has
         * moved upward before showing
         * the continue button.
         */

        setTimeout(() => {

            finalButton.classList.remove(
                "hidden"
            );

            finalButton.classList.add(
                "show"
            );

        }, 1200);

    }
);


/* =========================================
   FINAL SCREEN
========================================= */

finalButton.addEventListener(
    "click",
    function () {

        showScene(4);

    }
);
