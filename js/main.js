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
const section2 = document.querySelector("nav");
const nav2 = document.querySelector(".nav2")
const nav3 = document.querySelector(".nav3")
 let AllIdTable = [];

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
//---------------------------------------------------------------------------
fetch("http://127.0.0.1:5500/data/recipes.json").then((res) => {
  if (res.ok) {
    res.json().then((data) => {
      let recipes = data.recipes;
      let AllIngredient = [];
      let ArrayRecipes = [{ id: "X" }];
      for (i = 0; i < recipes.length; i++) {
        let ArrayIngredients = [];
        let ingredients = recipes[i].ingredients;
        for (let a = 0; a < ingredients.length; a++) {
          const ingredInner = ingredients[a].ingredient;
          ArrayIngredients.push(ingredInner.toLowerCase());
          AllIngredient.push(ingredInner.toLowerCase());
          if (ArrayRecipes[ArrayRecipes.length - 1].id != recipes[i].id) {
            ArrayRecipes.push({
              id: recipes[i].id,
              ingredient: ArrayIngredients,
            });
          }
        }
      }
      //-----------------delete des elements dupliquer-et affiche ingredient-------------------
      let AllIngredientNondupliquate = [...new Set(AllIngredient)];
      AllIngredientNondupliquate.forEach(
        (AllIngredientNondupliquateForEach) => {
          containt_info[0].innerHTML += `
          <p class="para1" > ${AllIngredientNondupliquateForEach}</p>
           `;
        }
      );
      //---------------------clique du para------------------------------
      const para1 = document.querySelectorAll(".para1");
      let AllId = [{ element: "X", ids: [] }];
      let AllIdtoDisplays = [];
      para1.forEach((para1) => {
        para1.addEventListener("click", (e) => {
          section.classList.add("displayNone");
          const element = e.target.lastChild.textContent;
          afficheClickIng.innerHTML += `
    <div class="containeAffiche2" style="background-color: #3282f7"> 
    <p class="text">${element}</p>
    <i class="fa fa-times" aria-hidden="true"></i>
    </div>
    `;
          //-------------------recherche- avec le click---------------------
          //--les id des elemntsque j'ai cliquer--
          let AllTheIdFor = [];
          const result = ArrayRecipes.filter((item) => {
            let thisId = item.id;
            let ingredients = [...new Set(item.ingredient)];
            ingredients.forEach((Ingr) => {
              if (element == Ingr) {
                AllTheIdFor.push(thisId);
                if (AllId[AllId.length - 1].element != element) {
                  AllId.push({ element: element, ids: AllTheIdFor });
                }
                //---les id que je doit afficher---
                AllIdtoDisplays.push(thisId);
               
              }
            });
          });
          //------------delete dupplication des id-------
          let AllIdtoDisplaysNotDupliquate = [...new Set(AllIdtoDisplays)];
          section2.innerHTML = "";
          //----afficher les resultats obtenu
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
                  for (i = 0; i < recipes.length; i++) {
                    if (AllIdtoDisplaysNotDupliquate.includes(recipes[i].id)) {
                      section2.innerHTML += `
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
                  }
                }
              });
            }
          });
          // -----------------Décochez et delete les recheches------------
          const closes = document.querySelectorAll(".fa-times");
          closes.forEach((closes) => {
            closes.addEventListener("click", (e) => {
              let siblingElement = e.target.parentElement;
              let siblingElementText =
                e.target.parentElement.firstChild.nextSibling.textContent;
              siblingElement.remove();
              section2.innerHTML = "";
              //--les id qu'on doit delete--
              let IdYToDelete = [];
              const result = ArrayRecipes.filter((item) => {
                let thisId = item.id;
                let ingredients = [...new Set(item.ingredient)];
                ingredients.forEach((Ingr) => {
                  if (siblingElementText == Ingr) {
                    IdYToDelete.push(thisId);
                  }
                });
              });
              
              IdYToDelete.forEach((IdYToDelete) => {
                AllIdtoDisplays.pop(IdYToDelete);
                AllIdTable.push(AllIdtoDisplays);
                //console.log(AllIdTable);
                // AllIdTable.forEach((AllIdTableFor)=>{
                  //console.log(AllIdTableFor);
                  // if(AllIdTableFor == ""){
                  //   //console.log('yes');
                  //   section.classList.remove("displayNone");
                  // }
                // })
                if (AllIdtoDisplays == "") {
                  section.classList.remove("displayNone");
                }
              });

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
                        textIngre =
                          textIngre + " " + ingred.ingredient + "    :";

                        if (ingred.quantity != undefined) {
                          textIngre = textIngre + "" + ingred.quantity;
                        }
                        if (ingred.unit != undefined) {
                          textIngre = textIngre + " " + ingred.unit + "<br/>";
                        }
                      });

                      for (i = 0; i < recipes.length; i++) {
                        if (AllIdtoDisplays.includes(recipes[i].id)) {
                          section2.innerHTML += `
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
                                      <p>${textIngre} </p>
                                    </div>
                                    <div class="demo">
                                    ${recipes[i].description}
                                    </div>
                                </div>
                            </div>
                        </div>
                        `;
                        }
                      }
                    }
                  });
                }
              });
            });
          });
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
