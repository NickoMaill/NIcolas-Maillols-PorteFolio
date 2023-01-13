const text = document.querySelector("#text");
const splash = document.querySelector("#splash");
const canvas = document.querySelector("#matrix");
const progress = document.querySelector("#progress");
const ctx = canvas.getContext("2d");

document.addEventListener("DOMContentLoaded", () => {
	setTimeout(() => {
		splash.classList.add("display-none");
	}, 10000);
	
	setTimeout(() => {
		progress.classList.add("display-none");
	}, 5000);
});

// Setting the width and height of the canvas
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Setting up the letters
const letters ="ABCDEFGHIJKLMNOPQRSTUVXYZ0123456789@&É§ÈÇÀ$¥€£#%ÙÆÊ®ŸªïŒ∏Ó|ËÍÎﬂ∆∑Ω¢√∫ABCDEFGHIJKLMNOPQRSTUVXYZ0123456789@&É§ÈÇÀ$¥€£#%ÙÆÊ®ŸªïŒ∏Ó|ËÍÎﬂ∆∑Ω¢√∫ıABCDEFGHIJKLMNOPQRSTUVXYZ0123456789@&É§ÈÇÀ$¥€£#%ÙÆÊ®ŸªïŒ∏Ó|ËÍÎﬂ∆∑Ω¢√∫ıABCDEFGHIJKLMNOPQRSTUVXYZ0123456789@&É§ÈÇÀ$¥€£#%ÙÆÊ®ŸªïŒ∏Ó|ËÍÎﬂ∆∑Ω¢√∫ıABCDEFGHIJKLMNOPQRSTUVXYZ0123456789@&É§ÈÇÀ$¥€£#%ÙÆÊ®ŸªïŒ∏Ó|ËÍÎﬂ∆∑Ω¢√∫ıABCDEFGHIJKLMNOPQRSTUVXYZ0123456789@&É§ÈÇÀ$¥€£#%ÙÆÊ®ŸªïŒ∏Ó|ËÍÎﬂ∆∑Ω¢√∫ı";
letters.split("");

// Setting up the columns
const fontSize = 15
const columns = canvas.width / fontSize;

// Setting up the drops
const drops = [];
for (let i = 0; i < columns; i++) {
	drops[i] = 1;
}

// Setting up the draw function
function draw() {
	ctx.fillStyle = "rgba(0, 0, 0, .1)";
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	for (let i = 0; i < drops.length; i++) {
		const text = letters[Math.floor(Math.random() * letters.length)];
		ctx.fillStyle = "#26D241";
		ctx.fillText(text, i * fontSize, drops[i] * fontSize);
		drops[i]++;
		if (drops[i] * fontSize > canvas.height && Math.random() > 0.95) {
			drops[i] = 0;
		}
	}
}

// Loop the animation
setInterval(draw, 25);