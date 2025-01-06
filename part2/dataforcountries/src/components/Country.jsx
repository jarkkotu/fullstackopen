import CountryWeather from "./CountryWeather"

const Country = ({country}) => {
    console.log("Country", country)

    const getLanguages = (country) => {
        let languages = []
        let keys = Object.keys(country.languages)
        for (let i = 0; i < keys.length; i++) {
            let language = country.languages[keys[i]];
            languages.push(language)
          }
          return languages
    }

    return (
        <div>
            <h2>{country.name.common}</h2>
            <div>
                capital {country.capital}
                <br/>
                area {country.area}
            </div>
            <div>
            <p><strong>languages:</strong></p>
                <ul>
                    {getLanguages(country).map(l => <li key={l}>{l}</li>)}
                </ul>
            </div>
            <div>
                <img max="100" width="100" align="left" border="1px solid black" src={country.flags.svg} />
            </div>
            <br/>
            <br/>
            <br/>
            <div>
                <h3>Weather in {country.capital}</h3>
                <CountryWeather country={country} />
            </div>
        </div>
    )
}

export default Country