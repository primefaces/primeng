import { TestBed, ComponentFixture, fakeAsync, tick, async } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Galleria } from './galleria';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('Galleria', () => {

    let galleria: Galleria;
    let fixture: ComponentFixture<Galleria>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                NoopAnimationsModule
            ],
            declarations: [
                Galleria
            ]
        });

        fixture = TestBed.createComponent(Galleria);
        galleria = fixture.componentInstance;
        galleria.images = [];
        galleria.images.push({source:'galleria1.jpg', alt:'Description for Image 1', title:'Title 1'});
        galleria.images.push({source:'galleria1.jpg', alt:'Description for Image 2', title:'Title 2'});
        galleria.images.push({source:'galleria1.jpg', alt:'Description for Image 3', title:'Title 3'});
        galleria.images.push({source:'galleria1.jpg', alt:'Description for Image 4', title:'Title 4'});
        galleria.images.push({source:'galleria1.jpg', alt:'Description for Image 5', title:'Title 5'});
    });

    it('should created', () => {
        fixture.detectChanges();
  
        const galleriaEl = fixture.debugElement.query(By.css('.ui-galleria'));
        expect(galleriaEl.nativeElement).toBeTruthy();
    });

    it('should call next after 100ms', (done) => {
        const nextSpy = spyOn(galleria,"next").and.callThrough();
        galleria.transitionInterval = 100;
        fixture.detectChanges();
  
        setTimeout(()=> {
            expect(nextSpy).toHaveBeenCalled();
            done();
        },300);
    });

    it('should call clickNavRight and change the activeIndex', () => {
        fixture.detectChanges();
  
        expect(galleria.activeIndex).toEqual(0);
        const rightButton = fixture.debugElement.query(By.css('.pi-chevron-right'));
        const clickNavRightSpy = spyOn(galleria,"clickNavRight").and.callThrough();
        rightButton.nativeElement.click();
        fixture.detectChanges();

        expect(clickNavRightSpy).toHaveBeenCalled();
        expect(galleria.activeIndex).toEqual(1);
    });
    
    it('should call clickNavLeft and change the activeIndex', () => {
        fixture.detectChanges();
  
        expect(galleria.activeIndex).toEqual(0);
        const rightButton = fixture.debugElement.query(By.css('.pi-chevron-right'));
        const clickNavLeftSpy = spyOn(galleria,"clickNavLeft").and.callThrough();
        rightButton.nativeElement.click();
        fixture.detectChanges();

        const leftButton = fixture.debugElement.query(By.css('.pi-chevron-left'));
        leftButton.nativeElement.click();
        fixture.detectChanges();
        expect(clickNavLeftSpy).toHaveBeenCalled();
        expect(galleria.activeIndex).toEqual(0);
    });

    it('should emit imageClickEvent', () => {
        fixture.detectChanges();
  
        let x = 0;
        galleria.onImageClicked.subscribe(event => {
            x=1;
        });
        const imageEl = fixture.debugElement.query(By.css('.ui-galleria-panel'));
        const clickNavLeftSpy = spyOn(galleria,"clickNavLeft").and.callThrough();
        imageEl.nativeElement.click();
        fixture.detectChanges();

        expect(x).toEqual(1);
    });
});
