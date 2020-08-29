import React, { useEffect } from 'react'
import styles from './Tags.module.css'

const Tags = ({tags}) => {

    return (
        <div className={styles.tagContainer}>
            {tags.map((tag) => (
                <div style={{ borderColor: '#' + Math.floor(Math.random() * 16777215).toString(16) }} className={styles.tagSingleContainer} key={tag}>
                    <p className={styles.tag}>{tag}</p>
                </div>
            ))}
        </div>
    )
}

export default Tags