import React, { Component } from 'react'
import axios from 'axios'
import Particles from 'react-tsparticles'
import Face from './components/Face/Face'
import './App.scss'
import Celebrities from './components/Celebrities/Celebrities'
import oscar from './svg/oscar.png'

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

class App extends Component {
  state = {
    input: '',
    imageURL: '',
    box: [],
    celebrities: [],
  }

  onSubmit = (e) => {
    e.preventDefault()
    this.setState({
      imageURL: e.target.inputValue.value,
    })
    axios
      .post(
        'https://api.clarifai.com/v2/models/e466caa0619f444ab97497640cefc4dc/outputs',
        {
          inputs: [
            {
              data: {
                image: {
                  url: e.target.inputValue.value,
                },
              },
            },
          ],
        },
        {
          headers: {
            authorization: 'Bearer c8c375753bb74e938881cabbf30042f7',
            'content-type': 'application/json',
          },
        }
      )
      .then((res) => {
        this.setState({
          celebrities: res.data.outputs[0].data.regions[0].data.concepts,
        })
        this.faceLocation(res)
        this.displayBox(res)
      })
  }

  faceLocation = (res) => {
    try {
      if (!res.data.outputs[0].data.regions[0]) return Promise.reject()
    } catch (e) {
      return Promise.reject()
    }
    const image = document.getElementById('inputImage')
    const w = Number(image.width)
    const h = Number(image.height)

    const boxes = []
    const region = res.data.outputs[0].data.regions
    for (let i = 0; i < region.length; i++) {
      boxes.push(this.regionInfoBox(region[i].region_info, h, w))
    }

    const celebList = []
    const celebsMatched = region[0].data.concepts
    for (let i = 0; i < Math.min(celebsMatched.length, 3); i++) {
      celebList.push(this.celebInfoToCelebObj(celebsMatched[i]))
    }

    return Promise.resolve(
      this.setState({
        box: boxes,
        celebrities: celebList,
      })
    )
  }

  celebInfoToCelebObj = ({ name, value }) => ({
    name: name,
    prob: value,
  })

  regionInfoBox = (regionInfo, h, w) => {
    const face = regionInfo.bounding_box
    console.log(face)
    const { bottom_row, left_col, right_col, top_row } = face

    return {
      top: top_row * h,
      left: left_col * w,
      bot: (1 - bottom_row) * h,
      right: (1 - right_col) * w,
    }
  }

  displayBox = (data) => {
    this.setState({ boxes: data.boxes })

    return data
  }

  render() {
    return (
      <div className='App'>
        <Particles id='tsparticles' options={particleOptions} />
        <h1 className='header'>Which Celebrity do you look like?</h1>
        <div className='forminput'>
          <form onSubmit={this.onSubmit} className='form-out'>
            <input
              className='search'
              name='inputValue'
              type='text'
              placeholder='Insert URL of your picture'
            ></input>
            <button className='button' type='submit'>
              Search
            </button>
          </form>
          <Celebrities celebs={this.state.celebrities} />
          {this.state.imageURL ? (
            <Face boxes={this.state.box} image={this.state.imageURL} />
          ) : (
            <div>
              <img className='svg' alt='oscar award' src={oscar} />
            </div>
          )}
        </div>
      </div>
    )
  }
}

export default App
