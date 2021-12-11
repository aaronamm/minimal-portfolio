import React from "react";
import { Link } from "gatsby";
import UserLinks from "../UserLinks/UserLinks";
// import config from '../../../data/SiteConfigs';
import styled from 'styled-components';
import "../../themes/font-awesome-all-5.2.0.css";

function Footer({ config }) {
  const { copyright } = config;
  if (!copyright) {
    return null;
  }
  return (

    <FooterContainer>
      <center>
        <div className="footer-copyright">{copyright}</div>
      </center>

    </FooterContainer>

  );
}

export default Footer;

const FooterContainer = styled.div`
    margin-top: 8rem;
    margin-bottom: 4rem;
    font-size: 0.9rem;
`;