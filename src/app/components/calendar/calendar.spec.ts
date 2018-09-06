import { TestBed, ComponentFixture, fakeAsync, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Calendar } from './calendar';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonModule } from '../button/button';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../common/shared';

describe('Calendar', () => {
  
    let calendar: Calendar;
    let fixture: ComponentFixture<Calendar>;
    
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [
          NoopAnimationsModule,
          FormsModule,
          SharedModule,
          ButtonModule
        ],
        declarations: [
          Calendar,
        ]
      });
      
      fixture = TestBed.createComponent(Calendar);
      calendar = fixture.componentInstance;
    });

    it('should created by default', () => {
      fixture.detectChanges();

      const calenderEl = fixture.debugElement.query(By.css('span'));
      expect(calenderEl).toBeTruthy();
    });

    it('should change styleClass', () => {
      calendar.styleClass = "Primeng ROCKS!"
      fixture.detectChanges();

      const calenderEl = fixture.debugElement.query(By.css('span'));
      expect(calenderEl.nativeElement.className).toContain("Primeng ROCKS!");
    });

    it('should change inputStyleClass', () => {
      calendar.inputStyleClass = "Primeng ROCKS!"
      fixture.detectChanges();

      const calenderEl = fixture.debugElement.query(By.css('input'));
      expect(calenderEl.nativeElement.className).toContain("Primeng ROCKS!");
    });

    it('should change panelStyle and panelStyleClass', () => {
      calendar.panelStyleClass = "Primeng ROCKS!";
      calendar.panelStyle = {'primeng' : 'rocks!'};
      calendar.overlayVisible = true;
      fixture.detectChanges();

      const panelEl = fixture.debugElement.query(By.css('div'));
      expect(panelEl.nativeElement.className).toContain("Primeng ROCKS!");
      expect(panelEl.nativeElement.style.primeng).toContain("rocks!");
    });

    it('should change inputId', () => {
      calendar.inputId = "PRIMENG";
      fixture.detectChanges();

      const calenderEl = fixture.debugElement.query(By.css('input'));
      expect(calenderEl.nativeElement.id).toContain("PRIMENG");
    });

    it('should change name', () => {
      calendar.name = "PRIMENG";
      fixture.detectChanges();

      const calenderEl = fixture.debugElement.query(By.css('input'));
      expect(calenderEl.nativeElement.name).toContain("PRIMENG");
    });

    it('should change placeholder', () => {
      calendar.placeholder = "PRIMENG";
      fixture.detectChanges();

      const calenderEl = fixture.debugElement.query(By.css('input'));
      expect(calenderEl.nativeElement.placeholder).toContain("PRIMENG");
    });
    
    it('should show icon', () => {
      calendar.showIcon = true;
      fixture.detectChanges();

      const calenderEl = fixture.debugElement.query(By.css('span'));
      const buttonEl = fixture.debugElement.query(By.css('button'));
      expect(calenderEl.nativeElement.className).toContain('ui-calendar-w-btn');
      expect(buttonEl.nativeElement.attributes[6].value).toEqual("pi pi-calendar");
    });

    it('should change icon', () => {
      calendar.showIcon = true;
      calendar.icon = "Primeng ROCKS!";
      fixture.detectChanges();

      const buttonEl = fixture.debugElement.query(By.css('button'));
      expect(buttonEl.nativeElement.attributes[6].value).toEqual("Primeng ROCKS!");
    });

    it('should show panel and call onInputClick when inputClick', () => {
      fixture.detectChanges();

      const inputEl = fixture.debugElement.query(By.css('input')).nativeElement;
      const itemClickSpy = spyOn(calendar, 'onInputClick').and.callThrough();
      const focusSpy = spyOn(calendar, 'onInputFocus').and.callThrough();
      const focusEvent = new Event('focus');
      inputEl.click();
      inputEl.dispatchEvent(focusEvent);
      fixture.detectChanges();
      const panelEl = fixture.debugElement.query(By.css('div'));

      expect(itemClickSpy).toHaveBeenCalled();
      expect(focusSpy).toHaveBeenCalled();
      expect(panelEl).toBeTruthy();
      expect(calendar.overlayVisible).toEqual(true);
    });

    it('should show panel and call onButtonClick', () => {
      calendar.showIcon = true;
      fixture.detectChanges();

      const buttonEl = fixture.debugElement.query(By.css('button')).nativeElement;
      const onButtonClickSpy = spyOn(calendar, 'onButtonClick').and.callThrough();
      buttonEl.click();
      fixture.detectChanges();

      const panelEl = fixture.debugElement.query(By.css('div'));
      expect(panelEl).toBeTruthy();
      expect(calendar.overlayVisible).toEqual(true);
      expect(onButtonClickSpy).toHaveBeenCalled();
    });

    it('should show panel', () => {
      calendar.inline = true;
      fixture.detectChanges();

      const panelEl = fixture.debugElement.query(By.css('div'));
      expect(panelEl).toBeTruthy();
      expect(panelEl.nativeElement.className).toContain('ui-datepicker-inline')
    });

    it('should spanish', () => {
      calendar.locale = {
        firstDayOfWeek: 1,
        dayNames: [ "domingo","lunes","martes","miércoles","jueves","viernes","sábado" ],
        dayNamesShort: [ "dom","lun","mar","mié","jue","vie","sáb" ],
        dayNamesMin: [ "D","L","M","X","J","V","S" ],
        monthNames: [ "enero","febrero","marzo","abril","mayo","junio","julio","agosto","septiembre","octubre","noviembre","diciembre" ],
        monthNamesShort: [ "ene","feb","mar","abr","may","jun","jul","ago","sep","oct","nov","dic" ],
        today: 'Hoy',
        clear: 'Borrar'
      };
      fixture.detectChanges();

      const inputEl = fixture.debugElement.query(By.css('input')).nativeElement;
      const focusEvent = new Event('focus');
      inputEl.click();
      inputEl.dispatchEvent(focusEvent);
      fixture.detectChanges();

      const firstDayEl = fixture.debugElement.query(By.css('.ui-datepicker-month'));
      expect(firstDayEl.nativeElement.textContent).toEqual(calendar.locale.monthNames[calendar.currentMonth]);
    });

    it('should select next month and call navForward', () => {
      fixture.detectChanges();

      const inputEl = fixture.debugElement.query(By.css('input')).nativeElement;
      const focusEvent = new Event('focus');
      inputEl.click();
      const currentMonth = calendar.currentMonth;
      inputEl.dispatchEvent(focusEvent);
      fixture.detectChanges();

      const navForwardSpy = spyOn(calendar, 'navForward').and.callThrough();
      const monthEl = fixture.debugElement.query(By.css('.ui-datepicker-month'));
      expect(monthEl.nativeElement.textContent).toEqual(calendar.locale.monthNames[calendar.currentMonth]);      
      const nextMonthEl = fixture.debugElement.query(By.css('.ui-datepicker-next'));
      nextMonthEl.nativeElement.click();
      fixture.detectChanges();

      const currentMonthEl = fixture.debugElement.query(By.css('.ui-datepicker-month'));
      expect(currentMonth).not.toEqual(calendar.currentMonth);
      expect(currentMonthEl.nativeElement.textContent).toEqual(calendar.locale.monthNames[calendar.currentMonth]);
      expect(navForwardSpy).toHaveBeenCalled();
    });

    it('should select pre month and call navBackward', () => {
      fixture.detectChanges();

      const inputEl = fixture.debugElement.query(By.css('input')).nativeElement;
      const focusEvent = new Event('focus');
      inputEl.click();
      const currentMonth = calendar.currentMonth;
      inputEl.dispatchEvent(focusEvent);
      fixture.detectChanges();

      const navForwardSpy = spyOn(calendar, 'navBackward').and.callThrough();
      const monthEl = fixture.debugElement.query(By.css('.ui-datepicker-month'));
      expect(monthEl.nativeElement.textContent).toEqual(calendar.locale.monthNames[calendar.currentMonth]);      
      const preMonthEl = fixture.debugElement.query(By.css('.ui-datepicker-prev'));
      preMonthEl.nativeElement.click();
      fixture.detectChanges();

      const currentMonthEl = fixture.debugElement.query(By.css('.ui-datepicker-month'));
      expect(currentMonth).not.toEqual(calendar.currentMonth);
      expect(currentMonthEl.nativeElement.textContent).toEqual(calendar.locale.monthNames[calendar.currentMonth]);
      expect(navForwardSpy).toHaveBeenCalled();
    });

    it('should select date when click', fakeAsync(() => {
      fixture.detectChanges();

      const inputEl = fixture.debugElement.query(By.css('input')).nativeElement;
      const focusEvent = new Event('focus');
      inputEl.click();
      inputEl.dispatchEvent(focusEvent);
      fixture.detectChanges();

      const onDateSelectSpy = spyOn(calendar, 'onDateSelect').and.callThrough();
      const calendarContainer = fixture.debugElement.query(By.css('.ui-datepicker-calendar-container'));
      const sampleDateEl = calendarContainer.queryAll(By.css('a'))[7].nativeElement;
      sampleDateEl.click();
      fixture.detectChanges();

      const datesEl = calendarContainer.queryAll(By.css('a'));
      const selectedTdEl = fixture.debugElement.query(By.css('.ui-datepicker-current-day'));
      expect(calendar.inputFieldValue).toEqual(inputEl.value);
      expect(onDateSelectSpy).toHaveBeenCalled();
      expect(selectedTdEl).toBeTruthy();
      for(let x=0; x<datesEl.length; x++){
        if(x == 7)
          expect(datesEl[x].nativeElement.className).toContain("ui-state-active");
        else
          expect(datesEl[x].nativeElement.className).not.toContain("ui-state-active");
      }

      tick(150);
      expect(calendar.overlayVisible).toEqual(false);
    }));

    it('should change date format', () => {
      calendar.dateFormat = "dd/mm/yy"
      fixture.detectChanges();

      const inputEl = fixture.debugElement.query(By.css('input')).nativeElement;
      const focusEvent = new Event('focus');
      inputEl.click();
      inputEl.dispatchEvent(focusEvent);
      fixture.detectChanges();

      const onDateSelectSpy = spyOn(calendar, 'onDateSelect').and.callThrough();
      const calendarContainer = fixture.debugElement.query(By.css('.ui-datepicker-calendar-container'));
      const sampleDateEl = calendarContainer.queryAll(By.css('a'))[4].nativeElement;
      sampleDateEl.click();
      fixture.detectChanges();

      expect(calendar.inputFieldValue).toEqual(inputEl.value);
      if(calendar.currentMonth < 9)
        expect(calendar.inputFieldValue).toEqual("05/0"+(calendar.currentMonth+1)+"/"+calendar.currentYear);
      else
        expect(calendar.inputFieldValue).toEqual("05/"+(calendar.currentMonth+1)+"/"+calendar.currentYear);
      expect(onDateSelectSpy).toHaveBeenCalled();
    });

    it('should use min and max date', () => {
      let minDate:Date;
      let maxDate:Date;
      let today = new Date();
      let month = today.getMonth();
      let year = today.getFullYear();
      let prevMonth = (month === 0) ? 11 : month -1;
      let prevYear = (prevMonth === 11) ? year - 1 : year;
      let nextMonth = (month === 11) ? 0 : month + 1;
      let nextYear = (nextMonth === 0) ? year + 1 : year;
      minDate = new Date();
      minDate.setMonth(prevMonth);
      minDate.setFullYear(prevYear);
      maxDate = new Date();
      maxDate.setMonth(nextMonth);
      maxDate.setFullYear(nextYear);
      calendar.minDate = minDate;
      calendar.maxDate = maxDate;
      fixture.detectChanges();

      const inputEl = fixture.debugElement.query(By.css('input')).nativeElement;
      const focusEvent = new Event('focus');
      inputEl.click();
      inputEl.dispatchEvent(focusEvent);
      fixture.detectChanges();

      const nextMonthEl = fixture.debugElement.query(By.css('.ui-datepicker-next'));
      nextMonthEl.nativeElement.click();
      nextMonthEl.nativeElement.click();
      fixture.detectChanges();

      const containerEl = fixture.debugElement.query(By.css('.ui-datepicker-calendar-container'));
      const unselectableEls = containerEl.queryAll(By.css('.ui-state-default.ui-state-disabled'));
      expect(unselectableEls).toBeTruthy();
      expect(unselectableEls.length).toBeGreaterThan(30);
    });

    it('should use invalidDates', () => {
      
      let invalidDates: Array<Date>;
      let invalidDate = new Date();
      invalidDate.setDate(15);
      let invalidDate2 = new Date();
      invalidDate2.setDate(invalidDate.getDate() - 1);
      invalidDates = [invalidDate,invalidDate2];
      calendar.disabledDates = invalidDates;      
      fixture.detectChanges();

      const inputEl = fixture.debugElement.query(By.css('input')).nativeElement;
      const focusEvent = new Event('focus');
      inputEl.click();
      inputEl.dispatchEvent(focusEvent);
      fixture.detectChanges();

      const containerEl = fixture.debugElement.query(By.css('.ui-datepicker-calendar-container'));
      const unselectableEls = containerEl.queryAll(By.css('.ui-state-default.ui-state-disabled'));
      let invalidDateArray = [];
      for (let el of unselectableEls){
        if(el.nativeElement.textContent == invalidDate.getDate() || el.nativeElement.textContent == invalidDate2.getDate()){
          invalidDateArray.push(el.nativeElement.textContent);
        }
      }
      expect(invalidDateArray.length).toEqual(2);
    });

    it('should use disabledays', () => {
      calendar.disabledDays = [0,6];   
      fixture.detectChanges();

      const inputEl = fixture.debugElement.query(By.css('input')).nativeElement;
      const focusEvent = new Event('focus');
      inputEl.click();
      inputEl.dispatchEvent(focusEvent);
      fixture.detectChanges();

      for (let week of calendar.months[0].dates){
        expect(week[0].selectable).toEqual(false);
        expect(week[6].selectable).toEqual(false);
      }
    });

    it('should use year and month navigator', () => {

      calendar.yearRange = "2000:2030";
      calendar.monthNavigator = true;
      calendar.yearNavigator = true;
      fixture.detectChanges();

      const inputEl = fixture.debugElement.query(By.css('input')).nativeElement;
      const focusEvent = new Event('focus');
      inputEl.click();
      inputEl.dispatchEvent(focusEvent);
      fixture.detectChanges();

      const navigators = fixture.debugElement.query(By.css('.ui-datepicker-title')).queryAll(By.css('select'));
      expect(navigators.length).toEqual(2);
      const monthDropdownEl = navigators[0];
      const yearDropdownEl = navigators[1];
      const event = new Event ('change');
      monthDropdownEl.nativeElement.value = "1";
      monthDropdownEl.nativeElement.dispatchEvent(event);
      yearDropdownEl.nativeElement.value = "2019";
      yearDropdownEl.nativeElement.dispatchEvent(event);
      fixture.detectChanges();

      expect(calendar.currentMonth).toEqual(1);
      expect(calendar.currentYear).toEqual(2019);
      const datesContainer = fixture.debugElement.query(By.css('.ui-datepicker-calendar-container'));
      const dates = datesContainer.queryAll(By.css('a'));
      dates[17].nativeElement.click();
      fixture.detectChanges();
      expect(calendar.inputFieldValue).toEqual("02/18/2019");
    });

    it('should show time', () => {

      calendar.yearRange = "2000:2030";
      calendar.showTime = true;
      calendar.monthNavigator = true;
      calendar.yearNavigator = true;
      fixture.detectChanges();

      const inputEl = fixture.debugElement.query(By.css('input')).nativeElement;
      const focusEvent = new Event('focus');
      inputEl.click();
      inputEl.dispatchEvent(focusEvent);
      fixture.detectChanges();

      let defaultHour = calendar.currentHour;
      let defaultMinute = calendar.currentMinute;
      const incrementHourSpy = spyOn(calendar, 'incrementHour').and.callThrough();
      const decrementHourSpy = spyOn(calendar, 'decrementHour').and.callThrough();
      const incrementMinuteSpy = spyOn(calendar, 'incrementMinute').and.callThrough();
      const decrementMinuteSpy = spyOn(calendar, 'decrementMinute').and.callThrough();
      const navigators = fixture.debugElement.query(By.css('.ui-datepicker-title')).queryAll(By.css('select'));
      const timers = fixture.debugElement.query(By.css('.ui-timepicker')).queryAll(By.css('div'));
      const hourPicker = timers[0];
      const minutePicker = timers[2];
      const incrementHourEl = hourPicker.children[0];
      const decrementHourEl = hourPicker.children[3];
      const incrementMinuteEl = minutePicker.children[0];
      const decrementMinuteEl = minutePicker.children[3];
      const monthDropdownEl = navigators[0];
      const yearDropdownEl = navigators[1];
      const event = new Event ('change');
      monthDropdownEl.nativeElement.value = "7";
      monthDropdownEl.nativeElement.dispatchEvent(event);
      yearDropdownEl.nativeElement.value = "2008";
      yearDropdownEl.nativeElement.dispatchEvent(event);
      incrementHourEl.nativeElement.click();
      incrementHourEl.nativeElement.click();
      decrementHourEl.nativeElement.click();
      incrementMinuteEl.nativeElement.click();
      incrementMinuteEl.nativeElement.click();
      decrementMinuteEl.nativeElement.click();
      fixture.detectChanges();

      expect(hourPicker.queryAll(By.css('span'))[2].nativeElement.textContent).not.toEqual(defaultHour.toString());
      expect(minutePicker.queryAll(By.css('span'))[2].nativeElement.textContent).not.toEqual(defaultMinute.toString());
      expect(hourPicker.queryAll(By.css('span'))[2].nativeElement.textContent).toEqual(calendar.currentHour.toString());
      expect(minutePicker.queryAll(By.css('span'))[2].nativeElement.textContent).toEqual(calendar.currentMinute.toString());
      const datesContainer = fixture.debugElement.query(By.css('.ui-datepicker-calendar-container'));
      const dates = datesContainer.queryAll(By.css('a'));
      dates[7].nativeElement.click();
      fixture.detectChanges();

      expect(incrementHourSpy).toHaveBeenCalled();
      expect(decrementHourSpy).toHaveBeenCalled();
      expect(decrementMinuteSpy).toHaveBeenCalled();
      expect(incrementMinuteSpy).toHaveBeenCalled();
      expect(fixture.debugElement.query(By.css('input')).nativeElement.value).toEqual(calendar.inputFieldValue);
      if(calendar.currentHour<10 && calendar.currentMinute<10)
        expect(calendar.inputFieldValue).toEqual("08/08/2008"+" 0"+calendar.currentHour+":0"+calendar.currentMinute);
      else if (calendar.currentHour<10)
        expect(calendar.inputFieldValue).toEqual("08/08/2008"+" 0"+calendar.currentHour+":"+calendar.currentMinute);
      else if (calendar.currentMinute<10)
        expect(calendar.inputFieldValue).toEqual("08/08/2008"+" "+calendar.currentHour+":0"+calendar.currentMinute);
      else
        expect(calendar.inputFieldValue).toEqual("08/08/2008"+" "+calendar.currentHour+":"+calendar.currentMinute);
    });

    it('should only time', () => {

      calendar.timeOnly = true;
      calendar.monthNavigator = true;
      calendar.yearNavigator = true;
      fixture.detectChanges();

      const inputEl = fixture.debugElement.query(By.css('input')).nativeElement;
      const focusEvent = new Event('focus');
      inputEl.click();
      inputEl.dispatchEvent(focusEvent);
      fixture.detectChanges();

      const spanEl = fixture.debugElement.query(By.css('span')).nativeElement;
      const panelEl = fixture.debugElement.query(By.css('div')).nativeElement;
      expect(spanEl.className).toContain('ui-calendar-timeonly');
      expect(panelEl.className).toContain('ui-datepicker-timeonly');
      let defaultHour = calendar.currentHour;
      let defaultMinute = calendar.currentMinute;
      const timers = fixture.debugElement.query(By.css('.ui-timepicker')).queryAll(By.css('div'));
      const hourPicker = timers[0];
      const minutePicker = timers[2];
      const incrementHourEl = hourPicker.children[0];
      const decrementHourEl = hourPicker.children[3];
      const incrementMinuteEl = minutePicker.children[0];
      const decrementMinuteEl = minutePicker.children[3];
      const event = new Event ('change');
      incrementHourEl.nativeElement.click();
      incrementHourEl.nativeElement.click();
      decrementHourEl.nativeElement.click();
      incrementMinuteEl.nativeElement.click();
      incrementMinuteEl.nativeElement.click();
      decrementMinuteEl.nativeElement.click();
      fixture.detectChanges();

      expect(hourPicker.queryAll(By.css('span'))[2].nativeElement.textContent).not.toEqual(defaultHour.toString());
      expect(minutePicker.queryAll(By.css('span'))[2].nativeElement.textContent).not.toEqual(defaultMinute.toString());
      expect(hourPicker.queryAll(By.css('span'))[2].nativeElement.textContent).toEqual(calendar.currentHour.toString());
      expect(minutePicker.queryAll(By.css('span'))[2].nativeElement.textContent).toEqual(calendar.currentMinute.toString());
      expect(fixture.debugElement.query(By.css('input')).nativeElement.value).toEqual(calendar.inputFieldValue);
      
    });

    it('should select multiple', () => {
      calendar.selectionMode = "multiple";
      calendar.yearRange = "2000:2030";
      calendar.monthNavigator = true;
      calendar.yearNavigator = true;
      fixture.detectChanges();

      const inputEl = fixture.debugElement.query(By.css('input')).nativeElement;
      const focusEvent = new Event('focus');
      inputEl.click();
      inputEl.dispatchEvent(focusEvent);
      fixture.detectChanges();

      let defaultHour = calendar.currentHour;
      let defaultMinute = calendar.currentMinute;
      const navigators = fixture.debugElement.query(By.css('.ui-datepicker-title')).queryAll(By.css('select'));
      const monthDropdownEl = navigators[0];
      const yearDropdownEl = navigators[1];
      const event = new Event ('change');
      monthDropdownEl.nativeElement.value = "7";
      monthDropdownEl.nativeElement.dispatchEvent(event);
      yearDropdownEl.nativeElement.value = "2008";
      yearDropdownEl.nativeElement.dispatchEvent(event);
      fixture.detectChanges();

      const datesContainer = fixture.debugElement.query(By.css('.ui-datepicker-calendar-container'));
      const dates = datesContainer.queryAll(By.css('a'));
      dates[7].nativeElement.click();
      fixture.detectChanges();
      
      expect(calendar.overlayVisible).toEqual(true);
      dates[8].nativeElement.click();
      fixture.detectChanges();
      expect(inputEl.value).toEqual(calendar.inputFieldValue);
      expect(calendar.value.length).toEqual(2);
      expect(calendar.inputFieldValue).toEqual("08/08/2008, 08/09/2008");
    });

    it('should select today and clear input with button bar', fakeAsync(() => {
      calendar.showButtonBar = true;
      fixture.detectChanges();

      const inputEl = fixture.debugElement.query(By.css('input')).nativeElement;
      const focusEvent = new Event('focus');
      inputEl.click();
      inputEl.dispatchEvent(focusEvent);
      fixture.detectChanges();

      const onClearButtonClickSpy = spyOn(calendar, 'onClearButtonClick').and.callThrough();
      const onTodayButtonClickSpy = spyOn(calendar, 'onTodayButtonClick').and.callThrough();
      const buttonbar = fixture.debugElement.query(By.css('.ui-datepicker-buttonbar'));
      const todayButtonEl = buttonbar.queryAll(By.css('button'))[0];
      const clearButtonEl = buttonbar.queryAll(By.css('button'))[1];
      expect(buttonbar).toBeTruthy();
      expect(todayButtonEl.attributes["ng-reflect-label"]).toEqual(calendar.locale.today);
      expect(clearButtonEl.attributes["ng-reflect-label"]).toEqual(calendar.locale.clear);
      todayButtonEl.nativeElement.click();
      fixture.detectChanges();

      tick(150);
      expect(calendar.overlayVisible).toEqual(false);
      expect(calendar.inputFieldValue).toBeTruthy();
      expect(inputEl.value).toEqual(calendar.inputFieldValue);
      expect(onTodayButtonClickSpy).toHaveBeenCalled();
      expect(calendar.value).not.toEqual(null);
      clearButtonEl.nativeElement.click();
      fixture.detectChanges();

      tick(150);
      expect(calendar.overlayVisible).toEqual(false);
      expect(calendar.inputFieldValue).toBeFalsy();
      expect(inputEl.value).toEqual('');
      expect(calendar.value).toEqual(null);
      expect(onClearButtonClickSpy).toHaveBeenCalled();
    }));

    it('should change today & clear button styleClass', () => {
      calendar.showButtonBar = true;
      calendar.clearButtonStyleClass = "Primeng ROCKS!";
      calendar.todayButtonStyleClass = "Primeng ROCKS!";
      fixture.detectChanges();

      const inputEl = fixture.debugElement.query(By.css('input')).nativeElement;
      const focusEvent = new Event('focus');
      inputEl.click();
      inputEl.dispatchEvent(focusEvent);
      fixture.detectChanges();

      const buttonbar = fixture.debugElement.query(By.css('.ui-datepicker-buttonbar'));
      const todayButtonEl = buttonbar.queryAll(By.css('button'))[0];
      const clearButtonEl = buttonbar.queryAll(By.css('button'))[1];
      expect(todayButtonEl.nativeElement.className).toContain("Primeng ROCKS!");
      expect(clearButtonEl.nativeElement.className).toContain("Primeng ROCKS!");
    });

    it('should show multiple months', () => {
      calendar.numberOfMonths = 3;
      fixture.detectChanges();

      const inputEl = fixture.debugElement.query(By.css('input')).nativeElement;
      const focusEvent = new Event('focus');
      inputEl.click();
      inputEl.dispatchEvent(focusEvent);
      fixture.detectChanges();

      const panelEl = fixture.debugElement.query(By.css('div'));
      const contentEls = fixture.debugElement.queryAll(By.css('.ui-datepicker-group'));
      const selectEls = fixture.debugElement.queryAll(By.css('select'));
      expect(panelEl.nativeElement.className).toContain("ui-datepicker-multiple-month");
      expect(contentEls.length).toEqual(3);
      expect(selectEls.length).toEqual(0);
    });

    it('should show month picker', fakeAsync(() => {

      calendar.yearNavigator = true;
      calendar.view = "month";
      calendar.dateFormat = "mm";
      fixture.detectChanges();

      const inputEl = fixture.debugElement.query(By.css('input')).nativeElement;
      const focusEvent = new Event('focus');
      inputEl.click();
      inputEl.dispatchEvent(focusEvent);
      fixture.detectChanges();
      
      const onMonthSelectSpy = spyOn(calendar, 'onMonthSelect').and.callThrough();
      const panelEl = fixture.debugElement.query(By.css('div')).nativeElement;
      const monthpickerEl = fixture.debugElement.query(By.css('.ui-monthpicker'));
      const janEl = monthpickerEl.query(By.css('a')).nativeElement;
      expect(monthpickerEl).toBeTruthy();
      expect(panelEl.className).toContain("ui-datepicker-monthpicker");
      expect(janEl.textContent).toContain(calendar.monthPickerValues[0]);
      janEl.click();
      fixture.detectChanges();

      tick(150);
      expect(onMonthSelectSpy).toHaveBeenCalled();
      expect(calendar.inputFieldValue).toEqual(inputEl.value);
      expect(calendar.inputFieldValue).toEqual("01");
      expect(calendar.value).toBeTruthy();
      expect(calendar.overlayVisible).toEqual(false);
    }));

    it('should show month picker', fakeAsync(() => {
      calendar.touchUI = true;
      fixture.detectChanges();

      const inputEl = fixture.debugElement.query(By.css('input')).nativeElement;
      const focusEvent = new Event('focus');
      inputEl.click();
      inputEl.dispatchEvent(focusEvent);
      fixture.detectChanges();
      
      const onDateSelectSpy = spyOn(calendar, 'onDateSelect').and.callThrough();
      const panelEl = fixture.debugElement.query(By.css('div')).nativeElement;
      const containerEl = fixture.debugElement.query(By.css('.ui-datepicker-calendar-container'));
      const firstDayEl = containerEl.query(By.css('a')).nativeElement;
      expect(panelEl.className).toContain("ui-datepicker-touch-ui");
      firstDayEl.click();
      fixture.detectChanges();

      tick(150);
      expect(calendar.overlayVisible).toEqual(false);
      if(calendar.currentMonth<9)
        expect(calendar.inputFieldValue).toEqual("0"+(calendar.currentMonth+1)+"/01/"+calendar.currentYear);
      else
        expect(calendar.inputFieldValue).toEqual((calendar.currentMonth+1)+"/01/"+calendar.currentYear);
      expect(inputEl.value).toEqual(calendar.inputFieldValue);
      expect(onDateSelectSpy).toHaveBeenCalled();
    }));

    it('should select date with keyboardEvent', () => {
      fixture.detectChanges();

      const inputEl = fixture.debugElement.query(By.css('input')).nativeElement;
      const focusEvent = new Event('focus');
      inputEl.click();
      calendar.isKeydown = true;
      inputEl.dispatchEvent(focusEvent);
      fixture.detectChanges();
      
      const updateModelSpy = spyOn(calendar, 'updateModel').and.callThrough();
      const updateUISpy = spyOn(calendar, 'updateUI').and.callThrough();
      const event = {'target':{'value':'07/01/2008'}};
      calendar.onUserInput(event);
      fixture.detectChanges();

      const containerEl = fixture.debugElement.query(By.css('.ui-datepicker-calendar-container'));
      const firstEl = containerEl.query(By.css('a')).nativeElement;
      const monthSpanEl = fixture.debugElement.query(By.css('.ui-datepicker-month')).nativeElement;
      const yearSpanEl = fixture.debugElement.query(By.css('.ui-datepicker-year')).nativeElement;
      expect(updateUISpy).toHaveBeenCalled();
      expect(updateModelSpy).toHaveBeenCalled();
      expect(calendar.currentMonth).toEqual(6);
      expect(calendar.currentYear).toEqual(2008);
      expect(firstEl.className).toContain("ui-state-active");
      expect(monthSpanEl.textContent).toEqual("July");
      expect(yearSpanEl.textContent).toEqual("2008");
    });

    it('should listen onfocus', () => {
      fixture.detectChanges();

      let focusvalue;
      calendar.onFocus.subscribe(value => focusvalue = value);
      const inputEl = fixture.debugElement.query(By.css('input')).nativeElement;
      const focusEvent = new Event('focus');
      inputEl.click();
      calendar.isKeydown = true;
      inputEl.dispatchEvent(focusEvent);
      fixture.detectChanges();
      
      expect(focusvalue).toBeTruthy();
    });

    it('should listen onselect', () => {
      fixture.detectChanges();

      const inputEl = fixture.debugElement.query(By.css('input')).nativeElement;
      const focusEvent = new Event('focus');
      let onselectValue;
      calendar.onSelect.subscribe(value => onselectValue = value);
      inputEl.click();
      inputEl.dispatchEvent(focusEvent);
      fixture.detectChanges();

      const calendarContainer = fixture.debugElement.query(By.css('.ui-datepicker-calendar-container'));
      const sampleDateEl = calendarContainer.queryAll(By.css('a'))[7].nativeElement;
      sampleDateEl.click();
      fixture.detectChanges();

      expect(onselectValue).toBeTruthy();
    });

    it('should listen onInput', () => {
      fixture.detectChanges();

      const inputEl = fixture.debugElement.query(By.css('input')).nativeElement;
      const focusEvent = new Event('focus');
      let onInputValue;
      calendar.onInput.subscribe(value => onInputValue = value);
      inputEl.click();
      calendar.isKeydown = true;
      inputEl.dispatchEvent(focusEvent);
      fixture.detectChanges();
      
      const event = {'target':{'value':'07/01/2008'}};
      calendar.onUserInput(event);
      fixture.detectChanges();

      expect(onInputValue).toBeTruthy();
    });

    it('should listen onToday and onClear', () => {
      calendar.showButtonBar = true;
      fixture.detectChanges();
      let onTodayValue;
      calendar.onTodayClick.subscribe(value => onTodayValue = value);
      let onClearValue;
      calendar.onClearClick.subscribe(value => onClearValue = value);
      const inputEl = fixture.debugElement.query(By.css('input')).nativeElement;
      const focusEvent = new Event('focus');
      
      inputEl.click();
      inputEl.dispatchEvent(focusEvent);
      fixture.detectChanges();

      const buttonbar = fixture.debugElement.query(By.css('.ui-datepicker-buttonbar'));
      const todayButtonEl = buttonbar.queryAll(By.css('button'))[0];
      const clearButtonEl = buttonbar.queryAll(By.css('button'))[1];
      todayButtonEl.nativeElement.click();
      fixture.detectChanges();

      clearButtonEl.nativeElement.click();
      fixture.detectChanges();

      expect(onTodayValue).toBeTruthy();
      expect(onClearValue).toBeTruthy();
    });

    it('should listen onMonthChange', () => {
      fixture.detectChanges();

      let onMonthChangeValue;
      calendar.onMonthChange.subscribe(value => onMonthChangeValue = value);
      const inputEl = fixture.debugElement.query(By.css('input')).nativeElement;
      const focusEvent = new Event('focus');
      inputEl.click();
      inputEl.dispatchEvent(focusEvent);
      fixture.detectChanges();

      const nextMonthEl = fixture.debugElement.query(By.css('.ui-datepicker-next'));
      nextMonthEl.nativeElement.click();
      fixture.detectChanges();

      expect(onMonthChangeValue).toBeTruthy();
    });

    it('should listen onYearChange', () => {
      calendar.yearRange = "2000:2030";
      calendar.yearNavigator = true;
      fixture.detectChanges();

      let onYearChangeValue;
      calendar.onYearChange.subscribe(value => onYearChangeValue = value);
      const inputEl = fixture.debugElement.query(By.css('input')).nativeElement;
      const focusEvent = new Event('focus');
      inputEl.click();
      inputEl.dispatchEvent(focusEvent);
      fixture.detectChanges();

      const navigators = fixture.debugElement.query(By.css('.ui-datepicker-title')).queryAll(By.css('select'));
      const yearDropdownEl = navigators[0];
      const event = new Event ('change');
      yearDropdownEl.nativeElement.value = "2019";
      yearDropdownEl.nativeElement.dispatchEvent(event);
      fixture.detectChanges();
      
      expect(onYearChangeValue).toBeTruthy();
    });

});
