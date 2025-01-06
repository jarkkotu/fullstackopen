const PersonForm = ({ persons, newName, newNumber, setPersons, setNewName, setNewNumber }) => {
    
    const addPerson = (event) => {
        event.preventDefault()
    
        if (persons.find(p => p.name.toLowerCase() === newName)) {  
          alert(`${newName} is already added to phonebook`)
          return
        }
    
        const newPerson = { name: newName, number: newNumber }
        setPersons(persons.concat(newPerson))
        setNewName('')
        setNewNumber('')
      }

    const newNameChanged = (event) => {
        console.log('newNameChanged', event.target.value)
        setNewName(event.target.value)
    }
    
    const newNumberChanged = (event) => {
        console.log('newNumberChanged', event.target.value)
        setNewNumber(event.target.value)
    }

    return (
        <form onSubmit={addPerson}>
            <div>
            name: <input value={newName} onChange={newNameChanged} />
            </div>
            <div>
            number: <input value={newNumber} onChange={newNumberChanged}/>
            </div>
            <div>
            <button type="submit">add</button>
            </div>
        </form>
    )
}

export default PersonForm