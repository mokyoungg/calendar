import styles from "./Calendar.module.scss";
import classNames from "classnames/bind";
import useCalendar from "./useCalendar";

const cx = classNames.bind(styles);

const days = ["일", "월", "화", "수", "목", "금", "토"];
const months = [
  "1월",
  "2월",
  "3월",
  "4월",
  "5월",
  "6월",
  "7월",
  "8월",
  "9월",
  "10월",
  "11월",
  "12월",
];

const Calendar = () => {
  const { currentDate, weeks, moveToPrevMonth, moveToNextMonth } =
    useCalendar();

  const currentYear = currentDate.getFullYear() + "년";
  const currentMonth = months[currentDate.getMonth()];

  return (
    <div className={cx("container")}>
      <div className={cx("calendar-header")}>
        <div className={cx("month-view")}>
          <button onClick={moveToPrevMonth}>{"<"}</button>
          <div className={cx("month-notice")}>{currentYear + currentMonth}</div>
          <button onClick={moveToNextMonth}>{">"}</button>
        </div>
      </div>

      <div className={cx("calendar")}>
        <div className={cx("days")}>
          {days.map((day) => (
            <div
              key={day}
              className={cx("day", {
                "day--sunday": day === "일",
                "day--saturday": day === "토",
              })}
            >
              {day}
            </div>
          ))}
        </div>
        <div>
          <div>
            {weeks.map((week, index) => (
              <div key={index} className={cx("days")}>
                {week.map((date, idx) => (
                  <div
                    key={date.toString()}
                    className={cx("date", {
                      "date--other-month":
                        date.getMonth() !== currentDate.getMonth(),
                      "date--sunday": idx === 0,
                      "date--saturday": idx === 6,
                    })}
                  >
                    {date.getDate()}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calendar;
