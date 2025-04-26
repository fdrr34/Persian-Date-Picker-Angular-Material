import {
  Component,
  input,
  output,
  OutputEmitterRef,
  InputSignal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatDatepickerModule,
  MatDatepickerInputEvent,
} from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import {
  MatFormFieldModule,
  MatFormFieldAppearance,
} from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
  ThemePalette,
} from '@angular/material/core';
import { MaterialPersianDateAdapter } from './jalali-date.adapter';
import { PERSIAN_DATE_FORMATS } from './jalali-date.formats';

@Component({
  selector: 'app-jalali-date-picker',
  standalone: true,
  imports: [
    CommonModule,
    MatDatepickerModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
  ],
  providers: [
    { provide: DateAdapter, useClass: MaterialPersianDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: PERSIAN_DATE_FORMATS },
    { provide: MAT_DATE_LOCALE, useValue: 'fa-IR' },
  ],
  templateUrl: './jalali-date-picker.component.html',
  styleUrls: ['./jalali-date-picker.component.scss'],
})
export class JalaliDatePickerComponent {
  //#region Properties

  label: InputSignal<string> = input<string>('تاریخ');
  hint: InputSignal<string> = input<string>('');

  placeholder: InputSignal<string> = input<string>('');
  direction: InputSignal<'rtl' | 'ltr'> = input<'rtl' | 'ltr'>('rtl');
  appearance: InputSignal<MatFormFieldAppearance> =
    input<MatFormFieldAppearance>('outline');
  color: InputSignal<ThemePalette> = input<ThemePalette>('primary');
  required: InputSignal<boolean> = input<boolean>(false);
  disabled: InputSignal<boolean> = input<boolean>(false);
  minDate: InputSignal<Date | null> = input<Date | null>(null);
  maxDate: InputSignal<Date | null> = input<Date | null>(null);

  _value: InputSignal<Date | null> = input<Date | null>(null);
  get value(): Date | null {
    return this.selectedDate;
  }
  set value(date: Date | null) {
    this.selectedDate = date;
  }

  dateChange: OutputEmitterRef<Date> = output<Date>();
  valueChange: OutputEmitterRef<Date> = output<Date>();

  selectedDate: Date | null = null;

  //#endregion

  //#region constructor

  constructor(private dateAdapter: DateAdapter<Date>) {}

  //#endregion

  //#region lifecycle hooks

  onInit(): void {
    this.dateAdapter.setLocale('fa-IR');
  }

  //#endregion

  //#region public methods

  onDateChange(event: MatDatepickerInputEvent<Date>): void {
    if (event.value) {
      this.selectedDate = event.value;
      this.dateChange.emit(event.value);
      this.valueChange.emit(event.value);
    }
  }

  //#endregion
}
