import {DateAdapter} from "@angular/material/core";
import {Platform} from "@angular/cdk/platform";
import moment from 'jalali-moment';
/**
 * Custom DateAdapter for Jalali (Persian) calendar using jalali-moment.
 * Provides date manipulation and formatting methods for Angular Material Datepicker.
 */
export class MaterialPersianDateAdapter extends DateAdapter<moment.Moment> {
  constructor(matDateLocale: string,platform: Platform) {
   
    super();
    super.setLocale("fa");
  }

  getYear(date: moment.Moment): number {
    return this.clone(date).jYear();
  }

  getMonth(date: moment.Moment): number {
    return this.clone(date).jMonth();
  }

  getDate(date: moment.Moment): number {
    return this.clone(date).jDate();
  }

  getDayOfWeek(date: moment.Moment): number {
    return this.clone(date).day();
  }

  getMonthNames(style: "long" | "short" | "narrow"): string[] {
    switch (style) {
      case "long":
      case "short":
        return moment.localeData("fa").jMonths().slice(0);
      case "narrow":
        return moment.localeData("fa").jMonthsShort().slice(0);
    }
  }

  getDateNames(): string[] {
    const valuesArray = Array(31);
    for (let i = 0; i < 31; i++) {
      valuesArray[i] = String((i + 1).toLocaleString('fa'));
    }
    return valuesArray;
  }

  getDayOfWeekNames(style: "long" | "short" | "narrow"): string[] {
    switch (style) {
      case "long":
        return moment.localeData("fa").weekdays().slice(0);
      case "short":
        return moment.localeData("fa").weekdaysShort().slice(0);
      case "narrow":
        return ["ی", "د", "س", "چ", "پ", "ج", "ش"];
    }
  }

  getYearName(date: moment.Moment): string {
    return this.clone(date).jYear().toString();
  }

  getFirstDayOfWeek(): number {
    return moment.localeData("fa").firstDayOfWeek();
  }

  getNumDaysInMonth(date: moment.Moment): number {
    return this.clone(date).jDaysInMonth();
  }

  clone(date: moment.Moment): moment.Moment {
    return date.clone().locale("fa");
  }

  createDate(year: number, month: number, date: number): moment.Moment {
    if (month < 0 || month > 11) {
      throw Error(
        `Invalid month index "${month}". Month index has to be between 0 and 11.`
      );
    }
    if (date < 1) {
      throw Error(`Invalid date "${date}". Date has to be greater than 0.`);
    }
    const result = moment()
      .jYear(year).jMonth(month).jDate(date)
      .hours(0).minutes(0).seconds(0).milliseconds(0)
      .locale("fa");

    if (this.getMonth(result) !== month) {
      throw Error(`Invalid date ${date} for month with index ${month}.`);
    }
    if (!result.isValid()) {
      throw Error(`Invalid date "${date}" for month with index "${month}".`);
    }
    return result;
  }

  today(): moment.Moment {
    return moment().locale("fa");
  }

  parse(value: string | Date, parseFormat: string | string[]): moment.Moment | null {
    if (typeof value === 'string') {
      return moment(value, parseFormat, 'fa').isValid() ? moment(value, parseFormat, 'fa') : null;
    }
    return value instanceof Date ? moment(value).locale('fa') : null;
  }

  format(date: moment.Moment, displayFormat: object): string {
    const selectedDate = moment(date.toDate()).locale('fa').format('YYYY/MM/DD');
    let faDate = '';
    const splitDate = selectedDate.split('/');
    splitDate.forEach(i => {
      faDate += (+i).toLocaleString('fa') + '/';
    })
    return faDate.substring(0, faDate.length - 1).replace('٬','');
  }


  addCalendarYears(date: moment.Moment, years: number): moment.Moment {
    return this.clone(date).add(years, "jYear");
  }

  addCalendarMonths(date: moment.Moment, months: number): moment.Moment {
    return this.clone(date).add(months, "jmonth");
  }

  addCalendarDays(date: moment.Moment, days: number): moment.Moment {
    return this.clone(date).add(days, "jDay");
  }

  toIso8601(date: moment.Moment): string {
    return this.clone(date).format();
  }

   isDateInstance(obj: string | Date): boolean {
    return moment.isMoment(obj);
  }

  isValid(date: moment.Moment): boolean {
    return this.clone(date).isValid();
  }

  invalid(): moment.Moment {
    return moment.invalid();
  }

 
  override deserialize(value: string | Date | moment.Moment): moment.Moment | null {
    let date: moment.Moment | null = null;

    if (value instanceof Date) {
      date = moment(value);
    } else if (typeof value === 'string' && value) {
      date = moment(value).locale('fa');
    } else if (value instanceof moment) {
      date = value.locale('fa');
    }

    return date && this.isValid(date) ? date : null;
  }
}
