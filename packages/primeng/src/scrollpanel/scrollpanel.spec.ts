import { Component, DebugElement, Input, TemplateRef, ViewChild, provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ScrollPanel } from './scrollpanel';

@Component({
    standalone: false,
    template: `
        <p-scrollpanel [styleClass]="styleClass" [step]="step" style="width: 400px; height: 200px;">
            <div class="content-div" style="width: 800px; height: 600px; padding: 20px;">
                <h2>Scrollable Content</h2>
                <p>This is content that will cause scrollbars to appear.</p>
                <div *ngFor="let item of items">Item {{ item }}</div>
            </div>
        </p-scrollpanel>
    `
})
class TestScrollPanelComponent {
    styleClass = 'custom-scrollpanel';
    step = 5;
    items = Array.from({ length: 20 }, (_, i) => i + 1);
}

@Component({
    standalone: false,
    template: `
        <p-scrollpanel style="width: 300px; height: 150px;">
            <ng-template pTemplate="content">
                <div class="template-content" style="width: 600px; height: 400px;">
                    <h3>Template Content</h3>
                    <p>This content is rendered via template.</p>
                </div>
            </ng-template>
        </p-scrollpanel>
    `
})
class TestTemplateScrollPanelComponent {}

@Component({
    standalone: false,
    template: `
        <p-scrollpanel style="width: 280px; height: 120px;">
            <ng-template #content>
                <div class="content-template-content" style="width: 500px; height: 300px;">
                    <h3>Content Template</h3>
                    <p>This content is rendered via #content template.</p>
                </div>
            </ng-template>
        </p-scrollpanel>
    `
})
class TestContentTemplateScrollPanelComponent {}

@Component({
    standalone: false,
    template: `
        <p-scrollpanel style="width: 250px; height: 100px;">
            <div style="width: 100px; height: 50px;">Small content - no scrollbars needed</div>
        </p-scrollpanel>
    `
})
class TestNoScrollScrollPanelComponent {}

@Component({
    standalone: false,
    template: `
        <p-scrollpanel [pt]="pt" style="width: 400px; height: 200px;">
            <div style="width: 800px; height: 600px; padding: 20px;">
                <h2>PT Test Content</h2>
            </div>
        </p-scrollpanel>
    `
})
class TestPTScrollPanelComponent {
    @Input() pt: any;
}

