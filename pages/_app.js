import "../styles/globals.css";
import Layout from "../components/Layout";
import AuthContextProvider from "../context/AuthContext";
import MessagesContextProvider from "../context/MessagesContext";
import ThemeContextProvider from "../context/ThemeContext";

function MyApp({ Component, pageProps }) {
  return (
    <AuthContextProvider>
      <MessagesContextProvider>
        <ThemeContextProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ThemeContextProvider>
      </MessagesContextProvider>
    </AuthContextProvider>
  );
}

export default MyApp;
