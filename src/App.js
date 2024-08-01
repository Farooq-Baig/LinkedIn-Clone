import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./components/login";
import Header from "./components/header";
import Home from "./components/home";
import "./App.css";
import { useEffect } from "react";
import { getUserAuth } from "./actions";
import { connect } from "react-redux";

function App(props) {
  useEffect(() => {
    props.getUserAuth();
  }, [props]);

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              props.user ? <Navigate to="/home" replace={true} /> : <Login />
            }
          />
          <Route
            path="/home"
            element={
              props.user ? (
                <>
                  <Header />
                  <Home />
                </>
              ) : (
                <Navigate to="/" replace={true} />
              )
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

const mapStateToProps = (state) => ({
  user: state.userState.user,
});

const mapDispatchToProps = (dispatch) => ({
  getUserAuth: () => dispatch(getUserAuth()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
