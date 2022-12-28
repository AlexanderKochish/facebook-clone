import '../styles/globals.css'
import Layout from '../components/Layout'
import AuthContextProvider from '../context/AuthContext'
import MessagesContextProvider from '../context/MessagesContext'
import ThemeContextProvider from '../context/ThemeContext'

function MyApp({ Component, pageProps }) {

  if(Component.getLayout) {
    return (
      <AuthContextProvider>
        <MessagesContextProvider>
        {Component.getLayout(<Component {...pageProps} />)}
        </MessagesContextProvider>
      </AuthContextProvider>
    )  
  }
  
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
 )
}

export default MyApp
