let searchInput = document.querySelector("#search");
let submit = document.querySelector("#submit");
let list = document.querySelector("#list");
let searchIcon = document.querySelector("#searchIcon")

// GET all entries
async function getAll() {
  try {
    let response = await fetch(
      "https://botw-compendium.herokuapp.com/api/v3/compendium/all"
    );
    let data = await response.json();
    console.log(data);

    // Sorting the list
    // Interesting error: 1-12 started loading really
    // slow after some time, which forced me to make this code.
    // Still don't know why. But now it's fail-safe.
    list.innerHTML = ''
    const entries = [...data.data].sort((a,b) => a.id - b.id)

    // Create container for each entry
    entries.forEach((entry) => {
      let container = document.createElement("div");
      container.classList.add("entry");

      let img = document.createElement("img");
      img.src = entry.image;
      img.alt = entry.name;

      // Add ID to image
      let idOverlay = document.createElement("span");
      idOverlay.classList.add("overlay");
      idOverlay.textContent = `${entry.id}`;

      // Add to list
      container.appendChild(img);
      container.appendChild(idOverlay);
      list.appendChild(container);

      // Add zeroes behind the ID so that it's always 3 in length
      idOverlay.textContent = String(entry.id).padStart(3, "0");
    });

      // Gets specific entry: console.log(data.data[1])
  } catch (error) {
    console.error("Error: ", error);
  }
}

getAll();

// Search function
async function getItem() {
  let search = searchInput.value.toLowerCase();

  try {
    let response = await fetch(
      "https://botw-compendium.herokuapp.com/api/v3/compendium/entry/" + search
    );
    let data = await response.json();
    console.log(data);
  } catch (error) {
    console.error("Error: ", error);
  }
}

submit.addEventListener("click", (e) => {
  e.preventDefault();
  getItem();
});
