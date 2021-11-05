import "./App.css";
import Test from "../src/Pages/Test";

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
        <Route path="/" component={Test} exact />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
