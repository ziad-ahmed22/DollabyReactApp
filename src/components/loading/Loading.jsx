import { Container } from "react-bootstrap";
import "./loading.css";

const Loading = () => {
  return (
    <Container className="text-center">
      <div className="loading">
        <div className="load">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </Container>
  );
};

export default Loading;
