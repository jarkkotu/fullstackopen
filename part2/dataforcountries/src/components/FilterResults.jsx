import Country from "./Country"
import CountryName from "./CountryName"

const FilterResults = ({countries, filter, setFilter}) => {

    console.log("FilterResults", countries, filter)

    if (countries.length === 0) {
        return (
            <p>No countries to filter</p>
        )
    }
    else {
        const filteredCountries = countries
            .filter((c) => {
                const filterLower = filter.toLowerCase()
                const nameLower = c.name.common.toLowerCase()
                const match = nameLower.includes(filterLower)
                return match
            })
        
        console.log("filteredCountries.length", filteredCountries.length)

        if (filteredCountries.length > 10) {
            return (
                <p>Too many matches, specify another filter</p>
            )
        }
        else if (filteredCountries.length > 1) {
            return (
                <div>
                    {filteredCountries.map(c =>
                        <CountryName country={c} setFilter={setFilter} />
                    )}
                </div>
            )
        }
        else if (filteredCountries.length > 0) {
            return (
                <Country country={filteredCountries[0]} />
            )
        }
        else {
            return (
                <p>No countries match the filter</p>
            )
        }
    }

}

export default FilterResults