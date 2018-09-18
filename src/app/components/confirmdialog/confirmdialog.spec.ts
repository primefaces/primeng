import { TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ConfirmDialog } from './confirmdialog';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { ButtonModule } from '../button/button';
import { ConfirmationService, Message } from '../common/api';
import { Dialog } from '../dialog/dialog';

@Component({
  template: `<p-confirmDialog></p-confirmDialog>

  <button type="button" (click)="confirm1()" pButton icon="pi pi-check" label="Confirm"></button>
    
  <p-messages [value]="msgs"></p-messages>`
})
class TestConfirmDialogComponent {

  constructor(private confirmationService: ConfirmationService) {}

  msgs: Message[] = [];
  header:string;

  confirm1() {
    this.confirmationService.confirm({
    message: 'Are you sure that you want to proceed?',
    header: 'Confirmation',
    icon: 'pi pi-exclamation-triangle',
    accept: () => {
       this.msgs = [{severity:'info', summary:'Confirmed', detail:'You have accepted'}];
      },
     reject: () => {
       this.msgs = [{severity:'info', summary:'Rejected', detail:'You have rejected'}];
      }
    });
  }

}

describe('ConfirmDialog', () => {
  
  let confirmDialog: ConfirmDialog;
  let testComponent : TestConfirmDialogComponent;
  let fixture: ComponentFixture<TestConfirmDialogComponent>;
  
  beforeEach(() => {
      TestBed.configureTestingModule({
        schemas: [NO_ERRORS_SCHEMA],
      imports: [
        NoopAnimationsModule
      ],
      declarations: [
        ConfirmDialog,
        TestConfirmDialogComponent,
      ],
      providers:[
        ConfirmationService
      ]
      });
      
      fixture = TestBed.createComponent(TestConfirmDialogComponent);
      confirmDialog = fixture.debugElement.query(By.css('p-confirmDialog')).componentInstance;
      testComponent = fixture.debugElement.componentInstance;
    });

    it('should display the header', () => {
      confirmDialog.header = "PrimengRocks!";
      confirmDialog.visible = true;
      fixture.detectChanges();

      const confirmDialogEl = fixture.debugElement.query(By.css('.ui-dialog-title')).nativeElement;
      expect(confirmDialogEl).toBeTruthy();
      expect(confirmDialogEl.textContent).toContain('PrimengRocks!');
    });

    it('should display the close icon when closable is true', () => {
        confirmDialog.visible = true;
        fixture.detectChanges();

        const closeEl = fixture.debugElement.query(By.css('.ui-dialog-titlebar-icon'));
        expect(closeEl).not.toBeNull();
    });

    it('should not create the container element by default', () => {
      fixture.detectChanges();

      expect(fixture.debugElement.query(By.css('.ui-dialog'))).toBeFalsy;
      expect(confirmDialog.visible).toEqual(undefined);
    });

    it('should add rtl class when rtl is enabled', () => {
      confirmDialog.visible = true;
      confirmDialog.rtl = true;
      fixture.detectChanges();

      expect(fixture.debugElement.query(By.css('div')).classes['ui-dialog-rtl']).toEqual(true);
    });

    it('should not have a close icon', () => {
      confirmDialog.visible = true;
      confirmDialog.closable = false;
      fixture.detectChanges();

      expect(fixture.debugElement.query(By.css('a'))).toBeFalsy();
    });

    it('should change buttonStyles', () => {
      confirmDialog.visible = true;
      confirmDialog.rejectButtonStyleClass = "Primeng ROCKS!";
      confirmDialog.acceptButtonStyleClass = "Primeng ROCKS!";
      fixture.detectChanges();

      expect(fixture.debugElement.query(By.css('.ui-dialog-footer')).children[0].nativeElement.className).toContain("Primeng ROCKS!");
      expect(fixture.debugElement.query(By.css('.ui-dialog-footer')).children[1].nativeElement.className).toContain("Primeng ROCKS!");
    });

    it('should change icons', () => {
      confirmDialog.visible = true;
      confirmDialog.icon = "Primeng ROCKS!";
      confirmDialog.acceptIcon = "Primeng ROCKS!";
      confirmDialog.rejectIcon = "Primeng ROCKS!";
      fixture.detectChanges();

      expect(fixture.debugElement.query(By.css('.ui-confirmdialog-icon')).nativeElement.className).toContain("Primeng ROCKS!");
      expect(fixture.debugElement.query(By.css('.ui-dialog-footer')).children[0].nativeElement.icon).toContain("Primeng ROCKS!");
      expect(fixture.debugElement.query(By.css('.ui-dialog-footer')).children[1].nativeElement.icon).toContain("Primeng ROCKS!");
    });

    it('should not show accept button', () => {
      confirmDialog.visible = true;
      confirmDialog.acceptVisible = false;
      fixture.detectChanges();

      expect(fixture.debugElement.query(By.css('.ui-dialog-footer')).children[1]).toBeFalsy();
    });

    it('should not show reject button', () => {
      confirmDialog.visible = true;
      confirmDialog.rejectVisible = false;
      fixture.detectChanges();

      expect(fixture.debugElement.query(By.css('.ui-dialog-footer')).children[1]).toBeFalsy();
    });

    it('should run accept', () => {
      const messagesEl = fixture.debugElement.query(By.css('p-messages'));
      const confirmEl = fixture.debugElement.query(By.css('button')).nativeElement;
      confirmEl.click();
      fixture.detectChanges();
      
      const acceptButtonEl = fixture.debugElement.query(By.css('.ui-dialog-footer')).children[0].nativeElement;
      acceptButtonEl.click();
      fixture.detectChanges();
      expect(messagesEl.nativeElement.value[0]).toBeTruthy();
      expect(messagesEl.nativeElement.value[0].summary).toContain("Confirmed");
      expect(messagesEl.nativeElement.value[0].detail).toContain("You have accepted");
    });

    it('should run reject', () => {
      const messagesEl = fixture.debugElement.query(By.css('p-messages'));
      const confirmEl = fixture.debugElement.query(By.css('button')).nativeElement;
      confirmEl.click();
      fixture.detectChanges();
      
      const acceptButtonEl = fixture.debugElement.query(By.css('.ui-dialog-footer')).children[1].nativeElement;
      acceptButtonEl.click();
      fixture.detectChanges();

      expect(messagesEl.nativeElement.value[0]).toBeTruthy();
      expect(messagesEl.nativeElement.value[0].summary).toContain("Rejected");
      expect(messagesEl.nativeElement.value[0].detail).toContain("You have rejected");
    });
    
});
