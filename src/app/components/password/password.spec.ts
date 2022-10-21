import { TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Password, PasswordModule } from './password';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('Password', () => {
    let password: Password;
    let fixture: ComponentFixture<Password>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [NoopAnimationsModule, PasswordModule]
        });

        fixture = TestBed.createComponent(Password);
        password = fixture.componentInstance;
    });

    it('should not display by default', () => {
        fixture.detectChanges();

        const passworOverlaydEl = fixture.debugElement.query(By.css('.p-password-panel-overlay'));
        expect(passworOverlaydEl).toBeNull();
    });
});
