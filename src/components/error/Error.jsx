import { Container } from "react-bootstrap";
import img from "./404.png";

const Error = ({ msg, code }) => {
  return (
    <Container className="text-center my-5">
      {code === 404 && (
        <img
          src={img}
          alt="error img"
          style={{ width: "50%", height: "60vh" }}
        />
      )}
      <h1 className="text-center pt-5">{msg}</h1>
    </Container>
  );
};

export default Error;
