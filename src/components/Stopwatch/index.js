import {Component} from 'react'
import './index.css'

const initialState = {
  isTimerRunning: false,
  timeElapsedInSeconds: 0,
}

class Stopwatch extends Component {
  state = initialState

  componentWillUnmount() {
    console.log('componentWillUnmount() called')
    clearInterval(this.timerID)
  }

  onResetTimer = () => {
    clearInterval(this.timerID)
    console.log('onResetTimer() called')
    this.setState(initialState)
  }

  onStopTimer = () => {
    clearInterval(this.timerID)
    console.log('onStopTimer() called')
    this.setState({isTimerRunning: false})
  }

  onStartTimer = () => {
    console.log('onStartTimer() called')
    this.timerID = setInterval(this.updateTimer, 1000)
    this.setState({isTimerRunning: true})
  }

  formatSeconds = () => {
    const {timeElapsedInSeconds} = this.state
    const seconds = Math.floor(timeElapsedInSeconds % 60)
    console.log('Seconds:', seconds)
    if (seconds < 10) {
      return `0${seconds}`
    }
    return seconds
  }

  formatMinutes = () => {
    const {timeElapsedInSeconds} = this.state
    const minutes = Math.floor(timeElapsedInSeconds / 60)
    console.log('Minutes:', minutes)
    if (minutes < 10) {
      return `0${minutes}`
    }
    return minutes
  }

  updateTimer = () => {
    console.log('updateTimer() called')
    this.setState(pervState => ({
      timeElapsedInSeconds: pervState.timeElapsedInSeconds + 1,
    }))
  }

  render() {
    const {isTimerRunning} = this.state
    const time = `${this.formatMinutes()}:${this.formatSeconds()}`

    return (
      <div className="bg-img-container">
        <div className="app-container">
          <h1 className="heading">Stopwatch</h1>
          <div className="stopwatch-container">
            <div className="timer-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/stopwatch-timer.png"
                className="stopwatch-icon"
                alt="stopwatch"
              />
              <p className="timer">Timer</p>
            </div>
            <h2 className="stopwatch">{time}</h2>
            <div className="buttons-container">
              <button
                className="btn start"
                type="button"
                disabled={isTimerRunning}
                onClick={this.onStartTimer}
              >
                Start
              </button>
              <button
                className="btn stop"
                type="button"
                onClick={this.onStopTimer}
              >
                Stop
              </button>
              <button
                className="btn reset"
                type="button"
                onClick={this.onResetTimer}
              >
                Reset
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default Stopwatch
