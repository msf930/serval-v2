import { createRoot } from 'react-dom/client'
import React, { useRef, useState } from 'react'
import { Canvas, useFrame, useThree, extend } from '@react-three/fiber'
import './styles.css'
import { shaderMaterial } from '@react-three/drei'
import * as THREE from 'three';

// Define the fragment shader
const fragmentShader = `


`;

// Define the vertex shader
const vertexShader = `

`;

const ColormapMaterial = shaderMaterial(
    {
        iTime: 0,
        iResolution: new THREE.Vector2(),
    },

)

extend({ ColormapMaterial })


function FullscreenPlane() {
    const ref = useRef()
    const { viewport, size } = useThree(); // Access the viewport dimensions
    useFrame(({ clock }) => {
        ref.current.iTime = clock.getElapsedTime()
        ref.current.iResolution.set(size.width, size.height)
    })
    return (
        <mesh>
            <planeGeometry args={[viewport.width, viewport.height]} />
            <ColormapMaterial ref={ref} />
        </mesh>
    );
}

const HomePage = () => {
    return (
        <div className="container">
            <Canvas style={{ width: '100vw'  }} orthographic camera={{ zoom: 1, position: [0, 0, 1] }}>
                <FullscreenPlane />
            </Canvas>
        </div>
    )
}

export default HomePage