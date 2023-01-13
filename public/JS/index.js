// // VARIABLE
const form = document.querySelector("#contactForm");
const burger = document.querySelector("#burger");
const navLinks = document.querySelector("#parent");
const navLink = document.querySelectorAll("#navLink");
const expRights = document.querySelectorAll("#expRight");
const expIcons = document.querySelectorAll("#expIcon");
const expContainers = document.querySelectorAll("#expContainer");
const lastName = document.querySelector('#lastName');
const firstName = document.querySelector('#firstName');
const email = document.querySelector('#email');
const subject = document.querySelector('#subject');
const message = document.querySelector('#message');
const submitButton = document.querySelector('#submitButton');

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
		sender: { id: 1  },
		to: [{ name: 'Nicolas Maillols', email: 'nicomaillols@gmail.com' }],
		templateId: 1,
		params: { 
			lastName: lastName.value, 
			firstName: firstName.value, 
			subject: subject.value,
			message: message.value,
			replyTo: email.value
		},
	}

	const customerMessageData = {
		sender: { id: 1  },
		to: [{ name: `${lastName.value} ${firstName.value}`, email: email.value }],
		templateId: 2,
		params: { 
			message: message.value,
		},
	}

	const messagesDatas = {
		alertMessage: alertMessageData,
		customer: customerMessageData
	}
	return messagesDatas
}

const sendEmail = async (emailData) => {
	const request = await fetch("https://api.sendinblue.com/v3/smtp/email", {
		method: "POST",
		headers: {
			Accept: "application/json",
			"api-key": "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",
		},
		body: JSON.stringify(emailData),
	});

	const response = await request.json();
	return response
};

form.addEventListener("submit", async (e) => {
	e.preventDefault();
	await sendEmail(verifyInput().customer);
	await sendEmail(verifyInput().alertMessage);
});