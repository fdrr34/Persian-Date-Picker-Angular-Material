import { Routes } from '@angular/router';
import { JalaliDatePickerComponent } from './jalali-date-picker/jalali-date-picker.component';

export const routes: Routes = [
  { path: '', component: JalaliDatePickerComponent },
  { path: 'date-picker', component: JalaliDatePickerComponent }
];
