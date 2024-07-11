import { useEffect } from "react";
import "./App.css";
import { RouterProvider } from "react-router-dom";
import router from "@/router";
import { ConfigProvider } from "antd";
function App() {
  useEffect(() => {
    console.log("init");
  }, []);
  return (
    <ConfigProvider
      theme={{
        token: {
          colorTextHeading: "#fff",
          colorText: "#fff",
          fontSize: 16,
          fontSizeLG: 24,
          colorBorder: "#fff",
        },
        components: {
          Collapse: {
            contentBg: "#000",
            headerBg: "#000",
          },
          Upload: {
            actionsColor: "#fff",
            colorTextHeading: "#fff",
          },
          Slider: {
            railBg: "#fff",
            railHoverBg: "#fff",
          },
        },
      }}
    >
      <RouterProvider router={router} />
    </ConfigProvider>
  );
}
export default App;
