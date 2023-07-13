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
//-------------------------fecth ustensiles----------------------------------
//------------------------------------------------------------------------
fetch("http://127.0.0.1:5500/data/recipes.json").then((res) => {
  if (res.ok) {
    res.json().then((data) => {
      let recipes = data.recipes;
      let AllUstensiles = [];
      let ArrayUstensiles = [{ id: "X" }];
      for (i = 0; i < recipes.length; i++) {
        let ArrayAllUstensile = [];
        const ustensiles = recipes[i].ustensils;
        for (let a = 0; a < ustensiles.length; a++) {
          AllUstensiles.push(ustensiles[a].toLowerCase());
          ArrayAllUstensile.push(ustensiles[a].toLowerCase());
          if (ArrayUstensiles[ArrayUstensiles.length - 1].id != recipes[i].id) {
            ArrayUstensiles.push({
              id: recipes[i].id,
              ustensiles: ArrayAllUstensile,
            });
          }
        }
      }
      //-----------------suppresion des elements dupliquer et affichage des para--------------------
      let AllUstensilesNondupliquate = [...new Set(AllUstensiles)];
      AllUstensilesNondupliquate.forEach(
        (AllUstensilesNondupliquateForEach) => {
          containt_info[2].innerHTML += `
            <p class="para3" > ${AllUstensilesNondupliquateForEach}</p>
             `;
        }
      );
      //---------------------clique du para------------------------------
      const para3 = document.querySelectorAll(".para3");
      let AllId = [{ element: "X", ids: [] }];
      let AllIdtoDisplaysUsten = [];
      para3.forEach((para3) => {
        para3.addEventListener("click", (e) => {
          section.classList.add("displayNone");
          const element = e.target.lastChild.textContent;
          afficheClickIng.innerHTML += `
          <div class="containeAffiche2" style="background-color: #ed6454"> 
          <p class="text">${element}</p>
          <i class="fa fa-times" aria-hidden="true"></i>
          </div>
          `;

          //-------------------recherche- avec le click---------------------
          //--les id des elemntsque j'ai cliquer--
          let AllTheIdFor = [];
          const result = ArrayUstensiles.filter((item) => {
            let thisId = item.id;
            let Ustensil = [...new Set(item.ustensiles)];
            Ustensil.forEach((Usten) => {
              if (element == Usten) {
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
                            <div class="app_usten">
                  ${recipes[i].appliance}
                  ${recipes[i].ustensils}
                  </div>
                        </div>
                    </div>
                    `;
                    }
                  }
                }
             
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
              const result = ArrayUstensiles.filter((item) => {
                let thisId = item.id;
                let Ustensil = [...new Set(item.ustensiles)];
                Ustensil.forEach((Usten) => {
                  if (siblingElementText == Usten) {
                    IdYToDelete.push(thisId);
                  }
                });
              });
              IdYToDelete.forEach((IdYToDeleteUss) => {
                AllIdtoDisplays.pop(IdYToDeleteUss);
                if (AllIdtoDisplays == "") {
                  section.classList.remove("displayNone");
                }
              });
              //----------affiche result after delete--------
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
                  if (AllIdtoDisplays.includes(recipes[i].id)) {
                    section2.innerHTML += `
                  <div class="containerAll2">
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
                          <div class="app_usten">
                ${recipes[i].appliance}
                ${recipes[i].ustensils}
                </div>
                      </div>
                  </div>
                  `;
                  }
                }
              }
            });
          });
        });
      });
    });
  }
});
console.log(AllIdtoDisplays);