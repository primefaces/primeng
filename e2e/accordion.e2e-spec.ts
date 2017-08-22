import {browser, by, element, ElementArrayFinder} from 'protractor';

describe('Accordion', () => {
    let accordionHeaders: ElementArrayFinder;
    let accordionContents: ElementArrayFinder;
    
    describe('Header Click', () => {
        beforeEach(() => {
          browser.get('#/accordion');
          accordionContents = element.all(by.css('.ui-accordion-content-wrapper'));
          accordionHeaders = element.all(by.css('.ui-accordion-header'));
        });

        it('should close active content', () => {
            accordionHeaders.get(0).click();
            expect(accordionContents.get(0).getCssValue('overflow')).toBe('hidden');
        });
        
    });
});