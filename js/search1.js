const inputSearch = document.querySelector(".inputSearch");
const InputShe = document.querySelectorAll(".InputShe");
const containerInfo = document.querySelectorAll(".containt_info");

//------------------barre de recherche superieur--------------------------

inputSearch.addEventListener("input", (e) => {
  const valueInput = e.target.value;
  const containerAll = document.querySelectorAll(".containerAll");
  Filter(valueInput, containerAll);
});

function Filter(valueInput, containerAll) {
  if (valueInput.length > 2) {
    for (let i = 0; i < containerAll.length; i++) {
      if (containerAll[i].textContent.toLowerCase().includes(valueInput)) {
        containerAll[i].style.display = "block";
      } else {
        containerAll[i].style.display = "none";
      }
    }
  } else if (valueInput.length == 0) {
    location.reload();
  }
}

//------------------barre de recherche inferieur--------------------------
InputShe.forEach((InputShee) => {
  InputShee.addEventListener("input", (e) => {
    const valueInput = e.target.value;
    const para = document.querySelectorAll(".para");
    recherche(valueInput, para);
    console.log(para);
  });
});

function recherche(valueInput, para) {
  if (valueInput.length > 2) {
    for (let i = 0; i < para.length; i++) {
      if (para[i].textContent.toLowerCase().includes(valueInput)) {
        para[i].style.display = "block";
      } else {
        para[i].style.display = "none";
      }
    }
  } else if (valueInput.length == 0) {
    location.reload();
  }
}

// // Récupérer le champ de recherche et le conteneur des recettes
// const searchInput = document.getElementById("searchInput");
// const recipeContainer = document.getElementById("recipeContainer");
// // Fonction de recherche pour filtrer les recettes en fonction du texte saisi
// function searchRecipes(query) {
//   const filteredRecipes = allRecipes.filter(recipe => {
//     const name = recipe.name.toLowerCase();
//     return name.includes(query.toLowerCase());
//   });
//   const html = filteredRecipes.map(recipe => `<div>${recipe.name}</div>`).join("");
//   recipeContainer.innerHTML = html;
// }
// / Écouter les événements de saisie et de suppression dans le champ de recherche
// searchInput.addEventListener("input", event => {
//   const query = event.target.value;
//   if (query.length >= 3) {
//     searchRecipes(query);
//   } else {
//     recipeContainer.innerHTML = "";
//   }
// });
// searchInput.addEventListener("keydown", event => {
//   if (event.key === "Backspace" && searchInput.value.length >= 3) {
//     const query = searchInput.value.slice(0, -1);
//     searchRecipes(query);
//   }
// });
