import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "星尘 / StarDust",
  description: "星尘的个人空间：项目、Skills、文章与关于我。",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}

