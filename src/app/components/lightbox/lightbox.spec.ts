import { TestBed, ComponentFixture, tick, fakeAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Lightbox } from './lightbox';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('Lightbox', () => {

    let lightbox: Lightbox;
    let fixture: ComponentFixture<Lightbox>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                NoopAnimationsModule,
            ],
            declarations: [
                Lightbox
            ]
        });

        fixture = TestBed.createComponent(Lightbox);
        lightbox = fixture.componentInstance;
        lightbox.images = [];
        lightbox.images.push({source:'sopranos1.jpg', thumbnail: 'sopranos1_small.jpg', title:'Sopranos 1'});
        lightbox.images.push({source:'sopranos2.jpg', thumbnail: 'sopranos2_small.jpg', title:'Sopranos 2'});
        lightbox.images.push({source:'sopranos3.jpg', thumbnail: 'sopranos3_small.jpg', title:'Sopranos 3'});
        lightbox.images.push({source:'sopranos4.jpg', thumbnail: 'sopranos4_small.jpg', title:'Sopranos 4'});
    });

    it('should display by default', () => {
        lightbox.appendTo = 'body';
        fixture.detectChanges();
  
        const lightboxClickEl = fixture.debugElement.query(By.css('div'));
        expect(lightboxClickEl.nativeElement).toBeTruthy();
    });

    it('should call imageClick', fakeAsync(() => {
        lightbox.appendTo = 'body';
        fixture.detectChanges();
        
        const imageClickSpy = spyOn(lightbox,"onImageClick").and.callThrough();
        const displayImageSpy = spyOn(lightbox,"displayImage").and.callThrough();
        const lightboxClickEl = fixture.debugElement.query(By.css('a'));
        lightboxClickEl.nativeElement.click();
        tick(2000);
        fixture.detectChanges();

        fixture.whenStable().then(() =>{
            expect(imageClickSpy).toHaveBeenCalled();
            expect(displayImageSpy).toHaveBeenCalled();
        });
    }));

    it('should call imageClick', () => {
        lightbox.appendTo = 'body';
        fixture.detectChanges();
        
        const imageClickSpy = spyOn(lightbox,"onImageClick").and.callThrough();
        const hideSpy = spyOn(lightbox,"hide").and.callThrough();
        const lightboxClickEl = fixture.debugElement.query(By.css('a'));
        lightboxClickEl.nativeElement.click();
        fixture.detectChanges();
        
        expect(imageClickSpy).toHaveBeenCalled();
        document.dispatchEvent(new Event('click'));
        fixture.detectChanges();

        expect(hideSpy).toHaveBeenCalled();
    });

    it('should call next', () => {
        lightbox.appendTo = 'body';
        fixture.detectChanges();
        
        const imageClickSpy = spyOn(lightbox,"onImageClick").and.callThrough();
        const nextSpy = spyOn(lightbox,"next").and.callThrough();
        const lightboxClickEl = fixture.debugElement.query(By.css('a'));
        const nextEl = fixture.debugElement.query(By.css('.ui-lightbox-nav-right'));
        lightboxClickEl.nativeElement.click();
        fixture.detectChanges();

        expect(imageClickSpy).toHaveBeenCalled();
        expect(lightbox.index).toEqual(0);
        nextEl.nativeElement.click();
        fixture.detectChanges();

        expect(nextSpy).toHaveBeenCalled();
        expect(lightbox.index).toEqual(1);
    });

    it('should call prev', () => {
        lightbox.appendTo = 'body';
        fixture.detectChanges();
        
        const imageClickSpy = spyOn(lightbox,"onImageClick").and.callThrough();
        const prevSpy = spyOn(lightbox,"prev").and.callThrough();
        const lightboxClickEl = fixture.debugElement.query(By.css('a'));
        const nextEl = fixture.debugElement.query(By.css('.ui-lightbox-nav-right'));
        lightboxClickEl.nativeElement.click();
        fixture.detectChanges();

        expect(imageClickSpy).toHaveBeenCalled();
        expect(lightbox.index).toEqual(0);
        nextEl.nativeElement.click();
        fixture.detectChanges();
        
        const prevEl = fixture.debugElement.query(By.css('.ui-lightbox-nav-left'));
        expect(lightbox.index).toEqual(1);
        prevEl.nativeElement.click();
        fixture.detectChanges();

        expect(prevSpy).toHaveBeenCalled();
        expect(lightbox.index).toEqual(0);
    });

    it('should hide with esc key', () => {
        lightbox.appendTo = document.body;
        fixture.detectChanges();
        
        const imageClickSpy = spyOn(lightbox,"onImageClick").and.callThrough();
        const hideSpy = spyOn(lightbox,"hide").and.callThrough();
        const lightboxClickEl = fixture.debugElement.query(By.css('a'));
        lightboxClickEl.nativeElement.click();
        fixture.detectChanges();
        
        expect(imageClickSpy).toHaveBeenCalled();
        const escapeEvent: any = document.createEvent('CustomEvent');
        escapeEvent.which = 27;
        escapeEvent.initEvent('keydown', true, true);
        document.dispatchEvent(escapeEvent as KeyboardEvent);
        fixture.detectChanges();

        expect(hideSpy).toHaveBeenCalled();
    });
});
