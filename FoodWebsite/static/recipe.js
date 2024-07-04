const searchBox = document.querySelector('.searchBox');
const searchBtn = document.querySelector('.searchBtn');
const recipeContainer = document.querySelector('.recipe-container');
const recipeDetailsContent = document.querySelector('.recipe-details-content');
const recipeCloseBtn = document.querySelector('.recipe-close-btn');


// Header & back to top button
const backToTopBtn = document.querySelector('[data-back-top-btn]');

window.addEventListener('scroll', function () {
    backToTopBtn.classList.toggle('active', window.scrollY > 50);
});



// FUNCTION TO FETCH DATA FROM API
const fetchRecipes = async (query) => {
    recipeContainer.innerHTML = '<h2>Fetching Recipes...</h2>';
    try {
        const data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
        const response = await data.json();

        recipeContainer.innerHTML = '';
        response.meals.forEach(meal => {
            const recipeDiv = document.createElement('div');
            recipeDiv.classList.add('recipe');
            recipeDiv.innerHTML = `
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
            <h3>NAME: ${meal.strMeal}</h3>
            <p>TYPE: <span>${meal.strArea}</span> Dish</p>
            <p>CATEGORY: <span>${meal.strCategory}</span></p>
        `;

            const button = document.createElement('button');
            button.textContent = 'View Recipe';
            recipeDiv.appendChild(button);

            // EVENT LISTENER TO RECIPE BUTTON
            button.addEventListener('click', () => {
                openRecipePopup(meal);
            });


            recipeContainer.appendChild(recipeDiv);
        });
    } catch (error) {
        recipeContainer.innerHTML = '<h2>Error in Fetching Recipes...</h2>';
    }
}

// FUNCTION TO FETCH INGREDIENTS
const fetchIngredients = (meal) => {
    let IngredientsList = "";
    for (let i = 1; i <= 20; i++) {
        const Ingredient = meal[`strIngredient${i}`];
        if (Ingredient) {
            const measure = meal[`strMeasure${i}`];
            IngredientsList += `<li>${Ingredient} - ${measure}</li>`;
        } else break;
    }
    return IngredientsList;
}


const openRecipePopup = (meal) => {
    recipeDetailsContent.innerHTML = `
        <h2 class="recipeName">${meal.strMeal}</h2>
        <h3>Ingredients:</h3>
        <ul class="ingredientList">${fetchIngredients(meal)}</ul>
        <div class="recipeInstructions">
            <h3>Instructions:</h3>
            <p>${meal.strInstructions}</p>
        </div>
    `;

    recipeDetailsContent.parentElement.style.display = 'block';
}

recipeCloseBtn.addEventListener('click', () => {
    recipeDetailsContent.parentElement.style.display = 'none';
});

// EVENT LISTENER TO SEARCH BUTTON
searchBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const searchInput = searchBox.value.trim();
    if (!searchInput) {
        recipeContainer.innerHTML = '<h2>Please enter a meal name in the Search box.</h2>';
        return;
    }
    fetchRecipes(searchInput);
});




