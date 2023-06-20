import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { Html } from '@react-three/drei'
import { Three } from './components'

const App = () => {

  return (
    <Canvas className='w-screen h-screen bg-gray-100 ' style={{ width: '100vw', height: '100vh' }} >
      <Suspense >
        <Three />
      </Suspense>
    </Canvas>
  )
}

export default App
