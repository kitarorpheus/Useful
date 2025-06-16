import { useEffect, useState } from "react";

function Calender() {
    const today = new Date();
    const [year, setYear] = useState(today.getFullYear());
    const [month, setMonth] = useState(today.getMonth() + 1);
    let startDay = new Date(year, month - 1, 1).getDay();
    let endDate = new Date(year, month, 0).getDate();
    // 曜日をセット
    let dates = [...Array(startDay)].map(() => '');
    // 日付の配列を作成する
    dates = [...dates, ...[...Array(endDate)].map((_, i) => i + 1)];
    const weeks = [];
    for (let i = 0; i < dates.length; i += 7) {
        weeks.push(dates.slice(i, i + 7));
    }
    const [reservations, setReservations] = useState([{ startDate: "2025-06-19", endDate: "2025-06-23" }]);

    const handlePre = () => {
        let monthLag = 0;
        if (month === 1) { setYear(year - 1); monthLag += 12; }
        setMonth((month + monthLag - 1));
    }
    const handleNxt = () => {
        let monthLag = 0;
        if (month === 12) { setYear(year + 1); monthLag -= 12; }
        setMonth(month + monthLag + 1);
    }

    const reservedStatus = (day) => {
        if (day === '') return '';
        const targetDate = new Date(year, month - 1, day);
        if (targetDate < today) return '-';

        const reserved = reservations.some(res => {
            return targetDate >= new Date(res.startDate) && targetDate <= new Date(res.endDate);
        })

        return reserved ? '×' : '〇';
    }

    return(
        <>
            <div style={{display:"flex", alignItems:"center", justifyContent:"center", gap:"10px", margin:"20px 0"}}>
                <button onClick={handlePre} style={{ width: 40, height: 40, fontSize:"20px", padding:"0"}}> ＜ </button>
                <h2>{year}年{month}月</h2>
                <button onClick={handleNxt} style={{ width: 40, height: 40, fontSize: "20px", padding: "0"}}> ＞ </button>
            </div>
            <table width={200}>
                <thead>
                    <tr>
                        <th>日</th>
                        <th>月</th>
                        <th>火</th>
                        <th>水</th>
                        <th>木</th>
                        <th>金</th>
                        <th>土</th>
                    </tr>
                </thead>
                <tbody>
                    {weeks.map((week, weekIndex) => (
                        <tr key={weekIndex}>
                            {week.map((day, dayIndex) => (
                                <td key={dayIndex}>{day}<p>{reservedStatus(day)}</p></td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}
export default Calender;