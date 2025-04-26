# Angular Material Jalali Date Picker

A standalone Angular component that implements a Jalali (Persian) calendar system for Angular Material's Date Picker. This component allows seamless integration with Angular Material while providing full support for the Persian calendar, RTL layout, and localization.

## Overview

This project provides both a ready-to-use Jalali Date Picker component and a reusable Jalali Date Adapter that can be used independently in other Angular Material components. It's built on top of the `jalali-moment` library and follows Angular Material's design patterns.

## Features

- Full Jalali (Persian) calendar support
- RTL layout
- Persian month and weekday names
- Persian numbers support
- YYYY/MM/DD date format
- Proper handling of Jalali leap years
- Accurate conversion between Gregorian and Jalali dates
- Highly customizable base component
- Two-way binding support
- Form integration
- Validation support

## Installation

1. First, install the required dependencies:
```bash
npm install @angular/material jalali-moment
```

2. You can either use the complete date picker component or just the adapter:

### Option A: Using the Complete Date Picker Component
Copy the following files to your project:
- `jalali-date.adapter.ts`
- `jalali-date.formats.ts`
- `jalali-date-picker.component.ts`
- `jalali-date-picker.component.html`
- `jalali-date-picker.component.scss`

### Option B: Using Only the Jalali Date Adapter
If you want to use the Jalali calendar system with your own Material components, you only need:
- `jalali-date.adapter.ts`
- `jalali-date.formats.ts`

## Usage

### Using the Complete Date Picker Component

1. Import the component in your module or standalone component:

```typescript
import { JalaliDatePickerComponent } from './jalali-date-picker/jalali-date-picker.component';

@Component({
  // ...
  imports: [JalaliDatePickerComponent]
})
```

2. Basic usage in template:

```html
<app-jalali-date-picker></app-jalali-date-picker>
```

3. Advanced usage with all available properties:

```html
<app-jalali-date-picker
  [(value)]="selectedDate"
  (dateChange)="onDateChange($event)"
  [label]="'تاریخ تولد'"
  [hint]="'تاریخ تولد خود را وارد کنید'"
  [placeholder]="'انتخاب تاریخ'"
  [direction]="'rtl'"
  [appearance]="'outline'"
  [color]="'primary'"
  [required]="true"
  [disabled]="false"
  [minDate]="minDate"
  [maxDate]="maxDate">
</app-jalali-date-picker>
```

### Using the Jalali Date Adapter Independently

1. Import the adapter and formats in your module or component:

```typescript
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MaterialPersianDateAdapter } from './jalali-date.adapter';
import { PERSIAN_DATE_FORMATS } from './jalali-date.formats';

@Component({
  // ... your component metadata
  providers: [
    { provide: DateAdapter, useClass: MaterialPersianDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: PERSIAN_DATE_FORMATS },
    { provide: MAT_DATE_LOCALE, useValue: 'fa-IR' }
  ]
})
```

2. You can now use any Angular Material date component with Jalali calendar support:

```html
<!-- Material Datepicker -->
<mat-form-field>
  <mat-label>تاریخ</mat-label>
  <input matInput [matDatepicker]="picker">
  <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
  <mat-datepicker #picker></mat-datepicker>
</mat-form-field>

<!-- Material Date Range Picker -->
<mat-form-field>
  <mat-label>بازه زمانی</mat-label>
  <mat-date-range-input [rangePicker]="rangePicker">
    <input matStartDate placeholder="تاریخ شروع">
    <input matEndDate placeholder="تاریخ پایان">
  </mat-date-range-input>
  <mat-datepicker-toggle matSuffix [for]="rangePicker"></mat-datepicker-toggle>
  <mat-date-range-picker #rangePicker></mat-date-range-picker>
</mat-form-field>
```

### Customizing the Adapter

The `MaterialPersianDateAdapter` can be extended for custom needs:

```typescript
export class CustomPersianDateAdapter extends MaterialPersianDateAdapter {
  // Override methods as needed
  format(date: jalaliMoment.Moment, displayFormat: string): string {
    // Your custom formatting logic
  }
}
```

### Working with Forms

The adapter works seamlessly with Angular forms:

```typescript
export class MyComponent {
  form = new FormGroup({
    date: new FormControl(null),
    dateRange: new FormGroup({
      start: new FormControl(null),
      end: new FormControl(null)
    })
  });
}
```

```html
<form [formGroup]="form">
  <mat-form-field>
    <input matInput [matDatepicker]="picker" formControlName="date">
    <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
    <mat-datepicker #picker></mat-datepicker>
  </mat-form-field>

  <div formGroupName="dateRange">
    <mat-date-range-input [rangePicker]="rangePicker">
      <input matStartDate formControlName="start">
      <input matEndDate formControlName="end">
    </mat-date-range-input>
    <mat-datepicker-toggle [for]="rangePicker"></mat-datepicker-toggle>
    <mat-date-range-picker #rangePicker></mat-date-range-picker>
  </div>
</form>
```

## Implementation Details

### MaterialPersianDateAdapter

The adapter provides these key functionalities:

- **Date Conversion**: Accurate conversion between Gregorian and Jalali dates
- **Locale Support**: Full Persian (fa-IR) locale support
- **Format Parsing**: Flexible date format parsing and formatting
- **Calendar Math**: Proper date arithmetic in Jalali calendar system
- **Validation**: Built-in date validation for Jalali calendar rules

### Custom Date Formats

The `PERSIAN_DATE_FORMATS` constant can be customized:

```typescript
export const CUSTOM_PERSIAN_DATE_FORMATS: MatDateFormats = {
  parse: {
    dateInput: 'jYYYY/jMM/jDD',
  },
  display: {
    dateInput: 'jYYYY/jMM/jDD',
    monthYearLabel: 'jYYYY jMMMM',
    dateA11yLabel: 'jYYYY/jMM/jDD',
    monthYearA11yLabel: 'jYYYY jMMMM',
  },
};
```

## Browser Support

This component is tested and supported in:
- Chrome (latest)
- Firefox (latest)
- Edge (latest)
- Safari (latest)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Credits

- [jalali-moment](https://github.com/fingerpich/jalali-moment) for the underlying Jalali calendar calculations
- [Angular Material](https://material.angular.io/) for the component design system
