import React from 'react'

export default function DifficultyButtons({ onStart }) {
  return (
    <div className="d-flex justify-content-center gap-3 mt-4">
      <button className="btn btn-success btn-lg" onClick={() => onStart('easy')}>
        Easy
      </button>
      <button className="btn btn-warning btn-lg" onClick={() => onStart('medium')}>
        Medium
      </button>
      <button className="btn btn-danger btn-lg" onClick={() => onStart('hard')}>
        Hard
      </button>
    </div>
  )
}
