import React from 'react'
import Particles from 'react-tsparticles'
import './Home.scss'
import { Link } from 'react-router-dom'

const particleOptions = {
  background: {
    color: {
      value: '',
    },
  },
  backgroundmode: {
    enable: true,
    zindex: -1,
  },
  fpsLimit: 60,
  interactivity: {
    detectsOn: 'canvas',
    events: {
      onClick: {
        enable: true,
        mode: 'push',
      },
      onHover: {
        enable: true,
        mode: 'repulse',
      },
      resize: true,
    },
    modes: {
      bubble: {
        distance: 400,
        duration: 2,
        opacity: 0.8,
        size: 20,
      },
      push: {
        quantity: 4,
      },
      repulse: {
        distance: 200,
        duration: 0.4,
      },
    },
  },
  particles: {
    color: {
      value: '#eadd46',
    },
    links: {
      color: 'random',
      distance: 150,
      enable: false,
      opacity: 0.5,
      width: 1,
    },
    collisions: {
      enable: true,
    },
    move: {
      direction: 'none',
      enable: true,
      outMode: 'bounce',
      random: false,
      speed: 6,
      straight: false,
    },
    number: {
      density: {
        enable: true,
        value_area: 800,
      },
      value: 150,
    },
    opacity: {
      value: 0.5,
    },
    shape: {
      type: 'star',
    },
    size: {
      random: true,
      value: 4,
    },
  },
  detectRetina: true,
}

const Home = () => {
  return (
    <div className='home'>
      <h1 className='home__title'>Computer's Choice Awards</h1>
      <Link to='/main'>
        <button>LET'S GO!</button>
      </Link>
      <Particles id='tsparticles' options={particleOptions} />
    </div>
  )
}

export default Home
