import { createBrowserRouter } from "react-router-dom";
import Home from "@/Pages/Home";
import ImageToModel from "@/Pages/ImageToModel";
import TextToModel from "@/Pages/TextToModel";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/imageToModel",
    element: <ImageToModel />,
  },
  {
    path: "/textToModel",
    element: <TextToModel />,
  },
]);
export default router;
