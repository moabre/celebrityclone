import React from 'react';
import '../../App.scss';
const searchUrl = 'https://www.google.com/search?newwindow=1&tbm=isch&q='

function toTitleCase(str) {
  return str.replace(/[^-'\s]+/g, function(word) {
      return word.replace(/^./, function(first) {
      return first.toUpperCase();
      });
  });
}

const CelebrityDiv = ({celeb}) => {
  return (
    <div className='celebrity-name'>
      <a className='black' target="_blank" href={`${searchUrl}${celeb.name}`}>
        {`${toTitleCase(celeb.name)}`}
      </a>
      {` ${(celeb.prob*100).toFixed(3)}%`}
    </div>
  );
};

export default CelebrityDiv;