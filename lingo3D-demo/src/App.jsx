import { World, Cube, useAnimation, Model,SkyLight, ThirdPersonCamera,OrbitCamera, Skybox, useKeyboard, useLoop, usePreload } from "lingo3d-react"
import { useRef } from 'react'

const Game = () => {
  const key = useKeyboard()
  const characterRef = useRef()
  useLoop(() => {
    characterRef.current.moveForward(-3)
  }, key.includes('w'))
  // useLoop(() => {
  //   characterRef.current.moveForward(-3)
  // }, key === 'alt')
  const movtion = key.includes('w') ? "walking" : "idle"
  const lockTargetRotation = key === 'Alt' ? false : true

  console.log(
    'key',key,
    'lockTargetRotation',lockTargetRotation
  );
  return (
    <World>
      <Model src="Grassland.glb" scale={270} physics="map" />
      <ThirdPersonCamera 
      active
      mouseControl
      lockTargetRotation={false} 
      >
        <Model
          ref={characterRef}
          src="Idle.fbx"
          // src="Walking.fbx
          physics="character"
          animations={{ 
            idle: "Idle.fbx", 
            walking: "Walking.fbx",
            run: 'Flair.fbx'
          }}
          animation={movtion}
        // visible={false}
        />
      </ThirdPersonCamera>
      {/* <Model
          ref={characterRef}
          src="Idle.fbx"
          physics="character"
          animations={{ idle: "Idle.fbx", walking: "Idle.fbx" }}
          animation='walking'
        // visible={false}
        /> */}
            {/* <OrbitCamera active autoRotate z={200} /> */}
      <Skybox texture='skybox.jpg' />
      <SkyLight color="yellow"  intensity={0.5}/>
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
