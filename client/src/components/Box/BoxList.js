import React from 'react'
import Box from './Box';

const BoxList = ({boxes}) => {
    console.log(boxes);
    if (boxes === undefined) {
        return <div></div>;
      }
    return (
        <div>
            {boxes.map((box, i) => <Box key={i} box={box}/>)}
        
        </div>
    );
}

export default BoxList
