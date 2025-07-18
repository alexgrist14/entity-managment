import "./App.css";
import { Link } from "react-router";
import Button from "./shared/ui/Button/Button";

const App = () => {
  return (
    <div>
      <h1>Company App</h1>
      <p>
        Go to{" "}
        <Link to="/companies">
          <Button>Companies</Button>
        </Link>
      </p>
    </div>
  );
};
export default App;
