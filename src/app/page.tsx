'use client';

import Image from 'next/image'
import { Inter } from 'next/font/google'

function toInt(value: string): number {
  return parseInt(value, 10);
}

const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  function isFutureYear(year: number): boolean {
    const now = new Date();

    return year > now.getFullYear();
  }

  function dateHasOverflow(day: number, month: number): boolean {
    switch (month) {
      case 2:
        return day > 28;
      case 4:
      case 6:
      case 8:
      case 9:
      case 11:
        return day > 30;
      case 1:
      case 3:
      case 5:
      case 7:
      case 8:
      case 10:
      case 12:
        return day > 31;
      default:
        throw new Error('Unexpected switch case'); // should not happen, when all options considered
    }
  }

  function isInvalidDate(day: number, month: number, year: number): boolean {
    const monthIndex = month - 1;
    const userDate = new Date(year, monthIndex, day);
    const userTimestamp = userDate.toString();

    return Number.isNaN(userTimestamp) || dateHasOverflow(day, month);
  }

  function calculateAgeInMillisseconds(day: number, month: number, year: number): number {
    const nowEpochMillis = new Date().getTime();
    const monthIndex = month - 1;
    const birthDateEpochMillis = new Date(year, monthIndex, day).getTime();

    return nowEpochMillis - birthDateEpochMillis;
  }

  function yearInMilliseconds(): number {
    return monthInMilliseconds() * 12; // Who cares about leap years, right? ^^
  }

  function monthInMilliseconds(): number {
    return dayInMilliseconds() * 30; // developer approximation... ;-)
  }

  function dayInMilliseconds(): number {
    return 1000 * 60 * 60 * 24;
  }

  function calculateAndPrintAge(day: number, month: number, year: number): void {
    const ageMillis = calculateAgeInMillisseconds(day, month, year);
    const passedYears = Math.floor(ageMillis / yearInMilliseconds());

    const yearsRemainderMillis = ageMillis % yearInMilliseconds();
    const passedMonths = Math.floor(yearsRemainderMillis / monthInMilliseconds());
    const monthsRemainderMillis = ageMillis % monthInMilliseconds();
    const passedDays = Math.floor(monthsRemainderMillis / dayInMilliseconds());

    document.getElementById('calculatedYears').textContent = passedYears;
    document.getElementById('calculatedMonths').textContent = passedMonths;
    document.getElementById('calculatedDays').textContent = passedDays;
  }

  function handleFormInput(event: any): boolean {
    const day: number = toInt(event.target.day.value);
    const month: number = toInt(event.target.month.value);
    const year: number = toInt(event.target.year.value);

    event.preventDefault();

    if (isFutureYear(year)) {
      window.alert(`Invalid date! Year ${year} is in the future!`);
      return false;
    } else if (isInvalidDate(day, month, year)) {
      window.alert(`${day}.${month}.${year} is an invalid date, peasant!`);
      return false;
    }

    calculateAndPrintAge(day, month, year);
    return true;
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">

      <h1>Age Calculator</h1>

      <form onSubmit={handleFormInput} method="post">
        <div className="mb-8">
          <label htmlFor="day">Day: </label>
          <input
            type="number"
            name="day"
            required
            min="1"
            max="31"
            autoFocus
          />
        </div>

        <div className="mb-8">
          <label htmlFor="month">Month: </label>
          <input
            type="number"
            name="month"
            required
            min="1"
            max="12"
          />
        </div>

        <div className="mb-8">
          <label htmlFor="year">Year: </label>
          <input
            type="number"
            name="year"
            required
            min="1900"
          />
        </div>

        <button type="submit">Submit</button>
      </form>

      <Image
        src="/images/icon-arrow.svg"
        alt="Result below..."
        className="dark:invert"
        width={50}
        height={50}
        priority
      />

      <div>
        <div><span id="calculatedYears">0</span> years</div>
        <div><span id="calculatedMonths">0</span> months</div>
        <div><span id="calculatedDays">0</span> days</div>
      </div>

    </main>
  )
}

