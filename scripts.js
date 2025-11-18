let searchInput = document.querySelector("#search");
let submit = document.querySelector("#submit");
let list = document.querySelector("#list");

// GET all entries
async function getAll() {
  try {
    let response = await fetch(
      "https://botw-compendium.herokuapp.com/api/v3/compendium/all"
    );
    let data = await response.json();
    console.log(data);

    data.data.slice(0, data.length).forEach((entry) => {
      // Create container for each entry
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
    if ((Number(idOverlay.textContent)) <= 10) {
      idOverlay.textContent = `00` + idOverlay.textContent;
    } else if ((Number(idOverlay.textContent)) <= 100) {
      idOverlay.textContent = `0` + idOverlay.textContent;
    } else {
      idOverlay = idOverlay
    }
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
