import Holidays from "date-holidays";
import { useMemo } from "react";

export default function Home() {
    const month: number = new Date().getMonth() + 1;
    const country: string = "JP";
    const hoursPerDay: number = 8;
    const salaryPerHour: number = 4400;

    const hd = useMemo(() => new Holidays(country, "default", "ja"), [country]);
    const totalBusinessDays = useMemo(() => {
        const year = new Date().getFullYear();
        const month = new Date().getMonth() + 1;
        const holidays = hd.getHolidays(year);
        const holidaysInMonth = holidays.filter((holiday) => new Date(holiday.date).getMonth() + 1 === month);
        let totalBusinessDays = 0;
        for (let i = 1; i <= 31; i++) {
            const date = new Date(year, month - 1, i);
            if (date.getMonth() + 1 !== month) {
                break;
            }
            if (date.getDay() === 0 || date.getDay() === 6) {
                continue;
            }
            if (holidaysInMonth.some((holiday) => holiday.date === date.toISOString().split("T")[0])) {
                continue;
            }
            totalBusinessDays++;
        }
        return totalBusinessDays;
    }, [hd]);
    const totalCapacityHours = useMemo(() => {
        return totalBusinessDays * hoursPerDay;
    }, [totalBusinessDays, hoursPerDay]);
    const capacityEstimateSalary = useMemo(() => {
        return totalCapacityHours * salaryPerHour;
    }, [totalCapacityHours, salaryPerHour]);

    const totalActualHours = useMemo(() => {
        // TODO: 実績時間を取得する
        return 12;
    }, []);
    const actualEstimateSalary = useMemo(() => {
        return totalActualHours * salaryPerHour;
    }, [totalActualHours, salaryPerHour]);
    return (
        <main className="max-w-5xl mx-auto w-full p-6">
            <div className="grid grid-cols-12 gap-4 not-even:items-center justify-center">
                <div className="rounded-xl p-4 border border-neutral-200 col-span-full md:col-span-6 lg:col-span-4">
                    <h4 className="font-semibold mb-2">{month}月のキャパ</h4>
                    <p className="text-3xl font-bold mb-1">
                        {totalCapacityHours} <span className="text-lg">時間</span>
                    </p>
                    <p className="text-sm text-neutral-500">
                        推定報酬:{" "}
                        {capacityEstimateSalary.toLocaleString("ja-JP", {
                            style: "currency",
                            currency: "JPY",
                            minimumFractionDigits: 0,
                        })}
                        円
                    </p>
                </div>
                <div className="rounded-xl p-4 border border-neutral-200 col-span-full md:col-span-6 lg:col-span-4">
                    <h4 className="font-semibold mb-2">{month}月の実績</h4>
                    <p className="text-3xl font-bold mb-1">
                        {totalActualHours} <span className="text-lg">時間</span>
                    </p>
                    <p className="text-sm text-neutral-500">
                        報酬目安:{" "}
                        {actualEstimateSalary.toLocaleString("ja-JP", {
                            style: "currency",
                            currency: "JPY",
                            minimumFractionDigits: 0,
                        })}
                        円
                    </p>
                </div>
                <div className="rounded-xl p-4 border border-neutral-200 col-span-full md:col-span-6 lg:col-span-4">
                    <h4 className="font-semibold mb-2">{month}月の平均実績</h4>
                    <p className="text-3xl font-bold mb-1">
                        8 <span className="text-lg">時間</span>
                    </p>
                    <p className="text-sm text-neutral-500">営業日における稼働時間の平均値</p>
                </div>
            </div>
            <hr className="mt-6 border-neutral-200" />
            <h1 className="text-xl font-bold mt-4">稼働実績</h1>
        </main>
    );
}
