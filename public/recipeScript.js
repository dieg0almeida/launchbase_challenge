const ingredients = document.querySelector('.recipe__content__ingredients');
const preparation = document.querySelector('.recipe__content__preparation');
const info = document.querySelector('.recipe__content__info');
const showIngredients = ingredients.querySelector('h4');
const showPreparations = preparation.querySelector('h4');
const showInfo = info.querySelector('h4');

showIngredients.addEventListener('click', function(){
    if(showIngredients.innerHTML === 'MOSTRAR'){
        showIngredients.innerHTML = 'ESCONDER';
        ingredients.classList.add('active');
    }else{
        showIngredients.innerHTML = 'MOSTRAR';
        ingredients.classList.remove('active');
    }
});

showPreparations.addEventListener('click', function(){
    if(showPreparations.innerHTML === 'MOSTRAR'){
        showPreparations.innerHTML = 'ESCONDER';
        preparation.classList.add('active');
    }else{
        showPreparations.innerHTML = 'MOSTRAR';
        preparation.classList.remove('active');
    }
});

showInfo.addEventListener('click', function(){
    if(showInfo.innerHTML === 'MOSTRAR'){
        showInfo.innerHTML = 'ESCONDER';
        info.classList.add('active');
    }else{
        showInfo.innerHTML = 'MOSTRAR';
        info.classList.remove('active');
    }
});