export default function LogsLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="flex flex-col gap-4 bg-amber-50">
            <h1 className="text-2xl font-bold">勤怠管理layout</h1>
            {children}
        </div>
    );
}
