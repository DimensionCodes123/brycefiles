/* boot screen -> show site (test) */

setTimeout(()=>{
document.getElementById("bootScreen").style.display="none"
document.querySelector(".container").style.display="block"


/* countdown - short test countdown (20 seconds) */

const second = 1000
const minute = second * 60
const hour = minute * 60
const day = hour * 24

// test countdown: 20 seconds from page load
const countDown = 03/17 0:0:0 AM

const x = setInterval(()=>{

const now = new Date().getTime()
const distance = countDown - now

document.getElementById("days").innerText = Math.floor(distance/day)
document.getElementById("hours").innerText = Math.floor((distance%day)/hour)
document.getElementById("minutes").innerText = Math.floor((distance%hour)/minute)
document.getElementById("seconds").innerText = Math.floor((distance%minute)/second)

// Update progress bar
const totalDuration = 20 * second; // 20 seconds is the initial countdown duration
const progressPercent = ((totalDuration - distance) / totalDuration) * 100;
if (decryptProgressBar) {
    decryptProgressBar.style.width = `${progressPercent}%`;
}

tickSound.currentTime = 0
try {
    tickSound.play()
} catch (error) {
    console.error("Error playing tick sound:", error)
}


if(distance < 0){

clearInterval(x)
tickSound.pause()
tickSound.currentTime = 0

if (decryptProgressBar) {
    decryptProgressBar.style.width = `100%`; // Ensure it's 100% at the end
}

document.getElementById("headline").innerText="FILES RELEASED"

document.getElementById("countdown").style.display="none"
document.getElementById("decryptSection").style.display="none"
document.getElementById("content").style.display="block"
document.getElementById("videoSection").style.display="block"

document.getElementById("releaseSound").play().then(() => {
    console.log("Release sound played successfully.")
}).catch(error => {
    console.error("Error playing release sound:", error)
})

confetti({
particleCount:250,
spread:150,
origin:{y:.6}
})

}

},1000)
},2000)


/* MATRIX RAIN (same as main) */

const canvas=document.getElementById("matrix")
const ctx=canvas.getContext("2d")

canvas.height=window.innerHeight
canvas.width=window.innerWidth

const letters="01ABCDEFGHIJKLMNOPQRSTUVWXYZ"

const fontSize=16
const columns=canvas.width/fontSize

const drops=[]

for(let xCol=0;xCol<columns;xCol++)
drops[xCol]=1

function draw(){

ctx.fillStyle="rgba(0,0,0,0.05)"
ctx.fillRect(0,0,canvas.width,canvas.height)

ctx.fillStyle="#00ff9c"
ctx.font=fontSize+"px monospace"

for(let i=0;i<drops.length;i++){

const text=letters.charAt(Math.floor(Math.random()*letters.length))

ctx.fillText(text,i*fontSize,drops[i]*fontSize)

if(drops[i]*fontSize>canvas.height && Math.random()>0.975)
drops[i]=0

drops[i]++

}

}

setInterval(draw,33)


// video flow: first video -> button -> second video -> thanks screen -> statement
const firstVideo = document.getElementById("releaseVideo")
const glitchSound = document.getElementById("glitchSound")
const bennettGlitchText = document.querySelector(".bennett-glitch")

const secondVideo = document.getElementById("secondVideo")
const videoSection = document.getElementById("videoSection")
const videoSection2 = document.getElementById("videoSection2")
const thanksScreen = document.getElementById("thanksScreen")
const statement = document.getElementById("statement")
const bennettScreen = document.getElementById("bennettScreen")
const realEvidenceBtn = document.getElementById("realEvidenceBtn")
const realEvidenceScreen = document.getElementById("realEvidenceScreen")
const decryptProgressBar = document.querySelector(".progress");

if(firstVideo && secondVideo && videoSection && videoSection2 && thanksScreen && statement && bennettScreen && realEvidenceBtn && realEvidenceScreen){

firstVideo.addEventListener("ended",()=>{
    videoSection.style.display = "none"
    videoSection2.style.display = "block"
    secondVideo.play()
})

secondVideo.addEventListener("ended",()=>{
        videoSection2.style.display = "none"
        thanksScreen.style.display = "block"
        statement.style.display = "block" // Show the statement text

        // after ~7 seconds, trigger Bennett Files takeover
        setTimeout(()=>{
            statement.style.display = "none"
            document.querySelector(".container").style.display = "none"
            document.getElementById("matrix").style.display = "none"
            bennettScreen.style.display = "flex"
            glitchSound.play().then(() => {
                console.log("Glitch sound played successfully.")
            }).catch(error => {
                console.error("Error playing glitch sound:", error)
            })
            bennettGlitchText.classList.add("glitch-activate")

            // Remove the glitch-activate class after a short delay to reveal the text fully
            setTimeout(() => {
                bennettGlitchText.classList.remove("glitch-activate")
            }, 1500) // Adjust this duration as needed

            // after ~5 seconds of flashing, reveal Real Evidence button
            setTimeout(()=>{
                realEvidenceBtn.style.display = "inline-block"
            },5000)

            realEvidenceBtn.addEventListener("click",()=>{
                bennettScreen.style.display = "none"
                realEvidenceScreen.style.display = "block"
            })
        },7000)
    })

}

