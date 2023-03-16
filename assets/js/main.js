let allRecipes = [];
let recipeDetails = {};
let searchInput = document.getElementById('searchInput');
let searchBtn = document.getElementById('searchBtn');



async function getRecipes(term) {
    let apiResponce = await fetch(`https://forkify-api.herokuapp.com/api/search?&q=${term}`);  
    allRecipes = await apiResponce.json();
    allRecipes = allRecipes.recipes;
    displayRecipes();
}

async function getRecipeDetails(id) {
    let apiResponse = await fetch(`https://forkify-api.herokuapp.com/api/get?rId=${id}`);
    recipeDetails = await apiResponse.json();
    recipeDetails = recipeDetails.recipe ;
    displayRecipeDetail();
}


function displayRecipes() {
    let storage = `` ;
    for(let i=0; i<allRecipes.length; i++) {
        let myId = "'"+allRecipes[i].recipe_id+"'";
        storage+= `
            <div class="col-md-4">
                <div class="recipe" onclick="getRecipeDetails(${myId})" >
                    <div>
                    <img class="w-100" src="${allRecipes[i].image_url}">
                    </div>
                    <h3 class="py-1">${allRecipes[i].title}</h3>
                    <p>${allRecipes[i].publisher}</p>
                </div>
            </div>
        `
    }

    document.getElementById('recipesRow').innerHTML = storage;
}


function displayRecipeDetail() {
    let storage2 = ``;

    for (let x of recipeDetails.ingredients) {
        storage2+=`
        <li class="d-flex py-2 align-items-center font-weight-bolder">
            <span class="fa-li"><i class="fas fa-utensil-spoon"></i></span>
            ${x}
        </li>
        `
    }

    let storage = `
        <div>
            <h3 class=" text-center py-1">${recipeDetails.title}</h3>
            <img class="w-100" src="${recipeDetails.image_url}"  alt="">
            <ul class="fa-ul py-3">
                ${storage2}
            </ul>
        </div>
    `;

    document.getElementById('recipeDetails').innerHTML = storage;

}

searchBtn.addEventListener('click' , function() {
    getRecipes(searchInput.value);
})

