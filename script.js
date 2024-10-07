const searchBtn = document.getElementById("search-button");
const searchInput = document.getElementById("search-input");
const pokemonName = document.getElementById("pokemon-name");
const pokemonId = document.getElementById("pokemon-id");
const pokemonWeight = document.getElementById("weight");
const pokemonHeight = document.getElementById("height");
const pokemonImg = document.getElementById("pokemonImg");
const pokemonTypes = document.getElementById("types");
const pokemonHp = document.getElementById("hp");
const pokemonAttack = document.getElementById("attack");
const pokemonDefense = document.getElementById("defense");
const pokemonSpecialAttack = document.getElementById("special-attack");
const pokemonSpecialDefense = document.getElementById("special-defense");
const pokemonSpeed = document.getElementById("speed");

const fetchPokemonData = async () => {
  let enteredValue = searchInput.value;
  let searchPokemon = enteredValue.toLowerCase();

  try {
    let pokedex = `https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/${searchPokemon}`;
    const catchPokemon = await fetch(pokedex);

    if (!catchPokemon.ok) {
      throw new alert("Pokémon not found");
    }
    const pokemonData = await catchPokemon.json();
    console.log(pokemonData);
    pokemonName.textContent = pokemonData.name;
    pokemonId.textContent = `#${pokemonData.id}`;
    pokemonWeight.textContent = pokemonData.weight;
    pokemonHeight.textContent = pokemonData.height;
    pokemonImg.innerHTML = `<img id = "sprite" src = "${pokemonData.sprites.front_default}" style = "width:160px">`;
    pokemonTypes.innerHTML = pokemonData.types
      .map((obj) => {
        return `<span class = "pokemonTypes" id = "${obj.type.name}">${obj.type.name}</span>`;
      })
      .join("");

    pokemonHp.textContent = pokemonData.stats[0].base_stat;
    pokemonAttack.textContent = pokemonData.stats[1].base_stat;
    pokemonDefense.textContent = pokemonData.stats[2].base_stat;
    pokemonSpecialAttack.textContent = pokemonData.stats[3].base_stat;
    pokemonSpecialDefense.textContent = pokemonData.stats[4].base_stat;
    pokemonSpeed.textContent = pokemonData.stats[5].base_stat;
  } catch (err) {
    console.error(err);
    resetDisplay();
    alert("Pokémon not found");
  }
};

const resetDisplay = () => {
  const sprite = document.getElementById("sprite");
  if (sprite) sprite.remove();

  // reset stats
  pokemonName.textContent = "";
  pokemonId.textContent = "";
  pokemonWeight.textContent = "";
  pokemonHeight.textContent = "";
  pokemonHp.textContent = "";
  pokemonAttack.textContent = "";
  pokemonDefense.textContent = "";
  pokemonSpecialAttack.textContent = "";
  pokemonSpecialDefense.textContent = "";
  pokemonSpeed.textContent = "";
};

searchBtn.addEventListener("click", (event) => {
  event.preventDefault();
  fetchPokemonData();
});
