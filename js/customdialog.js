let output = document.getElementById("out");

// Alert control
let alert = document.getElementById("cstm-alert");
let alertOK = document.getElementById("alertOK");

// Display Alert
let cstmAlert = () => {
	alert.showModal();
};

// Close alert
alertOK.addEventListener("click", () => {
	alert.close();
});

// Confirm control
let confirm = document.getElementById("cstm-confirm");
let confirmOK = document.getElementById("confirmOK");
let confirmCancel = document.getElementById("confirmCancel");
let cstmConfirm = () => {
	confirm.showModal();
};

// Confirm
confirmOK.addEventListener("click", () => {
	confirm.close();
	output.innerText = `The value returned by the confirm method is : true`;
});

// Deny
confirmCancel.addEventListener("click", () => {
	confirm.close();
	output.innerText = `The value returned by the confirm method is : false`;
});

// Prompt controls
let prompt = document.getElementById("cstm-prompt");
let promptCancel = document.getElementById("promptCancel");
let promptOK = document.getElementById("promptOK");
let intext = document.getElementById("intext");
let promptInput = "";

// Display Prompt
let cstmPrompt = () => {
	promptInput = "";
	intext.value = "";
	prompt.showModal();
};

// Cancel
promptCancel.addEventListener("click", () => {
	prompt.close();
});

// Get prompt input
promptOK.addEventListener("click", () => {
	prompt.close();
	promptInput = intext.value;
});

export { cstmAlert, cstmConfirm, cstmPrompt, promptInput };
