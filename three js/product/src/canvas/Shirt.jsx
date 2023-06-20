import { easing } from 'maath'
import { useSnapshot } from 'valtio'
import { useFrame } from '@react-three/fiber'
import { Decal, useGLTF, useTexture } from '@react-three/drei'
// Decal - to apply the texture to a surface
// decal means a texture
// useTexture - making texture just like making states using useState.

import state from '../store'

const Shirt = () => {

    const snap = useSnapshot(state)
    const { nodes, materials } = useGLTF('/shirt_baked.glb')

    const logoTexture = useTexture(snap.logoDecal)
    const fullTexture = useTexture(snap.fullDecal)


    return (
        <group  >
            <mesh
                cashShadow
                geometry={nodes.T_Shirt_male.geometry}  // shape 
                material={materials.lambert1}           // appearance
                material-roughness={1}
                disposs={null}
            >

            </mesh>
        </group>
    )
}


export default Shirt;