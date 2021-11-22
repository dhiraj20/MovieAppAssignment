import React, {useEffect, useState} from "react";
import Header from "../../common/header/Header";

export default function Details(props) {

    const baseUrl = props.baseUrl;

    const [movie, setMovie] = useState([]);

    useEffect(() => {
        let mounted = true;
        if (mounted) {
            fetch(`${baseUrl}movies/${props.match.params.id}`)
                .then(response => response.json())
                .then(data => {
                    setMovie(data);
                });
        }
        return () => {
            setMovie([])
            mounted = false;
        };
    }, [])

    console.log(movie)

    return (
        <div>
            <Header/>
        </div>
    )
}