// // VARIABLE
const text = document.querySelector("#text");
const splash = document.querySelector("#splash");
const canvas = document.querySelector("#matrix");
const progress = document.querySelector("#progress");
const form = document.querySelector("form");
const ctx = canvas.getContext("2d");
const burger = document.querySelector("#burger");
const navLinks = document.querySelector("#parent");
const navLink = document.querySelectorAll("#navLink");
const expRights = document.querySelectorAll("#expRight");
const expIcons = document.querySelectorAll("#expIcon");
const expContainers = document.querySelectorAll("#expContainer");

burger.addEventListener("click", () => {
	if (burger.classList.value === "burger") {
		burger.classList.replace("burger", "closeMenu");
		navLinks.classList.remove("closeNav");
	} else {
		burger.classList.replace("closeMenu", "burger");
		navLinks.classList.add("closeNav");
	}
});

navLink.forEach((link) => {
	link.addEventListener("click", () => {
		burger.classList.replace("closeMenu", "burger");
		navLinks.classList.add("closeNav");
	});
});
const sizeExp = (event) => {
	window.addEventListener(event, () => {
		expRights.forEach((exp) => {
			if (window.innerWidth <= 767) {
				if (exp.classList.value === "exp-left") {
					return;
				} else {
					exp.classList.replace("exp-right", "exp-left");
				}
			} else {
				if (exp.classList.value === "exp-right") {
					return;
				} else {
					exp.classList.replace("exp-left", "exp-right");
				}
			}
		});
	});
};

sizeExp("resize");
sizeExp("DOMContentLoaded");

document.addEventListener("DOMContentLoaded", () => {
	setTimeout(() => {
		splash.classList.add("display-none");
	}, 10000);
});

document.addEventListener("DOMContentLoaded", () => {
	setTimeout(() => {
		progress.classList.add("display-none");
	}, 5000);
});

// Setting the width and height of the canvas
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Setting up the letters
const letters =
	"ABCDEFGHIJKLMNOPQRSTUVXYZ0123456789@&É§ÈÇÀ$¥€£#%ÙÆÊ®ŸªïŒ∏Ó|ËÍÎﬂ∆∑Ω¢√∫ıABCDEFGHIJKLMNOPQRSTUVXYZ0123456789@&É§ÈÇÀ$¥€£#%ÙÆÊ®ŸªïŒ∏Ó|ËÍÎﬂ∆∑Ω¢√∫ıABCDEFGHIJKLMNOPQRSTUVXYZ0123456789@&É§ÈÇÀ$¥€£#%ÙÆÊ®ŸªïŒ∏Ó|ËÍÎﬂ∆∑Ω¢√∫ıABCDEFGHIJKLMNOPQRSTUVXYZ0123456789@&É§ÈÇÀ$¥€£#%ÙÆÊ®ŸªïŒ∏Ó|ËÍÎﬂ∆∑Ω¢√∫ıABCDEFGHIJKLMNOPQRSTUVXYZ0123456789@&É§ÈÇÀ$¥€£#%ÙÆÊ®ŸªïŒ∏Ó|ËÍÎﬂ∆∑Ω¢√∫ıABCDEFGHIJKLMNOPQRSTUVXYZ0123456789@&É§ÈÇÀ$¥€£#%ÙÆÊ®ŸªïŒ∏Ó|ËÍÎﬂ∆∑Ω¢√∫ı";
letters.split("");

// Setting up the columns
const fontSize = 10,
	columns = canvas.width / fontSize;

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
setInterval(draw, 33);

form.onsubmit = (e) => {
	e.preventDefault();
	let xhr = new XMLHttpRequest();
	xhr.open("POST", "message.php", true);
	xhr.onload = () => {
		if (xhr.readyState === 4 && xhr.status === 200) {
			let response = xhr.response;
			console.log(response);
		}
	};
	let formData = new FormData(form)
	xhr.send(formData);
}

