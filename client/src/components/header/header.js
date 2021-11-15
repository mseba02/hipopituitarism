// imports
import React from "react";
import {Link} from "react-router-dom";

import Wrapper from '../shared/wrapper/wrapper';
import Navigation from "../shared/navigation/navigation";

import logo from '../../images/logo.png'

import './header.css';

// header
const Header = () => {
    return(
        <section className="header">
            <Wrapper className="d-flex">
                {/* logo */}
                <div className="header__logo flex-30">
                    <Link to='/'>
                         <img className="header__logoImg" src={logo} />
                    </Link>
                </div>
                {/* navigation */}
                <Navigation className="justify-content-end align-items-center flex-70"/>
            </Wrapper>
        </section>
    )
}
export default Header;