import { Poppins, Josefin_Sans } from "next/font/google";
import "./globals.css";
import ThemeProvider from "@/utils/ThemeProvider";
export const generateMetadata = () => {
  return {
    title: "Courses | LMS",
    description: "Browse all available courses on our LMS platform",
    keywords: ["lms", "courses", "online learning", "education"],
  };
};
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
});
const JosefinSans = Josefin_Sans({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
  variable: "--font-josefin-sans",
});
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${poppins.variable} ${JosefinSans.variable} !bg-white bg-no-repeat dark:from-gray-900 dark:to-black duration-300`}
        suppressHydrationWarning
      >
        <ThemeProvider>
          <div className="min-h-screen bg-gray-50 dark:bg-gray-900 ">
            <div className="container mx-auto">{children}</div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
