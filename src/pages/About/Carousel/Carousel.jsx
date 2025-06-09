import React from 'react'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import "./Carousel.scss"

import { useLazyGetMenuQuery } from "../../../services/firebaseApi"
import { useEffect, useState } from 'react';

export default function Carousel() {
    const [images, setImages] = useState([]);
    const [triggerGetMenu] = useLazyGetMenuQuery();

    useEffect(() => {
        (async() => {
            try {
                const result = await triggerGetMenu();

                if (result.data) {
                    const menuArray = Object.values(result.data);
                    const imgArray = menuArray[0].items.map(item => item.img);
                    setImages(imgArray);
                }
            } catch (error) {
                console.log("Error in setting images for carousel")
            }
        })()
    })

    const settings = {
        dots: false,
        infinite: true,
        slidesToShow: 3,
        autoplay: true,
        autoplaySpeed: 4000,
        touchMove: false,
        pauseOnHover: false,
        pauseOnFocus: false,
    };

    return (
        <Slider {...settings}>
        {images.map((url, index) => (
            <div className='carouselSlide' key={index}>
                <div className='img-wr'>
                    <img src={url} alt={`Slide ${index}`} />
                </div>
            </div>
        ))}
        </Slider>
    );
}
