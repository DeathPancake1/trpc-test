import { Link } from "react-router-dom";

function Home() {
  const linkStyle = {
    margin: "30px",
    padding: "3px",
    border: "1px solid black",
    borderRadius: "5px"
  };
    return (
      <div className="App">
        <Link to={"./register"} style={linkStyle}>Register</Link>
        <Link to={"./login"} style={linkStyle}>Login</Link>
      </div>
    );
  }
  
  export default Home;