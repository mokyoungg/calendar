import { useState } from "react";

const useCalendar = () => {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());

  const monthStartData = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  );

  const monthEndDate = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  );

  const calendarStartDate = new Date(monthStartData);

  // date.setDate(0);
  // 일의 최솟값은 1이므로 0을 입력하면 전 달의 마지막 날을 설정한 것과 같은 효과를 봅니다.
  // 달력의 첫번째 일요일을 구합니다.(달력이 표시하는 첫번째 날)
  // date.setDate(example.getDate() - example.getDay());
  calendarStartDate.setDate(
    calendarStartDate.getDate() - calendarStartDate.getDay()
  );

  // 달력의 마지막 토요일을 구합니다.(달력이 표시하는 마지막 날)
  // 숫자 6은 토요일의 값입니다.(0은 일요일, 1은 월요일 ...)
  const calendarEndDate = new Date(monthEndDate);
  calendarEndDate.setDate(
    calendarEndDate.getDate() + (6 - calendarEndDate.getDay())
  );

  // 달력에 기입 될 모든 날짜를 구합니다.
  const getCalendarDates = (startDate: Date, endDate: Date) => {
    const dates = [];
    let currentDate = new Date(startDate);

    while (currentDate <= endDate) {
      dates.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return dates;
  };

  const calendarAllDates = getCalendarDates(calendarStartDate, calendarEndDate);

  // 달력에 기입 될 모든 날짜를 week 로 나눕니다.
  const getWeeksArray = (array: Date[]) => {
    const results = [];

    for (let i = 0; i < array.length; i += 7) {
      results.push(array.slice(i, i + 7));
    }
    return results;
  };

  const weeks = getWeeksArray(calendarAllDates);

  const moveToPrevMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1)
    );
  };

  const moveToNextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1)
    );
  };

  return {
    currentDate,
    weeks,
    moveToPrevMonth,
    moveToNextMonth,
  };
};

export default useCalendar;
