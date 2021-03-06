/* eslint-disable react/jsx-filename-extension */
import "antd/dist/antd.css";
import "../scss/global.scss";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { AuthProvider } from "../context/AuthContext";
import { PlatformProvider } from "../context/PlatformsContext";

export default function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <PlatformProvider>
        <Component {...pageProps} />
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar
          newestOnTop
          closeOnClick
          draggable
          pauseOnHover
          rtl={false}
          pauseOnFocusLoss={false}
        />
      </PlatformProvider>
    </AuthProvider>
  );
}
