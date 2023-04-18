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




