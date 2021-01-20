import React from 'react'
import BoxList from '../Box/BoxList'
import './Face.scss'

const Face = ({ image, boxes }) => {
  return (
    <div className='center'>
      <div className='centerma'>
        <img src={image} boxes={boxes} id='inputImage' alt='persons img' />
        <BoxList boxes={boxes} />
      </div>
    </div>
  )
}

export default Face
