// // VARIABLE
const form = document.querySelector("#contactForm");
const burger = document.querySelector("#burger");
const navLinks = document.querySelector("#parent");
const navLink = document.querySelectorAll("#navLink");
const expRights = document.querySelectorAll("#expRight");
const expIcons = document.querySelectorAll("#expIcon");
const expContainers = document.querySelectorAll("#expContainer");
const toast = document.querySelectorAll("#toast");

const lastName = document.querySelector("#lastName");
const firstName = document.querySelector("#firstName");
const email = document.querySelector("#email");
const subject = document.querySelector("#subject");
const message = document.querySelector("#message");

const inputArray = [lastName, firstName, email, subject, message];

const submitButton = document.querySelector("#submitButton");
const submitSpinner = document.querySelector("#submitSpinner");

const errorHappened = "une erreur est survenu";
const success = "message envoyé avec succès";
const successToast = "votre message a été envoyé avec succès";
const errorToast = "une erreur est survenue lors de l'envoi, veuillez ressayer";

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

const verifyInput = () => {
	const alertMessageData = {
		sender: { id: 1 },
		to: [{ name: "Nicolas Maillols", email: "nicomaillols@gmail.com" }],
		templateId: 1,
		params: {
			lastName: lastName.value,
			firstName: firstName.value,
			subject: subject.value,
			message: message.value,
			replyTo: email.value,
		},
	};

	const customerMessageData = {
		sender: { id: 1 },
		to: [{ name: `${lastName.value} ${firstName.value}`, email: email.value }],
		templateId: 2,
		params: {
			message: message.value,
		},
	};

	const messagesDatas = {
		alertMessage: alertMessageData,
		customer: customerMessageData,
	};
	return messagesDatas;
};

const sendEmail = async (emailData) => {
	const request = await fetch("https://api.sendinblue.com/v3/smtp/email", {
		method: "POST",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
			"api-key": "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",
		},
		body: JSON.stringify(emailData),
	});

	const response = await request.json();
	return response;
};

const toaster = {
	messageElement: document.querySelector("#toastMessage"),
	toastElement: document.querySelector("#toast"),
	icon: document.querySelector("#toastIcon"),
	closeIcon: document.querySelector("#toastClose"),

	open(text) {
		this.messageElement.innerHTML = text;
		this.toastElement.classList.remove("toast-off");
		this.toastElement.classList.add("toast-on");

		setTimeout(() => {
			this.close();
		}, 8000);
	},

	close() {
		this.toastElement.classList.add("toast-off");
		this.toastElement.classList.remove("toast-on");
	},

	success(text) {
		this.icon.attributes.src.value = "/assets/icons/success.svg";
		this.open(text);
	},

	error(text) {
		this.icon.attributes.src.value = "/assets/icons/error.svg";
		this.open(text);
	},
};

const loader = {
	on(spinner) {
		spinner.classList.remove("display-none");
	},

	off(spinner) {
		spinner.classList.add("display-none");
	},
};

window.addEventListener('DOMContentLoaded', () => {
	const particles = document.createElement('div');
	particles.id = 'particles-js'
	
	const animationScript = document.createElement('script');
	animationScript.src = './JS/lib/app.js';

	const animLibMinScript = document.createElement('script');
	animLibMinScript.src = './JS/lib/particles.min.js';
	
	const animLibScript = document.createElement('script');
	animLibScript.src = './JS/lib/particles.js';

	document.body.prepend(particles);
	document.body.append(animLibMinScript, animLibScript, animationScript);
})

toaster.closeIcon.addEventListener("click", () => {
	toaster.close();
});

form.addEventListener("submit", async (e) => {
	e.preventDefault();
	loader.on(submitSpinner);
	submitButton.classList.add("display-none");

	await sendEmail(verifyInput().customer);
	await sendEmail(verifyInput().alertMessage)
		.then((res) => {
			if (res.messageId) {
				inputArray.forEach((input) => (input.value = "", input.disabled = true));
				toaster.success(successToast);
			} else {
				toaster.error(errorToast);
				submitButton.classList.remove("display-none");
			}
		})
		.finally(() => {
			loader.off(submitSpinner);
		});
});
