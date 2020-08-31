import React, { useEffect, useState } from 'react'
import { useParams } from "react-router";
import axios from 'axios'
import styles from './SinglePost.module.css'
import Tags from '../../Components/Tags/Tags'
import Metadata from './Metadata/Metadata'
import { Helmet } from "react-helmet";

const SinglePost = () => {

    const { id } = useParams()
    const [data, setData] = useState({})
    const [status, setStatus] = useState('loading')

    const fetchArticle = async () => {
        const response = await axios.get(`/api/posts/fetchPost?id=${id}`)
        console.log(response)
        if (response && response.status === 200) {
            setData(response.data)
            setStatus('OK')
            console.log(response.data)
        }
    }

    useEffect(() => {
        fetchArticle()
    }, [])
    if (status == "OK") {
        return (
            <div>
                <Helmet>
                    <meta charSet="utf-8" />
                    <title>{data.title}</title>
                    <meta name="description" content={data.description} />
                    <meta name="keywords" content={[data.tags + data.title].join(', ')}></meta>
                </Helmet>
                <div className={styles.container}>
                    <h1 className={styles.title} >{data.title}</h1>
                    <h4 className={styles.description}>{data.description}</h4>
                    <img className={styles.image} src={data.imageURL} />
                    <div className={styles.body}>
                        <div className="ck-content" dangerouslySetInnerHTML={{ __html: data.body }} />
                    </div>
                    <h2>Tags:</h2>
                    <Tags tags={data.tags} />
                    <Metadata id={data.author} createdAt={data.createdAt} />
                </div>
            </div>
        )
    } else return (
        <div>
            <p>Loading...</p>
        </div>
    )
}

export default SinglePost