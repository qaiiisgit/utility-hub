// src/pages/utilities/StopWatch.jsx
import { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'

const StopWatch = () => {
  const [time, setTime] = useState(0)
  const [isRunning, setIsRunning] = useState(false)
  const [laps, setLaps] = useState([])
  const intervalRef = useRef(null)

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTime(prev => prev + 10)
      }, 10)
    } else {
      clearInterval(intervalRef.current)
    }
    return () => clearInterval(intervalRef.current)
  }, [isRunning])

  const formatTime = (ms) => {
    const minutes = Math.floor(ms / 60000)
    const seconds = Math.floor((ms % 60000) / 1000)
    const centiseconds = Math.floor((ms % 1000) / 10)
    return {
      minutes: String(minutes).padStart(2, '0'),
      seconds: String(seconds).padStart(2, '0'),
      centiseconds: String(centiseconds).padStart(2, '0'),
    }
  }

  const startStop = () => setIsRunning(!isRunning)

  const reset = () => {
    setIsRunning(false)
    setTime(0)
    setLaps([])
  }

  const addLap = () => {
    setLaps(prev => [...prev, {
      number: prev.length + 1,
      time: time,
      diff: prev.length > 0 ? time - prev[prev.length - 1].time : time,
    }])
  }

  const { minutes, seconds, centiseconds } = formatTime(time)

  const getBestWorst = () => {
    if (laps.length < 2) return {}
    const diffs = laps.map(l => l.diff)
    return {
      best: Math.min(...diffs),
      worst: Math.max(...diffs),
    }
  }

  const { best, worst } = getBestWorst()

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <Link to="/dashboard" className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to Dashboard
      </Link>

      <div className="max-w-md mx-auto">
        <h1 className="text-3xl font-bold text-white mb-6 text-center">⏱️ Stopwatch</h1>

        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8">
          {/* Timer Display */}
          <div className="text-center mb-8">
            <div className="text-7xl font-mono font-light text-white tracking-wider">
              <span>{minutes}</span>
              <span className="text-indigo-400">:</span>
              <span>{seconds}</span>
              <span className="text-indigo-400">.</span>
              <span className="text-4xl text-gray-400">{centiseconds}</span>
            </div>
          </div>

          {/* Controls */}
          <div className="flex justify-center gap-4 mb-8">
            <button
              onClick={time > 0 ? reset : addLap}
              disabled={!time && !isRunning}
              className={`px-6 py-3 rounded-xl font-medium transition-all cursor-pointer ${
                !time && !isRunning
                  ? 'bg-gray-800 text-gray-600 cursor-not-allowed'
                  : 'bg-gray-700 hover:bg-gray-600 text-white'
              }`}
            >
              {isRunning ? 'Lap' : 'Reset'}
            </button>
            <button
              onClick={startStop}
              className={`px-8 py-3 rounded-xl font-medium transition-all cursor-pointer ${
                isRunning
                  ? 'bg-red-500/20 text-red-400 hover:bg-red-500/30 border border-red-500/30'
                  : 'bg-green-500/20 text-green-400 hover:bg-green-500/30 border border-green-500/30'
              }`}
            >
              {isRunning ? 'Stop' : 'Start'}
            </button>
            {isRunning && (
              <button
                onClick={addLap}
                className="px-6 py-3 bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 rounded-xl font-medium hover:bg-indigo-500/30 transition-all cursor-pointer"
              >
                Lap
              </button>
            )}
          </div>

          {/* Laps */}
          {laps.length > 0 && (
            <div>
              <h3 className="text-sm font-medium text-gray-400 mb-3">Laps</h3>
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {[...laps].reverse().map(lap => {
                  const lapTime = formatTime(lap.diff)
                  const totalTime = formatTime(lap.time)
                  const isBest = laps.length >= 2 && lap.diff === best
                  const isWorst = laps.length >= 2 && lap.diff === worst

                  return (
                    <div
                      key={lap.number}
                      className={`flex items-center justify-between p-3 rounded-xl text-sm ${
                        isBest ? 'bg-green-500/10 border border-green-500/20' :
                        isWorst ? 'bg-red-500/10 border border-red-500/20' :
                        'bg-gray-800 border border-gray-700'
                      }`}
                    >
                      <span className={`font-medium ${
                        isBest ? 'text-green-400' : isWorst ? 'text-red-400' : 'text-gray-400'
                      }`}>
                        Lap {lap.number}
                      </span>
                      <span className="text-gray-300 font-mono">
                        {lapTime.minutes}:{lapTime.seconds}.{lapTime.centiseconds}
                      </span>
                      <span className="text-gray-500 font-mono text-xs">
                        {totalTime.minutes}:{totalTime.seconds}.{totalTime.centiseconds}
                      </span>
                    </div>
                  )
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default StopWatch