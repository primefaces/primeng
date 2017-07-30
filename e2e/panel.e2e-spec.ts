import {browser, by, element, ElementFinder} from 'protractor';

describe('Panel', () => {
    let toggleIcon: ElementFinder;
    let contentWrapper: ElementFinder;
    
    describe('Toggle Icon Click', () => {
        beforeEach(() => {
          browser.get('#/panel');
          toggleIcon = element(by.css('.ui-panel-titlebar-icon'));
          contentWrapper = element(by.css('.ui-panel-content-wrapper'));
        });

        it('should close active content', () => {
            toggleIcon.click();
            expect(contentWrapper.getCssValue('overflow')).toBe('hidden');
        });
        
    });
});