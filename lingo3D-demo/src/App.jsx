import { World, Cube, useAnimation, Model, ThirdPersonCamera, Skybox, useKeyboard, useLoop, usePreload } from "lingo3d-react"
import { useRef } from 'react'

const Game = () => {
  const key = useKeyboard()
  const characterRef = useRef()
  useLoop(() => {
    // characterRef.current.moveForward(-10)
  }, key === 'w')
  const movtion = key === 'w' ? "walking" : "idle"
  return (
    <World>
      <Model src="Grassland.glb" scale={270} physics="map" />
      <ThirdPersonCamera active mouseControl>
        <Model
          ref={characterRef}
          src="a.fbx"
          physics="character"
          animations={{ idle: "a.fbx", walking: "c.fbx" }}
          animation={movtion}
        // visible={false}
        />
      </ThirdPersonCamera>
      <Skybox texture='skybox.jpg' />
    </World>
  )
}
const App = () => {
  const progress = usePreload([
    "Fox.fbx",
    "Grassland.glb",
    "ground.jpeg",
    "gun.glb",
    "Idle.fbx",
    "Rifle Idle.fbx",
    "Rifle Run.fbx",
    "skybox.jpg",
    "Walking.fbx"
  ], "6.6mb")

  if (progress < 100)
    return (
      <div style={{
        width: "100vw",
        height: "100vh",
        left: 0,
        top: 0,
        backgroundColor: "black",
        color: "white",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}>
        loading {Math.round(progress)}%
      </div>
    )

  return (
    <Game />
  )
}

export default App
