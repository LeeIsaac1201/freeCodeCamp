/* global React, ReactDOM, document */
/* eslint-disable no-unused-vars */

// Define the bank of drum sounds – the pads will appear in the order below.
const bankOne = [
  {
    keyCode: 81,
    keyTrigger: 'Q',
    id: 'Heater-1',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3'
  },
  {
    keyCode: 87,
    keyTrigger: 'W',
    id: 'Heater-2',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3'
  },
  {
    keyCode: 69,
    keyTrigger: 'E',
    id: 'Heater-3',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3'
  },
  {
    keyCode: 65,
    keyTrigger: 'A',
    id: 'Heater-4',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3'
  },
  {
    keyCode: 83,
    keyTrigger: 'S',
    id: 'Clap',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3'
  },
  {
    keyCode: 68,
    keyTrigger: 'D',
    id: 'Open-HH',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3'
  },
  {
    keyCode: 90,
    keyTrigger: 'Z',
    id: "Kick-n'-Hat",
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3'
  },
  {
    keyCode: 88,
    keyTrigger: 'X',
    id: 'Kick',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3'
  },
  {
    keyCode: 67,
    keyTrigger: 'C',
    id: 'Closed-HH',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3'
  }
]

// DrumMachine component – renders the outer container, display, and drum pads.
class DrumMachine extends React.Component {
  constructor(props) {
    super(props)
    // Initialise state to store the display text.
    this.state = {
      display: ''
    }
    // Bind methods to the component instance.
    this.playSound = this.playSound.bind(this)
    this.handleKeyDown = this.handleKeyDown.bind(this)
  }

  // Add event listener for key presses when the component mounts.
  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyDown)
  }

  // Remove event listener when the component unmounts.
  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown)
  }

  // Handle key press events to play the corresponding sound.
  handleKeyDown(e) {
    // Find the pad matching the pressed key code.
    const pad = bankOne.find((p) => p.keyCode === e.keyCode)
    if (pad) {
      this.playSound(pad.keyTrigger, pad.id)
    }
  }

  // Play the sound and update the display text.
  playSound(keyTrigger, id) {
    const audioTag = document.getElementById(keyTrigger)
    if (audioTag) {
      audioTag.currentTime = 0 // Reset audio playback to the start.
      audioTag.play() // Play the audio.
      this.setState({ display: id }) // Update the display with the sound name.
    }
  }

  // Render the DrumMachine component.
  render() {
    return (
      <div id="drum-machine">
        {/* Display element to show the name of the sound being played */}
        <div id="display">{this.state.display || 'Play a sound'}</div>
        {/* Drum pads rendered dynamically from the bankOne array */}
        <div className="drum-pads">
          {bankOne.map((pad) => (
            <div
              key={pad.keyTrigger}
              className="drum-pad"
              id={pad.id}
              onClick={() => this.playSound(pad.keyTrigger, pad.id)}
            >
              {pad.keyTrigger}
              {/* Audio element for each drum pad */}
              <audio className="clip" id={pad.keyTrigger} src={pad.url}></audio>
            </div>
          ))}
        </div>
      </div>
    )
  }
}

// Render the DrumMachine component inside the #root element.
ReactDOM.render(<DrumMachine />, document.getElementById('root'))
