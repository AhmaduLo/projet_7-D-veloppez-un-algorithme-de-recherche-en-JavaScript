const inputSearch = document.querySelector(".inputSearch");
const section2 = document.querySelector("nav");
let ArrayName = [];

fetch("http://127.0.0.1:5500/data/recipes.json").then((res) => {
  if (res.ok) {
    res.json().then((data) => {
      let recipes = data.recipes;

      for (let i = 0; i < recipes.length; i++) {
        const namePlat = recipes[i];
        ArrayName.push(namePlat);
      }
    });
  }
});

inputSearch.addEventListener("input", (e) => {
  const valueInput = e.target.value;
  const containerAll = document.querySelectorAll(".containerAll");
  const result = ArrayName.filter((item) =>
    item.name.toLocaleLowerCase().includes(valueInput)
  );
  if (valueInput.length > 2) {
    section.classList.add("displayNone");
    for (let i = 0; i < result.length; i++) {
      const ingredient = result[i].ingredients;

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

      section2.innerHTML += `
      <div class="containerAll">
          <div class="imgNone"></div>
          <div class="lesInfos">
              <div class="tittle_time">
                  <div class="tittle">
                      <h3>${result[i].name}</h3>
                  </div>
                  <div class="time">
                      <i class="fa fa-clock-o" aria-hidden="true"></i>
                      <p>${result[i].time} min</p>
                  </div>

              </div>

              <div class="ingredient_demo">
                  <div class="ingredient"> 
                    <p> ${textIngre} </p>  
                  </div>
                  <div class="demo">
                  ${result[i].description}
                  </div>
              </div>
          </div>
      </div>
      `;
    }
  } else if (valueInput.length == 0) {
    location.reload();
  }
});
