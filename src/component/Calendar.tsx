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
  const {
    currentDate,
    weeks,
    sortedSelectedDates,
    moveToPrevMonth,
    moveToNextMonth,
    selectDate,
  } = useCalendar();

  const currentYear = currentDate.getFullYear() + "년";
  const currentMonth = months[currentDate.getMonth()];

  const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}.${month}.${day}`;
  };

  return (
    <div className={cx("container")}>
      <div className={cx("calendar-header")}>
        <div className={cx("month-view")}>
          <button onClick={moveToPrevMonth}>{"<"}</button>
          <div className={cx("month-notice")}>{currentYear + currentMonth}</div>
          <button onClick={moveToNextMonth}>{">"}</button>
        </div>

        {sortedSelectedDates.length > 0 && (
          <div className={cx("selected-days")}>
            {formatDate(sortedSelectedDates[0])}
            {sortedSelectedDates[1] && (
              <span>{"-" + formatDate(sortedSelectedDates[1])}</span>
            )}
          </div>
        )}
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
                      "date--between":
                        sortedSelectedDates[0] &&
                        sortedSelectedDates[0].getTime() < date.getTime() &&
                        sortedSelectedDates[1] &&
                        sortedSelectedDates[1].getTime() > date.getTime(),
                      "date--selected": sortedSelectedDates.some(
                        (sortedDate) => sortedDate.getTime() === date.getTime()
                      ),
                    })}
                    onClick={() => selectDate(date)}
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
