import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaFacebookF, FaTwitter, FaLinkedinIn } from "react-icons/fa";
import "./footer.css";

const Footer = () => {
  const liData = [
    {
      title: "Company",
      li: ["About Us", "Carees", "Location", "Our Blog", "Reviews"],
    },
    {
      title: "Shop",
      li: [
        "Games & Videos",
        "Phones & Taplets",
        "Computers & Laptops",
        "Sport Watches",
        "Head Phones",
      ],
    },
    {
      title: "Support",
      li: ["FAQs", "Reviews", "Contact Us", "Shopping", "Return"],
    },
  ];

  return (
    <div className="footer bg-white pt-5">
      <Container>
        <Row xs={1} sm={2} md={3} lg={4} xl={5}>
          <Col className="mb-5">
            <Link to="/" className="text-blue fw-bold fs-3 text-uppercase">
              Dollapy
            </Link>
            <p className="mt-3 mb-4">
              The home and elements needed to create beautiful products.
            </p>
            <div className="social">
              <FaFacebookF />
              <FaTwitter />
              <FaLinkedinIn />
            </div>
          </Col>

          {liData.map((item, index) => (
            <Col key={index} className="mb-5">
              <h4 className="mb-3">{item.title}</h4>
              <ul>
                {item.li.map((i, index) => (
                  <li key={index} className="my-3">
                    <a className="fw-bold text-black-50" href="/">
                      {i}
                    </a>
                  </li>
                ))}
              </ul>
            </Col>
          ))}

          <Col className="mb-4">
            <h4 className="mb-3">Talk To Us</h4>
            <p className="mb-3">Find a location nearest you. See Our Stores</p>
            <p className="text-black-50 fw-bold">+22 458 268 4824</p>
            <a className="gmail text-black fw-bold" href="mailto:asd@gmail.com">
              asd@gmail.com
            </a>
          </Col>
        </Row>
      </Container>

      <h6 className="text-center bg-blue text-white p-3">
        &copy;{" "}
        <a
          href="https://www.linkedin.com/in/ziad-ahmed22/"
          className="text-white fs-18"
        >
          Ziad Ahmed Mahmoud
        </a>{" "}
        &copy;
      </h6>
    </div>
  );
};

export default Footer;
