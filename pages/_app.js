import '../styles/globals.css'
import Layout from '../components/Layout'
import AuthContextProvider from '../context/AuthContext'

function MyApp({ Component, pageProps }) {

  if(Component.getLayout) {
    return (
      <AuthContextProvider>
        {Component.getLayout(<Component {...pageProps} />)}
      </AuthContextProvider>
    )  
  }
  
  return (
    <AuthContextProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AuthContextProvider>
 )
}

export default MyApp
