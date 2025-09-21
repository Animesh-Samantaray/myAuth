import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MyAppToast = () => {
  return (
    <ToastContainer
      position="top-right"
      autoClose={4000}           // Slightly longer so user can read
      hideProgressBar={false}    // Show elegant progress bar
      newestOnTop={true}         // Latest toast on top
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="colored"             // Colored theme looks premium
      toastStyle={{
        borderRadius: "12px",
        background: "linear-gradient(135deg, #667eea, #764ba2)", // cool gradient
        color: "#fff",
        fontWeight: "600",
        boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
        padding: "16px 24px",
        fontSize: "16px",
      }}
      progressStyle={{
        background: "#fff",      // White progress bar over gradient
        height: "5px",
        borderRadius: "3px",
      }}
    />
  );
};

export default MyAppToast;
