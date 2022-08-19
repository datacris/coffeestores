import Document, { Html, Main, Head, NextScript } from "next/Document";

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel='preload' href="/fonts/MavenPro-Black.ttf" as='font' crossOrigin="anonymous"></link>
          <link rel='preload' href="/fonts/MavenPro-Bold.ttf" as='font' crossOrigin="anonymous"></link>
          <link rel='preload' href="/fonts/MavenPro-ExtraBold.ttf" as='font' crossOrigin="anonymous"></link>
          <link rel='preload' href="/fonts/MavenPro-Medium.ttf" as='font' crossOrigin="anonymous"></link>
          <link rel='preload' href="/fonts/MavenPro-Regular.ttf" as='font' crossOrigin="anonymous"></link>
          <link rel='preload' href="/fonts/MavenPro-SemiBold.ttf" as='font' crossOrigin="anonymous"></link>
        </Head>
        <body>
          <Main></Main>
          <NextScript />
        </body>
      </Html>
    );
  }
}
export default MyDocument;
