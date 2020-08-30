import React from "react";
import { Helmet } from "react-helmet";

const Head = () => {
    return (
        <Helmet>
            <meta
                name="description"
                content="A blog where you can learn about tech related topics"
            />
            <title>Mateusz Blog</title>
        </Helmet>
    )
}

export default Head