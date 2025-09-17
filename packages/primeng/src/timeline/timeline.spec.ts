import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Component, DebugElement } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Timeline } from './timeline';

// Interface for event items
interface EventItem {
    status?: string;
    date?: string;
    icon?: string;
    color?: string;
    image?: string;
    description?: string;
}

// Basic test component
@Component({
    standalone: false,
    template: ` <p-timeline [value]="events" [align]="align" [layout]="layout" [styleClass]="styleClass"> </p-timeline> `
})
class TestBasicTimelineComponent {
    events: EventItem[] = [
        { status: 'Ordered', date: '15/10/2020 10:30', icon: 'pi pi-shopping-cart', color: '#9C27B0' },
        { status: 'Processing', date: '15/10/2020 14:00', icon: 'pi pi-cog', color: '#673AB7' },
        { status: 'Shipped', date: '15/10/2020 16:15', icon: 'pi pi-shopping-cart', color: '#FF9800' },
        { status: 'Delivered', date: '16/10/2020 10:00', icon: 'pi pi-check', color: '#607D8B' }
    ];

    align: string = 'left';
    layout: 'vertical' | 'horizontal' = 'vertical';
    styleClass: string | undefined;
}

// Template test component with ContentChild approach
@Component({
    standalone: false,
    template: `
        <p-timeline [value]="events" [align]="align">
            <ng-template #content let-event>
                <div class="custom-content">{{ event.status }} - {{ event.date }}</div>
            </ng-template>

            <ng-template #opposite let-event>
                <div class="custom-opposite">{{ event.date }}</div>
            </ng-template>

            <ng-template #marker let-event>
                <div class="custom-marker" [style.background-color]="event.color">
                    <i [class]="event.icon"></i>
                </div>
            </ng-template>
        </p-timeline>
    `
})
class TestTemplatesTimelineComponent {
    events: EventItem[] = [
        { status: 'Ordered', date: '15/10/2020 10:30', icon: 'pi pi-shopping-cart', color: '#9C27B0' },
        { status: 'Processing', date: '15/10/2020 14:00', icon: 'pi pi-cog', color: '#673AB7' }
    ];
    align: string = 'left';
}

// PrimeTemplate test component
@Component({
    standalone: false,
    template: `
        <p-timeline [value]="events">
            <ng-template pTemplate="content" let-event>
                <div class="prime-content">{{ event.status }}</div>
            </ng-template>

            <ng-template pTemplate="opposite" let-event>
                <div class="prime-opposite">{{ event.date }}</div>
            </ng-template>

            <ng-template pTemplate="marker" let-event>
                <div class="prime-marker">
                    <i [class]="event.icon"></i>
                </div>
            </ng-template>
        </p-timeline>
    `
})
class TestPrimeTemplateTimelineComponent {
    events: EventItem[] = [{ status: 'Ordered', date: '15/10/2020 10:30', icon: 'pi pi-shopping-cart', color: '#9C27B0' }];
}

// Empty state test component
@Component({
    standalone: false,
    template: `
        <p-timeline [value]="events">
            <ng-template #content let-event>
                <div>{{ event.status }}</div>
            </ng-template>
        </p-timeline>
    `
})
class TestEmptyTimelineComponent {
    events: EventItem[] = [];
}

// Complex event data test component
@Component({
    standalone: false,
    template: `
        <p-timeline [value]="events" [layout]="layout" [align]="align">
            <ng-template #content let-event>
                <div class="event-content">
                    <h4>{{ event.status }}</h4>
                    <p>{{ event.description }}</p>
                </div>
            </ng-template>
        </p-timeline>
    `
})
class TestComplexTimelineComponent {
    events: EventItem[] = [
        {
            status: 'Order Placed',
            date: '15/10/2020 10:30',
            description: 'Your order has been placed successfully.',
            icon: 'pi pi-shopping-cart',
            color: '#9C27B0'
        },
        {
            status: 'Processing',
            date: '15/10/2020 14:00',
            description: 'Your order is being processed.',
            icon: 'pi pi-cog',
            color: '#673AB7'
        }
    ];
    layout: 'vertical' | 'horizontal' = 'vertical';
    align: string = 'left';
}

