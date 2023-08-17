import React from 'react'

import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';


const ReactCarousel = ({ images }) => {
  const settings = {
    arrows: true,
    dots: false,
    autoplay: true,
    autoplaySpeed: 3000,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: <ArrowButton direction="prev" />,
    nextArrow: <ArrowButton direction="next" />,
    beforeChange: (current, next) => {
      if (current === images.length - 1 && next === 0) {
        slider.slickGoTo(0);
      }
    },
  };

  let slider;
  return (
    <div className='carousel-container'>
      <Slider ref={(c) => (slider = c)} {...settings}
        className='carousel'>
        {images.map((image, index) => (
          <div className='slide' key={index}>
            <img
              src={image.images[0]} alt='slidder' />
          </div>
        ))}
      </Slider>
    </div>
  )
}

const ArrowButton = ({ direction, onClick }) => {
  return (
    <button className={`arrow-button ${direction}`} onClick={onClick}>
      {direction === 'prev' ? '<' : '>'}
    </button>
  );
};

export default ReactCarousel