import "./App.css";
import Update from "../src/Page/Update";
import { BrowserRouter as Router, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Route path="/" component={Update} exact />
    </Router>
  );
}

export default App;
