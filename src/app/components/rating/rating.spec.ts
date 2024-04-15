import { TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Rating } from './rating';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { StarFillIcon } from '@alamote/primeng/icons/starfill';
import { StarIcon } from '@alamote/primeng/icons/star';
import { BanIcon } from '@alamote/primeng/icons/ban';

describe('Rating', () => {
    let rating: Rating;
    let fixture: ComponentFixture<Rating>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [NoopAnimationsModule, StarIcon, StarFillIcon, BanIcon],
            declarations: [Rating]
        });

        fixture = TestBed.createComponent(Rating);
        rating = fixture.componentInstance;
    });

    it('should display 5 stars by default', () => {
        fixture.detectChanges();

        const starEl = fixture.debugElement.query(By.css('div')).nativeElement;
        expect(starEl.children.length).toEqual(6);
    });

    it('should display 10 stars ', () => {
        rating.stars = 10;
        fixture.detectChanges();

        const starEl = fixture.debugElement.query(By.css('div')).nativeElement;
        expect(starEl.children.length).toEqual(11);
    });

    it('should ignore cancel ', () => {
        rating.cancel = false;
        fixture.detectChanges();

        const starEl = fixture.debugElement.query(By.css('div')).nativeElement;
        expect(starEl.children.length).toEqual(5);
    });

    it('should disabled', () => {
        rating.disabled = true;
        fixture.detectChanges();

        const starEl = fixture.debugElement.query(By.css('div')).nativeElement;
        expect(starEl.className).toContain('p-disabled');
    });

    it('should change styles and icons', () => {
        rating.value = 2;
        rating.iconOnClass = 'icon on';
        rating.iconOffClass = 'icon off';
        rating.iconCancelClass = 'Primeng Rocks!';
        rating.iconOnStyle = { height: '300px' };
        rating.iconOffStyle = { height: '300px' };
        rating.iconCancelStyle = { height: '300px' };
        fixture.detectChanges();

        const starElements = fixture.debugElement.queryAll(By.css('span'));
        expect(starElements[0].nativeElement.className).toContain('Primeng Rocks!');
        expect(starElements[0].nativeElement.style.height).toEqual('300px');
    });

    it('should value 3', () => {
        fixture.detectChanges();

        const thirdStarEl = fixture.debugElement.queryAll(By.css('.p-rating-icon'))[3].nativeElement;
        thirdStarEl.parentElement.click();
        fixture.detectChanges();

        expect(rating.value).toEqual(3);
    });

    it('should get value from event emitters', () => {
        fixture.detectChanges();

        let onRateValue;
        let onCancelRate;
        const thirdStarEl = fixture.debugElement.queryAll(By.css('.p-rating-icon'))[3].nativeElement;
        const cancelEl = fixture.debugElement.queryAll(By.css('.p-rating-icon'))[0].nativeElement;
        rating.onRate.subscribe((value) => (onRateValue = value));
        rating.onCancel.subscribe((value) => (onCancelRate = value));
        thirdStarEl.parentElement.click();
        cancelEl.parentElement.click();
        fixture.detectChanges();

        expect(onRateValue.value).toEqual(3);
        expect(onCancelRate).toBeTruthy();
    });

    it('should clear value', () => {
        fixture.detectChanges();

        const thirdStarEl = fixture.debugElement.queryAll(By.css('.p-rating-icon'))[3].nativeElement;
        const cancelEl = fixture.debugElement.queryAll(By.css('.p-rating-icon'))[0].nativeElement;
        thirdStarEl.parentElement.click();
        cancelEl.parentElement.click();
        fixture.detectChanges();

        expect(rating.value).toEqual(null);
    });
});
