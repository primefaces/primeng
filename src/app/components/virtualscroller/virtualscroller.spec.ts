import { ComponentRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { VirtualScroller, VirtualScrollerModule } from './virtualscroller';

fdescribe('VirtualScroller', () => {
    let virtualScroller: VirtualScroller;
    let fixture: ComponentFixture<VirtualScroller>;
    let virtualScrollerRef: ComponentRef<VirtualScroller>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [NoopAnimationsModule, VirtualScrollerModule],
        });

        fixture = TestBed.createComponent(VirtualScroller);
        virtualScroller = fixture.componentInstance;
        virtualScrollerRef = fixture.componentRef;
    });

    it('should render the VirtualScroller with default inputs', () => {
        fixture.detectChanges();

        const virtualScrollerElement = fixture.nativeElement.querySelector('.p-virtualscroller');
        expect(virtualScrollerElement).toBeTruthy();
    });

    it('should apply the correct style and styleClass', () => {
        virtualScrollerRef.setInput('style', { 'max-height': '500px' });
        virtualScrollerRef.setInput('styleClass', 'custom-class');
        fixture.detectChanges();

        const virtualScrollerElement = fixture.nativeElement.querySelector('.p-virtualscroller');
        expect(virtualScrollerElement.style.maxHeight).toBe('500px');
        expect(virtualScrollerElement.classList).toContain('custom-class');
    });

    it('should scroll to the specified index', () => {
        spyOn(virtualScroller.scroller(), 'scrollToIndex');

        virtualScroller.scrollToIndex(10);
        fixture.detectChanges();

        expect(virtualScroller.scroller().scrollToIndex).toHaveBeenCalledWith(10, undefined);
    });
});
