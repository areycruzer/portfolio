import Head from 'next/head';

const CustomHead = ({ title = 'Arpit Singh' }) => {
  return (
    <Head>
      <title>{title}</title>
      <meta
        name="description"
        content="Arpit Singh is an amazing developer that like to make complex stuff as easy as possible."
      />
      <meta
        name="keywords"
        content=""
      />
      <meta property="og:title" content="Arpit Singh Portfolio" />
      <meta
        property="og:description"
        content="A normal life is Boring."
      />
      <meta property="og:url" content="" />
    </Head>
  );
};

export default CustomHead;
