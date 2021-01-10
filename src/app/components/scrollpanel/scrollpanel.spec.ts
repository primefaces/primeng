import { TestBed, ComponentFixture, fakeAsync, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ScrollPanel } from './scrollpanel';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Component } from '@angular/core';

@Component({
	template: `
	<div style="width: 300px;">
        <p-scrollPanel [style]="{width: '100%', height: '200px'}" styleClass="custombar1">
            <div style="padding:1em;line-height:1.5;width:600px;">
                The story begins as Don Vito Corleone, the head of a New York Mafia family, oversees his daughter's wedding. His beloved
                son Michael has just come home from the war, but does not intend to become part of his father's business.
                Through Michael's life the nature of the family business becomes clear. The business of the family is just
                like the head of the family, kind and benevolent to those who give respect, but given to ruthless violence
                whenever anything stands against the good of the family. The story begins as Don Vito Corleone, the head
                of a New York Mafia family, oversees his daughter's wedding. His beloved son Michael has just come home from
                the war, but does not intend to become part of his father's business. Through Michael's life the nature of
                the family business becomes clear. The business of the family is just like the head of the family, kind and
                benevolent to those who give respect, but given to ruthless violence whenever anything stands against the
                good of the family.
            </div>
        </p-scrollPanel>
	</div>
	`
})
class TestScrollPanelComponent {
}

describe('ScrollPanel', () => {
  
	let scrollpanel: ScrollPanel;
	let fixture: ComponentFixture<TestScrollPanelComponent>;

	beforeEach(() => {
	TestBed.configureTestingModule({
		imports: [
			NoopAnimationsModule
		],
		declarations: [
			ScrollPanel,
			TestScrollPanelComponent
		]
	});

	fixture = TestBed.createComponent(TestScrollPanelComponent);
	scrollpanel = fixture.debugElement.children[0].children[0].children[0].componentInstance;
	});

	it('should created by default', () => {
		fixture.detectChanges();
  
		const scrollPanelEl = fixture.debugElement.query(By.css('.p-scrollpanel'));
		expect(scrollPanelEl.nativeElement).toBeTruthy();
	});

	it('should scroll when mousedown and move (y)', fakeAsync(() => {
		fixture.detectChanges();
  
		let scrollTopVal = scrollpanel.contentViewChild.nativeElement.scrollTop;
		const barYEl = fixture.debugElement.query(By.css('.p-scrollpanel-bar-y'));
		const mousedownEvent: any = document.createEvent('CustomEvent');
		mousedownEvent.pageY = 201;
		mousedownEvent.initEvent('mousedown', true, true);
		const mouseMoveEvent: any = document.createEvent('CustomEvent');
		mouseMoveEvent.pageY = 250;
        mouseMoveEvent.initEvent('mousemove', true, true);
		barYEl.nativeElement.dispatchEvent(mousedownEvent);
		fixture.detectChanges();
		
		expect(document.body.className).toContain("p-scrollpanel-grabbed");
		document.dispatchEvent(mouseMoveEvent);
		tick(150);
		fixture.detectChanges();

		expect(scrollTopVal).not.toEqual(scrollpanel.contentViewChild.nativeElement.scrollTop);
		const mouseUpEvent: any = document.createEvent('CustomEvent');
		mouseUpEvent.pageY = 201;
		mouseUpEvent.initEvent('mouseup', true, true);
		barYEl.nativeElement.dispatchEvent(mouseUpEvent);
	}));

	it('should scroll when mousedown and move (x)', fakeAsync(() => {
		fixture.detectChanges();
  
		let scrollLeftVal = scrollpanel.contentViewChild.nativeElement.scrollLeft;
		const barXEl = fixture.debugElement.query(By.css('.p-scrollpanel-bar-x'));
		const mousedownEvent: any = document.createEvent('CustomEvent');
		mousedownEvent.pageX = 201;
		mousedownEvent.initEvent('mousedown', true, true);
		const mouseMoveEvent: any = document.createEvent('CustomEvent');
		mouseMoveEvent.pageX = 250;
        mouseMoveEvent.initEvent('mousemove', true, true);
		barXEl.nativeElement.dispatchEvent(mousedownEvent);
		fixture.detectChanges();
		
		expect(document.body.className).toContain("p-scrollpanel-grabbed");
		document.dispatchEvent(mouseMoveEvent);
		tick(150);
		fixture.detectChanges();

		expect(scrollLeftVal).not.toEqual(scrollpanel.contentViewChild.nativeElement.scrollLeft);
		const mouseUpEvent: any = document.createEvent('CustomEvent');
		mouseUpEvent.pageY = 201;
		mouseUpEvent.initEvent('mouseup', true, true);
		barXEl.nativeElement.dispatchEvent(mouseUpEvent);
	}));

	it('should scroll with scrollTop', fakeAsync(() => {
		fixture.detectChanges();
  
		let scrollTopVal = scrollpanel.contentViewChild.nativeElement.scrollTop;
		scrollpanel.scrollTop(150);
		fixture.detectChanges();

		expect(scrollTopVal).not.toEqual(scrollpanel.contentViewChild.nativeElement.scrollTop);
	}));
});
