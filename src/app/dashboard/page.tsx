import { AppSidebar } from "@/components/app-sidebar";
import { BarChartBlock } from "@/components/bar-chart-block";
import { DataTable } from "@/components/data-table";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Badge } from "@/components/ui/badge";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle, CardAction } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

import data from "./data.json";

export default function Page() {
    return (
        <SidebarProvider
            style={
                {
                    "--sidebar-width": "calc(var(--spacing) * 72)",
                    "--header-height": "calc(var(--spacing) * 12)",
                } as React.CSSProperties
            }
        >
            <AppSidebar variant="inset" />
            <SidebarInset>
                <SiteHeader />
                <div className="flex flex-1 flex-col">
                    <div className="@container/main flex flex-1 flex-col gap-2">
                        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                            <div className="grid grid-cols-12 gap-4 items-start justify-center p-6">
                                <div className="col-span-full md:col-span-12 lg:col-span-6 flex flex-col gap-y-4 h-full">
                                    <Card className="flex-grow">
                                        <CardHeader>
                                            <CardDescription>今月の稼働時間</CardDescription>
                                            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">126時間</CardTitle>
                                            <CardAction>
                                                <Badge variant="outline">+12.5%</Badge>
                                            </CardAction>
                                        </CardHeader>
                                        <CardFooter className="flex-col items-start gap-1.5 text-sm h-full">
                                            <div className="text-muted-foreground">想定: 140時間</div>
                                            <Progress
                                                value={60}
                                                className="mt-auto"
                                            />
                                        </CardFooter>
                                    </Card>
                                    <Card className="flex-grow">
                                        <CardHeader>
                                            <CardDescription>推定報酬</CardDescription>
                                            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">¥ 1,234,567</CardTitle>
                                            <CardAction>
                                                <Badge variant="outline">-20%</Badge>
                                            </CardAction>
                                        </CardHeader>
                                        <CardFooter className="flex-col items-start gap-1.5 text-sm h-full">
                                            <div className="text-muted-foreground">想定: ¥ 1,400,000</div>
                                            <Progress
                                                value={60}
                                                className="mt-auto"
                                            />
                                        </CardFooter>
                                    </Card>
                                </div>
                                <div className="col-span-12 md:col-span-12 lg:col-span-6">
                                    <BarChartBlock />
                                </div>
                            </div>
                            <DataTable data={data} />
                        </div>
                    </div>
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}
