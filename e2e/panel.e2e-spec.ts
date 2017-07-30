import {browser, by, element, ElementFinder, ElementArrayFinder} from 'protractor';

describe('Panel', () => {
    let toggleIcon: ElementFinder;
    let contentWrapper: ElementArrayFinder;
    
    describe('Toggle Icon Click', () => {
        beforeEach(() => {
          browser.get('#/panel');
          toggleIcon = element(by.css('.ui-panel-titlebar-icon'));
          contentWrapper = element.all(by.css('.ui-panel-content-wrapper'));
        });

        it('should close active content', () => {
            toggleIcon.click();
            expect(contentWrapper.get(0).getCssValue('overflow')).toBe('hidden');
        });
        
        it('should toggle content', () => {
            toggleIcon.click();
            browser.sleep(1000);
            toggleIcon.click();
            expect(contentWrapper.get(0).getCssValue('height')).not.toBe('0');
        });
        
    });
});