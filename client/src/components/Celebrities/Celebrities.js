import React from 'react'
import CelebrityDiv from './CelebritySearch'
import '../../App.scss'

const Celebrities = ({ celebs }) => {
  if (celebs === undefined || celebs.length === 0) return <div />

  return (
    <div className='celeb'>
      {celebs.map((celeb, i) => (
        <CelebrityDiv key={i} celeb={celeb} />
      ))}
    </div>
  )
}

export default Celebrities
