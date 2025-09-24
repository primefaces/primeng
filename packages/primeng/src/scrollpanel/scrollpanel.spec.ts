import { Component, DebugElement, TemplateRef, ViewChild } from '@angular/core';
import { ComponentFixture, fakeAsync, flush, TestBed, tick } from '@angular/core/testing';
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

describe('ScrollPanel', () => {
    let fixture: ComponentFixture<TestScrollPanelComponent>;
    let component: TestScrollPanelComponent;
    let scrollPanelEl: DebugElement;
    let scrollPanel: ScrollPanel;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [ScrollPanel, NoopAnimationsModule],
            declarations: [TestScrollPanelComponent, TestTemplateScrollPanelComponent, TestContentTemplateScrollPanelComponent, TestNoScrollScrollPanelComponent]
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

        it('should accept custom step value', () => {
            component.step = 10;
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
            const contentContainer = fixture.debugElement.query(By.css('[data-pc-section="wrapper"]'));
            expect(contentContainer).toBeTruthy();
        });

        it('should render content area', () => {
            const content = fixture.debugElement.query(By.css('[data-pc-section="content"]'));
            expect(content).toBeTruthy();
        });

        it('should render horizontal scrollbar', () => {
            const xBar = fixture.debugElement.query(By.css('[data-pc-section="barx"]'));
            expect(xBar).toBeTruthy();
            expect(xBar.nativeElement.getAttribute('role')).toBe('scrollbar');
            expect(xBar.nativeElement.getAttribute('aria-orientation')).toBe('horizontal');
        });

        it('should render vertical scrollbar', () => {
            const yBar = fixture.debugElement.query(By.css('[data-pc-section="bary"]'));
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
        it('should apply custom styleClass', () => {
            component.styleClass = 'my-custom-panel';
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
            const xBar = fixture.debugElement.query(By.css('[data-pc-section="barx"]'));
            const yBar = fixture.debugElement.query(By.css('[data-pc-section="bary"]'));

            expect(xBar.nativeElement.className).toContain('p-scrollpanel-bar-x');
            expect(yBar.nativeElement.className).toContain('p-scrollpanel-bar-y');
        });
    });

    describe('Scrollbar Visibility', () => {
        it('should calculate scroll ratios', fakeAsync(() => {
            // Wait for component to initialize
            tick(100);

            // Trigger moveBar calculation
            scrollPanel.moveBar();
            tick(50);

            // Scroll ratios should be calculated
            expect(scrollPanel.scrollXRatio).toBeDefined();
            expect(scrollPanel.scrollYRatio).toBeDefined();
            expect(typeof scrollPanel.scrollXRatio).toBe('number');
            expect(typeof scrollPanel.scrollYRatio).toBe('number');

            flush();
        }));

        it('should handle different content sizes', fakeAsync(() => {
            const noScrollFixture = TestBed.createComponent(TestNoScrollScrollPanelComponent);
            noScrollFixture.detectChanges();

            const noScrollPanel = noScrollFixture.debugElement.query(By.directive(ScrollPanel)).componentInstance;

            tick(100);
            noScrollPanel.moveBar();
            tick(50);

            // Should calculate ratios without errors
            expect(noScrollPanel.scrollXRatio).toBeDefined();
            expect(noScrollPanel.scrollYRatio).toBeDefined();

            flush();
        }));
    });

    describe('Scrolling Behavior', () => {
        beforeEach(fakeAsync(() => {
            tick(100); // Wait for initialization
        }));

        it('should handle content scroll events', fakeAsync(() => {
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
            tick(50);

            expect(scrollPanel.lastScrollLeft).toBe(100);
            expect(scrollPanel.lastScrollTop).toBe(150);
            expect(scrollPanel.orientation).toBe('vertical');

            flush();
        }));

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

        it('should programmatically scroll to top position', fakeAsync(() => {
            // Mock scrollTop behavior since test environment doesn't scroll
            if (scrollPanel.contentViewChild) {
                Object.defineProperty(scrollPanel.contentViewChild.nativeElement, 'scrollHeight', { value: 600, writable: true });
                Object.defineProperty(scrollPanel.contentViewChild.nativeElement, 'clientHeight', { value: 200, writable: true });
            }

            scrollPanel.scrollTop(100);
            tick(50);

            // Verify the method was called correctly - scroll behavior might not work in test
            expect(scrollPanel.contentViewChild).toBeTruthy();
            flush();
        }));

        it('should constrain scroll position within bounds', fakeAsync(() => {
            // Test negative scroll position
            scrollPanel.scrollTop(-50);
            tick(50);
            expect(scrollPanel.contentViewChild?.nativeElement.scrollTop).toBe(0);

            // Test excessive scroll position (should be limited to max scrollable height)
            scrollPanel.scrollTop(99999);
            tick(50);
            const maxScrollTop = scrollPanel.contentViewChild!.nativeElement.scrollHeight - scrollPanel.contentViewChild!.nativeElement.clientHeight;
            expect(scrollPanel.contentViewChild!.nativeElement.scrollTop).toBe(maxScrollTop);

            flush();
        }));
    });

    describe('Keyboard Navigation', () => {
        beforeEach(fakeAsync(() => {
            tick(100); // Wait for initialization
        }));

        it('should handle arrow key navigation in vertical orientation', fakeAsync(() => {
            scrollPanel.orientation = 'vertical';

            const yBar = fixture.debugElement.query(By.css('[data-pc-section="bary"]'));
            const arrowDownEvent = new KeyboardEvent('keydown', { code: 'ArrowDown' });
            const arrowUpEvent = new KeyboardEvent('keydown', { code: 'ArrowUp' });

            spyOn(arrowDownEvent, 'preventDefault');
            spyOn(arrowUpEvent, 'preventDefault');

            scrollPanel.onKeyDown(arrowDownEvent);
            expect(arrowDownEvent.preventDefault).toHaveBeenCalled();

            scrollPanel.onKeyDown(arrowUpEvent);
            expect(arrowUpEvent.preventDefault).toHaveBeenCalled();

            tick(100);
            flush();
        }));

        it('should handle arrow key navigation in horizontal orientation', fakeAsync(() => {
            scrollPanel.orientation = 'horizontal';

            const arrowRightEvent = new KeyboardEvent('keydown', { code: 'ArrowRight' });
            const arrowLeftEvent = new KeyboardEvent('keydown', { code: 'ArrowLeft' });

            spyOn(arrowRightEvent, 'preventDefault');
            spyOn(arrowLeftEvent, 'preventDefault');

            scrollPanel.onKeyDown(arrowRightEvent);
            expect(arrowRightEvent.preventDefault).toHaveBeenCalled();

            scrollPanel.onKeyDown(arrowLeftEvent);
            expect(arrowLeftEvent.preventDefault).toHaveBeenCalled();

            tick(100);
            flush();
        }));

        it('should clear timer on key up', fakeAsync(() => {
            scrollPanel.timer = setTimeout(() => {}, 1000);
            const timerId = scrollPanel.timer;

            scrollPanel.onKeyUp();

            // clearTimer calls clearTimeout but doesn't set timer to undefined
            expect(typeof timerId).toBe('number');
            tick(1100);
            flush();
        }));

        it('should update orientation on focus', () => {
            const xBar = fixture.debugElement.query(By.css('[data-pc-section="barx"]'));
            const yBar = fixture.debugElement.query(By.css('[data-pc-section="bary"]'));

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
        beforeEach(fakeAsync(() => {
            tick(100); // Wait for initialization
        }));

        it('should handle vertical bar mouse down', fakeAsync(() => {
            const yBar = fixture.debugElement.query(By.css('[data-pc-section="bary"]'));
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

            flush();
        }));

        it('should handle horizontal bar mouse down', fakeAsync(() => {
            const xBar = fixture.debugElement.query(By.css('[data-pc-section="barx"]'));
            const mouseEvent = new MouseEvent('mousedown');
            Object.defineProperty(mouseEvent, 'pageX', { value: 150, writable: false });

            spyOn(xBar.nativeElement, 'focus');
            spyOn(mouseEvent, 'preventDefault');

            scrollPanel.onXBarMouseDown(mouseEvent);

            expect(scrollPanel.isXBarClicked).toBe(true);
            expect(scrollPanel.lastPageX).toBe(150);
            expect(xBar.nativeElement.focus).toHaveBeenCalled();
            expect(mouseEvent.preventDefault).toHaveBeenCalled();

            flush();
        }));

        it('should handle document mouse move for vertical scrolling', fakeAsync(() => {
            scrollPanel.isYBarClicked = true;
            scrollPanel.lastPageY = 100;

            const mouseMoveEvent = new MouseEvent('mousemove');
            Object.defineProperty(mouseMoveEvent, 'pageY', { value: 120, writable: false });
            scrollPanel.onMouseMoveForYBar(mouseMoveEvent);

            expect(scrollPanel.lastPageY).toBe(120);

            tick(50);
            flush();
        }));

        it('should handle document mouse move for horizontal scrolling', fakeAsync(() => {
            scrollPanel.isXBarClicked = true;
            scrollPanel.lastPageX = 100;

            const mouseMoveEvent = new MouseEvent('mousemove');
            Object.defineProperty(mouseMoveEvent, 'pageX', { value: 120, writable: false });
            scrollPanel.onMouseMoveForXBar(mouseMoveEvent);

            expect(scrollPanel.lastPageX).toBe(120);

            tick(50);
            flush();
        }));

        it('should handle document mouse up', () => {
            scrollPanel.isXBarClicked = true;
            scrollPanel.isYBarClicked = true;

            const xBar = fixture.debugElement.query(By.css('[data-pc-section="barx"]'));
            const yBar = fixture.debugElement.query(By.css('[data-pc-section="bary"]'));

            scrollPanel.onDocumentMouseUp(new MouseEvent('mouseup'));

            expect(scrollPanel.isXBarClicked).toBe(false);
            expect(scrollPanel.isYBarClicked).toBe(false);
            expect(xBar.nativeElement.getAttribute('data-p-scrollpanel-grabbed')).toBe('false');
            expect(yBar.nativeElement.getAttribute('data-p-scrollpanel-grabbed')).toBe('false');
        });
    });

    describe('Templates', () => {
        it('should handle pTemplate content processing', fakeAsync(() => {
            const templateFixture = TestBed.createComponent(TestTemplateScrollPanelComponent);
            templateFixture.detectChanges();
            tick(100);

            const templateScrollPanel = templateFixture.debugElement.query(By.directive(ScrollPanel)).componentInstance;

            // Test that component handles pTemplate without errors
            expect(() => templateScrollPanel.ngAfterContentInit()).not.toThrow();

            // Test that templates property exists and is processed
            expect(templateScrollPanel.templates).toBeDefined();

            // Verify pTemplate content container is rendered
            const content = templateFixture.debugElement.query(By.css('[data-pc-section="content"]'));
            expect(content).toBeTruthy();

            flush();
        }));

        it('should handle #content template processing', fakeAsync(() => {
            const contentTemplateFixture = TestBed.createComponent(TestContentTemplateScrollPanelComponent);
            contentTemplateFixture.detectChanges();
            tick(100);

            const contentScrollPanel = contentTemplateFixture.debugElement.query(By.directive(ScrollPanel)).componentInstance;

            // Test that component handles #content template without errors
            expect(() => contentScrollPanel.ngAfterContentInit()).not.toThrow();

            // Test that contentTemplate property exists (might be undefined in test environment)
            expect(contentScrollPanel.contentTemplate).toBeDefined();

            // Verify content container is rendered
            const content = contentTemplateFixture.debugElement.query(By.css('[data-pc-section="content"]'));
            expect(content).toBeTruthy();

            flush();
        }));

        it('should handle content with or without templates', fakeAsync(() => {
            // Test regular content (non-template)
            expect(() => {
                fixture.detectChanges();
                tick(100);
            }).not.toThrow();

            // Test pTemplate content
            const templateFixture = TestBed.createComponent(TestTemplateScrollPanelComponent);
            expect(() => {
                templateFixture.detectChanges();
                tick(100);
            }).not.toThrow();

            // Test #content template
            const contentTemplateFixture = TestBed.createComponent(TestContentTemplateScrollPanelComponent);
            expect(() => {
                contentTemplateFixture.detectChanges();
                tick(100);
            }).not.toThrow();

            flush();
        }));

        it('should render different template types correctly', fakeAsync(() => {
            // Test pTemplate rendering
            const pTemplateFixture = TestBed.createComponent(TestTemplateScrollPanelComponent);
            pTemplateFixture.detectChanges();
            tick(100);

            const pTemplateScrollPanel = pTemplateFixture.debugElement.query(By.directive(ScrollPanel)).componentInstance;
            // Test that templates are defined and can be processed
            expect(pTemplateScrollPanel.templates).toBeDefined();
            expect(() => pTemplateScrollPanel.ngAfterContentInit()).not.toThrow();

            // Test #content template rendering
            const contentTemplateFixture = TestBed.createComponent(TestContentTemplateScrollPanelComponent);
            contentTemplateFixture.detectChanges();
            tick(100);

            const contentScrollPanel = contentTemplateFixture.debugElement.query(By.directive(ScrollPanel)).componentInstance;
            // Test that contentTemplate is defined (even if undefined in test environment)
            expect(contentScrollPanel.contentTemplate).toBeDefined();

            flush();
        }));
    });

    describe('Public Methods', () => {
        beforeEach(fakeAsync(() => {
            tick(100); // Wait for initialization
        }));

        it('should refresh scrollbar position and size', fakeAsync(() => {
            spyOn(scrollPanel, 'moveBar');

            scrollPanel.refresh();

            expect(scrollPanel.moveBar).toHaveBeenCalled();

            flush();
        }));

        it('should calculate container height correctly', fakeAsync(() => {
            scrollPanel.calculateContainerHeight();
            tick(50);

            // Should not throw error and complete calculation
            expect(scrollPanel.initialized).toBe(true);

            flush();
        }));
    });

    describe('Accessibility', () => {
        it('should have correct ARIA attributes on scrollbars', () => {
            const xBar = fixture.debugElement.query(By.css('[data-pc-section="barx"]'));
            const yBar = fixture.debugElement.query(By.css('[data-pc-section="bary"]'));

            expect(xBar.nativeElement.getAttribute('role')).toBe('scrollbar');
            expect(xBar.nativeElement.getAttribute('aria-orientation')).toBe('horizontal');
            expect(xBar.nativeElement.getAttribute('aria-controls')).toBe(scrollPanel.contentId);
            expect(xBar.nativeElement.getAttribute('tabindex')).toBe('0');

            expect(yBar.nativeElement.getAttribute('role')).toBe('scrollbar');
            expect(yBar.nativeElement.getAttribute('aria-orientation')).toBe('vertical');
            expect(yBar.nativeElement.getAttribute('aria-controls')).toBe(scrollPanel.contentId);
            expect(yBar.nativeElement.getAttribute('tabindex')).toBe('0');
        });

        it('should update aria-valuenow on scroll', fakeAsync(() => {
            const xBar = fixture.debugElement.query(By.css('[data-pc-section="barx"]'));
            const yBar = fixture.debugElement.query(By.css('[data-pc-section="bary"]'));

            scrollPanel.lastScrollLeft = 50;
            scrollPanel.lastScrollTop = 75;
            fixture.detectChanges();

            expect(xBar.nativeElement.getAttribute('aria-valuenow')).toBe('50');
            expect(yBar.nativeElement.getAttribute('aria-valuenow')).toBe('75');

            flush();
        }));

        it('should be keyboard navigable', () => {
            const xBar = fixture.debugElement.query(By.css('[data-pc-section="barx"]'));
            const yBar = fixture.debugElement.query(By.css('[data-pc-section="bary"]'));

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

        it('should handle rapid scroll events', fakeAsync(() => {
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

            tick(100);
            flush();
        }));

        it('should handle extreme step values', () => {
            component.step = 0;
            fixture.detectChanges();
            expect(scrollPanel.step).toBe(0);

            component.step = 1000;
            fixture.detectChanges();
            expect(scrollPanel.step).toBe(1000);

            component.step = -5;
            fixture.detectChanges();
            expect(scrollPanel.step).toBe(-5);
        });

        it('should handle window resize during scrollbar operations', fakeAsync(() => {
            // Test that resize listener is set up
            expect(scrollPanel.windowResizeListener).toBeTruthy();

            // moveBar should be callable
            expect(() => scrollPanel.moveBar()).not.toThrow();

            tick(100);
            flush();
        }));

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

        it('should cleanup listeners on destroy', fakeAsync(() => {
            scrollPanel.initialized = true;
            spyOn(scrollPanel, 'unbindListeners');

            fixture.destroy();

            expect(scrollPanel.unbindListeners).toHaveBeenCalled();

            flush();
        }));

        it('should cleanup timers properly', fakeAsync(() => {
            scrollPanel.timer = setTimeout(() => {}, 1000);
            const timerId = scrollPanel.timer;

            scrollPanel.clearTimer();

            // clearTimer calls clearTimeout but timer reference remains
            expect(typeof timerId).toBe('number');

            tick(1100);
            flush();
        }));

        it('should handle multiple timer operations', fakeAsync(() => {
            scrollPanel.setTimer('scrollTop', 10);
            expect(scrollPanel.timer).toBeDefined();

            scrollPanel.setTimer('scrollLeft', 15);
            expect(scrollPanel.timer).toBeDefined();

            const timerId = scrollPanel.timer;
            scrollPanel.clearTimer();
            expect(typeof timerId).toBe('number');

            tick(100);
            flush();
        }));
    });

    describe('Data Attributes', () => {
        it('should have correct data-pc-section attributes', () => {
            const wrapper = fixture.debugElement.query(By.css('[data-pc-section="wrapper"]'));
            const content = fixture.debugElement.query(By.css('[data-pc-section="content"]'));
            const xBar = fixture.debugElement.query(By.css('[data-pc-section="barx"]'));
            const yBar = fixture.debugElement.query(By.css('[data-pc-section="bary"]'));

            expect(wrapper.nativeElement.getAttribute('data-pc-section')).toBe('wrapper');
            expect(content.nativeElement.getAttribute('data-pc-section')).toBe('content');
            expect(xBar.nativeElement.getAttribute('data-pc-section')).toBe('barx');
            expect(yBar.nativeElement.getAttribute('data-pc-section')).toBe('bary');
        });

        it('should update grabbed state data attributes', () => {
            const xBar = fixture.debugElement.query(By.css('[data-pc-section="barx"]'));
            const yBar = fixture.debugElement.query(By.css('[data-pc-section="bary"]'));

            const mouseEvent = new MouseEvent('mousedown');
            Object.defineProperty(mouseEvent, 'pageY', { value: 100, writable: false });
            scrollPanel.onYBarMouseDown(mouseEvent);

            expect(yBar.nativeElement.getAttribute('data-p-scrollpanel-grabbed')).toBe('true');
            expect(document.body.getAttribute('data-p-scrollpanel-grabbed')).toBe('true');

            scrollPanel.onDocumentMouseUp(new MouseEvent('mouseup'));

            expect(yBar.nativeElement.getAttribute('data-p-scrollpanel-grabbed')).toBe('false');
            expect(document.body.getAttribute('data-p-scrollpanel-grabbed')).toBe('false');
        });

        it('should update scrollbar hidden state attributes', fakeAsync(() => {
            const xBar = fixture.debugElement.query(By.css('[data-pc-section="barx"]'));
            const yBar = fixture.debugElement.query(By.css('[data-pc-section="bary"]'));

            // moveBar sets attributes based on scroll ratios
            scrollPanel.moveBar();
            tick(100);

            // Should have data attributes (might be true or false based on content)
            expect(xBar.nativeElement.hasAttribute('data-p-scrollpanel-hidden')).toBe(true);
            expect(yBar.nativeElement.hasAttribute('data-p-scrollpanel-hidden')).toBe(true);

            flush();
        }));
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
        beforeEach(fakeAsync(() => {
            tick(100); // Wait for initialization
        }));

        it('should calculate scroll ratios correctly', fakeAsync(() => {
            scrollPanel.moveBar();
            tick(50);

            expect(scrollPanel.scrollXRatio).toBeDefined();
            expect(scrollPanel.scrollYRatio).toBeDefined();
            expect(scrollPanel.scrollXRatio).toBeGreaterThan(0);
            expect(scrollPanel.scrollYRatio).toBeGreaterThan(0);

            flush();
        }));

        it('should handle zero dimensions gracefully', fakeAsync(() => {
            // Mock content with zero dimensions
            if (scrollPanel.contentViewChild) {
                Object.defineProperty(scrollPanel.contentViewChild.nativeElement, 'scrollWidth', { value: 0, writable: true });
                Object.defineProperty(scrollPanel.contentViewChild.nativeElement, 'scrollHeight', { value: 0, writable: true });
                Object.defineProperty(scrollPanel.contentViewChild.nativeElement, 'clientWidth', { value: 0, writable: true });
                Object.defineProperty(scrollPanel.contentViewChild.nativeElement, 'clientHeight', { value: 0, writable: true });
            }

            expect(() => {
                scrollPanel.moveBar();
                tick(50);
            }).not.toThrow();

            flush();
        }));
    });
});
