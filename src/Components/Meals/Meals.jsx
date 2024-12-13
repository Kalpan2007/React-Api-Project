import React, { useEffect, useState } from 'react';

const Meals = () => {
  const [meals, setMeals] = useState([]); // For storing meals data
  const [searchTerm, setSearchTerm] = useState(''); // For tracking the search input
  const [selectedMeal, setSelectedMeal] = useState(null); // For showing details in a popup

  // Fetch data initially for "I"
  useEffect(() => {
    const defaultSearch = "I";
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${defaultSearch}`)
      .then((response) => response.json())
      .then((data) => setMeals(data.meals || []));
  }, []);

  // Fetch data when the search term changes
  useEffect(() => {
    if (searchTerm.trim() !== '') {
      fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`)
        .then((response) => response.json())
        .then((data) => setMeals(data.meals || []));
    }
  }, [searchTerm]);

  return (
    <div className="meals-container">
      {/* Search Bar */}
      <div className="search-bar bg-[#e9d8a6] p-4 rounded shadow">
        <h2 className="text-center text-lg font-bold text-[#ca6702]">Search for Meals</h2>
        <input
          type="text"
          placeholder="Search meals..."
          className="border border-[#ca6702] p-2 rounded w-full mt-2"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Display Meals */}
      <div className="meals-list grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        {meals.length > 0 ? (
          meals.map((meal) => (
            <div
              key={meal.idMeal}
              className="meal-item border border-[#ca6702] p-4 rounded shadow hover:shadow-lg transition cursor-pointer bg-[#fefae0]"
              onClick={() => setSelectedMeal(meal)}
            >
              <img
                src={meal.strMealThumb}
                alt={meal.strMeal}
                className="w-full h-40 object-cover rounded"
              />
              <h3 className="text-center mt-2 font-semibold text-[#ca6702]">
                {meal.strMeal}
              </h3>
            </div>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-600">
            {searchTerm
              ? 'No meals found. Try searching something else!'
              : 'Welcome! Start by searching for a meal.'}
          </p>
        )}
      </div>

      {/* Display Selected Meal Details */}
      {selectedMeal && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={() => setSelectedMeal(null)}
        >
          <div
            className="meal-details bg-white p-6 rounded shadow-lg w-11/12 md:w-2/3 lg:w-1/2"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-lg font-bold text-center mb-4 text-[#ca6702]">
              {selectedMeal.strMeal}
            </h2>
            <iframe
              title="Meal Instructions"
              src={selectedMeal.strYoutube.replace('watch?v=', 'embed/')}
              className="w-full h-64 rounded"
            />
            <p className="mt-4 text-sm text-gray-700">{selectedMeal.strInstructions}</p>
            <button
              className="mt-4 px-4 py-2 bg-[#ca6702] text-white rounded hover:bg-[#e9d8a6] hover:text-black"
              onClick={() => setSelectedMeal(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Meals;
