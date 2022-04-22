import { World, Cube, useAnimation, Model, SkyLight, ThirdPersonCamera, OrbitCamera, Skybox, useKeyboard, useLoop, usePreload } from 'lingo3d-react'
import { useEffect, useRef, useState } from 'react'

const Game = () => {
  const [movtion, setMovtion] = useState('idle')
  const [testMovtion, setTestMovtion] = useState('idle')
  const characterRef = useRef()
  const key = useKeyboard()
  const lockTargetRotation = key === '`' ? false : true
  /**
   * 人物控制
   */
  const playerController = () => {
    const ArrowUpKeyMap = ['w', 'W', 'ArrowUp']
    const ArrowDownMap = ['s', 'S', 'ArrowDown']
    const isArrowUp = ArrowUpKeyMap.includes(key)
    const isArrowDown = ArrowDownMap.includes(key)
    console.log(isArrowUp, isArrowDown)
    useLoop(() => {
      characterRef.current.moveForward(-5)
    }, isArrowUp)

    useLoop(() => {
      characterRef.current.moveForward(5)
    }, isArrowDown)

    let cmovtion = movtion === 'hiPhop' ? movtion : 'idle'
    if (isArrowUp) {
      cmovtion = 'walking'
    }
    if (isArrowDown) {
      cmovtion = 'walkingBack'
    }
    if (key === 'q') {
      cmovtion = 'hiPhop'
    }
    if (cmovtion !== movtion) {
      setMovtion(cmovtion)
    }

  }
  const guaGame = () => {

    playerController()
  }
  guaGame()
  console.log(movtion)
  return (
    <World>
      <Model src="Grassland.glb" scale={270} physics="map" />
      <ThirdPersonCamera active mouseControl lockTargetRotation={lockTargetRotation}>
        <Model
          ref={characterRef}
          src="Idle.fbx"
          physics="character"
          animations={{
            idle: 'Idle.fbx',
            walking: 'Walking.fbx',
            walkingBack: 'Walking Backward.fbx',
            hiPhop: 'Hip Hop Dancing.fbx'
          }}
          animation={movtion}
          intersectIDs={['test']}
          onIntersect={(e) => {
            setMovtion('hiPhop')
            setTestMovtion('twerk')
          }}
          onIntersectOut={(e) => {
            setTestMovtion('twerk')
          }}
        // visible={false}
        />
      </ThirdPersonCamera>
      <Model
        // ref={characterRef}
        src="Idle.fbx"
        physics="character"
        animations={{
          idle: 'Idle.fbx',
          twerk: 'Dancing Twerk.fbx'
        }}
        animation={testMovtion}
        bloom={true}
        x={400}
        z={-100}
        id="test"
      // visible={false}
      />
      {/* <OrbitCamera active autoRotate z={200} /> */}
      <Skybox texture="skybox.jpg" />
      <SkyLight
        // color="yellow" 
        intensity={0.5} />
    </World>
  )
}
const App = () => {
  const progress = usePreload(
    ['Idle.fbx', 'Grassland.glb', 'Walking Backward.fbx', 'Dancing Twerk', 'skybox.jpg', 'Walking.fbx', 'Hip Hop Dancing.fbx'],
    '6.6mb',
  )

  if (progress < 100)
    return (
      <div
        style={{
          width: '100vw',
          height: '100vh',
          left: 0,
          top: 0,
          backgroundColor: 'black',
          color: 'white',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        loading {Math.round(progress)}%
      </div>
    )

  return <Game />
}

export default App
