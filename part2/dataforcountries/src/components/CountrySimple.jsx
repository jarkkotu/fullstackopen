const CountrySimple = ({country, setFilter}) => {
    console.log("CountrySimple", country)

    return (
        <div>
            {country.name.common}
            <button onClick={() => setFilter(country.name.common)}>show</button>
        </div>
    )
}

export default CountrySimple