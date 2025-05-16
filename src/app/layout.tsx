import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";
import "./globals.css";

const notoSansJP = Noto_Sans_JP({
    variable: "--font-noto-sans-jp",
});

export const metadata: Metadata = {
    title: "勤怠管理",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="ja">
            <body className={`${notoSansJP.variable} `}>{children}</body>
        </html>
    );
}
