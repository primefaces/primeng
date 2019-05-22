import { TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Rating } from './rating';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('Rating', () => {
  
    let rating: Rating;
    let fixture: ComponentFixture<Rating>;
    
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [
          NoopAnimationsModule
        ],
        declarations: [
          Rating
        ]
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
      expect(starEl.className).toContain('ui-state-disabled');
    });

    it('should change styles and icons', () => {
      rating.value = 2;
      rating.iconOnClass = "icon on";
      rating.iconOffClass = "icon off";
      rating.iconCancelClass = "Primeng Rocks!";
      rating.iconOnStyle = {'icon':'on'};
      rating.iconOffStyle = {'icon':'off'};
      rating.iconCancelStyle = {'primeng':'rocks!'};
      fixture.detectChanges();

      const starElements = fixture.debugElement.queryAll(By.css('span'));
      expect(starElements[0].nativeElement.className).toContain('Primeng Rocks!');
      expect(starElements[1].nativeElement.className).toContain('icon on');
      expect(starElements[3].nativeElement.className).toContain('icon off');
      expect(starElements[0].nativeElement.style.primeng).toContain('rocks');
      expect(starElements[1].nativeElement.style.icon).toContain('on');
      expect(starElements[3].nativeElement.style.icon).toContain('off');
    });

    it('should value 3', () => {
      fixture.detectChanges();

      const thirdStarEl = fixture.debugElement.queryAll(By.css('a'))[3].nativeElement;
      thirdStarEl.click();
      fixture.detectChanges();

      expect(rating.value).toEqual(3);
    });

    it('should get value from event emitters', () => {
      fixture.detectChanges();

      let onRateValue;
      let onCancelRate;
      const thirdStarEl = fixture.debugElement.queryAll(By.css('a'))[3].nativeElement;
      const cancelEl = fixture.debugElement.queryAll(By.css('a'))[0].nativeElement;
      rating.onRate.subscribe(value => onRateValue=value);
      rating.onCancel.subscribe(value => onCancelRate = value);
      thirdStarEl.click();
      cancelEl.click();
      fixture.detectChanges();

      expect(onRateValue.value).toEqual(3);
      expect(onCancelRate).toBeTruthy();
    });

    it('should clear value', () => {
      fixture.detectChanges();

      const thirdStarEl = fixture.debugElement.queryAll(By.css('a'))[3].nativeElement;
      const cancelEl = fixture.debugElement.queryAll(By.css('a'))[0].nativeElement;
      thirdStarEl.click();
      cancelEl.click();
      fixture.detectChanges();

      expect(rating.value).toEqual(null);
    });

});
