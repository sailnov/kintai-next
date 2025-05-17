"use client";

import * as React from "react";
import { CartesianGrid, XAxis, Bar, BarChart } from "recharts";

import { useIsMobile } from "@/hooks/use-mobile";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

export const description = "An interactive area chart";

const chartData = [
    { date: "2024-05-31", workHours: 178, restHours: 230 },
    { date: "2024-06-01", workHours: 178, restHours: 200 },
    { date: "2024-06-02", workHours: 470, restHours: 410 },
    { date: "2024-06-03", workHours: 103, restHours: 160 },
    { date: "2024-06-04", workHours: 439, restHours: 380 },
    { date: "2024-06-05", workHours: 88, restHours: 140 },
    { date: "2024-06-06", workHours: 294, restHours: 250 },
    { date: "2024-06-07", workHours: 323, restHours: 370 },
    { date: "2024-06-08", workHours: 385, restHours: 320 },
    { date: "2024-06-09", workHours: 438, restHours: 480 },
    { date: "2024-06-10", workHours: 155, restHours: 200 },
    { date: "2024-06-11", workHours: 92, restHours: 150 },
    { date: "2024-06-12", workHours: 492, restHours: 420 },
    { date: "2024-06-13", workHours: 81, restHours: 130 },
    { date: "2024-06-14", workHours: 426, restHours: 380 },
    { date: "2024-06-15", workHours: 307, restHours: 350 },
    { date: "2024-06-16", workHours: 371, restHours: 310 },
    { date: "2024-06-17", workHours: 475, restHours: 520 },
    { date: "2024-06-18", workHours: 107, restHours: 170 },
    { date: "2024-06-19", workHours: 341, restHours: 290 },
    { date: "2024-06-20", workHours: 408, restHours: 450 },
    { date: "2024-06-21", workHours: 169, restHours: 210 },
    { date: "2024-06-22", workHours: 317, restHours: 270 },
    { date: "2024-06-23", workHours: 480, restHours: 530 },
    { date: "2024-06-24", workHours: 132, restHours: 180 },
    { date: "2024-06-25", workHours: 141, restHours: 190 },
    { date: "2024-06-26", workHours: 434, restHours: 380 },
    { date: "2024-06-27", workHours: 448, restHours: 490 },
    { date: "2024-06-28", workHours: 149, restHours: 200 },
    { date: "2024-06-29", workHours: 103, restHours: 160 },
    { date: "2024-06-30", workHours: 446, restHours: 400 },
];

const chartConfig = {
    totalHours: {
        label: "総稼働時間",
    },
    workHours: {
        label: "実働時間",
        color: "var(--primary)",
    },
    restHours: {
        label: "休憩時間",
        color: "var(--primary)",
    },
} satisfies ChartConfig;

export function BarChartBlock() {
    const isMobile = useIsMobile();
    const [timeRange, setTimeRange] = React.useState("90d");

    React.useEffect(() => {
        if (isMobile) {
            setTimeRange("7d");
        }
    }, [isMobile]);

    const filteredData = chartData.filter((item) => {
        const date = new Date(item.date);
        const referenceDate = new Date("2024-06-30");
        let daysToSubtract = 90;
        if (timeRange === "30d") {
            daysToSubtract = 30;
        } else if (timeRange === "7d") {
            daysToSubtract = 7;
        }
        const startDate = new Date(referenceDate);
        startDate.setDate(startDate.getDate() - daysToSubtract);
        return date >= startDate;
    });

    return (
        <Card className="@container/card">
            <CardHeader>
                <CardTitle>稼働時間</CardTitle>
                <CardDescription>過去30日間の稼働時間と休憩時間の推移</CardDescription>
            </CardHeader>
            <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
                <ChartContainer
                    config={chartConfig}
                    className="aspect-auto h-[250px] w-full"
                >
                    <BarChart data={filteredData}>
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="date"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            minTickGap={32}
                            tickFormatter={(value) => {
                                const date = new Date(value);
                                return date.toLocaleDateString("ja-JP", {
                                    month: "short",
                                    day: "numeric",
                                });
                            }}
                        />
                        <ChartTooltip
                            cursor={false}
                            defaultIndex={isMobile ? -1 : 10}
                            content={
                                <ChartTooltipContent
                                    labelFormatter={(value) => {
                                        return new Date(value).toLocaleDateString("ja-JP", {
                                            month: "short",
                                            day: "numeric",
                                        });
                                    }}
                                    indicator="dot"
                                />
                            }
                        />
                        <Bar
                            dataKey="restHours"
                            type="natural"
                            fill="var(--color-rest-hours)"
                            stroke="var(--color-rest-hours)"
                            stackId="a"
                        />
                        <Bar
                            dataKey="workHours"
                            type="natural"
                            fill="var(--color-work-hours)"
                            stroke="var(--color-work-hours)"
                            stackId="a"
                        />
                    </BarChart>
                </ChartContainer>
            </CardContent>
        </Card>
    );
}
