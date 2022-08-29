const loadFood = (search) =>{
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`)
    .then(res=>res.json())
    .then(data=>displayFood(data.meals))
    // .then(data=>console.log(data.meals))
}

const displayFood = foods =>{
    const foodContainer = document.getElementById('food-container');
    foodContainer.innerHTML=``;
    foods.forEach(food => {
        const foodDiv = document.createElement('div');
        foodDiv.classList.add('col');
        foodDiv.innerHTML=`
        <div onclick="loadFoodDetail(${food.idMeal})" class="card">
            <img src="${food.strMealThumb}" class="card-img-top" alt="...">
            <div class="card-body">
              <h5 class="card-title"> ${food.strMeal} </h5>
              <p class="card-text"> ${food.strInstructions.slice(0,200)} ... <small class="text-primary">read more</small> </p>
            </div>
        </div>
        `;
        foodContainer.appendChild(foodDiv);
    });
}

const searchFood = () =>{
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    loadFood(searchText);
    searchField.value ='';
}

const loadFoodDetail =foodID=>{
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${foodID}`)
    .then(res=>res.json())
    .then(data=>displayFoodDetail(data.meals[0]))
}

const displayFoodDetail = food =>{
    const detailContainer = document.getElementById('detail-container');
    detailContainer.innerHTML=``;
    const detailDiv = document.createElement('div');
    detailDiv.classList.add('card');
    detailDiv.innerHTML=`
        <img src="${food.strMealThumb}" class="card-img-top"/>
          <div class="card-body">
            <h5 class="card-title">${food.strMeal}</h5>
            <p class="card-text">
            ${food.strInstructions}
            </p>
            <a href="#" class="btn btn-primary">EAT</a>
          </div>
    `;
    detailContainer.appendChild(detailDiv);
}

loadFood();