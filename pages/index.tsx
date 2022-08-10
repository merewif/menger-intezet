import type { NextPage } from "next";
import { NextSeo } from "next-seo";
import Head from "next/head";
import LandingPage from "../components/landing-page/LandingPage";
import Layout from "../components/Layout";
import PWAHead from "../components/PWAHead";

const Home: NextPage = () => {
  return (
    <div lang="hu">
      <PWAHead />
      <NextSeo title={'Menger Intézet'} />
      <Head>        
      </Head>
      <Layout>
        <LandingPage />
      </Layout>
    </div>
  );
};

export default Home;
