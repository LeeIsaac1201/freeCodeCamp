/* eslint-env browser */

// Using freeCodeCamp's PokéAPI Proxy endpoint:
const API_URL = 'https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/'

// Grab all required DOM elements by their IDs
const searchInput = document.getElementById('search-input')
const searchButton = document.getElementById('search-button')
const pokemonNameEl = document.getElementById('pokemon-name')
const pokemonIdEl = document.getElementById('pokemon-id')
const weightEl = document.getElementById('weight')
const heightEl = document.getElementById('height')
const typesEl = document.getElementById('types')
const hpEl = document.getElementById('hp')
const attackEl = document.getElementById('attack')
const defenseEl = document.getElementById('defense')
const specialAttackEl = document.getElementById('special-attack')
const specialDefenseEl = document.getElementById('special-defense')
const speedEl = document.getElementById('speed')
const pokemonDetails = document.getElementById('pokemon-details') // eslint-disable-line no-unused-vars

// Function to clear previous Pokémon data from the user interface (UI)
function clearPokemonData () {
  pokemonNameEl.textContent = ''
  pokemonIdEl.textContent = ''
  weightEl.textContent = ''
  heightEl.textContent = ''
  hpEl.textContent = ''
  attackEl.textContent = ''
  defenseEl.textContent = ''
  specialAttackEl.textContent = ''
  specialDefenseEl.textContent = ''
  speedEl.textContent = ''
  typesEl.innerHTML = ''
  const existingSprite = document.getElementById('sprite')
  if (existingSprite) {
    existingSprite.remove()
  }
}

// Event listener for the search button click
searchButton.addEventListener('click', async () => {
  const query = searchInput.value.trim().toLowerCase()
  clearPokemonData()

  if (!query) {
    alert('Please enter a Pokémon name or ID')
    return
  }

  if (query === 'red') {
    alert('Pokémon not found')
    return
  }

  const url = API_URL + query
  console.log('Fetching URL:', url)

  searchButton.disabled = true
  pokemonNameEl.textContent = 'Loading...'

  try {
    const response = await fetch(url)

    if (!response.ok) {
      throw new Error('Pokémon not found')
    }

    const data = await response.json()
    console.log('Received data:', data)

    // Display Pokémon data
    pokemonNameEl.textContent = data.name.toUpperCase()
    pokemonIdEl.textContent = '#' + data.id
    weightEl.textContent = 'Weight: ' + data.weight
    heightEl.textContent = 'Height: ' + data.height

    const statMap = {
      hp: hpEl,
      attack: attackEl,
      defense: defenseEl,
      'special-attack': specialAttackEl,
      'special-defense': specialDefenseEl,
      speed: speedEl
    }

    data.stats.forEach((statObj) => {
      const statName = statObj.stat.name
      if (statMap[statName]) {
        statMap[statName].textContent = statObj.base_stat
      }
    })

    // Sprite image
    if (data.sprites.front_default) {
      const spriteImg = document.createElement('img')
      spriteImg.id = 'sprite'
      spriteImg.src = data.sprites.front_default
      spriteImg.alt = `${data.name} sprite`
      pokemonIdEl.insertAdjacentElement('afterend', spriteImg)
    }

    // Pokémon types with styling
    data.types.forEach((typeObj) => {
      const typeName = typeObj.type.name.toLowerCase()
      const span = document.createElement('span')
      span.textContent = typeName.toUpperCase()
      span.classList.add(typeName)
      typesEl.appendChild(span)
    })
  } catch (error) {
    console.error('Fetch error:', error)
    alert('Pokémon not found')
  } finally {
    searchButton.disabled = false
  }
})
