import axios from "axios";
import { useEffect } from "react";

const Movie = () => {

    const API = "/api/v1/movies";
    console.log("Hello from Movie component");

    const getMovieData = async () => {
        try {
            const res = await axios.get(API);
            console.log(res.data); // Check API response structure here
        } catch (err) {
            console.error('Error details:', {
                message: err.message,
                response: err.response?.data,
                status: err.response?.status
            });
        }
    };

    useEffect(() => {
        getMovieData();
    }, []);

   
};

export default Movie;