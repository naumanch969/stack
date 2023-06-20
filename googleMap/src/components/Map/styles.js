import { styled } from "@mui/material"


export const paper = {
    padding: '10px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    width: '100px',
}

export const mapContainer = {
    height: '85vh',
    width: '100%',
}

export const markerContainer = {
    position: 'absolute',
    transform: 'translate(-50%, -50%)',
    zIndex: 1,
    '&:hover': {
        zIndex: 2
    },
}

export const pointer = {
    cursor: 'pointer',
}

// export default [
//     {
//         featureType: 'all',
//         elementType: 'all',
//         stylers: [
//             {
//                 saturation: '32',
//             },
//             {
//                 lightness: '-3',
//             },
//             {
//                 visibility: 'on',
//             },
//             {
//                 weight: '1.18',
//             },
//         ],
//     },
//     {
//         featureType: 'administrative',
//         elementType: 'labels',
//         stylers: [
//             {
//                 visibility: 'on',
//             },
//         ],
//     },
//     {
//         featureType: 'landscape',
//         elementType: 'labels',
//         stylers: [
//             {
//                 visibility: 'off',
//             },
//         ],
//     },
//     {
//         featureType: 'landscape.man_made',
//         elementType: 'all',
//         stylers: [
//             {
//                 saturation: '-70',
//             },
//             {
//                 lightness: '14',
//             },
//         ],
//     },
//     {
//         featureType: 'poi',
//         elementType: 'labels',
//         stylers: [
//             {
//                 visibility: 'off',
//             },
//         ],
//     },
//     {
//         featureType: 'road',
//         elementType: 'labels',
//         stylers: [
//             {
//                 visibility: 'off',
//             },
//         ],
//     },
//     {
//         featureType: 'transit',
//         elementType: 'labels',
//         stylers: [
//             {
//                 visibility: 'off',
//             },
//         ],
//     },
//     {
//         featureType: 'water',
//         elementType: 'all',
//         stylers: [
//             {
//                 saturation: '100',
//             },
//             {
//                 lightness: '-14',
//             },
//         ],
//     },
//     {
//         featureType: 'water',
//         elementType: 'labels',
//         stylers: [
//             {
//                 visibility: 'off',
//             },
//             {
//                 lightness: '12',
//             },
//         ],
//     },
// ];