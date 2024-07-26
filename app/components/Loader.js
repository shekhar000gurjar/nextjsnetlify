// components/Loader.js
import { ThemeProvider, createTheme,CircularProgress } from "@mui/material";
const Loader = () => {
    return (
      <div className="loader-container">
        <div className="loader"> <CircularProgress /> </div>
        <style jsx>{`
          .loader-container {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(255, 255, 255, 0.7);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 9999;
          }
          .loader {
            // Your loader styling here
          }
        `}</style>
      </div>
    );
  };
  
  export default Loader;
  