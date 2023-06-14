import { Col, Container, Row } from "react-bootstrap";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Navigation } from "swiper";
import "swiper/css/navigation";
import { Autoplay } from "swiper";
import "./mainslider.css";
import s1 from "./images/s1.jpg";
import s2 from "./images/s2.jpg";
import s3 from "./images/s3.jpg";
import i1 from "./images/i3.jpg";
import i2 from "./images/i4.jpg";
import i3 from "./images/i2.jpg";
import i4 from "./images/i1.jpg";
import { Link } from "react-router-dom";

const MainSlider = () => {
  const slides = [s1, s2, s3];
  const images = [i1, i2, i3, i4];
  return (
    <div className="main-slider py-4">
      <Container>
        <Row>
          <Col className="col-12 col-lg-7">
            <Swiper
              className="mb-4"
              slidesPerView={1}
              loop={true}
              grabCursor={true}
              navigation
              modules={[Autoplay, Navigation]}
              autoplay={true}
            >
              {slides.map((s, i) => (
                <SwiperSlide key={i}>
                  <Link to="/products">
                    <img className="w-100 h-100" src={s} alt={i} />
                  </Link>
                </SwiperSlide>
              ))}
            </Swiper>
          </Col>

          <Col className="col-12 col-lg-5">
            <Row xs={2} md={4} lg={2}>
              {images.map((img, i) => (
                <Col key={i} className="mb-3">
                  <Link to="/products">
                    <div className="img shadow">
                      <img className="w-100 h-100" src={img} alt={i} />
                    </div>
                  </Link>
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default MainSlider;
