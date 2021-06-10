const BASE_URL = 'http://localhost:3000'

// const submit = document.querySelector('.submit')
const listing = document.querySelector('.listing')

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

  const list = document.createElement('div')
  list.classList.add('list')
  listing.appendChild(list)


  results.forEach((result) => {
    //remove results function

    const ul = document.createElement('ul')
    ul.classList.add('item')
    list.appendChild(ul)


    const gemName = document.createElement('li')
    gemName.innerText = result.name
    gemName.classList.add("gemName")
    ul.appendChild(gemName)

    const gemInfo = document.createElement('li')
    


  })

}


getSearchResults("kitten")
//will have user input here on submit
//display on page: name, info