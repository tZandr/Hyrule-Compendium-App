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

    // Create container for each entry
    let container = document.createElement("div");
    container.classList.add("entry");

    // Convert URL into variable + create img-element
    let imageURL = data.data[0].image;
    let img = document.createElement("img");
    img.src = imageURL;
    img.alt = data.data[0].name;

    // Add ID to image
    let idOverlay = document.createElement("span");
    idOverlay.classList.add("overlay");
    idOverlay.textContent = `${data.data[0].id}`;

    // Add to list
    list.innerHTML = "";
    list.appendChild(container);
    container.appendChild(img);
    container.appendChild(idOverlay);
    img.classList.add("entry");

    // Add zeroes behind the ID so that it's always 3 in length
    if ((idOverlay.textContent.length = 1)) {
      idOverlay.textContent = `00` + idOverlay.textContent;
    } else if ((idOverlay.textContent.length = 2)) {
      idOverlay.textContent = `0` + idOverlay.textContent;
    }

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
