"use client"

import styles from './styles.module.sass'
export default function Gooey() {
    return(
    <div>
        <div className={styles.text}></div>

        <svg>
            <filter id="gooey">
                <feGaussianBlur in="SourceGraphic" stdDeviation="2" result="blur"></feGaussianBlur>
                <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 28 -8"
                               result="gooey"></feColorMatrix>
                <feComposite in="SourceGraphic" in2="gooey" operator="atop"></feComposite>
            </filter>
        </svg>
    </div>
    )
}