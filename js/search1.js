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



