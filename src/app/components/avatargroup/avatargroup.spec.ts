import { TestBed, ComponentFixture } from '@angular/core/testing';
import { AvatarGroup, AvatarGroupModule } from './avatargroup';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';

describe('AvatarGroup', () => {
    let avatarGroup: AvatarGroup;
    let fixture: ComponentFixture<AvatarGroup>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [NoopAnimationsModule, AvatarGroupModule]
        });

        fixture = TestBed.createComponent(AvatarGroup);
        avatarGroup = fixture.componentInstance;
    });

    it('should display by default', () => {
        fixture.detectChanges();

        const avatarGroupEl = fixture.debugElement.query(By.css('.p-avatar-group'));
        expect(avatarGroupEl.nativeElement).toBeTruthy();
    });
});
