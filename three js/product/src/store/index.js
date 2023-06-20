import { proxy } from "valtio";

const state = proxy({           // it's just like creating the context through createContext
    intro: true,
    color: '#ef8d48',
    isLogoTexture: true,
    isFullTexture: false,
    logoDecal: './threejs.png',
    fullDecal: './threejs.png'
})

export default state;