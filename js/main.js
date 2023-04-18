const fa_down = document.querySelectorAll(".fa-chevron-down");
const fa_up = document.querySelectorAll(".fa-chevron-up");
const container_info = document.querySelectorAll(".container_info");
const input_container = document.querySelectorAll(".input_container");
const containt_element_Serach = document.querySelectorAll(
  ".containt_element_Serach"
);
const ingredientText = document.querySelector(".ingredientText");
const containt_info = document.querySelectorAll(".containt_info");
const section = document.querySelector("section");
const containeAffiche = document.querySelector(".containeAffiche");
const afficheClickIng = document.querySelector(".afficheClickIng");

//------------les 3 bares de recherche-------------------

for (let i = 0; i < fa_down.length; i++) {
  fa_down[i].addEventListener("click", () => {
    container_info[i].classList.add("container_infoAfter");
    input_container[i].classList.add("input_containerAfter");
    containt_element_Serach[i].classList.add("containt_element_SerachAfter");
  });
}

for (let i = 0; i < fa_up.length; i++) {
  fa_up[i].addEventListener("click", () => {
    container_info[i].classList.remove("container_infoAfter");
    input_container[i].classList.remove("input_containerAfter");
    containt_element_Serach[i].classList.remove("containt_element_SerachAfter");
  });
}
//-------------------------fecth ingredients----------------------------------
fetch("http://127.0.0.1:5500/data/recipes.json").then((res) => {
  if (res.ok) {
    res.json().then((data) => {
      let recipes = data.recipes;
      let AllIngredient = [];

      for (i = 0; i < recipes.length; i++) {
        let ingredients = recipes[i].ingredients;
        for (let a = 0; a < ingredients.length; a++) {
          const ingredInner = ingredients[a].ingredient;
          AllIngredient.push(ingredInner.toLowerCase());
        }
      }
      //-----------------suppresion des elements dupliquer--------------------
      let AllIngredientNondupliquate = [...new Set(AllIngredient)];
      AllIngredientNondupliquate.forEach(
        (AllIngredientNondupliquateForEach) => {
          containt_info[0].innerHTML += `
          <p class="para1" > ${AllIngredientNondupliquateForEach}</p>
           `;
        }
      );
      const para1 = document.querySelectorAll(".para1");
      para1.forEach((para1) => {
        para1.addEventListener("click", (e) => {
          const element = e.target.lastChild.textContent;
          afficheClickIng.innerHTML += `
    <div class="containeAffiche2" style="background-color: #3282f7">
    <p class="text">${element}</p>
     <div><i class="fa fa-times" aria-hidden="true"></i></div>
    </div>
    `;
          //-------------------recherche- avec le click---------------------
          const containerAll = document.querySelectorAll(".containerAll");
          Filter(element, containerAll);

          function Filter(element, containerAll) {
            for (let i = 0; i < containerAll.length; i++) {
              if (containerAll[i].textContent.toLowerCase().includes(element)) {
                containerAll[i].style.display = "block";
              } else {
                containerAll[i].style.display = "none";
              }
            }
          }
        });
      });
    });
  }
});

