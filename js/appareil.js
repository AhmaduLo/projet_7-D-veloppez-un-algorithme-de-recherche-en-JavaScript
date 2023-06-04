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

//-------------------------fecth appareil----------------------------------
//------------------------------------------------------------------------
fetch("http://127.0.0.1:5500/data/recipes.json").then((res) => {
  if (res.ok) {
    res.json().then((data) => {
      let recipes = data.recipes;
      let AllAppareil = [];
      let ArrayAppareil = [{ id: "X" }];
      for (i = 0; i < recipes.length; i++) {
        let ArrayApareilSpecifique = [];
        const appareilInner = recipes[i].appliance;
        AllAppareil.push(appareilInner.toLowerCase());
        ArrayApareilSpecifique.push(appareilInner.toLowerCase());
        if (ArrayAppareil[ArrayAppareil.length - 1].id != recipes[i].id) {
          ArrayAppareil.push({
            id: recipes[i].id,
            appareil: ArrayApareilSpecifique,
          });
        }
      }
      //-----------------suppresion des elements dupliquer et affichage des para--------------------
      let AllAppareilNondupliquate = [...new Set(AllAppareil)];
      AllAppareilNondupliquate.forEach((AllAppareilNondupliquateForEach) => {
        containt_info[1].innerHTML += `
             <p class="para2" > ${AllAppareilNondupliquateForEach}</p>
              `;
      });
      const para2 = document.querySelectorAll(".para2");
      let AllIdtoDisplays = [];
      let AllId = [{ element: "X", ids: [] }];
      para2.forEach((para2) => {
        para2.addEventListener("click", (e) => {
          section.classList.add("displayNone");
          const element = e.target.lastChild.textContent;
          afficheClickIng.innerHTML += `
      <div class="containeAffiche2" style="background-color: #68d9a4">
      <p class="text">${element}</p>
       <i class="fa fa-times" aria-hidden="true"></i>
      </div>
      `;

          //-------------------recherche- avec le click---------------------
          //--les id des elemntsque j'ai cliquer--
          let AllTheIdFor = [];
          const result = ArrayAppareil.filter((item) => {
            let thisId = item.id;
            let Appareil = [...new Set(item.appareil)];
            Appareil.forEach((App) => {
              if (element == App) {
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
          //-----------------afficher les resultats obtenu----------------------
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
                                  <p>${textIngre}</p>  
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
              const result = ArrayAppareil.filter((item) => {
                let thisId = item.id;
                let Appareil = [...new Set(item.appareil)];
                Appareil.forEach((App) => {
                  if (siblingElementText == App) {
                    IdYToDelete.push(thisId);
                  }
                });
              });
              IdYToDelete.forEach((IdYToDelete) => {
                AllIdtoDisplays.pop(IdYToDelete);
                if (AllIdtoDisplays == "") {
                  section.classList.remove("displayNone");
                }
              });
              //--------affiche du reste du tableaux-----------
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