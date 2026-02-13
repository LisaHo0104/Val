// Elements
const envelope = document.getElementById("envelope-container");
const letter = document.getElementById("letter-container");
const noBtn = document.querySelector(".no-btn");
const yesBtn = document.querySelector(".btn[alt='Yes']");

const title = document.getElementById("letter-title");
const catImg = document.getElementById("letter-cat");
const buttons = document.getElementById("letter-buttons");
const finalText = document.getElementById("final-text");
const letterImageContainer = document.getElementById("letter-image-container");

// Background music: start muted (autoplay allowed), unmute on first click
let youtubePlayer = null;
let musicUnmuted = false;

function unmuteMusic() {
    if (musicUnmuted || !youtubePlayer) return;
    musicUnmuted = true;
    youtubePlayer.unMute();
    youtubePlayer.playVideo();
}

window.onYouTubeIframeAPIReady = function () {
    youtubePlayer = new YT.Player("youtube-player", {
        videoId: "GsmQt-2xpw0",
        playerVars: {
            autoplay: 1,
            mute: 1,
            loop: 1,
            playlist: "GsmQt-2xpw0",
            controls: 0,
            disablekb: 1,
            fs: 0,
            modestbranding: 1,
            playsinline: 1
        },
        events: {
            onReady: function () {
                youtubePlayer.playVideo();
            }
        }
    });
};

document.body.addEventListener("click", unmuteMusic, { once: true });

// Click Envelope

envelope.addEventListener("click", () => {
    envelope.style.display = "none";
    letter.style.display = "flex";

    setTimeout( () => {
        document.querySelector(".letter-window").classList.add("open");
    },50);
});

// Logic to move the NO btn (stays inside the letter window)

let noBtnDx = 0;
let noBtnDy = 0;
let noBtnHomeRect = null;

noBtn.addEventListener("mouseover", () => {
    const letterWindow = document.querySelector(".letter-window");
    const containerRect = letterWindow.getBoundingClientRect();

    if (!noBtnHomeRect) {
        const r = noBtn.getBoundingClientRect();
        noBtnHomeRect = {
            left: r.left - noBtnDx,
            top: r.top - noBtnDy,
            width: r.width,
            height: r.height
        };
    }

    const min = 120;
    const max = 220;
    const distance = Math.random() * (max - min) + min;
    const angle = Math.random() * Math.PI * 2;
    let newDx = noBtnDx + Math.cos(angle) * distance;
    let newDy = noBtnDy + Math.sin(angle) * distance;

    const padding = 12;
    const minDx = (containerRect.left + padding) - noBtnHomeRect.left;
    const maxDx = (containerRect.right - padding - noBtnHomeRect.width) - noBtnHomeRect.left;
    const minDy = (containerRect.top + padding) - noBtnHomeRect.top;
    const maxDy = (containerRect.bottom - padding - noBtnHomeRect.height) - noBtnHomeRect.top;

    newDx = Math.max(minDx, Math.min(maxDx, newDx));
    newDy = Math.max(minDy, Math.min(maxDy, newDy));

    noBtnDx = newDx;
    noBtnDy = newDy;
    noBtn.style.transition = "transform 0.3s ease";
    noBtn.style.transform = `translate(${noBtnDx}px, ${noBtnDy}px)`;
});

// Logic to make YES btn to grow

// let yesScale = 1;

// yesBtn.style.position = "relative"
// yesBtn.style.transformOrigin = "center center";
// yesBtn.style.transition = "transform 0.3s ease";

// noBtn.addEventListener("click", () => {
//     yesScale += 2;

//     if (yesBtn.style.position !== "fixed") {
//         yesBtn.style.position = "fixed";
//         yesBtn.style.top = "50%";
//         yesBtn.style.left = "50%";
//         yesBtn.style.transform = `translate(-50%, -50%) scale(${yesScale})`;
//     }else{
//         yesBtn.style.transform = `translate(-50%, -50%) scale(${yesScale})`;
//     }
// });

// YES is clicked

yesBtn.addEventListener("click", () => {
    title.textContent = "Yippeeee!";

    catImg.src = "cat_dance.gif";

    document.querySelector(".letter-window").classList.add("final");

    buttons.style.display = "none";

    finalText.style.display = "block";
});

// Click cat on final screen → go to letter image page
catImg.addEventListener("click", () => {
    const letterWindow = document.querySelector(".letter-window");
    if (!letterWindow || !letterWindow.classList.contains("final")) return;
    letter.style.display = "none";
    letterImageContainer.classList.add("show");
});
