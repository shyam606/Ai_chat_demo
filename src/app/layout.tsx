import "./globals.css";
import { Providers } from "./providers";
import "antd/dist/reset.css";

export const metadata = {
  title: "AI Chat Demo",
  description: "Mini ChatGPT clone for CV demo",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
