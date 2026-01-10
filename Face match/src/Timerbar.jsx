import React from 'react'

export default function TimerBar({ timeLeft, total }) {
  const pct = Math.max(0, Math.round((timeLeft / total) * 100))
  return (
    <div className="my-4">
      <div className="progress" style={{ height: '30px' }}>
        <div
          className="progress-bar"
          role="progressbar"
          style={{ width: `${pct}%` }}
          aria-valuenow={pct}
          aria-valuemin="0"
          aria-valuemax="100"
        >
          Time Remaining
        </div>
      </div>
      <div className="mt-2">
        <strong>{timeLeft}</strong>
      </div>
    </div>
  )
}
