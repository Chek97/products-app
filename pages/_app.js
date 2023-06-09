import '../styles/globals.css'
import Script from 'next/script';

function MyApp({ Component, pageProps }) {
  return (
    <>
    {/* <!-- Google tag (gtag.js) --> */}
<Script strategy="afterInteractive" src={`https://www.googletagmanager.com/gtag/js?id=${process.envNEXT_PUBLIC_GOOGLE_ANALYTICS}`} />
  <Script 
   id='google-analytics'
   strategy="afterInteractive"
   dangerouslySetInnerHTML={{
    __html:`
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${process.envNEXT_PUBLIC_GOOGLE_ANALYTICS}', {
        page_path: window.location.pathname,
      });
    `,
   }}
  />
    <Component {...pageProps} />
    </>
    )
}

export default MyApp
