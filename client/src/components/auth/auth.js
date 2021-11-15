// imports
import React, {useState, useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";

import {fetchRegister, registerAuth} from "../../redux/reducers/register/registerReducer";
import {fetchAuth, loginAuth} from "../../../src/redux/reducers/auth/authReducer";
import {changeLoggedStatus} from "../../redux/reducers/me/meReducer";
import {updateError, validateEmail} from "../../utils/utils";
import {useAuth} from "../../hooks/authHook";
import {inputs} from "../../utils/inputs";
import Wrapper from '../shared/wrapper/wrapper';
import fisa from '../../images/fisa.png'
import './auth.css';

// copy inputs
const updatedInputs = {...inputs};

// auth components
const Auth  = (props) => {
    const {login} = useAuth();
    const dispatch = useDispatch();

    // reducer data
    const dataUser = useSelector(loginAuth);
    const dataRegister = useSelector(registerAuth);
    const user = dataUser?.user;
    const registerData = dataRegister?.registerData;

    console.log(registerData, 'be wow')

    // states
    const [loginInputs, setLoginInputs] = useState([...updatedInputs.loginInputs]);
    const [registerInputs, setRegisterInputs] = useState([...updatedInputs.registerInputs]);
    const [registerError, setRegisterError] = useState('');
    const [doneRegister, setDoneRegister] = useState('');
    const [formType, setFormType] = useState('login');
    const [loginError, setLoginError] = useState('');
    const [loader, setLoader] = useState(false);
    const [tc, setTc] = useState(false);


    // wait for data then login
    useEffect(() => {
        if(user){
            login(user?.userId, user?.token);
            dispatch(changeLoggedStatus(!!user?.token));
            setLoader(false);
            window.location.href='/'
        };
    }, [user?.token]);

    // register
    useEffect(() => {
        if(registerData){
            setFormType('login');
            setRegisterError('');
            setLoader(false);
            setDoneRegister('Contul tau a fost creat, te rugam acceseaza-l.');
        }
    }, [registerData?.token]);

    // setError http response
    useEffect(() => {
        setLoginError(dataUser.error);
        setLoader(false);
    }, [dataUser.error]);

    // setError http response
    useEffect(() => {
        if(dataRegister.error){
            setRegisterError(dataRegister?.error);
            setLoader(false);
        }
    }, [dataRegister.error]);

    // change sign up / login handler
    const typeFormHandler = (type) => {
        setFormType(type);
    }
    const changeTC = () => {
        setTc(!tc);
    };
    // update inputs value on change
    const handleInputChange = (e, index) => {
        const updatedInputs = [...loginInputs];
        updatedInputs[index].value = e.target.value;
        setLoginInputs(updatedInputs);

        updateError(updatedInputs, index, e, 6);
    }

    // register input change
    const handleInputRegisterChange = (e, index) => {
        const updatedInputs = [...registerInputs];
        updatedInputs[index].value = e.target.value;
        setRegisterInputs(updatedInputs);
    }

    // on submit handler
    const handleLogin = (e) => {
        e.preventDefault();

        // store all inputs value in object
        const data = loginInputs.reduce((acc, cur) => {
            acc[cur.key] = cur.value;
            return acc;
        }, {});

        const {email, password} = data;
        const validatedEmail = validateEmail(email);

        // password error
        if(!password.length > 5 || password.length === 0 ){
            setLoginError('Parola trebuie sa contina cel putin 6 caractere')
        }

        // if email adrress is not valid
        if(!validatedEmail){
            setLoginError('Adresa de email este invalidă')
        }

        // submit - everythings fine
        if(validatedEmail && password.length > 5){
            if(!dataUser.error) {
                setLoader(true);
                setLoginError('')
            }
                dispatch(fetchAuth( data ));
        }
    }
    // register handler
    const handleRegister = (e) => {
        e.preventDefault();

        // register data
        const data = registerInputs.reduce((acc, cur) => {
            acc[cur.key] = cur.value;
            return acc;
        }, {});

        const {email, password, firstName, lastName} = data;
        const validatedEmail = validateEmail(email);

        if(!!!tc){
            setRegisterError('Te rugam accepta termenii si conditiile');
        }
        if(firstName.length < 3 || lastName.length < 3) {
            setRegisterError('Completeaza nume si prenume');
        }
        // password error
        if(!password.length > 5 || password.length === 0 ){
            setRegisterError('Parola trebuie sa contina cel putin 6 caractere')
        }
        // if email adrress is not valid
        if(!validatedEmail){
            setRegisterError('Adresa de email este invalidă')
        }

        // submit - everythings fine
        if(validatedEmail && password.length > 5 && !!tc && firstName.length > 3 && lastName.length > 3 ){
            if(!dataRegister.error){
                setLoader(true);
                setRegisterError('')
            }
            dispatch(fetchRegister( data ));
        }
    };

    // return component
    return (
        <section className="authentification section-padding">
            <Wrapper className="d-flex">
                {/* left side */}
                <div className="authentification__info text-center">
                    <img className="authentification__info--img" src={fisa}/>
                    <h4 className="authentification__info--h4">Intra in cont, pentru a putea folosi toate beneficiile.</h4>
                    <ul className="authentification__info--ul no-flex">
                        <li className="d-flex"><span>&#8226;</span> Poti folosi forumul in multe scopuri utile dvs.</li>
                        <li className="d-flex"><span>&#8226;</span> Fii la curent cu ultimele studii clinice si participa la ele</li>
                        <li className="d-flex"><span>&#8226;</span> Stai bine informat despre problema ta sau a altora</li>
                        <li className="d-flex"><span>&#8226;</span> Foloseste fisa de pacient din contul tau pentru a le fi usor medicilor sa-ti vada tratamentul si diagnosticul</li>
                    </ul>
                    <button className="authentification__info--button blackBG">Devino membru al asociatiei</button>
                </div>
                {/* right side */}
                <div className="authentification__auth position-relative">
                    {loader === true ?
                        <div className="loader">
                            <div className="lds-ripple">
                                <div></div>
                                <div></div>
                            </div>
                        </div>
                        : <div></div>
                    }
                    {/* form */}
                    <form className="authentification__form">
                        {formType === 'login' ?
                            <div className="text-center">
                                <h4 className="authentification__form--title">Bine ai revenit!</h4>
                                <h5 className="authentification__form--subtitle">Intră în contul tău.</h5>
                                {/* login */}
                                <fieldset>
                                    {loginInputs.map((input, index) => {
                                        return <div className="position-relative" key={input.id}>
                                                    <input onChange={e => handleInputChange(e, index)} id={input.id} type={input.type} value={input.value} />
                                                    <label htmlFor={input.id} className="authentification__label">{input.label}</label>
                                                    <div className="authentification__inputError">{input.error}</div>
                                                </div>
                                    })}
                                    <span className="authentification__passwordReset">Am uitat parola</span>
                                    <button onClick={handleLogin}>Intra in cont</button>
                                </fieldset>
                                <div className="error text-center">{loginError}</div>
                                <div className="done text-center mt-20">{doneRegister}</div>

                            </div>  :
                            <div className="text-center">
                                <div >
                                    <h4 className="authentification__form--title authentification__mtNegative">Bun venit!</h4>
                                    <h5 className="authentification__form--subtitle">Creeaza un nou cont.</h5>

                                </div>
                                {/*// register*/}
                                <fieldset>
                                    {updatedInputs.registerInputs.map((input, index) => {
                                        return <div className="position-relative" key={input.id}>
                                            <input onChange={e => handleInputRegisterChange(e, index)} id={input.id} type={input.type} value={input.value} />
                                            <label htmlFor={input.id} className="authentification__label">{input.label}</label>
                                            <div className="authentification__inputError">{input.error}</div>
                                        </div>
                                    })}
                                    <div>
                                        <input id="tc__aprove" className="hide" type="checkbox"></input>
                                        <label onClick={changeTC} htmlFor="tc__aprove" className="authentification__tc position-relative">Sunt de acord cu <a>termenii și condițiile</a></label>
                                    </div>
                                    <button className="mt-30" onClick={handleRegister}>Creaza Cont</button>

                                </fieldset>
                                <div className="error text-center">{registerError}</div>

                            </div>
                        }
                    </form>
                    <ul className="authentification__tabs justify-content-center">
                        {formType !== 'login' ? <li >Ai deja un cont? <span onClick={() => typeFormHandler('login')} className="authentification__extra">Acceseaza-l!</span></li> :
                            <li onClick={() => typeFormHandler('register')}>Nu ai cont?<span className="authentification__extra"> Creeaza-ti cont!</span></li>}
                    </ul>
                </div>
            </Wrapper>
        </section>
    )
}

export default Auth;