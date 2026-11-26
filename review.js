document.documentElement.classList.add("js");

const search = document.querySelector("#topic-search");
const cards = Array.from(document.querySelectorAll(".module-cards li"));
const searchStatus = document.querySelector("#search-status");

function filterTopics() {
  const query = search.value.trim().toLowerCase();
  const terms = query.split(/\s+/);
  let visible = 0;

  for (const card of cards) {
    const keywords = card.dataset.topics + " " + card.textContent;
    card.hidden = !terms.every(term => keywords.toLowerCase().includes(term));
    if (!card.hidden) visible += 1;
  }

  searchStatus.textContent = query === "" ? "" : visible === 0
    ? "No matching modules. Try a broader topic."
    : visible + (visible === 1 ? " matching module." : " matching modules.");
}

search.addEventListener("input", filterTopics);
filterTopics();

function updatePressed(buttons, active) {
  for (const button of buttons) {
    button.setAttribute("aria-pressed", String(button === active));
  }
}

const modeButtons = document.querySelectorAll("[data-mode]");
const layoutPreview = document.querySelector("#layout-preview");
const layoutCode = document.querySelector("#layout-code");
const layoutNote = document.querySelector("#layout-note");
const modeNotes = {
  grid: "Rows and columns",
  flex: "One main axis",
  block: "One box per line"
};

for (const button of modeButtons) {
  button.addEventListener("click", () => {
    const mode = button.dataset.mode;
    updatePressed(modeButtons, button);
    layoutPreview.dataset.layout = mode;
    layoutCode.textContent = "display: " + mode + ";";
    layoutNote.textContent = modeNotes[mode];
  });
}

const sizing = document.querySelector("#box-mode");
const paddingInput = document.querySelector("#box-padding");
const box = document.querySelector("#box-demo");
const paddingText = document.querySelector("#padding-text");
const boxResult = document.querySelector("#box-result");

function measureBox() {
  const padding = Number(paddingInput.value);
  const edges = 2 * (padding + 4);
  const declaredWidth = 120;
  const borderBox = sizing.value === "border-box";
  const outside = borderBox ? declaredWidth : declaredWidth + edges;
  const content = borderBox ? declaredWidth - edges : declaredWidth;

  box.style.boxSizing = sizing.value;
  box.style.padding = padding + "px";
  paddingText.textContent = "padding: " + padding + "px";
  paddingInput.setAttribute("aria-valuetext", padding + " pixels per side");
  boxResult.textContent = "Border box: " + outside + "px. Content: " + content + "px.";
}

sizing.addEventListener("change", measureBox);
paddingInput.addEventListener("input", measureBox);
measureBox();

const widthButtons = document.querySelectorAll("[data-grid-width]");
const gridFrame = document.querySelector("#grid-frame");
const gridResult = document.querySelector("#grid-result");

for (const button of widthButtons) {
  button.addEventListener("click", () => {
    updatePressed(widthButtons, button);
    gridFrame.dataset.width = button.dataset.gridWidth;
    gridResult.textContent = button.textContent + " container.";
  });
}

const contentsLinks = document.querySelectorAll(".contents a");
function markCurrentSection() {
  for (const link of contentsLinks) {
    if (link.hash === window.location.hash) {
      link.setAttribute("aria-current", "location");
    } else {
      link.removeAttribute("aria-current");
    }
  }
}
window.addEventListener("hashchange", markCurrentSection);
markCurrentSection();
