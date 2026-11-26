const form = document.querySelector("#garden-form");
const preview = document.querySelector("#form-preview");
const submit = form.querySelector("button[type='submit']");

form.addEventListener("submit", event => {
  event.preventDefault();
  const details = new FormData(form);
  const name = String(details.get("display-name")).trim();
  const activity = details.get("event");
  const role = String(details.get("role")).toLowerCase();
  preview.textContent = name + ", you selected " + activity + " as a " + role + ". This preview stays on this page.";
});

form.addEventListener("reset", () => {
  preview.textContent = "";
});

submit.disabled = false;
