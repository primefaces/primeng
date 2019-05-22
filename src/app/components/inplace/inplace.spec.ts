import { TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Inplace } from './inplace';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('Inplace', () => {
  
    let inplace: Inplace;
    let fixture: ComponentFixture<Inplace>;
  
    beforeEach(() => {
    TestBed.configureTestingModule({
        imports: [
        NoopAnimationsModule
        ],
        declarations: [
        Inplace
        ]
    });

    fixture = TestBed.createComponent(Inplace);
    inplace = fixture.componentInstance;
    });

    it('should display by default', () => {
        fixture.detectChanges();
  
        const inplaceEl = fixture.debugElement.query(By.css('div'));
        expect(inplaceEl.nativeElement).toBeTruthy();
    });

    it('should change style styleClass and closable', () => {
        inplace.style = {'primeng': 'rocks!'};
        inplace.styleClass = "Primeng ROCKS!";
        inplace.closable = true;
        inplace.active = true;
        fixture.detectChanges();
  
        const inplaceEl = fixture.debugElement.query(By.css('div'));
        const closableButton = fixture.debugElement.query(By.css('button'));
        expect(inplaceEl.nativeElement.className).toContain("Primeng ROCKS!");
        expect(inplaceEl.nativeElement.className).toContain("ui-inplace-closable");
        expect(inplaceEl.nativeElement.style.primeng).toContain("rocks!");
        expect(closableButton).toBeTruthy();
    });

    it('should call activate and deactivate', () => {
        inplace.closable = true;
        fixture.detectChanges();
  
        const activateSpy = spyOn(inplace,'activate').and.callThrough();
        const deactivateSpy = spyOn(inplace,'deactivate').and.callThrough();
        const displayEl = fixture.debugElement.query(By.css('.ui-inplace-display'));
        displayEl.nativeElement.click();
        fixture.detectChanges();

        expect(inplace.active).toEqual(true);
        expect(activateSpy).toHaveBeenCalled();
        const closableButtonEl = fixture.debugElement.query(By.css('button'));
        closableButtonEl.nativeElement.click();
        fixture.detectChanges();

        expect(inplace.active).toEqual(false);
        expect(deactivateSpy).toHaveBeenCalled();
    });

    it('should disabled', () => {
        inplace.closable = true;
        inplace.disabled = true;
        fixture.detectChanges();
  
        const activateSpy = spyOn(inplace,'activate').and.callThrough();
        const deactivateSpy = spyOn(inplace,'deactivate').and.callThrough();
        const displayEl = fixture.debugElement.query(By.css('.ui-inplace-display'));
        displayEl.nativeElement.click();
        fixture.detectChanges();

        expect(inplace.active).toEqual(undefined);
        expect(activateSpy).toHaveBeenCalled();
        inplace.active = true;
        fixture.detectChanges();

        const closableButtonEl = fixture.debugElement.query(By.css('button'));
        closableButtonEl.nativeElement.click();
        fixture.detectChanges();

        expect(inplace.active).toEqual(true);
        expect(deactivateSpy).toHaveBeenCalled();
    });
});