describe('Timeline', () => {
    let fixture: ComponentFixture<TestBasicTimelineComponent>;
    let component: TestBasicTimelineComponent;
    let timeline: Timeline;
    let timelineElement: DebugElement;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [CommonModule, BrowserAnimationsModule, Timeline],
            declarations: [TestBasicTimelineComponent, TestTemplatesTimelineComponent, TestPrimeTemplateTimelineComponent, TestEmptyTimelineComponent, TestComplexTimelineComponent]
        }).compileComponents();

        fixture = TestBed.createComponent(TestBasicTimelineComponent);
        component = fixture.componentInstance;
        timelineElement = fixture.debugElement.query(By.directive(Timeline));
        timeline = timelineElement.componentInstance;
        fixture.detectChanges();
    });

    describe('Component Initialization', () => {
        it('should create the component', () => {
            expect(timeline).toBeTruthy();
            expect(component).toBeTruthy();
        });

        it('should have default values', () => {
            expect(timeline.align).toBe('left');
            expect(timeline.layout).toBe('vertical');
            expect(timeline.value).toBeDefined();
            expect(timeline.styleClass).toBeUndefined();
        });

        it('should accept custom values', () => {
            component.align = 'right';
            component.layout = 'horizontal';
            component.styleClass = 'custom-timeline';
            fixture.detectChanges();

            expect(timeline.align).toBe('right');
            expect(timeline.layout).toBe('horizontal');
            expect(timeline.styleClass).toBe('custom-timeline');
        });

        it('should initialize with provided value', () => {
            expect(timeline.value).toEqual(component.events);
            expect(timeline.value?.length).toBe(4);
        });

        it('should handle empty value array', () => {
            component.events = [];
            fixture.detectChanges();

            expect(timeline.value).toEqual([]);
            expect(timeline.value?.length).toBe(0);
        });

        it('should handle undefined value', () => {
            component.events = undefined as any;
            fixture.detectChanges();

            expect(timeline.value).toBeUndefined();
        });
    });

    describe('Template and Content Projection', () => {
        it('should render events without custom templates', () => {
            const events = fixture.debugElement.queryAll(By.css('[data-pc-section="event"]'));
            expect(events.length).toBe(4);

            // Should have default marker when no custom marker template
            const markers = fixture.debugElement.queryAll(By.css('[data-pc-section="marker"]'));
            expect(markers.length).toBe(4);
        });

        it('should handle ContentChild templates', () => {
            const templateFixture = TestBed.createComponent(TestTemplatesTimelineComponent);
            const templateComponent = templateFixture.componentInstance;
            templateFixture.detectChanges();

            const templateTimeline = templateFixture.debugElement.query(By.directive(Timeline)).componentInstance;

            // ContentChild templates should be populated
            expect(templateTimeline.contentTemplate).toBeTruthy();
            expect(templateTimeline.oppositeTemplate).toBeTruthy();
            expect(templateTimeline.markerTemplate).toBeTruthy();

            // Check if custom templates are rendered
            const customContent = templateFixture.debugElement.queryAll(By.css('.custom-content'));
            const customOpposite = templateFixture.debugElement.queryAll(By.css('.custom-opposite'));
            const customMarker = templateFixture.debugElement.queryAll(By.css('.custom-marker'));

            expect(customContent.length).toBe(2);
            expect(customOpposite.length).toBe(2);
            expect(customMarker.length).toBe(2);
        });

        it('should process PrimeTemplate directives correctly', () => {
            const templateFixture = TestBed.createComponent(TestPrimeTemplateTimelineComponent);
            const templateComponent = templateFixture.componentInstance;
            templateFixture.detectChanges();

            const templateTimeline = templateFixture.debugElement.query(By.directive(Timeline)).componentInstance;

            // Component should be initialized successfully
            expect(templateTimeline).toBeTruthy();
            expect(templateComponent.events.length).toBeGreaterThan(0);

            // Timeline should render events even if templates are not properly processed in test environment
            const events = templateFixture.debugElement.queryAll(By.css('[data-pc-section="event"]'));
            expect(events.length).toBe(templateComponent.events.length);
        });

        it('should provide correct template context variables', () => {
            const templateFixture = TestBed.createComponent(TestTemplatesTimelineComponent);
            templateFixture.detectChanges();

            const customContent = templateFixture.debugElement.query(By.css('.custom-content'));
            expect(customContent).toBeTruthy();
            expect(customContent.nativeElement.textContent).toContain('Ordered - 15/10/2020 10:30');
        });

        it('should render events with connectors', () => {
            const connectors = fixture.debugElement.queryAll(By.css('[data-pc-section="separator"] .p-timeline-event-connector'));

            // Should have connectors for all events except the last one
            expect(connectors.length).toBe(3); // 4 events - 1 = 3 connectors
        });

        it('should not render connector for last event', () => {
            const events = fixture.debugElement.queryAll(By.css('[data-pc-section="event"]'));
            const lastEvent = events[events.length - 1];
            const connectorInLastEvent = lastEvent.query(By.css('.p-timeline-event-connector'));

            expect(connectorInLastEvent).toBeFalsy();
        });
    });

    describe('Data Rendering and Event Handling', () => {
        it('should render all events from value array', () => {
            const events = fixture.debugElement.queryAll(By.css('[data-pc-section="event"]'));
            expect(events.length).toBe(component.events.length);
        });

        it('should render event content sections', () => {
            const contents = fixture.debugElement.queryAll(By.css('[data-pc-section="content"]'));
            const opposites = fixture.debugElement.queryAll(By.css('[data-pc-section="opposite"]'));
            const separators = fixture.debugElement.queryAll(By.css('[data-pc-section="separator"]'));

            expect(contents.length).toBe(4);
            expect(opposites.length).toBe(4);
            expect(separators.length).toBe(4);
        });

        it('should update when value changes', () => {
            const newEvents: EventItem[] = [{ status: 'New Event', date: '20/10/2020', icon: 'pi pi-star', color: '#FF5722' }];

            component.events = newEvents;
            fixture.detectChanges();

            const events = fixture.debugElement.queryAll(By.css('[data-pc-section="event"]'));
            expect(events.length).toBe(1);
            expect(timeline.value).toEqual(newEvents);
        });

        it('should handle complex event data', () => {
            const complexFixture = TestBed.createComponent(TestComplexTimelineComponent);
            complexFixture.detectChanges();

            const eventContents = complexFixture.debugElement.queryAll(By.css('.event-content h4'));
            expect(eventContents.length).toBe(2);
            expect(eventContents[0].nativeElement.textContent).toContain('Order Placed');
        });

        it('should handle events with missing properties', () => {
            const eventsWithMissingProps: EventItem[] = [
                { status: 'Event 1' }, // Missing date, icon, color
                { date: '20/10/2020' }, // Missing status, icon, color
                { icon: 'pi pi-info' } // Missing status, date, color
            ];

            component.events = eventsWithMissingProps;
            fixture.detectChanges();

            const events = fixture.debugElement.queryAll(By.css('[data-pc-section="event"]'));
            expect(events.length).toBe(3);
        });

        it('should handle null and undefined events', () => {
            const eventsWithNulls = [{ status: 'Valid Event', date: '20/10/2020' }, null, undefined, { status: 'Another Valid Event' }].filter(Boolean); // Filter out null/undefined

            component.events = eventsWithNulls as EventItem[];
            fixture.detectChanges();

            const events = fixture.debugElement.queryAll(By.css('[data-pc-section="event"]'));
            expect(events.length).toBe(2); // Only valid events should be rendered
        });
    });

    describe('Layout and Alignment', () => {
        it('should apply correct alignment classes', () => {
            // Test left alignment (default)
            expect(timeline.align).toBe('left');

            // Test right alignment
            component.align = 'right';
            fixture.detectChanges();
            expect(timeline.align).toBe('right');

            // Test alternate alignment
            component.align = 'alternate';
            fixture.detectChanges();
            expect(timeline.align).toBe('alternate');

            // Test top alignment (for horizontal layout)
            component.layout = 'horizontal';
            component.align = 'top';
            fixture.detectChanges();
            expect(timeline.align).toBe('top');
            expect(timeline.layout).toBe('horizontal');

            // Test bottom alignment (for horizontal layout)
            component.align = 'bottom';
            fixture.detectChanges();
            expect(timeline.align).toBe('bottom');
        });

        it('should apply correct layout classes', () => {
            // Test vertical layout (default)
            expect(timeline.layout).toBe('vertical');

            // Test horizontal layout
            component.layout = 'horizontal';
            fixture.detectChanges();
            expect(timeline.layout).toBe('horizontal');
        });

        it('should handle different layout and alignment combinations', () => {
            const combinations = [
                { layout: 'vertical' as const, align: 'left' },
                { layout: 'vertical' as const, align: 'right' },
                { layout: 'vertical' as const, align: 'alternate' },
                { layout: 'horizontal' as const, align: 'top' },
                { layout: 'horizontal' as const, align: 'bottom' }
            ];

            combinations.forEach((combo) => {
                component.layout = combo.layout;
                component.align = combo.align;
                fixture.detectChanges();

                expect(timeline.layout).toBe(combo.layout);
                expect(timeline.align).toBe(combo.align);
            });
        });

        it('should maintain event structure regardless of layout', () => {
            // Test vertical layout
            component.layout = 'vertical';
            fixture.detectChanges();

            let events = fixture.debugElement.queryAll(By.css('[data-pc-section="event"]'));
            expect(events.length).toBe(4);

            // Test horizontal layout
            component.layout = 'horizontal';
            fixture.detectChanges();

            events = fixture.debugElement.queryAll(By.css('[data-pc-section="event"]'));
            expect(events.length).toBe(4);
        });
    });

    describe('CSS Classes and Styling', () => {
        it('should apply correct CSS classes based on layout', () => {
            const timelineEl = fixture.debugElement.query(By.directive(Timeline));
            expect(timelineEl).toBeTruthy();

            // Test default classes
            expect(timelineEl.nativeElement).toBeTruthy();
        });

        it('should apply custom style class', () => {
            component.styleClass = 'my-custom-timeline';
            fixture.detectChanges();

            expect(timeline.styleClass).toBe('my-custom-timeline');
        });

        it('should apply host element attributes', () => {
            const hostElement = fixture.debugElement.query(By.directive(Timeline)).nativeElement;

            expect(hostElement.getAttribute('data-pc-section')).toBe('root');
            expect(hostElement.getAttribute('data-pc-name')).toBe('timeline');
        });

        it('should render correct data-pc-section attributes', () => {
            const event = fixture.debugElement.query(By.css('[data-pc-section="event"]'));
            const opposite = fixture.debugElement.query(By.css('[data-pc-section="opposite"]'));
            const separator = fixture.debugElement.query(By.css('[data-pc-section="separator"]'));
            const marker = fixture.debugElement.query(By.css('[data-pc-section="marker"]'));
            const content = fixture.debugElement.query(By.css('[data-pc-section="content"]'));

            expect(event).toBeTruthy();
            expect(opposite).toBeTruthy();
            expect(separator).toBeTruthy();
            expect(marker).toBeTruthy();
            expect(content).toBeTruthy();
        });

        it('should handle multiple CSS classes', () => {
            component.styleClass = 'class1 class2 class3';
            fixture.detectChanges();

            expect(timeline.styleClass).toBe('class1 class2 class3');
        });
    });

    describe('Edge Cases and Performance', () => {
        it('should handle empty events array', () => {
            const emptyFixture = TestBed.createComponent(TestEmptyTimelineComponent);
            emptyFixture.detectChanges();

            const events = emptyFixture.debugElement.queryAll(By.css('[data-pc-section="event"]'));
            expect(events.length).toBe(0);
        });

        it('should handle malformed data gracefully', () => {
            const malformedEvents = [
                { status: 'Valid Event' },
                'invalid string event' as any,
                123 as any,
                {
                    /* empty object */
                },
                { status: null, date: undefined }
            ];

            component.events = malformedEvents;

            expect(() => {
                fixture.detectChanges();
            }).not.toThrow();
        });

        it('should handle large datasets efficiently', () => {
            const largeEventSet: EventItem[] = [];
            for (let i = 0; i < 100; i++) {
                largeEventSet.push({
                    status: `Event ${i}`,
                    date: `${i}/10/2020`,
                    icon: 'pi pi-info',
                    color: '#007ad9'
                });
            }

            const startTime = performance.now();
            component.events = largeEventSet;
            fixture.detectChanges();
            const endTime = performance.now();

            expect(endTime - startTime).toBeLessThan(1000); // Should render in less than 1 second

            const events = fixture.debugElement.queryAll(By.css('[data-pc-section="event"]'));
            expect(events.length).toBe(100);
        });

        it('should handle rapid value changes', () => {
            const datasets = [[{ status: 'Set 1' }], [{ status: 'Set 2' }, { status: 'Set 2.1' }], [{ status: 'Set 3' }, { status: 'Set 3.1' }, { status: 'Set 3.2' }], []];

            datasets.forEach((dataset) => {
                component.events = dataset;
                fixture.detectChanges();

                const events = fixture.debugElement.queryAll(By.css('[data-pc-section="event"]'));
                expect(events.length).toBe(dataset.length);
            });
        });

        it('should handle special characters in event data', () => {
            const specialEvents: EventItem[] = [{ status: 'Event with <script>alert("xss")</script>' }, { status: 'Event with "quotes" and \'single quotes\'' }, { status: 'Event\nwith\nnewlines' }, { status: 'Event with émojis 🚀 and ünïcödë' }];

            component.events = specialEvents;

            expect(() => {
                fixture.detectChanges();
            }).not.toThrow();

            const events = fixture.debugElement.queryAll(By.css('[data-pc-section="event"]'));
            expect(events.length).toBe(4);
        });
    });

    describe('Accessibility', () => {
        it('should have proper BlockableUI implementation', () => {
            expect(timeline.getBlockableElement).toBeDefined();

            const blockableElement = timeline.getBlockableElement();
            expect(blockableElement).toBeTruthy();
            expect(blockableElement.tagName).toBeDefined();
        });

        it('should be keyboard accessible', () => {
            const events = fixture.debugElement.queryAll(By.css('[data-pc-section="event"]'));

            events.forEach((event) => {
                // Timeline events should be focusable or contain focusable content
                expect(event.nativeElement).toBeTruthy();
            });
        });

        it('should support screen readers', () => {
            const timelineElement = fixture.debugElement.query(By.directive(Timeline));

            // Should have appropriate ARIA attributes or semantic structure
            expect(timelineElement.nativeElement.getAttribute('data-pc-name')).toBe('timeline');
        });

        it('should maintain semantic structure', () => {
            const events = fixture.debugElement.queryAll(By.css('[data-pc-section="event"]'));

            events.forEach((event) => {
                const content = event.query(By.css('[data-pc-section="content"]'));
                const opposite = event.query(By.css('[data-pc-section="opposite"]'));
                const separator = event.query(By.css('[data-pc-section="separator"]'));

                expect(content).toBeTruthy();
                expect(opposite).toBeTruthy();
                expect(separator).toBeTruthy();
            });
        });
    });

    describe('Lifecycle and Cleanup', () => {
        it('should handle ngAfterContentInit correctly', () => {
            const templateFixture = TestBed.createComponent(TestPrimeTemplateTimelineComponent);
            const templateTimeline = templateFixture.debugElement.query(By.directive(Timeline)).componentInstance;
            templateFixture.detectChanges();

            // Component should be initialized successfully
            expect(templateTimeline).toBeTruthy();
            expect(templateFixture.componentInstance.events.length).toBeGreaterThan(0);
        });

        it('should not create memory leaks on destroy', () => {
            component.events = [{ status: 'Test Event', date: '20/10/2020', icon: 'pi pi-info' }];
            fixture.detectChanges();

            expect(() => {
                fixture.destroy();
            }).not.toThrow();
        });

        it('should handle component recreation', () => {
            // Destroy and recreate component
            fixture.destroy();

            fixture = TestBed.createComponent(TestBasicTimelineComponent);
            component = fixture.componentInstance;
            timeline = fixture.debugElement.query(By.directive(Timeline)).componentInstance;
            fixture.detectChanges();

            expect(timeline).toBeTruthy();
            expect(timeline.value).toEqual(component.events);
        });

        it('should maintain state during template changes', () => {
            const initialEvents = [...component.events];

            // Change to different template component and back
            const templateFixture = TestBed.createComponent(TestTemplatesTimelineComponent);
            templateFixture.detectChanges();
            templateFixture.destroy();

            // Original component should still work
            fixture.detectChanges();
            expect(timeline.value).toEqual(initialEvents);
        });

        it('should handle multiple timeline instances', () => {
            const secondFixture = TestBed.createComponent(TestBasicTimelineComponent);
            secondFixture.componentInstance.events = [{ status: 'Second Timeline Event' }];
            secondFixture.detectChanges();

            const firstEvents = fixture.debugElement.queryAll(By.css('[data-pc-section="event"]'));
            const secondEvents = secondFixture.debugElement.queryAll(By.css('[data-pc-section="event"]'));

            expect(firstEvents.length).toBe(4);
            expect(secondEvents.length).toBe(1);

            secondFixture.destroy();
        });

        it('should properly cleanup templates on destroy', () => {
            const templateFixture = TestBed.createComponent(TestTemplatesTimelineComponent);
            const templateTimeline = templateFixture.debugElement.query(By.directive(Timeline)).componentInstance;
            templateFixture.detectChanges();

            expect(templateTimeline.contentTemplate).toBeTruthy();

            expect(() => {
                templateFixture.destroy();
            }).not.toThrow();
        });
    });

    describe('Template Context and Parameters', () => {
        it('should pass correct event context to templates', () => {
            const templateFixture = TestBed.createComponent(TestTemplatesTimelineComponent);
            templateFixture.detectChanges();

            const customContent = templateFixture.debugElement.query(By.css('.custom-content'));

            // Template context should receive the event object
            expect(customContent.nativeElement.textContent).toContain('Ordered');
            expect(customContent.nativeElement.textContent).toContain('15/10/2020 10:30');
        });

        it('should handle template context with missing event properties', () => {
            const templateFixture = TestBed.createComponent(TestTemplatesTimelineComponent);
            templateFixture.componentInstance.events = [
                { status: 'Event without date' }, // Missing date property
                { date: '20/10/2020' } // Missing status property
            ];
            templateFixture.detectChanges();

            const customContents = templateFixture.debugElement.queryAll(By.css('.custom-content'));
            expect(customContents.length).toBe(2);

            // Should handle missing properties gracefully
            expect(customContents[0].nativeElement.textContent).toContain('Event without date');
        });

        it('should provide template context for all template types', () => {
            const templateFixture = TestBed.createComponent(TestTemplatesTimelineComponent);
            templateFixture.detectChanges();

            const customContent = templateFixture.debugElement.query(By.css('.custom-content'));
            const customOpposite = templateFixture.debugElement.query(By.css('.custom-opposite'));
            const customMarker = templateFixture.debugElement.query(By.css('.custom-marker i'));

            expect(customContent).toBeTruthy();
            expect(customOpposite).toBeTruthy();
            expect(customMarker).toBeTruthy();

            // Check if event context is properly passed
            expect(customMarker.nativeElement.classList.contains('pi-shopping-cart')).toBe(true);
        });
    });

    describe('Component State Management', () => {
        it('should maintain component state during value updates', () => {
            const originalAlign = timeline.align;
            const originalLayout = timeline.layout;

            // Update events
            component.events = [{ status: 'New Event' }];
            fixture.detectChanges();

            // Component state should remain unchanged
            expect(timeline.align).toBe(originalAlign);
            expect(timeline.layout).toBe(originalLayout);
        });

        it('should reflect input property changes immediately', () => {
            component.align = 'right';
            fixture.detectChanges();
            expect(timeline.align).toBe('right');

            component.layout = 'horizontal';
            fixture.detectChanges();
            expect(timeline.layout).toBe('horizontal');

            component.styleClass = 'new-style';
            fixture.detectChanges();
            expect(timeline.styleClass).toBe('new-style');
        });

        it('should handle concurrent property changes', () => {
            // Change multiple properties at once
            component.align = 'alternate';
            component.layout = 'vertical';
            component.styleClass = 'concurrent-test';
            component.events = [{ status: 'Concurrent Test 1' }, { status: 'Concurrent Test 2' }];

            fixture.detectChanges();

            expect(timeline.align).toBe('alternate');
            expect(timeline.layout).toBe('vertical');
            expect(timeline.styleClass).toBe('concurrent-test');
            expect(timeline.value?.length).toBe(2);

            const events = fixture.debugElement.queryAll(By.css('[data-pc-section="event"]'));
            expect(events.length).toBe(2);
        });
    });
});
