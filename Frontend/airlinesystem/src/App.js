import "./App.css";
import Test from "../src/Pages/Test";
import { BrowserRouter as Router, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Route path="/" component={Test} exact />
    </Router>
  );
}

export default App;
