import React from 'react'
import BoxList from '../Box/BoxList'
import './Face.scss'

const Face = ({image, boxes}) => {
    console.log(boxes);
    return (
        <div className = 'center'>
            <div className = 'centerma'>
            <img src={image} boxes={boxes} height= 'auto' width='500px' id = 'inputImage'/>
            <BoxList boxes={boxes}/>
            </div>
        </div>
    )
}

export default Face
