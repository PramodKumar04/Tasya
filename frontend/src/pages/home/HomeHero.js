import Carousel from 'react-bootstrap/Carousel';
import './HomePage.css';

export default function Hero() {
  return (
    <div className="carousel-wrapper">
      <Carousel controls={false} indicators={false} interval={1000} fade>
        <Carousel.Item>
          <div className="carousel-img-container">
            <img
              src="https://plus.unsplash.com/premium_photo-1661284853300-cecb2f4c73d5?q=80&w=1170&auto=format&fit=crop"
              alt="Slide 1"
              className="carousel-img"
            />
          </div>
        </Carousel.Item>
        <Carousel.Item>
          <div className="carousel-img-container">
            <img
              src="media/homepage.png"
              alt="Slide 2"
              className="carousel-img"
            />
          </div>
        </Carousel.Item>
      </Carousel>
    </div>
  );
}
