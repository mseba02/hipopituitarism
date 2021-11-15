import React from "react";
import Wrapper from '../wrapper/wrapper';

const Footer = () => {
    return (
        <footer>
            <Wrapper className="d-flex">
                <div className="flex-2">
                    <p className="footer__p">2021 Hipopituitarism.ro. Toate drepturile rezervate</p>
                </div>
                <div className="flex-2 justify-content-end text-right">
                    <span className="footer_span">created by <a href="https://www.instagram.com/mariusseba/" target="_blank">Marius Seba</a></span>
                </div>
            </Wrapper>
        </footer>
    )
}
export default  Footer;