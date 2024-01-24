import { RouterProvider } from "react-router-dom";
import { router } from "./routes/router";
import AuthProvider from "./contexts/AuthContext";
import { register } from "swiper/element";

register();
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

import { Toaster } from "react-hot-toast";


function App() {

  return (
    <>
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </>
  )
}

export default App;
