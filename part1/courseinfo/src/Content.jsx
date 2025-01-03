const Content = ({ parts }) => {
    return (
        <> {
            parts.map(part => {
                return (<p key={part.part}>{part.part} {part.exercises}</p>)
        })}
        </>
    )
}

export default Content