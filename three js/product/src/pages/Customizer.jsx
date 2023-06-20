import { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useSnapshot } from 'valtio'

import config from '../config/config'
import state from '../store'
import { download } from '../assets'
import { downloadCanvasToImage, reader } from '../config/helpers'
import { EditorTabs, FilterTabs, DecalTypes } from '../config/constants'
import { fadeAnimation, slideAnimation } from '../config/motion'
import { AiPicker, ColorPicker, CustomButton, FilePicker, Tab } from '../components'

const Customizer = () => {

    const snap = useSnapshot(state)


    return (
        <AnimatePresence>   // AnimatePresence is a component in the framer-motion library for React that allows for animating components when they are added to or removed from the DOM.

            {
                !snap.intro && (
                    <>
                        <motion.div key='custom' className='absolute top-0 left-0 z-10 ' {...slideAnimation('left')} >
                            <div className='flex items-center min-h-screen ' >
                                <div className='editortabs-container tabs ' >
                                    {EditorTabs.map((tab, index) => (
                                        <Tab key={index} tab={tab} handleClick={() => { }} />
                                    ))}
                                </div>
                            </div>
                        </motion.div>


                        <motion.div className='absolute top-[20px] right-[20px] z-10 ' {...fadeAnimation} >
                            <CustomButton type='filled' title='Go Back' handleClick={() => state.intro = true} customStyles='w-fit px-[1rem] py-[10px] font-bold text-sm ' />
                        </motion.div>


                        <motion.div className='filtertabs-container ' {...slideAnimation('up')} >
                            {FilterTabs.map((tab, index) => (
                                <Tab
                                    key={index}
                                    tab={tab}
                                    isFilterTab
                                    isActiveTab=''
                                    handleClick={() => { }}
                                />
                            ))}
                        </motion.div>

                    </>
                )
            }

        </AnimatePresence>
    )
}

export default Customizer
