import { DateAdapter } from '@angular/material/core';
import jalaliMoment from 'jalali-moment';

/**
 * Custom DateAdapter for Jalali (Persian) calendar using jalali-moment.
 * Provides date manipulation and formatting methods for Angular Material Datepicker.
 */
export class MaterialPersianDateAdapter extends DateAdapter<jalaliMoment.Moment> {

  //#region Constructor
  /**
   * Initializes the adapter and sets the locale to Persian ('fa').
   */
  constructor() {
    super();
    super.setLocale('fa');
  }

  //#endregion

  //#region Public Methods

  /**
   * Returns the Jalali year of the given date.
   */
  getYear(date: jalaliMoment.Moment): number {
    return this.clone(date).jYear();
  }

  /**
   * Returns the Jalali month (0-based) of the given date.
   */
  getMonth(date: jalaliMoment.Moment): number {
    return this.clone(date).jMonth();
  }

  /**
   * Returns the Jalali day of the month for the given date.
   */
  getDate(date: jalaliMoment.Moment): number {
    return this.clone(date).jDate();
  }

  /**
   * Returns the day of the week for the given date.
   */
  getDayOfWeek(date: jalaliMoment.Moment): number {
    return this.clone(date).day();
  }

  getDateClass(date: jalaliMoment.Moment): string {
    return this.getDayOfWeek(date) === 6 ? 'saturday-cell' : '';
  }

  /**
   * Returns the names of Jalali months in the specified style.
   */
  getMonthNames(style: 'long' | 'short' | 'narrow'): string[] {
    switch (style) {
      case 'long':
      case 'short':
        return jalaliMoment.localeData('fa').jMonths().slice(0);
      case 'narrow':
        return jalaliMoment.localeData('fa').jMonthsShort().slice(0);
    }
  }

  /**
   * Returns an array of day numbers (1-31) as strings for the Jalali calendar.
   */
  getDateNames(): string[] {
    const valuesArray = Array(31);
    for (let i = 0; i < 31; i++) {
      valuesArray[i] = String(i + 1);
    }
    return valuesArray;
  }

  /**
   * Returns the names of weekdays in the specified style.
   */
  getDayOfWeekNames(style: 'long' | 'short' | 'narrow'): string[] {
    switch (style) {
      case 'long':
        return jalaliMoment.localeData('fa').weekdays().slice(0);
      case 'short':
        return jalaliMoment.localeData('fa').weekdaysShort().slice(0);
      case 'narrow':
        return ['ی', 'د', 'س', 'چ', 'پ', 'ج', 'ش'];
    }
  }

  /**
   * Returns the Jalali year as a string for the given date.
   */
  getYearName(date: jalaliMoment.Moment): string {
    return this.clone(date).jYear().toString();
  }

  /**
   * Returns the first day of the week according to the Persian locale.
   */
  getFirstDayOfWeek(): number {
    return jalaliMoment.localeData('fa').firstDayOfWeek();
  }

  /**
   * Returns the number of days in the Jalali month of the given date.
   */
  getNumDaysInMonth(date: jalaliMoment.Moment): number {
    return this.clone(date).jDaysInMonth();
  }

  /**
   * Returns a clone of the given date with the Persian locale set.
   */
  clone(date: jalaliMoment.Moment): jalaliMoment.Moment {
    return date.clone().locale('fa');
  }

  /**
   * Creates a Jalali date with the specified year, month, and day.
   * Throws an error if the month or date is invalid.
   */
  createDate(year: number, month: number, date: number): jalaliMoment.Moment {
    if (month < 0 || month > 11) {
      throw Error(
        `Invalid month index "${month}". Month index has to be between 0 and 11.`
      );
    }
    if (date < 1) {
      throw Error(`Invalid date "${date}". Date has to be greater than 0.`);
    }
    const result = jalaliMoment()
      .jYear(year)
      .jMonth(month)
      .jDate(date)
      .hours(0)
      .minutes(0)
      .seconds(0)
      .milliseconds(0)
      .locale('fa');

    if (this.getMonth(result) !== month) {
      throw Error(`Invalid date ${date} for month with index ${month}.`);
    }
    if (!result.isValid()) {
      throw Error(`Invalid date "${date}" for month with index "${month}".`);
    }
    return result;
  }

  /**
   * Returns today's date in the Jalali calendar with Persian locale.
   */
  today(): jalaliMoment.Moment {
    return jalaliMoment().locale('fa');
  }

  /**
   * Parses a value into a Jalali moment using the given format and Persian locale.
   */
  parse(
    value: string,
    parseFormat: string | string[]
  ): jalaliMoment.Moment | null {
    if (value ) {
      return jalaliMoment(value, parseFormat, 'fa');
    }
    return value ? jalaliMoment(value).locale('fa') : null;
  }

  /**
   * Formats a Jalali date using the specified display format.
   * Throws an error if the date is invalid.
   */
  format(date: jalaliMoment.Moment, displayFormat: string): string {
    date = this.clone(date);
    if (!this.isValid(date)) {
      throw Error('JalaliMomentDateAdapter: Cannot format invalid date.');
    }
    return date.format(displayFormat);
  }

  /**
   * Adds the specified number of Jalali years to the given date.
   */
  addCalendarYears(
    date: jalaliMoment.Moment,
    years: number
  ): jalaliMoment.Moment {
    return this.clone(date).add(years, 'jYear');
  }

  /**
   * Adds the specified number of Jalali months to the given date.
   */
  addCalendarMonths(
    date: jalaliMoment.Moment,
    months: number
  ): jalaliMoment.Moment {
    return this.clone(date).add(months, 'jmonth');
  }

  /**
   * Adds the specified number of Jalali days to the given date.
   */
  addCalendarDays(
    date: jalaliMoment.Moment,
    days: number
  ): jalaliMoment.Moment {
    return this.clone(date).add(days, 'jDay');
  }

  /**
   * Converts the given Jalali date to an ISO 8601 string.
   */
  toIso8601(date: jalaliMoment.Moment): string {
    return this.clone(date).format();
  }

  /**
   * Checks if the given object is a Jalali moment instance.
   */
  isDateInstance(obj: any): boolean {
    return jalaliMoment.isMoment(obj);
  }

  /**
   * Checks if the given Jalali date is valid.
   */
  isValid(date: jalaliMoment.Moment): boolean {
    return this.clone(date).isValid();
  }

  /**
   * Returns an invalid Jalali moment instance.
   */
  invalid(): jalaliMoment.Moment {
    return jalaliMoment.invalid();
  }

  /**
   * Deserializes a value into a Jalali moment, handling Date and string types.
   */
  override deserialize(value: any): jalaliMoment.Moment | null {
    let date;
    if (value instanceof Date) {
      date = jalaliMoment(value);
    }
    if (typeof value === 'string') {
      if (!value) {
        return null;
      }
      date = jalaliMoment(value).locale('fa');
    }
    if (date && this.isValid(date)) {
      return date;
    }
    return super.deserialize(value);
  }

  //#endregion
}
