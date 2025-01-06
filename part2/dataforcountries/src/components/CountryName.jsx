const CountryName = ({country, setFilter}) => {
    return (
        <div>
            {country.name.common}
            <button onClick={() => setFilter(country.name.common)}>show</button>
        </div>
    )
}

export default CountryName