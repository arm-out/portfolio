// let posts = [
// 	{
// 		title: "Books I'm Reading",
// 		date: "2023-03-01",
// 		summary: "A couple of books I'm reading this year",
// 	},
// 	{
// 		title: "Fun with CSS",
// 		date: "2023-03-01",
// 		summary: "Playground for my CSS experiments",
// 	},
// ];

// Get posts from local stoeage
let posts = JSON.parse(localStorage.getItem("posts") || "[]");

// control
let prompt = document.getElementById("cstm-prompt");
let editPrompt = document.getElementById("edit-prompt");
let form = document.querySelector("#cstm-prompt form");
let editForm = document.querySelector("#edit-prompt form");
let promptCancel = document.getElementById("promptCancel");
let editCancel = document.getElementById("editCancel");

// cancel post
promptCancel.addEventListener("click", () => {
	prompt.close();
});

// Submit dialog
form.addEventListener("submit", (event) => {
	event.preventDefault();

	let post = {
		title: document.getElementById("title").value,
		date: document.getElementById("date").value,
		summary: document.getElementById("summary").value,
	};

	// update storage
	posts.push(post);
	localStorage.setItem("posts", JSON.stringify(posts));

	// Create new blog post card
	let temp = document.getElementById("post").content;
	let card = temp.cloneNode(true);
	card.querySelector("div").setAttribute("id", `post-${posts.length - 1}`);
	card.querySelector("h2").innerText = post.title;
	card.querySelector("h3").innerText = post.date;
	card.querySelector("p").innerText = post.summary;

	// delete button event listener
	let btn = card.querySelector(".delete-button");
	btn.addEventListener("click", () => {
		let postId = btn.parentNode.id;
		let index = postId.slice(5);
		deletePost(index);
	});

	// edit button event listener
	btn = card.querySelector(".edit-button");
	btn.addEventListener("click", () => {
		let postId = btn.parentNode.id;
		let index = postId.slice(5);
		editPost(index);
	});

	// Append card to container
	document.querySelector("#post-cards").appendChild(card);
	prompt.close();
});

// Delete post acc to id
let deletePost = (id) => {
	console.log(`deleting post ${id}...`);

	// update storage
	posts.splice(id, 1);
	localStorage.setItem("posts", JSON.stringify(posts));

	// repaint cards
	let cards = document.createElement("div");
	cards.setAttribute("id", "post-cards");
	let temp = document.getElementById("post").content;
	posts.forEach((entry, index) => {
		let post = temp.cloneNode(true);
		post.querySelector("div").setAttribute("id", `post-${index}`);
		post.querySelector("h2").innerText = entry.title;
		post.querySelector("h3").innerText = entry.date;
		post.querySelector("p").innerText = entry.summary;
		cards.append(post);
	});

	// update DOM
	document.querySelector("#post-cards").replaceWith(cards);

	// delete button event listeners
	let deleteBtnList = document.querySelectorAll(".delete-button");
	deleteBtnList.forEach((btn) => {
		btn.addEventListener("click", () => {
			let postId = btn.parentNode.id;
			let index = postId.slice(5);
			deletePost(index);
		});
	});

	// edit button event listeners
	let editBtnList = document.querySelectorAll(".edit-button");
	editBtnList.forEach((btn) => {
		btn.addEventListener("click", () => {
			let postId = btn.parentNode.id;
			let index = postId.slice(5);
			editPost(index);
		});
	});
};

var lastEdit; // last edited index

// edit post prompt
let editPost = (id) => {
	console.log(`editing post ${id}...`);
	lastEdit = id;
	// show prompt
	document.getElementById("edit-title").value = posts[id].title;
	document.getElementById("edit-date").value = posts[id].date;
	document.getElementById("edit-summary").value = posts[id].summary;
	editPrompt.showModal();
};

// Cancel Edit
editCancel.addEventListener("click", () => {
	editPrompt.close();
});

editForm.addEventListener("submit", (event) => {
	event.preventDefault();

	let post = {
		title: document.getElementById("edit-title").value,
		date: document.getElementById("edit-date").value,
		summary: document.getElementById("edit-summary").value,
	};

	// update storage
	posts[lastEdit] = post;
	localStorage.setItem("posts", JSON.stringify(posts));

	// repaint card container
	let cards = document.createElement("div");
	cards.setAttribute("id", "post-cards");
	let temp = document.getElementById("post").content;
	posts.forEach((entry, index) => {
		let post = temp.cloneNode(true);
		post.querySelector("div").setAttribute("id", `post-${index}`);
		post.querySelector("h2").innerText = entry.title;
		post.querySelector("h3").innerText = entry.date;
		post.querySelector("p").innerText = entry.summary;
		cards.append(post);
	});

	// update DOM
	document.querySelector("#post-cards").replaceWith(cards);

	// delete button event listeners
	let deleteBtnList = document.querySelectorAll(".delete-button");
	deleteBtnList.forEach((btn) => {
		btn.addEventListener("click", () => {
			let postId = btn.parentNode.id;
			let index = postId.slice(5);
			deletePost(index);
		});
	});

	// edit button event listeners
	let editBtnList = document.querySelectorAll(".edit-button");
	editBtnList.forEach((btn) => {
		btn.addEventListener("click", () => {
			let postId = btn.parentNode.id;
			let index = postId.slice(5);
			editPost(index);
		});
	});

	editPrompt.close();
});

// Add post prompt
let postPrompt = () => {
	document.getElementById("title").value = "";
	document.getElementById("date").valueAsDate = new Date();
	document.getElementById("summary").value = "";
	prompt.showModal();
};

export { postPrompt, deletePost, editPost, posts };
