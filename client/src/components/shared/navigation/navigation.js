import React, {useEffect} from 'react';
import {Link} from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";
import {useAuth} from "../../../hooks/authHook";
import {changeLoggedStatus, fetchProfile} from "../../../redux/reducers/me/meReducer";

import medicIcon from '../../../images/doctor.svg'

import './navigation.css';

const Navigation = (props) => {
    const {logout, token} = useAuth();
    const dispatch = useDispatch();

    // localstorage take user i
    const localS = JSON.parse(localStorage.getItem('userData'));
    const userId = localS?.userId;

    // take store data
    const profileData = useSelector(state => state.profile);
    const {isLogged, user} = profileData;
    const username = user.user?.lastName;
    const isMedic = user.user?.medic;

    dispatch(changeLoggedStatus(!!token));

    useEffect( () => {
        if(userId){
            dispatch(fetchProfile({'_id': userId}));
        }
    }, []);


    return (
       <ul className={`navigation navigation__level1 ${props.className}`}>
           <li>
               <Link to="/">Acasa</Link>
           </li>
           <li>
               <Link to="/about">Despre noi</Link>
           </li>
            <li className="has-child">
                <Link to="/info">Informatii</Link>

                <ul className="navigation__level2">
                    <li>a</li>
                    <li>a</li>
                </ul>
            </li>
           <li>
               <Link to="/forum">Forum</Link>
           </li>
           <li>
               <Link to="/medics">Medici</Link>
           </li>
           {isLogged ?
               <>
                   <li className="has-child">
                       Contul meu
                       <ul className="navigation__level2">
                           <li>Contul meu</li>
                           <li>Postarile mele</li>
                           <li>Fisa Pacient</li>
                           <li onClick={logout}>Iesi din cont</li>
                       </ul>
                   </li>
                   <li className="navigation__level1--noLink">Salut, <span>{username}</span>!</li>
                   {isMedic ?
                       <li>
                           <img className="medicIcon" src={medicIcon}/>
                       </li>
                       :
                       <></>
                   }
               </>

            :
           <li>
                <Link to="/auth">Autentificare</Link>
           </li>
       }
       </ul>
    )
}
export default Navigation;