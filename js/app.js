const searchFood = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    if (searchText == '') {

    }
    else {
        searchField.value = '';
        const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`;
        // console.log(url);
        fetch(url)
            .then(res => res.json())
            .then(data => displaySearchResult(data.meals));
    }
}
const displaySearchResult = meals => {
    // console.log(meals);
    const displayResult = document.getElementById('display-result');
    displayResult.innerHTML = '';
    meals.forEach(meal => {
        // console.log(meal);
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
            <div onclick = "loadMealDetail(${meal.idMeal})" class="card h-100 p-2" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                <img src="${meal.strMealThumb}" class="card-img-top img-thumbnail" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${meal.strMeal}</h5>
                    <p class="card-text">${meal.strInstructions.slice(0, 150)}</p>
                </div>
            </div>
    `
        displayResult.appendChild(div);
    })

}

const loadMealDetail = mealId => {
    console.log(mealId);
    url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayMeal(data.meals[0]));
}
const displayMeal = meal => {
    console.log(meal);
    const mealDetails = document.getElementById('meal-details');
    mealDetails.textContent = '';
    const div = document.createElement('div');
    div.classList.add('modal-content');
    div.innerHTML = `
            <div class="modal-header">
                <h5 class="modal-title" id="staticBackdropLabel">Food Panda</h5>
            </div>
            <div class="modal-body">
                <img src="${meal.strMealThumb}" class="card-img-top img-thumbnail" alt="...">
                <h5 class="card-title mt-2">${meal.strMeal}</h5>
                <p class="card-text ">${meal.strInstructions.slice(0, 150)}</p>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            </div>
      
    `
    mealDetails.appendChild(div);
}
