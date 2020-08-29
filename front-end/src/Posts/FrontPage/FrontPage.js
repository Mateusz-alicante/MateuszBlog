import React, {useState, useEffect} from "react";
import InfiniteScroll from 'react-infinite-scroller';
import axios from 'axios'

import SimplePost from './SimplePost/SimplePost'

const App = () => {

    const [posts, setPosts] = useState([])
    const [page, setPage] = useState(0)
    const [hasMore, setHasMore] = useState(true)

    const loadMore = async () => {
        const response = await axios.get(`/api/posts/loadPosts?page=${page}`)
        if (response && response.status === 200) {
            setHasMore(response.data.length  === 10)
            setPage(page + 1)
            setPosts([...posts, ...response.data])
        }
    }

    return (
        <>
            <InfiniteScroll
                pageStart={0}
                loadMore={loadMore}
                hasMore={hasMore}
                loader={<div className="loader" key={0}>Loading ...</div>}
            >
                {posts.map((post) => <SimplePost post={post} key={post._id} />)}
            </InfiniteScroll>
        </>
    )
}

export default App