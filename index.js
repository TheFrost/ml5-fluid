import ml5 from 'ml5'
import P5 from 'p5'

import birdImg from './images/bird.png'

const sketch = p5 => {
  let video
  let poseNet
  let poses = []

  p5.setup = () => {
    p5.createCanvas(640, 480)
    video = p5.createCapture(p5.VIDEO)
  }
}

(() => new P5(sketch))()