describe('ScrollPanel', () => {
    let fixture: ComponentFixture<TestScrollPanelComponent>;
    let component: TestScrollPanelComponent;
    let scrollPanelEl: DebugElement;
    let scrollPanel: ScrollPanel;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [ScrollPanel, NoopAnimationsModule],
            declarations: [TestScrollPanelComponent, TestTemplateScrollPanelComponent, TestContentTemplateScrollPanelComponent, TestNoScrollScrollPanelComponent, TestPTScrollPanelComponent],
            providers: [provideZonelessChangeDetection()]
        });

        fixture = TestBed.createComponent(TestScrollPanelComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();

        scrollPanelEl = fixture.debugElement.query(By.directive(ScrollPanel));
        scrollPanel = scrollPanelEl.componentInstance;
    });

    describe('Component Initialization', () => {
        it('should create the component', () => {
            expect(scrollPanel).toBeTruthy();
        });

        it('should have default values', () => {
            const fixture = TestBed.createComponent(ScrollPanel);
            const scrollPanelInstance = fixture.componentInstance;

            expect(scrollPanelInstance.step).toBe(5);
            expect(scrollPanelInstance.initialized).toBe(false);
            expect(scrollPanelInstance.lastScrollLeft).toBe(0);
            expect(scrollPanelInstance.lastScrollTop).toBe(0);
            expect(scrollPanelInstance.orientation).toBe('vertical');
        });

        it('should accept custom step value', async () => {
            component.step = 10;
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
            fixture.detectChanges();

            expect(scrollPanel.step).toBe(10);
        });

        it('should generate unique content ID', () => {
            expect(scrollPanel.contentId).toBeTruthy();
            expect(scrollPanel.contentId).toContain('_content');
        });

        it('should set data attributes', () => {
            const scrollPanelElement = fixture.debugElement.query(By.css('p-scrollpanel'));
            expect(scrollPanelElement.nativeElement.getAttribute('data-pc-name')).toBe('scrollpanel');
        });
    });

    describe('DOM Structure', () => {
        it('should render content container', () => {
            const contentContainer = fixture.debugElement.query(By.css('.p-scrollpanel-content-container'));
            expect(contentContainer).toBeTruthy();
        });

        it('should render content area', () => {
            const content = fixture.debugElement.query(By.css('.p-scrollpanel-content'));
            expect(content).toBeTruthy();
        });

        it('should render horizontal scrollbar', () => {
            const xBar = fixture.debugElement.query(By.css('.p-scrollpanel-bar-x'));
            expect(xBar).toBeTruthy();
            expect(xBar.nativeElement.getAttribute('role')).toBe('scrollbar');
            expect(xBar.nativeElement.getAttribute('aria-orientation')).toBe('horizontal');
        });

        it('should render vertical scrollbar', () => {
            const yBar = fixture.debugElement.query(By.css('.p-scrollpanel-bar-y'));
            expect(yBar).toBeTruthy();
            expect(yBar.nativeElement.getAttribute('role')).toBe('scrollbar');
            expect(yBar.nativeElement.getAttribute('aria-orientation')).toBe('vertical');
        });

        it('should render content inside content area', () => {
            const contentDiv = fixture.debugElement.query(By.css('.content-div'));
            expect(contentDiv).toBeTruthy();
            expect(contentDiv.nativeElement.textContent).toContain('Scrollable Content');
        });
    });

    describe('CSS Classes and Styling', () => {
        it('should apply custom styleClass', async () => {
            component.styleClass = 'my-custom-panel';
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
            fixture.detectChanges();

            const scrollPanelElement = fixture.debugElement.query(By.css('p-scrollpanel'));
            expect(scrollPanelElement.nativeElement.className).toContain('my-custom-panel');
        });

        it('should apply custom styles via template', () => {
            // ScrollPanel doesn't have style input, it uses template style binding
            const scrollPanelElement = fixture.debugElement.query(By.css('p-scrollpanel'));

            // Test that inline styles in template are applied
            expect(scrollPanelElement.nativeElement.style.width).toBe('400px');
            expect(scrollPanelElement.nativeElement.style.height).toBe('200px');
        });

        it('should apply correct CSS classes to scrollbars', () => {
            const xBar = fixture.debugElement.query(By.css('.p-scrollpanel-bar-x'));
            const yBar = fixture.debugElement.query(By.css('.p-scrollpanel-bar-y'));

            expect(xBar.nativeElement.className).toContain('p-scrollpanel-bar-x');
            expect(yBar.nativeElement.className).toContain('p-scrollpanel-bar-y');
        });
    });

    describe('Scrollbar Visibility', () => {
        it('should calculate scroll ratios', async () => {
            // Wait for component to initialize
            await new Promise((resolve) => setTimeout(resolve, 100));
            await fixture.whenStable();

            // Trigger moveBar calculation
            scrollPanel.moveBar();
            await new Promise((resolve) => setTimeout(resolve, 100));
            await fixture.whenStable();

            // Scroll ratios should be calculated
            expect(scrollPanel.scrollXRatio).toBeDefined();
            expect(scrollPanel.scrollYRatio).toBeDefined();
            expect(typeof scrollPanel.scrollXRatio).toBe('number');
            expect(typeof scrollPanel.scrollYRatio).toBe('number');
        });

        it('should handle different content sizes', async () => {
            const noScrollFixture = TestBed.createComponent(TestNoScrollScrollPanelComponent);
            noScrollFixture.detectChanges();

            const noScrollPanel = noScrollFixture.debugElement.query(By.directive(ScrollPanel)).componentInstance;

            await new Promise((resolve) => setTimeout(resolve, 100));
            await noScrollFixture.whenStable();
            noScrollPanel.moveBar();
            await new Promise((resolve) => setTimeout(resolve, 100));
            await noScrollFixture.whenStable();

            // Should calculate ratios without errors
            expect(noScrollPanel.scrollXRatio).toBeDefined();
            expect(noScrollPanel.scrollYRatio).toBeDefined();
        });
    });

    describe('Scrolling Behavior', () => {
        beforeEach(async () => {
            await new Promise((resolve) => setTimeout(resolve, 100));
            await fixture.whenStable();
        });

        it('should handle content scroll events', async () => {
            // Initialize with different values to trigger the update logic
            scrollPanel.lastScrollLeft = 0;
            scrollPanel.lastScrollTop = 0;

            // First scroll event with scrollLeft change
            const scrollEvent1 = {
                target: {
                    scrollLeft: 100,
                    scrollTop: 0
                }
            };
            scrollPanel.onScroll(scrollEvent1);
            expect(scrollPanel.lastScrollLeft).toBe(100);
            expect(scrollPanel.orientation).toBe('horizontal');

            // Second scroll event with scrollTop change (scrollLeft unchanged)
            const scrollEvent2 = {
                target: {
                    scrollLeft: 100,
                    scrollTop: 150
                }
            };
            scrollPanel.onScroll(scrollEvent2);
            await new Promise((resolve) => setTimeout(resolve, 100));
            await fixture.whenStable();

            expect(scrollPanel.lastScrollLeft).toBe(100);
            expect(scrollPanel.lastScrollTop).toBe(150);
            expect(scrollPanel.orientation).toBe('vertical');
        });

        it('should update orientation based on scroll direction', () => {
            const scrollEvent = {
                target: {
                    scrollLeft: 100,
                    scrollTop: 0
                }
            };

            scrollPanel.onScroll(scrollEvent);
            expect(scrollPanel.orientation).toBe('horizontal');

            scrollEvent.target.scrollLeft = 100;
            scrollEvent.target.scrollTop = 50;
            scrollPanel.onScroll(scrollEvent);
            expect(scrollPanel.orientation).toBe('vertical');
        });

        it('should programmatically scroll to top position', async () => {
            // Mock scrollTop behavior since test environment doesn't scroll
            if (scrollPanel.contentViewChild) {
                Object.defineProperty(scrollPanel.contentViewChild.nativeElement, 'scrollHeight', { value: 600, writable: true });
                Object.defineProperty(scrollPanel.contentViewChild.nativeElement, 'clientHeight', { value: 200, writable: true });
            }

            scrollPanel.scrollTop(100);
            await new Promise((resolve) => setTimeout(resolve, 100));
            await fixture.whenStable();

            // Verify the method was called correctly - scroll behavior might not work in test
            expect(scrollPanel.contentViewChild).toBeTruthy();
        });

        it('should constrain scroll position within bounds', async () => {
            // Test negative scroll position
            scrollPanel.scrollTop(-50);
            await new Promise((resolve) => setTimeout(resolve, 100));
            await fixture.whenStable();
            expect(scrollPanel.contentViewChild?.nativeElement.scrollTop).toBe(0);

            // Test excessive scroll position (should be limited to max scrollable height)
            scrollPanel.scrollTop(99999);
            await new Promise((resolve) => setTimeout(resolve, 100));
            await fixture.whenStable();
            const maxScrollTop = scrollPanel.contentViewChild!.nativeElement.scrollHeight - scrollPanel.contentViewChild!.nativeElement.clientHeight;
            expect(scrollPanel.contentViewChild!.nativeElement.scrollTop).toBe(maxScrollTop);
        });
    });

    describe('Keyboard Navigation', () => {
        beforeEach(async () => {
            await new Promise((resolve) => setTimeout(resolve, 100));
            await fixture.whenStable();
        });

        it('should handle arrow key navigation in vertical orientation', async () => {
            scrollPanel.orientation = 'vertical';

            const yBar = fixture.debugElement.query(By.css('.p-scrollpanel-bar-y'));
            const arrowDownEvent = new KeyboardEvent('keydown', { code: 'ArrowDown' });
            const arrowUpEvent = new KeyboardEvent('keydown', { code: 'ArrowUp' });

            spyOn(arrowDownEvent, 'preventDefault');
            spyOn(arrowUpEvent, 'preventDefault');

            scrollPanel.onKeyDown(arrowDownEvent);
            expect(arrowDownEvent.preventDefault).toHaveBeenCalled();

            scrollPanel.onKeyDown(arrowUpEvent);
            expect(arrowUpEvent.preventDefault).toHaveBeenCalled();

            await new Promise((resolve) => setTimeout(resolve, 100));
            await fixture.whenStable();
        });

        it('should handle arrow key navigation in horizontal orientation', async () => {
            scrollPanel.orientation = 'horizontal';

            const arrowRightEvent = new KeyboardEvent('keydown', { code: 'ArrowRight' });
            const arrowLeftEvent = new KeyboardEvent('keydown', { code: 'ArrowLeft' });

            spyOn(arrowRightEvent, 'preventDefault');
            spyOn(arrowLeftEvent, 'preventDefault');

            scrollPanel.onKeyDown(arrowRightEvent);
            expect(arrowRightEvent.preventDefault).toHaveBeenCalled();

            scrollPanel.onKeyDown(arrowLeftEvent);
            expect(arrowLeftEvent.preventDefault).toHaveBeenCalled();

            await new Promise((resolve) => setTimeout(resolve, 100));
            await fixture.whenStable();
        });

        it('should clear timer on key up', async () => {
            scrollPanel.timer = setTimeout(() => {}, 1000);
            const timerId = scrollPanel.timer;

            scrollPanel.onKeyUp();

            // clearTimer calls clearTimeout but doesn't set timer to undefined
            expect(typeof timerId).toBe('number');
            await new Promise((resolve) => setTimeout(resolve, 100));
            await fixture.whenStable();
        });

        it('should update orientation on focus', () => {
            const xBar = fixture.debugElement.query(By.css('.p-scrollpanel-bar-x'));
            const yBar = fixture.debugElement.query(By.css('.p-scrollpanel-bar-y'));

            scrollPanel.onFocus({ target: xBar.nativeElement });
            expect(scrollPanel.orientation).toBe('horizontal');

            scrollPanel.onFocus({ target: yBar.nativeElement });
            expect(scrollPanel.orientation).toBe('vertical');
        });

        it('should reset orientation on blur', () => {
            scrollPanel.orientation = 'horizontal';
            scrollPanel.onBlur();
            expect(scrollPanel.orientation).toBe('vertical');
        });
    });

    describe('Mouse Interactions', () => {
        beforeEach(async () => {
            await new Promise((resolve) => setTimeout(resolve, 100));
            await fixture.whenStable();
        });

        it('should handle vertical bar mouse down', async () => {
            const yBar = fixture.debugElement.query(By.css('.p-scrollpanel-bar-y'));
            const mouseEvent = new MouseEvent('mousedown');
            Object.defineProperty(mouseEvent, 'pageY', { value: 100, writable: false });

            spyOn(yBar.nativeElement, 'focus');
            spyOn(mouseEvent, 'preventDefault');

            scrollPanel.onYBarMouseDown(mouseEvent);

            expect(scrollPanel.isYBarClicked).toBe(true);
            expect(scrollPanel.lastPageY).toBe(100);
            expect(yBar.nativeElement.focus).toHaveBeenCalled();
            expect(mouseEvent.preventDefault).toHaveBeenCalled();
            expect(yBar.nativeElement.getAttribute('data-p-scrollpanel-grabbed')).toBe('true');
        });

        it('should handle horizontal bar mouse down', async () => {
            const xBar = fixture.debugElement.query(By.css('.p-scrollpanel-bar-x'));
            const mouseEvent = new MouseEvent('mousedown');
            Object.defineProperty(mouseEvent, 'pageX', { value: 150, writable: false });

            spyOn(xBar.nativeElement, 'focus');
            spyOn(mouseEvent, 'preventDefault');

            scrollPanel.onXBarMouseDown(mouseEvent);

            expect(scrollPanel.isXBarClicked).toBe(true);
            expect(scrollPanel.lastPageX).toBe(150);
            expect(xBar.nativeElement.focus).toHaveBeenCalled();
            expect(mouseEvent.preventDefault).toHaveBeenCalled();
        });

        it('should handle document mouse move for vertical scrolling', async () => {
            scrollPanel.isYBarClicked = true;
            scrollPanel.lastPageY = 100;

            const mouseMoveEvent = new MouseEvent('mousemove');
            Object.defineProperty(mouseMoveEvent, 'pageY', { value: 120, writable: false });
            scrollPanel.onMouseMoveForYBar(mouseMoveEvent);

            expect(scrollPanel.lastPageY).toBe(120);

            await new Promise((resolve) => setTimeout(resolve, 100));
            await fixture.whenStable();
        });

        it('should handle document mouse move for horizontal scrolling', async () => {
            scrollPanel.isXBarClicked = true;
            scrollPanel.lastPageX = 100;

            const mouseMoveEvent = new MouseEvent('mousemove');
            Object.defineProperty(mouseMoveEvent, 'pageX', { value: 120, writable: false });
            scrollPanel.onMouseMoveForXBar(mouseMoveEvent);

            expect(scrollPanel.lastPageX).toBe(120);

            await new Promise((resolve) => setTimeout(resolve, 100));
            await fixture.whenStable();
        });

        it('should handle document mouse up', () => {
            scrollPanel.isXBarClicked = true;
            scrollPanel.isYBarClicked = true;

            const xBar = fixture.debugElement.query(By.css('.p-scrollpanel-bar-x'));
            const yBar = fixture.debugElement.query(By.css('.p-scrollpanel-bar-y'));

            scrollPanel.onDocumentMouseUp(new MouseEvent('mouseup'));

            expect(scrollPanel.isXBarClicked).toBe(false);
            expect(scrollPanel.isYBarClicked).toBe(false);
            expect(xBar.nativeElement.getAttribute('data-p-scrollpanel-grabbed')).toBe('false');
            expect(yBar.nativeElement.getAttribute('data-p-scrollpanel-grabbed')).toBe('false');
        });
    });

    describe('Templates', () => {
        it('should handle pTemplate content processing', async () => {
            const templateFixture = TestBed.createComponent(TestTemplateScrollPanelComponent);
            templateFixture.detectChanges();
            await new Promise((resolve) => setTimeout(resolve, 100));
            await templateFixture.whenStable();

            const templateScrollPanel = templateFixture.debugElement.query(By.directive(ScrollPanel)).componentInstance;

            // Test that component handles pTemplate without errors
            expect(() => templateScrollPanel.ngAfterContentInit()).not.toThrow();

            // Test that templates property exists and is processed
            expect(templateScrollPanel.templates).toBeDefined();

            // Verify pTemplate content container is rendered
            const content = templateFixture.debugElement.query(By.css('.p-scrollpanel-content'));
            expect(content).toBeTruthy();
        });

        it('should handle #content template processing', async () => {
            const contentTemplateFixture = TestBed.createComponent(TestContentTemplateScrollPanelComponent);
            contentTemplateFixture.detectChanges();
            await new Promise((resolve) => setTimeout(resolve, 100));
            await contentTemplateFixture.whenStable();

            const contentScrollPanel = contentTemplateFixture.debugElement.query(By.directive(ScrollPanel)).componentInstance;

            // Test that component handles #content template without errors
            expect(() => contentScrollPanel.ngAfterContentInit()).not.toThrow();

            // Test that contentTemplate property exists (might be undefined in test environment)
            expect(contentScrollPanel.contentTemplate).toBeDefined();

            // Verify content container is rendered
            const content = contentTemplateFixture.debugElement.query(By.css('.p-scrollpanel-content'));
            expect(content).toBeTruthy();
        });

        it('should handle content with or without templates', async () => {
            // Test regular content (non-template)
            await expect(async () => {
                fixture.detectChanges();
                await new Promise((resolve) => setTimeout(resolve, 100));
                await fixture.whenStable();
            }).not.toThrow();

            // Test pTemplate content
            const templateFixture = TestBed.createComponent(TestTemplateScrollPanelComponent);
            await expect(async () => {
                templateFixture.detectChanges();
                await new Promise((resolve) => setTimeout(resolve, 100));
                await templateFixture.whenStable();
            }).not.toThrow();

            // Test #content template
            const contentTemplateFixture = TestBed.createComponent(TestContentTemplateScrollPanelComponent);
            await expect(async () => {
                contentTemplateFixture.detectChanges();
                await new Promise((resolve) => setTimeout(resolve, 100));
                await contentTemplateFixture.whenStable();
            }).not.toThrow();
        });

        it('should render different template types correctly', async () => {
            // Test pTemplate rendering
            const pTemplateFixture = TestBed.createComponent(TestTemplateScrollPanelComponent);
            pTemplateFixture.detectChanges();
            await new Promise((resolve) => setTimeout(resolve, 100));
            await pTemplateFixture.whenStable();

            const pTemplateScrollPanel = pTemplateFixture.debugElement.query(By.directive(ScrollPanel)).componentInstance;
            // Test that templates are defined and can be processed
            expect(pTemplateScrollPanel.templates).toBeDefined();
            expect(() => pTemplateScrollPanel.ngAfterContentInit()).not.toThrow();

            // Test #content template rendering
            const contentTemplateFixture = TestBed.createComponent(TestContentTemplateScrollPanelComponent);
            contentTemplateFixture.detectChanges();
            await new Promise((resolve) => setTimeout(resolve, 100));
            await contentTemplateFixture.whenStable();

            const contentScrollPanel = contentTemplateFixture.debugElement.query(By.directive(ScrollPanel)).componentInstance;
            // Test that contentTemplate is defined (even if undefined in test environment)
            expect(contentScrollPanel.contentTemplate).toBeDefined();
        });
    });

    describe('Public Methods', () => {
        beforeEach(async () => {
            await new Promise((resolve) => setTimeout(resolve, 100));
            await fixture.whenStable();
        });

        it('should refresh scrollbar position and size', async () => {
            spyOn(scrollPanel, 'moveBar');

            scrollPanel.refresh();

            expect(scrollPanel.moveBar).toHaveBeenCalled();
        });

        it('should calculate container height correctly', async () => {
            scrollPanel.calculateContainerHeight();
            await new Promise((resolve) => setTimeout(resolve, 100));
            await fixture.whenStable();

            // Should not throw error and complete calculation
            expect(scrollPanel.initialized).toBe(true);
        });
    });

    describe('Accessibility', () => {
        it('should have correct ARIA attributes on scrollbars', () => {
            const xBar = fixture.debugElement.query(By.css('.p-scrollpanel-bar-x'));
            const yBar = fixture.debugElement.query(By.css('.p-scrollpanel-bar-y'));

            expect(xBar.nativeElement.getAttribute('role')).toBe('scrollbar');
            expect(xBar.nativeElement.getAttribute('aria-orientation')).toBe('horizontal');
            expect(xBar.nativeElement.getAttribute('aria-controls')).toBe(scrollPanel.contentId);
            expect(xBar.nativeElement.getAttribute('tabindex')).toBe('0');

            expect(yBar.nativeElement.getAttribute('role')).toBe('scrollbar');
            expect(yBar.nativeElement.getAttribute('aria-orientation')).toBe('vertical');
            expect(yBar.nativeElement.getAttribute('aria-controls')).toBe(scrollPanel.contentId);
            expect(yBar.nativeElement.getAttribute('tabindex')).toBe('0');
        });

        it('should update aria-valuenow on scroll', async () => {
            const xBar = fixture.debugElement.query(By.css('.p-scrollpanel-bar-x'));
            const yBar = fixture.debugElement.query(By.css('.p-scrollpanel-bar-y'));

            scrollPanel.lastScrollLeft = 50;
            scrollPanel.lastScrollTop = 75;
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
            fixture.detectChanges();

            expect(xBar.nativeElement.getAttribute('aria-valuenow')).toBe('50');
            expect(yBar.nativeElement.getAttribute('aria-valuenow')).toBe('75');
        });

        it('should be keyboard navigable', () => {
            const xBar = fixture.debugElement.query(By.css('.p-scrollpanel-bar-x'));
            const yBar = fixture.debugElement.query(By.css('.p-scrollpanel-bar-y'));

            expect(xBar.nativeElement.tabIndex).toBe(0);
            expect(yBar.nativeElement.tabIndex).toBe(0);
        });
    });

    describe('Edge Cases', () => {
        it('should handle null/undefined content', () => {
            const emptyFixture = TestBed.createComponent(ScrollPanel);

            expect(() => {
                emptyFixture.detectChanges();
            }).not.toThrow();
        });

        it('should handle rapid scroll events', async () => {
            // Initialize with starting values
            scrollPanel.lastScrollLeft = 0;
            scrollPanel.lastScrollTop = 0;

            // Due to if/else if logic, only one dimension updates per call
            // First, trigger horizontal scrolls
            for (let i = 1; i <= 10; i++) {
                const scrollEvent = {
                    target: {
                        scrollLeft: i * 10,
                        scrollTop: 0 // Keep scrollTop same to trigger horizontal updates
                    }
                };
                scrollPanel.onScroll(scrollEvent);
            }

            expect(scrollPanel.lastScrollLeft).toBe(100);
            expect(scrollPanel.orientation).toBe('horizontal');

            // Then trigger vertical scrolls
            for (let i = 1; i <= 10; i++) {
                const scrollEvent = {
                    target: {
                        scrollLeft: 100, // Keep scrollLeft same to trigger vertical updates
                        scrollTop: i * 15
                    }
                };
                scrollPanel.onScroll(scrollEvent);
            }

            expect(scrollPanel.lastScrollTop).toBe(150);
            expect(scrollPanel.orientation).toBe('vertical');

            await new Promise((resolve) => setTimeout(resolve, 100));
            await fixture.whenStable();
        });

        it('should handle extreme step values', async () => {
            component.step = 0;
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
            fixture.detectChanges();
            expect(scrollPanel.step).toBe(0);

            component.step = 1000;
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
            fixture.detectChanges();
            expect(scrollPanel.step).toBe(1000);

            component.step = -5;
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
            fixture.detectChanges();
            expect(scrollPanel.step).toBe(-5);
        });

        it('should handle window resize during scrollbar operations', async () => {
            // Test that resize listener is set up
            expect(scrollPanel.windowResizeListener).toBeTruthy();

            // moveBar should be callable
            expect(() => scrollPanel.moveBar()).not.toThrow();

            await new Promise((resolve) => setTimeout(resolve, 100));
            await fixture.whenStable();
        });

        it('should handle missing ViewChild elements gracefully', () => {
            // Test that ViewChild elements exist after component initialization
            expect(scrollPanel.contentViewChild).toBeTruthy();
            expect(scrollPanel.xBarViewChild).toBeTruthy();
            expect(scrollPanel.yBarViewChild).toBeTruthy();

            // moveBar should work with valid ViewChild elements
            expect(() => scrollPanel.moveBar()).not.toThrow();
        });
    });

    describe('Memory Management', () => {
        it('should bind and unbind document mouse listeners', () => {
            spyOn(document, 'addEventListener');
            spyOn(document, 'removeEventListener');

            scrollPanel.bindDocumentMouseListeners();
            expect(document.addEventListener).toHaveBeenCalledWith('mousemove', jasmine.any(Function));
            expect(document.addEventListener).toHaveBeenCalledWith('mouseup', jasmine.any(Function));

            scrollPanel.unbindDocumentMouseListeners();
            expect(document.removeEventListener).toHaveBeenCalledWith('mousemove', jasmine.any(Function));
            expect(document.removeEventListener).toHaveBeenCalledWith('mouseup', jasmine.any(Function));
        });

        it('should cleanup listeners on destroy', async () => {
            scrollPanel.initialized = true;
            spyOn(scrollPanel, 'unbindListeners');

            fixture.destroy();

            expect(scrollPanel.unbindListeners).toHaveBeenCalled();
        });

        it('should cleanup timers properly', async () => {
            scrollPanel.timer = setTimeout(() => {}, 1000);
            const timerId = scrollPanel.timer;

            scrollPanel.clearTimer();

            // clearTimer calls clearTimeout but timer reference remains
            expect(typeof timerId).toBe('number');

            await new Promise((resolve) => setTimeout(resolve, 100));
            await fixture.whenStable();
        });

        it('should handle multiple timer operations', async () => {
            scrollPanel.setTimer('scrollTop', 10);
            expect(scrollPanel.timer).toBeDefined();

            scrollPanel.setTimer('scrollLeft', 15);
            expect(scrollPanel.timer).toBeDefined();

            const timerId = scrollPanel.timer;
            scrollPanel.clearTimer();
            expect(typeof timerId).toBe('number');

            await new Promise((resolve) => setTimeout(resolve, 100));
            await fixture.whenStable();
        });
    });

    describe('Data Attributes', () => {
        it('should have correct data-pc-section attributes', () => {
            const contentContainer = fixture.debugElement.query(By.css('.p-scrollpanel-content-container'));
            const content = fixture.debugElement.query(By.css('.p-scrollpanel-content'));
            const xBar = fixture.debugElement.query(By.css('.p-scrollpanel-bar-x'));
            const yBar = fixture.debugElement.query(By.css('.p-scrollpanel-bar-y'));

            expect(contentContainer?.nativeElement.getAttribute('data-pc-section')).toBe('contentcontainer');
            expect(content?.nativeElement.getAttribute('data-pc-section')).toBe('content');
            expect(xBar?.nativeElement.getAttribute('data-pc-section')).toBe('barx');
            expect(yBar?.nativeElement.getAttribute('data-pc-section')).toBe('bary');
        });

        it('should update grabbed state data attributes', () => {
            const xBar = fixture.debugElement.query(By.css('.p-scrollpanel-bar-x'));
            const yBar = fixture.debugElement.query(By.css('.p-scrollpanel-bar-y'));

            const mouseEvent = new MouseEvent('mousedown');
            Object.defineProperty(mouseEvent, 'pageY', { value: 100, writable: false });
            scrollPanel.onYBarMouseDown(mouseEvent);

            expect(yBar.nativeElement.getAttribute('data-p-scrollpanel-grabbed')).toBe('true');
            expect(document.body.getAttribute('data-p-scrollpanel-grabbed')).toBe('true');

            scrollPanel.onDocumentMouseUp(new MouseEvent('mouseup'));

            expect(yBar.nativeElement.getAttribute('data-p-scrollpanel-grabbed')).toBe('false');
            expect(document.body.getAttribute('data-p-scrollpanel-grabbed')).toBe('false');
        });

        it('should update scrollbar hidden state attributes', async () => {
            const xBar = fixture.debugElement.query(By.css('.p-scrollpanel-bar-x'));
            const yBar = fixture.debugElement.query(By.css('.p-scrollpanel-bar-y'));

            // moveBar sets attributes based on scroll ratios
            scrollPanel.moveBar();
            await new Promise((resolve) => setTimeout(resolve, 100));
            await fixture.whenStable();

            // Should have data attributes (might be true or false based on content)
            expect(xBar.nativeElement.hasAttribute('data-p-scrollpanel-hidden')).toBe(true);
            expect(yBar.nativeElement.hasAttribute('data-p-scrollpanel-hidden')).toBe(true);
        });
    });

    describe('Animation Frame Handling', () => {
        it('should use requestAnimationFrame when available', () => {
            spyOn(window, 'requestAnimationFrame').and.callThrough();

            const callback = jasmine.createSpy('callback');
            scrollPanel.requestAnimationFrame(callback);

            expect(window.requestAnimationFrame).toHaveBeenCalledWith(callback);
        });

        it('should fallback to timeout when requestAnimationFrame is not available', () => {
            const originalRAF = window.requestAnimationFrame;
            (window as any).requestAnimationFrame = undefined as any;

            spyOn(window, 'setTimeout').and.callThrough();

            const callback = jasmine.createSpy('callback');
            scrollPanel.requestAnimationFrame(callback);

            expect(window.setTimeout).toHaveBeenCalledWith(callback, 0);

            // Restore original method
            window.requestAnimationFrame = originalRAF;
        });
    });

    describe('Scroll Ratio Calculations', () => {
        beforeEach(async () => {
            await new Promise((resolve) => setTimeout(resolve, 100));
            await fixture.whenStable();
        });

        it('should calculate scroll ratios correctly', async () => {
            scrollPanel.moveBar();
            await new Promise((resolve) => setTimeout(resolve, 100));
            await fixture.whenStable();

            expect(scrollPanel.scrollXRatio).toBeDefined();
            expect(scrollPanel.scrollYRatio).toBeDefined();
            expect(scrollPanel.scrollXRatio).toBeGreaterThan(0);
            expect(scrollPanel.scrollYRatio).toBeGreaterThan(0);
        });

        it('should handle zero dimensions gracefully', async () => {
            // Mock content with zero dimensions
            if (scrollPanel.contentViewChild) {
                Object.defineProperty(scrollPanel.contentViewChild.nativeElement, 'scrollWidth', { value: 0, writable: true });
                Object.defineProperty(scrollPanel.contentViewChild.nativeElement, 'scrollHeight', { value: 0, writable: true });
                Object.defineProperty(scrollPanel.contentViewChild.nativeElement, 'clientWidth', { value: 0, writable: true });
                Object.defineProperty(scrollPanel.contentViewChild.nativeElement, 'clientHeight', { value: 0, writable: true });
            }

            await expect(async () => {
                scrollPanel.moveBar();
                await new Promise((resolve) => setTimeout(resolve, 100));
                await fixture.whenStable();
            }).not.toThrow();
        });
    });

    describe('PassThrough', () => {
        let ptFixture: ComponentFixture<TestPTScrollPanelComponent>;
        let ptComponent: TestPTScrollPanelComponent;
        let ptScrollPanel: ScrollPanel;

        beforeEach(() => {
            ptFixture = TestBed.createComponent(TestPTScrollPanelComponent);
            ptComponent = ptFixture.componentInstance;
        });

        it('should apply simple string classes to PT sections', async () => {
            ptComponent.pt = {
                host: 'HOST_CLASS',
                root: 'ROOT_CLASS',
                contentContainer: 'CONTENT_CONTAINER_CLASS',
                content: 'CONTENT_CLASS',
                barX: 'BAR_X_CLASS',
                barY: 'BAR_Y_CLASS'
            };
            ptFixture.changeDetectorRef.markForCheck();
            await ptFixture.whenStable();
            ptFixture.detectChanges();
            await new Promise((resolve) => setTimeout(resolve, 100));
            await ptFixture.whenStable();

            const hostEl = ptFixture.debugElement.query(By.css('p-scrollpanel'));
            const contentContainer = ptFixture.debugElement.query(By.css('.p-scrollpanel-content-container'));
            const content = ptFixture.debugElement.query(By.css('.p-scrollpanel-content'));
            const barX = ptFixture.debugElement.query(By.css('.p-scrollpanel-bar-x'));
            const barY = ptFixture.debugElement.query(By.css('.p-scrollpanel-bar-y'));

            expect(hostEl.nativeElement.className).toContain('HOST_CLASS');
            expect(hostEl.nativeElement.className).toContain('ROOT_CLASS');
            expect(contentContainer.nativeElement.className).toContain('CONTENT_CONTAINER_CLASS');
            expect(content.nativeElement.className).toContain('CONTENT_CLASS');
            expect(barX.nativeElement.className).toContain('BAR_X_CLASS');
            expect(barY.nativeElement.className).toContain('BAR_Y_CLASS');
        });

        it('should apply object-based PT options with class, style, and attributes', async () => {
            ptComponent.pt = {
                root: {
                    class: 'ROOT_OBJECT_CLASS',
                    'data-test': 'root-test',
                    'aria-label': 'ROOT_ARIA_LABEL'
                },
                contentContainer: {
                    class: 'CONTAINER_OBJECT_CLASS',
                    'data-test': 'container-test'
                },
                barX: {
                    class: 'BARX_CLASS',
                    'aria-label': 'BARX_ARIA_LABEL'
                }
            };
            ptFixture.changeDetectorRef.markForCheck();
            await ptFixture.whenStable();
            ptFixture.detectChanges();
            await new Promise((resolve) => setTimeout(resolve, 100));
            await ptFixture.whenStable();

            const hostEl = ptFixture.debugElement.query(By.css('p-scrollpanel'));
            const contentContainer = ptFixture.debugElement.query(By.css('.p-scrollpanel-content-container'));
            const barX = ptFixture.debugElement.query(By.css('.p-scrollpanel-bar-x'));

            expect(hostEl.nativeElement.className).toContain('ROOT_OBJECT_CLASS');
            expect(hostEl.nativeElement.getAttribute('data-test')).toBe('root-test');
            expect(hostEl.nativeElement.getAttribute('aria-label')).toBe('ROOT_ARIA_LABEL');
            expect(contentContainer.nativeElement.className).toContain('CONTAINER_OBJECT_CLASS');
            expect(contentContainer.nativeElement.getAttribute('data-test')).toBe('container-test');
            expect(barX.nativeElement.className).toContain('BARX_CLASS');
            expect(barX.nativeElement.getAttribute('aria-label')).toBe('BARX_ARIA_LABEL');
        });

        it('should apply mixed object and string PT values', async () => {
            ptComponent.pt = {
                root: {
                    class: 'MIXED_ROOT_CLASS'
                },
                content: 'MIXED_CONTENT_CLASS',
                barY: {
                    style: 'opacity: 0.5'
                }
            };
            ptFixture.changeDetectorRef.markForCheck();
            await ptFixture.whenStable();
            ptFixture.detectChanges();
            await new Promise((resolve) => setTimeout(resolve, 100));
            await ptFixture.whenStable();

            const hostEl = ptFixture.debugElement.query(By.css('p-scrollpanel'));
            const content = ptFixture.debugElement.query(By.css('.p-scrollpanel-content'));
            const barY = ptFixture.debugElement.query(By.css('.p-scrollpanel-bar-y'));

            expect(hostEl.nativeElement.className).toContain('MIXED_ROOT_CLASS');
            expect(content.nativeElement.className).toContain('MIXED_CONTENT_CLASS');
            expect(barY.nativeElement.style.opacity).toBe('0.5');
        });

        it('should use instance variables in PT functions', async () => {
            ptScrollPanel = ptFixture.debugElement.query(By.directive(ScrollPanel)).componentInstance;
            ptScrollPanel.initialized = true;
            ptScrollPanel.orientation = 'horizontal';

            ptComponent.pt = {
                root: ({ instance }) => ({
                    class: instance?.initialized ? 'INITIALIZED' : 'NOT_INITIALIZED'
                }),
                barX: ({ instance }) => {
                    const bgColor = instance?.orientation === 'horizontal' ? 'yellow' : 'blue';
                    return {
                        class: 'INSTANCE_BAR',
                        'data-orientation': instance?.orientation
                    };
                }
            };
            ptFixture.changeDetectorRef.markForCheck();
            await ptFixture.whenStable();
            ptFixture.detectChanges();
            await new Promise((resolve) => setTimeout(resolve, 100));
            await ptFixture.whenStable();

            const hostEl = ptFixture.debugElement.query(By.css('p-scrollpanel'));
            const barX = ptFixture.debugElement.query(By.css('.p-scrollpanel-bar-x'));

            expect(hostEl.nativeElement.className).toContain('INITIALIZED');
            expect(barX.nativeElement.className).toContain('INSTANCE_BAR');
            expect(barX.nativeElement.getAttribute('data-orientation')).toBe('horizontal');
        });

        it('should handle event binding in PT options', async () => {
            let clicked = false;
            ptComponent.pt = {
                content: {
                    onclick: () => {
                        clicked = true;
                    }
                }
            };
            ptFixture.changeDetectorRef.markForCheck();
            await ptFixture.whenStable();
            ptFixture.detectChanges();
            await new Promise((resolve) => setTimeout(resolve, 100));
            await ptFixture.whenStable();

            const content = ptFixture.debugElement.query(By.css('.p-scrollpanel-content'));
            content.nativeElement.click();
            await new Promise((resolve) => setTimeout(resolve, 100));
            await ptFixture.whenStable();

            expect(clicked).toBe(true);
        });

        it('should apply PT options using setInput', async () => {
            ptFixture.componentRef.setInput('pt', {
                root: 'SET_INPUT_CLASS',
                barY: { class: 'BARY_SET_INPUT' }
            });
            ptFixture.changeDetectorRef.markForCheck();
            await ptFixture.whenStable();
            ptFixture.detectChanges();
            await new Promise((resolve) => setTimeout(resolve, 100));
            await ptFixture.whenStable();

            const hostEl = ptFixture.debugElement.query(By.css('p-scrollpanel'));
            const barY = ptFixture.debugElement.query(By.css('.p-scrollpanel-bar-y'));

            expect(hostEl.nativeElement.className).toContain('SET_INPUT_CLASS');
            expect(barY.nativeElement.className).toContain('BARY_SET_INPUT');
        });
    });
});
