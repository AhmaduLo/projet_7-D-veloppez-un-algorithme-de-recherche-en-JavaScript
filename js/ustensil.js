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
      let AllUstensiles = [];
      let ArrayUstensiles = [{ id: "X" }];
      for (i = 0; i < recipes.length; i++) {
        let ArrayUstensilesSpecifique = [];
        // const ustentielInner = recipes[i].ustensils;
        // AllUstensiles.push(ustentielInner.toLowerCase());
      }
    });
  }
});
