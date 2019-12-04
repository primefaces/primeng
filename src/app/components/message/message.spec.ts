import { TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { UIMessage } from './message';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('UIMessage', () => {
  
    let message: UIMessage;
    let fixture: ComponentFixture<UIMessage>;

    beforeEach(() => {
    TestBed.configureTestingModule({
        imports: [
        NoopAnimationsModule
        ],
        declarations: [
        UIMessage
        ]
    });

    fixture = TestBed.createComponent(UIMessage);
    message = fixture.componentInstance;
    });

    it('should change severity to success and text', () => {
        message.severity = "success";
        message.text = "Primeng Rocks!";
        fixture.detectChanges();
  
        const messageEl = fixture.debugElement.query(By.css('div'));
        const iconEl = fixture.debugElement.query(By.css('.ui-message-icon'));
        const textEl = fixture.debugElement.query(By.css('.ui-message-text'));
        expect(messageEl.nativeElement).toBeTruthy();
        expect(messageEl.nativeElement.className).toContain("ui-message-success");
        expect(iconEl.nativeElement.className).toContain("pi pi-check");
        expect(textEl.nativeElement.textContent).toContain("Primeng Rocks!");
    });

    it('should change severity to info', () => {
        message.severity = "info";
        fixture.detectChanges();
  
        const messageEl = fixture.debugElement.query(By.css('div'));
        const iconEl = fixture.debugElement.query(By.css('.ui-message-icon'));
        expect(messageEl.nativeElement).toBeTruthy();
        expect(messageEl.nativeElement.className).toContain("ui-message-info");
        expect(iconEl.nativeElement.className).toContain("pi pi-info-circle");
    });

    it('should change severity to error', () => {
        message.severity = "error";
        fixture.detectChanges();
  
        const messageEl = fixture.debugElement.query(By.css('div'));
        const iconEl = fixture.debugElement.query(By.css('.ui-message-icon'));
        expect(messageEl.nativeElement).toBeTruthy();
        expect(messageEl.nativeElement.className).toContain("ui-message-error");
        expect(iconEl.nativeElement.className).toContain("pi pi-times");
    });

    it('should change severity to warning', () => {
        message.severity = "warn";
        fixture.detectChanges();
  
        const messageEl = fixture.debugElement.query(By.css('div'));
        const iconEl = fixture.debugElement.query(By.css('.ui-message-icon'));
        expect(messageEl.nativeElement).toBeTruthy();
        expect(messageEl.nativeElement.className).toContain("ui-message-warn");
        expect(iconEl.nativeElement.className).toContain("pi pi-exclamation-triangle");
    });
    it('should change severity to default', () => {
        message.severity = " ";
        fixture.detectChanges();
  
        const messageEl = fixture.debugElement.query(By.css('div'));
        const iconEl = fixture.debugElement.query(By.css('.ui-message-icon'));
        expect(messageEl.nativeElement).toBeTruthy();
        expect(iconEl.nativeElement.className).toContain("pi pi-info-circle");
    });

});
