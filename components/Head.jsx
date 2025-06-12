import Head from 'next/head';

const CustomHead = ({ title = 'Swyam Sharma' }) => {
  return (
    <Head>
      <title>{title}</title>
      <meta
        name="description"
        content="Swyam Sharma is an amazing developer that like to make complex stuff as easy as possible."
      />
      <meta
        name="keywords"
        content=""
      />
      <meta property="og:title" content="Swyam Sharma Portfolio" />
      <meta
        property="og:description"
        content="A normal life is Boring."
      />
      <meta property="og:url" content="" />
    </Head>
  );
};

export default CustomHead;
