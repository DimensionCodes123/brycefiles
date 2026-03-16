/* boot screen -> show site (test) */

setTimeout(()=>{
document.getElementById("bootScreen").style.display="none"
document.querySelector(".container").style.display="block"
},2000)


/* countdown - short test countdown (20 seconds) */

const second = 1000
const minute = second * 60
const hour = minute * 60
const day = hour * 24

// test countdown: 20 seconds from page load
const countDown = new Date().getTime() + 20 * second

const x = setInterval(()=>{

const now = new Date().getTime()
const distance = countDown - now

document.getElementById("days").innerText = Math.floor(distance/day)
document.getElementById("hours").innerText = Math.floor((distance%day)/hour)
document.getElementById("minutes").innerText = Math.floor((distance%hour)/minute)
document.getElementById("seconds").innerText = Math.floor((distance%minute)/second)

if(distance < 0){

clearInterval(x)

document.getElementById("headline").innerText="FILES RELEASED"

document.getElementById("countdown").style.display="none"
document.getElementById("decryptSection").style.display="none"
document.getElementById("content").style.display="block"
document.getElementById("videoSection").style.display="block"

document.getElementById("releaseSound").play()

confetti({
particleCount:250,
spread:150,
origin:{y:.6}
})

}

},1000)


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
const nextVideoBtn = document.getElementById("nextVideoBtn")
const secondVideo = document.getElementById("secondVideo")
const videoSection = document.getElementById("videoSection")
const videoSection2 = document.getElementById("videoSection2")
const thanksScreen = document.getElementById("thanksScreen")
const finalEvidenceBtn = document.getElementById("finalEvidenceBtn")
const statement = document.getElementById("statement")
const bennettScreen = document.getElementById("bennettScreen")
const realEvidenceBtn = document.getElementById("realEvidenceBtn")
const realEvidenceScreen = document.getElementById("realEvidenceScreen")

if(firstVideo && nextVideoBtn && secondVideo && videoSection && videoSection2 && thanksScreen && finalEvidenceBtn && statement && bennettScreen && realEvidenceBtn && realEvidenceScreen){

// hide button until first video completely finishes
nextVideoBtn.style.display = "none"
finalEvidenceBtn.style.display = "none"

firstVideo.addEventListener("ended",()=>{
nextVideoBtn.style.display = "inline-block"
})

nextVideoBtn.addEventListener("click",()=>{
videoSection.style.display = "none"
videoSection2.style.display = "block"
secondVideo.play()
})

secondVideo.addEventListener("ended",()=>{
videoSection2.style.display = "none"
thanksScreen.style.display = "block"

finalEvidenceBtn.style.display = "inline-block"
})

finalEvidenceBtn.addEventListener("click",()=>{
finalEvidenceBtn.style.display = "none"
statement.style.display = "block"

// after ~7 seconds, trigger Bennett Files takeover
setTimeout(()=>{
statement.style.display = "none"
document.querySelector(".container").style.display = "none"
document.getElementById("matrix").style.display = "none"
bennettScreen.style.display = "flex"

// after ~5 seconds of flashing, reveal Real Evidence button
setTimeout(()=>{
realEvidenceBtn.style.display = "inline-block"
},5000)
},7000)

realEvidenceBtn.addEventListener("click",()=>{
bennettScreen.style.display = "none"
realEvidenceScreen.style.display = "flex"
})
})

}

