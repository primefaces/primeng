import { TestBed, ComponentFixture } from '@angular/core/testing';
import { Avatar, AvatarModule } from './avatar';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';

describe('Avatar', () => {
    let avatar: Avatar;
    let fixture: ComponentFixture<Avatar>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [NoopAnimationsModule, AvatarModule]
        });

        fixture = TestBed.createComponent(Avatar);
        avatar = fixture.componentInstance;
    });

    it('should display by default', () => {
        fixture.detectChanges();

        const avatarEl = fixture.debugElement.query(By.css('.p-avatar'));
        expect(avatarEl.nativeElement).toBeTruthy();
    });
});
