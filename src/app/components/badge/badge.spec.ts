import { TestBed, ComponentFixture } from '@angular/core/testing';
import { Badge, BadgeModule } from './badge';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';

describe('Badge', () => {
    let badge: Badge;
    let fixture: ComponentFixture<Badge>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [NoopAnimationsModule, BadgeModule]
        });

        fixture = TestBed.createComponent(Badge);
        badge = fixture.componentInstance;
    });

    it('should display by default', () => {
        fixture.detectChanges();

        const badgeEl = fixture.debugElement.query(By.css('.p-badge'));
        expect(badgeEl.nativeElement).toBeTruthy();
    });
});