//-------------------------fecth appareil----------------------------------
fetch("http://127.0.0.1:5500/data/recipes.json").then((res) => {
  if (res.ok) {
    res.json().then((data) => {
      let recipes = data.recipes;
      let AllAppareil = [];

      for (i = 0; i < recipes.length; i++) {
        const appareilInner = recipes[i].appliance;
        AllAppareil.push(appareilInner.toLowerCase());
      }
      //-----------------suppresion des elements dupliquer--------------------
      let AllAppareilNondupliquate = [...new Set(AllAppareil)];
      AllAppareilNondupliquate.forEach((AllAppareilNondupliquateForEach) => {
        containt_info[1].innerHTML += `
            <p class="para2" > ${AllAppareilNondupliquateForEach}</p>
             `;
      });
      const para2 = document.querySelectorAll(".para2");
      para2.forEach((para2) => {
        para2.addEventListener("click", (e) => {
          const element = e.target.lastChild.textContent;
          afficheClickIng.innerHTML += `
    <div class="containeAffiche2" style="background-color: #68d9a4">
    <p class="text">${element}</p>
     <div><i class="fa fa-times" aria-hidden="true"></i></div>
    </div>
    `;
          //-------------------recherche- avec le click---------------------
          const containerAll = document.querySelectorAll(".containerAll");
          Filter(element, containerAll);

          function Filter(element, containerAll) {
            for (let i = 0; i < containerAll.length; i++) {
              if (containerAll[i].textContent.toLowerCase().includes(element)) {
                containerAll[i].style.display = "block";
              } else {
                containerAll[i].style.display = "none";
              }
            }
          }
        });
      });
    });
  }
});
//-------------------------fecth ustensiles----------------------------------
fetch("http://127.0.0.1:5500/data/recipes.json").then((res) => {
  if (res.ok) {
    res.json().then((data) => {
      let recipes = data.recipes;
      let AllUstensiles = [];
      for (i = 0; i < recipes.length; i++) {
        const ustensiles = recipes[i].ustensils;
        for (let a = 0; a < ustensiles.length; a++) {
          AllUstensiles.push(ustensiles[a].toLowerCase());
        }
      }
      //-----------------suppresion des elements dupliquer--------------------
      let AllUstensilesNondupliquate = [...new Set(AllUstensiles)];
      AllUstensilesNondupliquate.forEach(
        (AllUstensilesNondupliquateForEach) => {
          containt_info[2].innerHTML += `
            <p class="para3" > ${AllUstensilesNondupliquateForEach}</p>
             `;
        }
      );
      const para3 = document.querySelectorAll(".para3");
      para3.forEach((para3) => {
        para3.addEventListener("click", (e) => {
          const element = e.target.lastChild.textContent;
          afficheClickIng.innerHTML += `
    <div class="containeAffiche2" style="background-color:#ed6454">
    <p class="text">${element}</p>
     <div><i class="fa fa-times" aria-hidden="true"></i></div>
    </div>
    `;

          //-------------------recherche- avec le click---------------------
          const containerAll = document.querySelectorAll(".containerAll");
          Filter(element, containerAll);

          function Filter(element, containerAll) {
            for (let i = 0; i < containerAll.length; i++) {
              if (containerAll[i].textContent.toLowerCase().includes(element)) {
                containerAll[i].style.display = "block";
              } else {
                containerAll[i].style.display = "none";
              }
            }
          }
        });
      });
    });
  }
});

//-------------------------affichage des recettes-------------------------
fetch("http://127.0.0.1:5500/data/recipes.json").then((res) => {
  if (res.ok) {
    res.json().then((data) => {
      let recipes = data.recipes;


      for (i = 0; i < recipes.length; i++) {
        newFuntion(recipes);
      }

      function newFuntion(recipes) {
        let ingredient = recipes[i].ingredients;
        let textIngre = "";

        ingredient.forEach((ingred) => {
          textIngre = textIngre + " " + ingred.ingredient + "    :";

          if (ingred.quantity != undefined) {
            textIngre = textIngre + "" + ingred.quantity;
          }
          if (ingred.unit != undefined) {
            textIngre = textIngre + " " + ingred.unit + "<br/>";
          }
        });

        section.innerHTML += `
      <div class="containerAll">
          <div class="imgNone"></div>
          <div class="lesInfos">
              <div class="tittle_time">
                  <div class="tittle">
                      <h3>${recipes[i].name}</h3>
                  </div>
                  <div class="time">
                      <i class="fa fa-clock-o" aria-hidden="true"></i>
                      <p>${recipes[i].time} min</p>
                  </div>

              </div>

              <div class="ingredient_demo">
                  <div class="ingredient"> 
                    <p> ${textIngre} </p>  
                  </div>
                  <div class="demo">
                  ${recipes[i].description}
                  </div>
              </div>
          </div>
      </div>
      `;
      }
    });
  }
});
