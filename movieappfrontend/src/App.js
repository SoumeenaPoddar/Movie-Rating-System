import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import MovieComponent from "./components/MovieComponent";
import LoginComponent from "./components/LoginComponent";
import RegisterComponent from "./components/RegisterComponent";
import MovieDetailsComponent from "./components/MovieDetailsComponent";

function App() {
  return (
    <div>
      <Router>
        <div className="">
          <Switch>
            <Route path="/" exact component={MovieComponent}></Route>
            <Route path="/allMovies" exact component={MovieComponent}></Route>
            <Route path="/login" exact component={LoginComponent}></Route>
            <Route path="/register" exact component={RegisterComponent}></Route>
            <Route path="/movieDetails" exact component={MovieDetailsComponent}></Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
