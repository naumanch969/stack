import { PerspectiveCamera } from '@react-three/drei';
import { angleToRadians } from '../utils/function'


const Three = () => {

    const ballRadius = .75;
    const widthSegmant = 32;
    const heightSegmant = 32;

    const floorWidth = 7;
    const floorHeight = 7;

    const ambientLightColor = '#fff'
    const ambientLightIntensity = 1

    return (
        <>

            {/* camera is just like our eyes */}
            <PerspectiveCamera
                makeDefault             // makeDefault is used to override the props of Camera which is actually provided by @react-three/fiber
                position={[0, 1, 5]}    // [x,y,z]
            />

            {/* ball */}
            <mesh
                position={[0, ballRadius, 0]}   // [x,y,z]
            >
                <sphereGeometry args={[ballRadius, widthSegmant, heightSegmant]} />
                <meshStandardMaterial color='#fff' />
            </mesh>

            {/* floor */}
            <mesh rotation={[-(angleToRadians(90)), 0, 0,]} >
                <planeGeometry args={[floorWidth, floorHeight]} />
                <meshStandardMaterial color='#1ea3d8' />
            </mesh>

            {/* ambient light */}
            <ambientLight args={[ambientLightColor, ambientLightIntensity]} />



        </>
    )
}

export default Three;