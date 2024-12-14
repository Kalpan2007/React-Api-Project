import React, { useEffect, useState } from "react";

function Cocktails() {
    const [cocktails, setCocktails] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCocktail, setSelectedCocktail] = useState(null);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("All");

    useEffect(() => {
        fetch("https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list")
            .then((response) => response.json())
            .then((data) => setCategories(data.drinks || []));
    }, []);

    useEffect(() => {
        const url = searchTerm.trim()
            ? `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchTerm}`
            : selectedCategory !== "All"
            ? `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${selectedCategory}`
            : `https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Alcoholic`;

        fetch(url)
            .then((response) => response.json())
            .then((data) => setCocktails(data.drinks || []));
    }, [searchTerm, selectedCategory]);

    // Fetch random cocktail
    const fetchRandomCocktail = () => {
        fetch("https://www.thecocktaildb.com/api/json/v1/1/random.php")
            .then((response) => response.json())
            .then((data) => setSelectedCocktail(data.drinks[0]));
    };

    return (
        <div className="cocktails-container bg-[#c35a04ab]">
            {/* Search and Filter Section */}
            <div className="search-bar bg-[#e9d8a6] p-4 rounded shadow">
                <h2 className="text-center text-lg font-bold text-[#ca6702]">Discover Cocktails</h2>
                <input
                    type="text"
                    placeholder="Search cocktails..."
                    className="border border-[#ca6702] p-2 rounded w-full mt-2"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <select
                    className="mt-4 w-full p-2 rounded border border-[#ca6702]"
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    value={selectedCategory}
                >
                    <option value="All">All Categories</option>
                    {categories.map((category) => (
                        <option key={category.strCategory} value={category.strCategory}>
                            {category.strCategory}
                        </option>
                    ))}
                </select>
                <button
                    className="mt-4 w-full bg-[#ca6702] text-white py-2 rounded hover:bg-[#b35602]"
                    onClick={fetchRandomCocktail}
                >
                    Suggest A Cocktail!
                </button>
            </div>

            {/* Display Cocktails */}
            <div className="cocktails-list grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 p-4">
                {cocktails.length > 0 ? (
                    cocktails.map((cocktail) => (
                        <div
                            key={cocktail.idDrink}
                            className="cocktail-item border border-[#ca6702] p-4 rounded shadow hover:scale-105  hover:shadow-lg transition-all duration-300 ease-in-out cursor-pointer bg-[#e9d8a6]"
                            onClick={() => setSelectedCocktail(cocktail)}
                        >
                            <img
                                src={cocktail.strDrinkThumb}
                                alt={cocktail.strDrink}
                                className="w-full h-40 object-cover rounded"
                            />
                            <h3 className="text-center mt-2 font-semibold text-[#ca6702]">
                                {cocktail.strDrink}
                            </h3>
                        </div>
                    ))
                ) : (
                    <p className="col-span-full text-center text-gray-600">
                        {searchTerm || selectedCategory !== "All"
                            ? "No cocktails found. Try searching something else!"
                            : "Welcome! Start by searching or selecting a category."}
                    </p>
                )}
            </div>

            {/* Display Selected Cocktail Details */}
            {selectedCocktail && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
                    onClick={() => setSelectedCocktail(null)}
                >
                    <div
                        className="cocktail-details bg-white p-6 rounded shadow-lg w-11/12 md:w-2/3 lg:w-1/2"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h2 className="text-lg font-bold text-center mb-4 text-[#ca6702]">
                            {selectedCocktail.strDrink}
                        </h2>
                        <img
                            src={selectedCocktail.strDrinkThumb}
                            alt={selectedCocktail.strDrink}
                            className="w-full h-64 object-cover rounded mb-4"
                        />
                        <p className="mt-4 text-sm text-gray-700">{selectedCocktail.strInstructions}</p>
                        <ul className="mt-4 list-disc list-inside">
                            {Array.from({ length: 15 }, (_, i) => i + 1)
                                .map((num) => selectedCocktail[`strIngredient${num}`])
                                .filter(Boolean)
                                .map((ingredient, index) => (
                                    <li key={index} className="text-gray-800">
                                        {ingredient}
                                    </li>
                                ))}
                        </ul>
                        <button
                            className="mt-4 px-4 py-2 bg-[#ca6702] text-white rounded hover:bg-[#b35602]"
                            onClick={() => setSelectedCocktail(null)}
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Cocktails;
