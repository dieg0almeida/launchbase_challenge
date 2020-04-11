const cards = document.querySelectorAll('.card');

for (let card of cards) {
    card.addEventListener('click', function () {
        const recipeId = card.getAttribute('id');
        window.location.href = `/recipe?id=${recipeId}`;
    });
}

function addIngredient() {
    const ingredients = document.querySelector("#ingredients");
    const fieldContainer = document.querySelectorAll(".ingredient");

    const newField = fieldContainer[fieldContainer.length - 1].cloneNode(true);

    if (newField.children[0].value == "") return false;

    newField.children[0].value = "";
    ingredients.appendChild(newField);
}

function addStep() {
    const steps = document.querySelector("#steps");
    const fieldContainer = document.querySelectorAll(".step");

    const newField = fieldContainer[fieldContainer.length - 1].cloneNode(true);

    if (newField.children[0].value == "") return false;

    newField.children[0].value = "";
    steps.appendChild(newField);
}

document
    .querySelector(".add-ingredient")
    .addEventListener("click", addIngredient);

document
    .querySelector(".add-step")
    .addEventListener("click", addStep);