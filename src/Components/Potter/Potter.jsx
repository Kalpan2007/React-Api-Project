import React, { useState, useEffect } from "react";

const PotterAPI = () => {
  const [language, setLanguage] = useState("en"); // Default language is English
  const [books, setBooks] = useState([]);
  const [characters, setCharacters] = useState([]);
  const [houses, setHouses] = useState([]);
  const [spells, setSpells] = useState([]);
  const [selectedSection, setSelectedSection] = useState("books"); // Toggle between sections

  // Fetch data based on selected section and language
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (selectedSection === "books") {
          const response = await fetch(`https://potterapi-fedeperin.vercel.app/${language}/books`);
          const data = await response.json();
          setBooks(data);
        } else if (selectedSection === "characters") {
          const response = await fetch(`https://potterapi-fedeperin.vercel.app/${language}/characters`);
          const data = await response.json();
          setCharacters(data);
        } else if (selectedSection === "houses") {
          const response = await fetch(`https://potterapi-fedeperin.vercel.app/${language}/houses`);
          const data = await response.json();
          setHouses(data);
        } else if (selectedSection === "spells") {
          const response = await fetch(`https://potterapi-fedeperin.vercel.app/${language}/spells`);
          const data = await response.json();
          setSpells(data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [language, selectedSection]);

  return (
    <div className="potter-api-container  bg-[#c35a04ab]">
      {/* Language Selector */}
      <div className="language-selector bg-[#e9d8a6] p-4 rounded shadow mb-4">
        <h2 className="text-center text-xl font-bold text-[#ca6702]">Select Language</h2>
        <div className="flex justify-center space-x-4 mt-2">
          {["en", "es", "fr", "it", "pt"].map((lang) => (
            <button
              key={lang}
              className={`px-4 py-2 rounded ${
                language === lang
                  ? "bg-[#ca6702] text-white"
                  : "bg-white text-[#ca6702] border border-[#ca6702]"
              } hover:bg-[#e9d8a6] hover:text-[#ca6702]`}
              onClick={() => setLanguage(lang)}
            >
              {lang.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Section Toggle */}
      <div className="section-toggle bg-[#e9d8a6] p-4 rounded shadow mb-4">
        <div className="flex justify-center space-x-4">
          {["books", "characters", "houses", "spells"].map((section) => (
            <button
              key={section}
              className={`px-4 py-2 rounded ${
                selectedSection === section
                  ? "bg-[#ca6702] text-white"
                  : "bg-white text-[#ca6702] border border-[#ca6702]"
              } hover:bg-[#e9d8a6] hover:text-[#ca6702]`}
              onClick={() => setSelectedSection(section)}
            >
              {section.charAt(0).toUpperCase() + section.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Display Books */}
      {selectedSection === "books" && (
        <div className="books-list grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4  ">
          {books.map((book) => (
            <div key={book.title} className="book-item item-background border rounded shadow p-4  bg-[#e9d8a6]  border-[#ca6702]">
              <img
                src={book.cover}
                alt={book.title}
                className="w-full h-64 object-cover rounded mb-4"
              />
              <h3 className="text-lg font-bold text-[#ca6702]">{book.title}</h3>
              <p className="text-gray-600 text-sm">{book.description}</p>
              <p className="text-gray-500 text-sm mt-2">Pages: {book.pages}</p>
              <p className="text-gray-500 text-sm">Release Date: {book.releaseDate}</p>
            </div>
          ))}
        </div>
      )}

      {/* Display Characters */}
      {selectedSection === "characters" && (
        <div className="characters-list grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {characters.map((character) => (
            <div
              key={character.fullName}
              className="character-item item-background border rounded shadow p-4 bg-[#e9d8a6]  border-[#ca6702]"
            >
              <img
                src={character.image}
                alt={character.fullName}
                className="w-full h-64 object-cover rounded mb-4"
              />
              <h3 className="text-lg font-bold text-[#ca6702]">{character.fullName}</h3>
              <p className="text-gray-600 text-sm">Nickname: {character.nickname}</p>
              <p className="text-gray-600 text-sm">House: {character.hogwartsHouse}</p>
              <p className="text-gray-600 text-sm">Birthdate: {character.birthdate}</p>
              <p className="text-gray-600 text-sm">
                Played By: {character.interpretedBy}
              </p>
              {character.children && (
                <p className="text-gray-600 text-sm">
                  Children: {character.children.join(", ")}
                </p>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Display Houses */}
      {selectedSection === "houses" && (
        <div className="houses-list grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {houses.map((house) => (
            <div key={house.house} className="house-item item-background border rounded shadow p-4 bg-[#e9d8a6]  border-[#ca6702]">
              <h3 className="text-lg font-bold text-[#ca6702]">{house.house} {house.emoji}</h3>
              <p className="text-gray-600 text-sm">Founder: {house.founder}</p>
              <p className="text-gray-600 text-sm">Animal: {house.animal}</p>
              <p className="text-gray-600 text-sm">Colors: {house.colors.join(", ")}</p>
            </div>
          ))}
        </div>
      )}

      {/* Display Spells */}
      {selectedSection === "spells" && (
        <div className="spells-list grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {spells.map((spell) => (
            <div key={spell.spell} className="spell-item item-background border rounded shadow p-4 bg-[#e9d8a6]  border-[#ca6702]">
              <h3 className="text-lg font-bold text-[#ca6702]">{spell.spell}</h3>
              <p className="text-gray-600 text-sm">Use: {spell.use}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PotterAPI;
