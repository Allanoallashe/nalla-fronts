import '@/styles/globals.css';
import "@fortawesome/fontawesome-svg-core/styles.css";
import '../styles/carousel.css'
import { config } from "@fortawesome/fontawesome-svg-core"; 
import { CartContextProvider } from '@/components/CartContext';
config.autoAddCss = false;

export default function App({ Component, pageProps }) {
  return (
    <>
      <CartContextProvider>
        <Component {...pageProps} />
      </CartContextProvider>
    </>
    )
}
