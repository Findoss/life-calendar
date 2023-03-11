const $birthday = document.querySelector("#birthday");
const $app = document.querySelector("#app");

$birthday.addEventListener("change", (e) => {
  $app.innerHTML = "";
  update(e.target.value);
});

function daysInMonth(month, year) {
  return new Date(year, month, 0).getDate();
}

function createElement(className, text = "") {
  const el = document.createElement("div");
  el.classList.add(className);
  el.innerText = text;
  return el;
}

function update(date) {
  if (date === "") {
    return;
  }

  const birthday = new Date(date);
  const startYear = new Date(birthday.getFullYear(), 0, 1);
  const now = new Date();

  const startDay = (birthday - startYear) / 86400000;
  const livedDays = ~~((now - birthday) / 86400000) + startDay;

  let currentDay = 0;

  for (let year = 0; year < 81; year++) {
    const $year = createElement("year");
    const $yearTitle = createElement(
      "year-title",
      `${birthday.getFullYear() + year}\n${year}`
    );

    $year.appendChild($yearTitle);

    for (let month = 0; month < 12; month++) {
      const countDaysOfMonth = daysInMonth(
        month + 1,
        birthday.getFullYear() + year
      );
      const years = [1, 18, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 999];

      const $month = createElement("month");

      for (let l = 0; l < countDaysOfMonth; l++) {
        const $day = createElement("day");

        currentDay++;

        if (currentDay > startDay && currentDay <= livedDays) {
          $day.classList.add("day--lived");
        } else {
          const index = years.findIndex(
            (v, i, arr) =>
              currentDay >= v * 365 && currentDay <= arr[i + 1] * 365
          );
          if (index !== -1) {
            $day.classList.add(`day--${index}`);
          }
        }

        $month.appendChild($day);
      }
      $year.appendChild($month);
    }
    $app.appendChild($year);
  }
}
