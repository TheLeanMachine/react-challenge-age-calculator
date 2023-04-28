'use client';

import Image from 'next/image'
import { Inter } from 'next/font/google'
import moment from 'moment';

// Dunno what this does, but I am keeping it... - Kai
const inter = Inter({ subsets: ['latin'] })

function toInt(value: string): number {
  return parseInt(value, 10);
}

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

  function calculateAndPrintAge(day: number, month: number, year: number): void {
    const now = moment();
    const userDateOfBirth = moment([year, month, day]);
    const age = moment.duration(now.diff(userDateOfBirth));
    const passedYears = Math.floor(age.as('years'));
    const ageWithoutYears = age.subtract(moment.duration(passedYears, 'years'));
    const passedMonths = Math.floor(ageWithoutYears.as('months'));
    const ageWithoutYearsAndMonths = ageWithoutYears.subtract(moment.duration(passedMonths, 'months'));
    const passedDays = Math.floor(ageWithoutYearsAndMonths.as('days'));

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

