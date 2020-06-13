// main.js
const update = document.querySelector("#update-button");

update.addEventListener("click", () => {
  // Send PUT Request here
  fetch("/users", {
    method: "put",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: "Arteev",
      email: "ayukta@gmail.com",
      contact: 3468484,
    }),
  });
});

const deleteButton = document.querySelector("#delete-button");

deleteButton.addEventListener("click", (_) => {
  fetch("/users", {
    method: "delete",
  });
});