// Function to unlock audio context
function unlockAudio() {
    const audioElements = [
        document.getElementById("releaseSound"),
        document.getElementById("tickSound"),
        document.getElementById("glitchSound")
    ];

    audioElements.forEach(audio => {
        if (audio) {
            audio.muted = true;
            audio.play().then(() => {
                // Only pause if it actually started playing
                if (!audio.paused) {
                    audio.pause();
                    audio.currentTime = 0;
                }
                audio.muted = false; // Reset muted state for actual playback
            }).catch(error => {
                console.warn("Failed to unlock audio context for:", audio.id, error);
            });
        }
    });

    document.removeEventListener('click', unlockAudio);
    document.removeEventListener('touchend', unlockAudio);
}

// Add event listeners to unlock audio context on first user interaction
document.addEventListener('click', unlockAudio);
document.addEventListener('touchend', unlockAudio);

function setupCustomVideoPlayer(videoId) {
    const video = document.getElementById(videoId);
    if (!video) {
        console.warn(`Video element with ID ${videoId} not found.`);
        return;
    }

    const container = video.closest('.custom-video-player-container');
    if (!container) {
        console.warn(`Container for video ID ${videoId} not found.`);
        return;
    }

    const playPauseBtn = container.querySelector('.play-pause-btn');
    const progressBarWrapper = container.querySelector('.progress-bar-wrapper');
    const progressBarFill = container.querySelector('.progress-bar-fill');
    const progressSlider = container.querySelector('.progress-slider');
    const timeDisplay = container.querySelector('.time-display');
    const muteBtn = container.querySelector('.mute-btn');
    const volumeSlider = container.querySelector('.volume-slider');

    let isSeeking = false; // Flag to prevent timeupdate from overriding manual seeking

    // Play/Pause
    playPauseBtn.addEventListener('click', () => {
        if (video.paused || video.ended) {
            video.play();
        } else {
            video.pause();
        }
    });

    video.addEventListener('play', () => {
        playPauseBtn.classList.add('playing');
    });

    video.addEventListener('pause', () => {
        playPauseBtn.classList.remove('playing');
    });

    video.addEventListener('ended', () => {
        playPauseBtn.classList.remove('playing');
        video.currentTime = 0; // Reset to beginning
    });

    // Progress Bar
    progressSlider.addEventListener('mousedown', () => {
        isSeeking = true;
    });

    progressSlider.addEventListener('mouseup', () => {
        isSeeking = false;
        // On mouse up, ensure the video jumps to the correct position
        const seekTime = (progressSlider.value / 100) * video.duration;
        if (isFinite(seekTime)) {
            video.currentTime = seekTime;
        }
    });

    progressSlider.addEventListener('input', () => {
        // Update the video's current time as the user drags
        const seekTime = (progressSlider.value / 100) * video.duration;
        if (isFinite(seekTime)) {
            video.currentTime = seekTime;
        }
        // Visually update the fill even during drag
        progressBarFill.style.width = `${progressSlider.value}%`;
    });

    video.addEventListener('timeupdate', () => {
        if (!isSeeking) { // Only update if not currently seeking
            const currentTime = video.currentTime;
            const duration = video.duration;

            // Update progress bar fill
            if (isFinite(duration)) {
                const progressPercent = (currentTime / duration) * 100;
                progressBarFill.style.width = `${progressPercent}%`;
                progressSlider.value = progressPercent;
            }

            // Update time display
            const formatTime = (time) => {
                const minutes = Math.floor(time / 60);
                const seconds = Math.floor(time % 60);
                return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
            };

            if (isFinite(duration)) {
                timeDisplay.textContent = `${formatTime(currentTime)} / ${formatTime(duration)}`;
            } else {
                timeDisplay.textContent = `${formatTime(currentTime)} / --:--`;
            }
        }
    });

    // Volume Control
    volumeSlider.addEventListener('input', () => {
        video.volume = volumeSlider.value;
        if (video.volume === 0) {
            muteBtn.classList.add('muted');
        } else {
            muteBtn.classList.remove('muted');
        }
    });

    muteBtn.addEventListener('click', () => {
        video.muted = !video.muted;
        if (video.muted) {
            muteBtn.classList.add('muted');
            volumeSlider.value = 0;
        } else {
            muteBtn.classList.remove('muted');
            volumeSlider.value = video.volume > 0 ? video.volume : 1; // Restore volume or set to 1 if it was 0
        }
    });

    // Initial volume slider and mute button state
    video.addEventListener('volumechange', () => {
        volumeSlider.value = video.volume;
        if (video.muted || video.volume === 0) {
            muteBtn.classList.add('muted');
        } else {
            muteBtn.classList.remove('muted');
        }
    });
}

// Setup custom players for each video
document.addEventListener('DOMContentLoaded', () => {
    setupCustomVideoPlayer('releaseVideo');
    setupCustomVideoPlayer('secondVideo');
    setupCustomVideoPlayer('realEvidenceVideo');
});
