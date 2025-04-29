import "@/styles/globals.css";
import type {AppProps} from "next/app";
import {ThemeProvider} from "@/components/provider/theme-provider";
import {store} from "@/store";
import {Provider} from "react-redux";
import AuthProvider from "@/components/provider/auth-provider";

export default function App({Component, pageProps}: AppProps) {
  return (
      <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
        <Provider store={store}>
          <AuthProvider >
            <Component {...pageProps} />
          </AuthProvider>
        </Provider>
      </ThemeProvider>);
}