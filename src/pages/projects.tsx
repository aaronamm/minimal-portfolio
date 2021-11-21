import React from "react";
import { PageProps } from "gatsby";
import { Helmet } from "react-helmet";
import Layout from "../layout/PageLayout";
import About from "../components/About/About";
import config from "../../data/SiteConfig";

function AboutPage(props: PageProps) {
  return (
    <Layout>
      <div className="about-container">
        <Helmet title={`About | ${config.siteTitle}`} />
        <h1>Projects</h1>
        <p>{props.path}</p>
      </div>
    </Layout>
  );
}

export default AboutPage;
