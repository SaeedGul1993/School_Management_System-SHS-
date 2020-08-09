import React from 'react';
import LoaderImage from '../assets/loader/loader5.gif';
import './Loader.css';

const Loader = () => {
    return (
        <div className="loader-container">
            <div className="loader">
                <img src={LoaderImage} />
            </div>
        </div>
    )
}

export default Loader;