import { TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { SplitButton, SplitButtonModule } from './splitbutton';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonModule } from 'primeng/button';
import { RouterTestingModule } from '@angular/router/testing';

describe('SplitButton', () => {
    let splitbutton: SplitButton;
    let fixture: ComponentFixture<SplitButton>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [NoopAnimationsModule, RouterTestingModule, ButtonModule, SplitButtonModule]
        });

        fixture = TestBed.createComponent(SplitButton);
        splitbutton = fixture.componentInstance;
    });

    it('should display by default', () => {
        fixture.detectChanges();

        const splitButtonEl = fixture.debugElement.query(By.css('.p-splitbutton'));
        expect(splitButtonEl.nativeElement).toBeTruthy();
    });
});
