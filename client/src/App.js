import React, {useEffect} from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import {useDispatch} from "react-redux";
import Header from "./components/header/header";
import logo from './logo.svg';
import Auth from "./components/auth/auth";
import Homepage from "./pages/homepage/homepage";
import './App.css';
import {useAuth} from "./hooks/authHook";
import {changeLoggedStatus} from "./redux/reducers/me/meReducer";
import Footer from "./components/shared/footer/footer";


function App() {

    const {token} = useAuth();
    const dispatch = useDispatch();

    useEffect( () => {
        dispatch(changeLoggedStatus(!!token));
    },[])

  return (
    <div className="App">
        <Router>
                <Header />
                <Switch>
                    {/* homepage */}
                    <Route path="/" exact={true}>
                        <Homepage />
                    </Route>
                    {/* authentification page */}
                    <Route path="/auth">
                        <Auth/>
                    </Route>
                    {/* about */}
                    <Route path="/about">
                        <p>about</p>
                    </Route>
                    {/* info */}
                    <Route path="/info">
                        <p>informatii</p>
                    </Route>
                    {/* forum */}
                    <Route path="/forum">
                        <p>forum</p>
                    </Route>
                    {/* medici */}
                    <Route path="/medics">
                        <p>Medici</p>
                    </Route>
                    {/* 404 */}
                    <Route path="*">
                        <p>not found</p>
                    </Route>
                </Switch>
                <Footer />
        </Router>

    </div>
  );
}

export default App;
