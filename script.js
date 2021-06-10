const BASE_URL = 'http://localhost:3000'

const listing = document.querySelector('.listing')
const form = document.querySelector('.search-section')
const input = document.querySelector('#blank')
const savedPageButton = document.querySelector('#saved')



async function getSearchResults(query) {
  try {
    const searchResult = await axios.get(`${BASE_URL}/api/v1/search.json?query=${query}`)
    
    listResults(searchResult.data)

  } catch (err) {
    console.log("Error Message:", err.message)
  }
}


function listResults(results) {
  removeItems()

  const page = document.createElement('div')
  page.classList.add('page')
  listing.appendChild(page)

  const resultsTitle = document.createElement('h1')
  resultsTitle.classList.add('h1')
  resultsTitle.innerText = "Gem Results"
  page.appendChild(resultsTitle)

  const list = document.createElement('div')
  list.classList.add('list')
  page.appendChild(list)


  results.forEach((result) => {

    const ul = document.createElement('ul')
    ul.classList.add('item')
    list.appendChild(ul)


    const gemName = document.createElement('li')
    gemName.innerText = result.name
    gemName.classList.add("gemName")
    ul.appendChild(gemName)

    const gemInfo = document.createElement('li')
    gemInfo.innerText = result.info
    gemInfo.classList.add('gemInfo')
    ul.appendChild(gemInfo)


    const buttons = document.createElement('div')
    buttons.classList.add('buttons')
    ul.appendChild(buttons)

    const saveButton = document.createElement('button')
    saveButton.innerHTML = 'Save'
    saveButton.classList.add('save')

    saveButton.onclick = function () {
      savedItems(result)
    };
    buttons.appendChild(saveButton)

    const unsaveButton = document.createElement('button')
    unsaveButton.innerHTML = 'Unsave'
    unsaveButton.classList.add('unsave')

    unsaveButton.onclick = function () {
      unsaveItem(result)
    };
    buttons.appendChild(unsaveButton)

  })

}


function savedItems(result) {
  const savedGem = {
    name: result.name,
    info: result.info,
  }

  let savedGems =  JSON.parse(localStorage.getItem('savedGems') || '[]');

  savedGems.push(savedGem);

  localStorage.setItem('savedGems', JSON.stringify(savedGems));

  alert(`${savedGem.name} saved`)
  
}

function unsaveItem(result) {
  const savedGems = JSON.parse(localStorage.getItem('savedGems') || '[]');

  function unsaveName(gem) {
    return gem.name === result.name
  }

  let unsave = savedGems.find(unsaveName)
  let unsaveIndex = savedGems.indexOf(unsave)
  if (unsaveIndex >= 0 ) {
    savedGems.splice(unsaveIndex, 1);
    localStorage.setItem('savedGems', JSON.stringify(savedGems));
    alert(`${result.name} is no longer saved`)
  } else {
    alert(`${result.name} was never saved!`)
  }
}

function listSavedItems() {
  removeItems()
  const savedGems = JSON.parse(localStorage.getItem('savedGems') || '[]');
  
  const page = document.createElement('div')
  page.classList.add('page')
  listing.appendChild(page)
  
  const savedTitle = document.createElement('h1')
  savedTitle.classList.add('h1')
  savedTitle.innerText = "Your Saved Gems"
  page.appendChild(savedTitle)

  const list = document.createElement('div')
  list.classList.add('list')
  page.appendChild(list)


  if (savedGems.length > 0) {

    
    const removeAllButton = document.createElement('button')
    removeAllButton.innerHTML = 'Delete All'
    removeAllButton.classList.add('delete')

    removeAllButton.onclick = function () {
      removeAllItems()
    };
    page.insertBefore(removeAllButton, list)


    savedGems.forEach((gem) => {

    const ul = document.createElement('ul')
    ul.classList.add('item')
    list.appendChild(ul)

    const savedName = document.createElement('li')
    savedName.innerText = gem.name
    savedName.classList.add("savedName")
    ul.appendChild(savedName)

    const savedInfo = document.createElement('li')
    savedInfo.innerText = gem.info
    savedInfo.classList.add('savedInfo')
    ul.appendChild(savedInfo)

    const removeButton = document.createElement('button')
    removeButton.innerHTML = 'Delete'
    removeButton.classList.add('delete')

    removeButton.onclick = function () {
      let gemIndex = savedGems.indexOf(gem)
      removeItem(gemIndex)
    };
    ul.appendChild(removeButton)
  })
  
  } else {
    const noSaved = document.createElement('h4')
    noSaved.classList.add('h4')
    noSaved.innerText = "You do not have any saved gems!"
    list.appendChild(noSaved)
  }
}

function removeItem(gemIndex) {

  const savedGems = JSON.parse(localStorage.getItem('savedGems') || '[]');
  savedGems.splice(gemIndex, 1);
  localStorage.setItem('savedGems', JSON.stringify(savedGems));

  listSavedItems()
}

function removeAllItems() {
  localStorage.clear();
  listSavedItems()
}



form.addEventListener('submit', (event) => {
  event.preventDefault()
  getSearchResults(input.value)
})

savedPageButton.addEventListener('click', (event) => {
  event.preventDefault()
  listSavedItems()
})


function removeItems() {
  while (listing.firstChild) {
    listing.removeChild(listing.firstChild)
  }
}
