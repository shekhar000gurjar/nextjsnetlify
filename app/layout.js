import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider, createTheme, CircularProgress, CssBaseline } from "@mui/material";
import theme from "./theme/theme";
import Toast from "./components/Toast";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "ReferMyJob",
  description: "ReferShip.com",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Toast />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
