import styles from './About.module.css'
import React from 'react'
import construction from './construction.jpeg'

const About = () => {
    return (
        <div className={styles.container}>
            <img src={construction} />
        </div>
    )
}

export default About