import personService from '../services/persons'

const Persons = ({ persons, setPersons, filter }) => {

    const shownPersons = filter === ''
        ? persons
        : persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))

    const onDelete = (person) => {
        if (window.confirm(`Delete ${person.name}?`)) {
            personService
                .remove(person.id)
                .then(() => {
                    setPersons(persons.filter(p => p.id !== person.id))
                })
                .catch(error => alert(`person delete failed. '${error}'`))
        }
    }
    return (
        <ul>
            {shownPersons.map(person =>
                <li key={person.name}>
                    {person.name}
                    {person.number}
                    <button onClick={() => onDelete(person)}>delete</button>
                </li>)}
        </ul>
    )
}

export default Persons