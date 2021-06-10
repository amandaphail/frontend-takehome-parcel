const BASE_URL = 'http://localhost:3000'

// const submit = document.querySelector('.submit')
const listing = document.querySelector('.listing')
const form = document.querySelector('.search-section')
const input = document.querySelector('#blank')

async function getSearchResults(query) {
  try {
    const searchResult = await axios.get(`${BASE_URL}/api/v1/search.json?query=${query}`)
    
    // console.log(searchResult.data)
    listResults(searchResult.data)

  } catch (err) {
    console.log("Error Message:", err.message)
  }
}


function listResults(results) {
  console.log(results)
  removeOldResults()

  const list = document.createElement('div')
  list.classList.add('list')
  listing.appendChild(list)


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

    const saveButton = document.createElement('button')
    saveButton.innerHTML = 'Save'
    saveButton.classList.add('save')
    //saveButton onClick
    saveButton.onclick = function () {
      //make this its own function
      // alert('clicked!');
      localStorage.setItem('savedGemName', result.name);
      localStorage.setItem('savedGemInfo', result.info);
      const name = localStorage.getItem('savedGemName');
      const info = localStorage.getItem('savedGemInfo');
      
      alert(`Saved ${name} - ${info} to localStorage`)

      localStorage.clear();

    };

    ul.appendChild(saveButton)
  })

}


form.addEventListener('submit', (event) => {
  event.preventDefault()
  getSearchResults(input.value)
})


function removeOldResults() {
  while (listing.firstChild) {
    listing.removeChild(listing.firstChild)
  }
}