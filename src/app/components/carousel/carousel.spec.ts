import { TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Carousel } from './carousel';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('Carousel', () => {
  
    let carousel: Carousel;
    let fixture: ComponentFixture<Carousel>;

    beforeEach(() => {
    TestBed.configureTestingModule({
        imports: [
        NoopAnimationsModule
        ],
        declarations: [
        Carousel
        ]
    });

    fixture = TestBed.createComponent(Carousel);
    carousel = fixture.componentInstance;
    carousel.value =[
        {vin: 'r3278r2', year: 2010, brand: 'Audi', color: 'Black'},
        {vin: 'jhto2g2', year: 2015, brand: 'BMW', color: 'White'},
        {vin: 'h453w54', year: 2012, brand: 'Honda', color: 'Blue'},
        {vin: 'g43gwwg', year: 1998, brand: 'Renault', color: 'White'},
        {vin: 'gf45wg5', year: 2011, brand: 'VW', color: 'Red'},
        {vin: 'bhv5y5w', year: 2015, brand: 'Jaguar', color: 'Blue'},
        {vin: 'ybw5fsd', year: 2012, brand: 'Ford', color: 'Yellow'},
        {vin: '45665e5', year: 2011, brand: 'Mercedes', color: 'Brown'},
        {vin: 'he6sb5v', year: 2015, brand: 'Ford', color: 'Black'}
    ];
});

    it('should created by default', () => {
        fixture.detectChanges();
  
        const containerEl = fixture.debugElement.query(By.css('.p-carousel'));
        expect(containerEl.nativeElement).toBeTruthy();
    });

    it('should create 9 elements', () => {
        fixture.detectChanges();
  
        const containerEl = fixture.debugElement.queryAll(By.css('.p-carousel-item'));
        expect(containerEl.length).toEqual(9);
    });

    it('should call the navForward (circular)', () => {
        carousel.circular = true;
        fixture.detectChanges();
  
        const onNextNavSpy = spyOn(carousel,"navForward").and.callThrough();
        const nextEl = fixture.debugElement.query(By.css('.p-carousel-next'));
        expect(carousel.page).toEqual(0);
        nextEl.nativeElement.click();
        fixture.detectChanges();

        expect(onNextNavSpy).toHaveBeenCalled();
        expect(carousel.page).toEqual(1);
        nextEl.nativeElement.click();
        nextEl.nativeElement.click();
        fixture.detectChanges();

        expect(carousel.page).toEqual(3);
    });

    it('should call the navBackward (circular)', () => {
        carousel.circular = true;
        fixture.detectChanges();
  
        const onPrevNavSpy = spyOn(carousel,"navBackward").and.callThrough();
        const prevEl = fixture.debugElement.query(By.css('.p-carousel-prev'));
        expect(carousel.page).toEqual(0);
        prevEl.nativeElement.click();
        fixture.detectChanges();

        expect(onPrevNavSpy).toHaveBeenCalled();
        expect(carousel.page).toEqual(8);
        prevEl.nativeElement.click();
        fixture.detectChanges();

        expect(carousel.page).toEqual(7);
    });

    it('should call updateState when window resize', () => {
        fixture.detectChanges();

        expect(carousel.totalDots()).toEqual(9);
        (<any>window).innerWidth = 490;
        window.dispatchEvent(new Event("resize"));
        fixture.detectChanges();

        expect(carousel.totalDots()).toEqual(9);
        window.dispatchEvent(new Event("resize"));
        fixture.detectChanges();

        (<any>window).innerWidth = 1000;
        window.dispatchEvent(new Event("resize"));
        fixture.detectChanges();

        expect(carousel.totalDots()).toEqual(9);
    });

    it('should show with autoPlay', (done) => {
        carousel.autoplayInterval = 100;
        fixture.detectChanges();

        expect(carousel.page).toEqual(0);
        fixture.detectChanges();

        setTimeout(()=> {
            expect(carousel.page).toEqual(1);
            done();
        },102);
    });
});
