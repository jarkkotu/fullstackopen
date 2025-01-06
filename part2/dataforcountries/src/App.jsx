import { useState, useEffect } from 'react'
import axios from 'axios'

import FilterResults from './components/FilterResults.jsx'

function App() {

  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')

  useEffect(() => {
    axios
      .get("https://studies.cs.helsinki.fi/restcountries/api/all")
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const filterChanged = (event) => {
    setFilter(event.target.value)
  }

  return (
    <div>
      <div>
        find countries <input value={filter} onChange={filterChanged} />
      </div>
      <FilterResults countries={countries} filter={filter} setFilter={setFilter} />
    </div>
  );
}

export default App;