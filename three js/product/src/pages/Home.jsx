import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useSnapshot } from 'valtio'
import { headContainerAnimation, headContentAnimation, headTextAnimation, slideAnimation } from '../config/motion'
import state from '../store'
import { CustomButton } from '../components'


const Home = () => {
    const snap = useSnapshot(state)

    return (
        <AnimatePresence>
            {
                snap.intro && (
                    <motion.section className="home" {...slideAnimation('left')} >
                        <motion.header {...slideAnimation('down')} >
                            <img src='/threejs.png' alt='logo' className='w-[2rem] h-[2rem] object-contain ' />
                        </motion.header>
                        <motion.div className="home-content" {...headContainerAnimation} >
                            <motion.div {...headTextAnimation} >
                                <h1 className="head-text" >LET'S <br className="xl:block hidden " /> DO IT.</h1>
                            </motion.div>
                            <motion.div className="flex flex-col gap-[20px]  "  {...headContentAnimation} >
                                <p className="max-w-md font-normal text-gray-600 text-base " >Create your unique and exclusive shirt with our brand-new 3D curstomization tool.
                                    <strong>Unleash your imagination</strong>{' '}
                                    and define your own style.
                                </p>
                                <CustomButton
                                    type='filled'
                                    title='Customize It'
                                    handleClick={() => state.intro = false}
                                    customStyles='w-fit px-[1rem] py-[10px] font-bold text-sm '
                                />
                            </motion.div>
                        </motion.div>
                    </motion.section>
                )
            }
            {
                snap.intro
            }
        </AnimatePresence>
    )
}

export default Home
