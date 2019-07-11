import ml5 from 'ml5'
import P5 from 'p5'
import 'p5/lib/addons/p5.dom'

const sketch = p5 => {
  let video
  let poseNet
  let poses = []

  const modelReady = () => {
    p5.select('#status').html('Model Loaded')
  }

  const drawPoint = (keypoint) => {
    p5.fill(255, 0, 0)
    p5.noStroke()
    p5.ellipse(
      keypoint.x,
      keypoint.y,
      10, 10
    )
  }

  const drawHips = () => {
    for (let i = 0; i < poses.length; i++) {
      const pose = poses[i].pose

      drawPoint(pose.leftWrist)
      drawPoint(pose.rightWrist)
    }
  }

  p5.setup = () => {
    p5.createCanvas(640, 480)
    video = p5.createCapture(p5.VIDEO)
    video.size(p5.width, p5.height)

    poseNet = ml5.poseNet(video, modelReady)
    poseNet.on('pose', (results) => {
      poses = results
    })
    video.hide()
  }

  p5.draw = () => {
    p5.image(video, 0, 0, p5.width, p5.height)
    drawHips()
  }
}

(() => new P5(sketch))()
