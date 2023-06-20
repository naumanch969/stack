import { useFrame } from '@react-three/fiber'
import { easing } from 'maath'
import { useSnapshot } from 'valtio'
import { useRef } from 'react'

import state from '../store'


const CameraRig = ({ children }) => {

    const groupRef = useRef(null)
    const snap = useSnapshot(state)

    useFrame((state, delta) => {
        // breakpoints
        var isBreakPoint = window.innerWidth < 1260;
        const isMobile = window.innerWidth <= 600;

        // 
        let targetPoistion = [0.4, 0, 2];
        if (snap.intro) {
            if (isBreakPoint) {

            }
        }

        // set the modal rotation smoothly
        easing.dampE(
            groupt.current.rotation,
            [state.pointer.y / 10, -state.pointer.x / 5, 0],
            0.25,
            delta
        )
    })


    return (
        <group ref={groupRef} >
            {children}
        </group>
    )
}


export default CameraRig;