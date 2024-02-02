import { Container } from "react-bootstrap";
import error404 from "../../assets/images/404.png";

const Error = ({ msg, error, code }) => {
  console.log(msg);

  return (
    <Container className="text-center my-5">
      {code === 404 && msg && (
        <>
          <img
            src={error404}
            alt="error img"
            style={{ width: "50%", height: "60vh" }}
          />
          <h2 className="text-center pt-5">{msg}</h2>
        </>
      )}

      {msg && <h2 className="text-center pt-5">{msg}</h2>}

      {!code && error && (
        <h2 className="text-center pt-5">
          {/* {error.data || error.originalStatus} */}
          <br />
          {error.originalStatus && "Error " + error.originalStatus}
          <br />
          {error.data.message}
        </h2>
      )}
    </Container>
  );
};

export default Error;
