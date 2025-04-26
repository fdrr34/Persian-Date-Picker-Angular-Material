import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JalaliDatePickerComponent } from './jalali-date-picker.component';

describe('JalaliDatePickerComponent', () => {
  let component: JalaliDatePickerComponent;
  let fixture: ComponentFixture<JalaliDatePickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JalaliDatePickerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JalaliDatePickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
