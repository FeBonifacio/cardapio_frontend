import '../../styles/globals.scss'
import { AppProps } from 'next/app';

import { AuthProvider } from '../contexts/AuthContext';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    //amarrando tudo com segurança
    <AuthProvider> 
      <Component {...pageProps} />
    </AuthProvider>
  )
}

export default MyApp
