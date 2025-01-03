import StatisticsLine from './StatisticsLine'

const Statistics = ({good, neutral, bad}) => {

    if (good === 0 && neutral === 0 && bad === 0) {
        return (
            <div>
            <h1>statistics</h1>
            <p>No feedback given</p>
            </div>
        )
    }
    else {
        return (
            <div>
                <h1>statistics</h1>
                <table>
                    <tbody>
                        <StatisticsLine text="good" value={good} />
                        <StatisticsLine text="neutral" value={neutral} />
                        <StatisticsLine text="bad" value={bad} />
                        <StatisticsLine text="all" value={good+neutral+bad} />
                        <StatisticsLine text="average" value={(good-bad)/(good+neutral+bad)} />
                        <StatisticsLine text="positive" value={good/(good+neutral+bad)*100} />
                    </tbody>
                </table>
            </div>
        )
    }
  }

export default Statistics