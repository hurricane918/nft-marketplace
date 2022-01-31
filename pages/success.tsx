import React, { useEffect } from 'react';
import Head from 'next/head';
import BetaBanner from 'components/base/BetaBanner';
import FloatingHeader from 'components/base/FloatingHeader';
import Footer from 'components/base/Footer';
import MainHeader from 'components/base/MainHeader';
import { useRouter } from 'next/router';
import Success from 'components/pages/Success';
import { useMarketplaceData } from 'redux/hooks';

const SuccessPage = () => {
  const { name } = useMarketplaceData();
  const router = useRouter();
  const { title, text, buttonText, returnUrl, isRedirect, subText } = router.query;

  useEffect(() => {
    if (!(title && buttonText && returnUrl && isRedirect !== undefined)) {
      router.push('/');
    }
  }, []);

  useEffect(() => {
    if (isRedirect === 'true') {
      setTimeout(() => {
        router.push(String(returnUrl));
      }, 5000);
    }
  }, []);

  return (
    <>
      <Head>
        <title>{name}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="description" content="Success page of SecretNFT, by Ternoa." />
        <meta name="og:image" content="ternoa-social-banner.jpg" />
      </Head>
      <BetaBanner />
      <MainHeader />
      <Success
        title={String(title)}
        text={text ? String(text) : undefined}
        buttonText={String(buttonText)}
        returnUrl={String(returnUrl)}
        subText={subText ? String(subText) : undefined}
      />
      <Footer />
      <FloatingHeader />
    </>
  );
};

export default SuccessPage;
