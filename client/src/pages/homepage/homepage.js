import React from 'react';
import Wrapper from '../../components/shared/wrapper/wrapper'
import './homepage.css';
import people from '../../images/poeple.png';
import help from '../../images/help-1.png';
import helpImv from '../../images/help-2.png';

const Homepage = () => {
    return(
        <>
        {/*  section 1  */}
        <section className="homepage section-padding">
            <Wrapper>
                <div className="">
                    {/* info text */}
                    <div className="flex-2">
                        <h3 className="homepage__title">Alatura-te pentru a sustine aceasta cauza.</h3>
                        <p className="homepage__paragraph">Completeaza formularul penru a te inscrie in organizatie, vei fi în centrul organizației noastre și a tot ceea ce facem. Vei putea ajuta si sustine organizarea muncii noastre vitale și veți putea influența viitorul Fundației.</p>
                    </div>
                {/* form member */}
                    <div className="">
                        <form className="homepage__form">
                            <fieldset>
                                <input type="text" placeholder="Nume si prenume" />
                            </fieldset>
                            <fieldset>
                                <input type="text" placeholder="Oras" />
                            </fieldset>
                            <fieldset>
                                <input type="text" placeholder="Telefon" />
                            </fieldset>
                            <fieldset>
                                <button className="button-noWhiteBG">Devino membru!</button>
                            </fieldset>
                        </form>
                    </div>
                </div>
            </Wrapper>
        </section>

        {/* section 2*/}
        <section className="about-us section-padding">
            <Wrapper>
                <h1 className="tittle">Povestea noastra</h1>
                <p className="about-us__p">Fundația <b>Hipopituitarism Romania</b> este în prezent finanțată din surse <b>voluntare</b>, inclusiv: taxe de membru, donații voluntare, activități de strângere de fonduri, sprijin din partea industriei farmaceutice și sustinere guvernamentala.</p>
                <p className="about-us__p">Se estimează că în Romania există aproximativ <b>30.000 de persoane cu o afecțiune pituitară</b>. Pentru a satisface nevoia de informații și sprijin, Fundația noastra a fost înființată în 2019 și a fost ulterior înregistrată ca organizație de caritate în septembrie 2020. <br/><br/>Suntem o organizație națională de sprijin și informare pentru <b>pacienții hipofizari, familiile acestora, prietenii și îngrijitorii.</b> <br/>Suntem principala organizație caritabilă din <b>Romania</b> care oferă sprijin persoanelor afectate de tulburări ale <b>glandei pituitare, cum ar fi acromegalia, boala Cushing, prolactinomul, diabetul insipid și hipopituitarismul.</b>. </p>
                <p className="about-us__p2"> Suntem o organizație caritabilă relativ mică, cu zece membri, susținându-ne munca, ne dorim sa sprijinim mii de persoane cu afecțiuni hipofizare.</p>
                <img  className="about-us__img" src={people}/>
            </Wrapper>
        </section>

    {/* section 3*/ }
            <section className="help-you section-padding">
                <Wrapper>
                   <h1 className="tittle">Cum te putem ajuta?</h1>
                    {/* item */}
                    <div className="d-flex">
                        <div className="flex-2">
                            <h3 className="subtitle">Viata ca si pacient</h3>
                            <p>Te vom ajuta in multe feluri :</p>
                            <ul className="no-flex">
                                <li>&#9679; Sa iti intelegi problema</li>
                                <li>&#9679; Sfaturi despre nutritie</li>
                                <li>&#9679; Relatie, sex si fertilitate</li>
                                <li>&#9679; Calatoritul si tratamentul</li>
                                <li>&#9679; Scoala, Facultate si Job</li>
                                <li>&#9679; Sport si alte activitati fizice</li>
                            </ul>

                        </div>
                        <div className="flex-2">
                            <img className="help-you__img help-you__img1" src={helpImv}/>
                        </div>
                    </div>
                {/*    item 2*/}
                    <div className="d-flex">
                        <div className="flex-2">
                            <img className="help-you__img help-you__img2" src={help}/>
                            <h3></h3>

                        </div>

                    </div>
                </Wrapper>
            </section>

            faq...
    </>
    )
}

export default Homepage;