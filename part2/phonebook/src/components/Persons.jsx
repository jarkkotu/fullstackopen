const Persons = ({ persons, filter }) => {

    const shownPersons = filter === ''
        ? persons
        : persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))

    return (
        <ul>
            {shownPersons.map(person => <li key={person.name}>{person.name} {person.number}</li>)}
        </ul>
    )
}

export default Persons