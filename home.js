const searchInput = document.querySelector("#search");
const submit = document.querySelector("#submit");
const homeResult = document.querySelector("#homeResult");

async function getItem() {
  const search = searchInput.value.trim().toLowerCase();
  if (!search) return;

  try {
    let response = await fetch("data/compendium.json");
    let data = await response.json();

    const entry = data.data.find(
      (e) =>
        e.name.toLowerCase() === search ||
        String(e.id).padStart(3, "0") === search ||
        String(e.id) === search
    );

    if (!entry) {
      homeResult.innerHTML = `<p>No entry found for "${search}".</p>`;
      return;
    }

    homeResult.innerHTML = `
      <div id="homeEntry">
        <img src="${entry.image}" alt="${entry.name}" />
        <div>
          <h2>${entry.name}</h2>
          <p>${entry.description}</p>
        </div>
      </div>
    `;
  } catch (error) {
    console.error("Error: ", error);
  }
}

submit.addEventListener("click", (e) => {
  e.preventDefault();
  getItem();
});
