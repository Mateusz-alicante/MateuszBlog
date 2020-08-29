import React, { useEffect, useState } from 'react'
import moment from 'moment'
import axios from 'axios'
import styles from './Metadata.module.css'

const Metadata = ({ id, createdAt }) => {

    const [user, setUser] = useState(undefined)

    const FetchUser = async () => {
        const response = await axios.get(`/api/auth/fetchUserInfo?id=${id}`)
        console.log(response)
        if (response && response.status == 200) {
            setUser(response.data)
        }
    }

    useEffect(() => {
        FetchUser()
    }, [])

    if (user) {
        return (
            <div className={styles.outerContainer}>
                <h2>Metadata:</h2>
                <div className={styles.innerContainer}>
                    <div className={styles.metadataModule}>
                        <h3>Date published:</h3>
                        <h4>{moment(createdAt).format('MMMM Do YYYY')}</h4>
                    </div>
                    <div className={styles.metadataModule}>
                        <h3>Published By:</h3>
                        <h4>{`${user.name} -- ${user.email}`}</h4>
                    </div>
                </div>
            </div>
        )
    } else return (
        <div>
            <p>Loading...</p>
        </div>
    )
}

export default Metadata