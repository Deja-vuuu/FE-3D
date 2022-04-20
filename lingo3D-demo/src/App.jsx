import { World, Cube, useAnimation, Model, SkyLight, ThirdPersonCamera, OrbitCamera, Skybox, useKeyboard, useLoop, usePreload } from 'lingo3d-react'
import { useEffect, useRef, useState } from 'react'

const Game = () => {
  let movtion = 'idle'
  const characterRef = useRef()
  const key = useKeyboard()
  // useLoop(() => {
  //   characterRef.current.moveForward(-3)
  // }, key === 'alt')
  // const movtion = key.includes('w') ? 'walking' : 'idle';
  const lockTargetRotation = key === '`' ? false : true
  /**
   * 人物控制
   */
  const playerController = () => {
    const ArrowUpKeyMap = ['w', 'W', 'ArrowUp']
    const ArrowDownMap = ['s', 'S', 'ArrowDown']
    useLoop(() => {
      characterRef.current.moveForward(-3)
    }, ArrowUpKeyMap.includes(key))

    useLoop(() => {
      characterRef.current.moveForward(3)
    }, ArrowDownMap.includes(key))
    // useLoop(() => {
    //   characterRef.current.moveForward(-3)
    // }, key === 'alt')
    console.log(characterRef.current)
    movtion = key.includes('w') ? 'walking' : 'idle'
  }
  if (key === '`') {
    console.log(12312)
  }

  console.log('key', key, 'lockTargetRotation', lockTargetRotation)

  const guaGame = () => {
    console.log('guaGame')
    playerController()
  }
  guaGame()
  useEffect(() => {
    console.log('useEffect')
  }, [])
  return (
    <World>
      <Model src="Grassland.glb" scale={270} physics="map" />
      <ThirdPersonCamera active mouseControl lockTargetRotation={lockTargetRotation}>
        <Model
          ref={characterRef}
          src="Idle.fbx"
          // src="Walking.fbx
          physics="character"
          animations={{
            idle: 'Idle.fbx',
            walking: 'Walking.fbx',
            walkingBack: 'Walking Backwards.fbx',
            run: 'Flair.fbx',
          }}
          animation={movtion}
          intersectIDs={['test']}
          onIntersect={(e) => {
            console.log('onIntersect', e)
          }}
          onIntersectOut={(e) => {
           console.log('onIntersectOut', e)
          }}
        // visible={false}
        />
      </ThirdPersonCamera>
      <Model
        // ref={characterRef}
        src="Idle.fbx"
        physics="character"
        animations={{ idle: 'Idle.fbx', walking: 'Idle.fbx' }}
        animation="walking"

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
    ['Grassland.glb', 'ground.jpeg', 'Idle.fbx', 'Rifle Idle.fbx', 'Rifle Run.fbx', 'skybox.jpg', 'Walking.fbx'],
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
