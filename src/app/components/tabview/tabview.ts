import { Component, NgModule } from '@angular/core';
import { Tabs } from 'primeng/tabs';

/**
 * TabPanel is a helper component for TabView component.
 * @group Components
 * @deprecated use TabPanel component instead.
 */
@Component({
    selector: 'p-tabPanel',
    standalone: true,
})
export class TabPanel extends Tabs {}
/**
 * TabView is a container component to group content with tabs.
 * @group Components
 * @deprecated use Tabs component instead.
 */
@Component({
    selector: 'p-tabView',
    standalone: true,
})
export class TabView extends Tabs {
    constructor() {
        super();
        console.log('TabView is deprecated as of v18. Use Tabs component instead.');
    }
}

@NgModule({
    imports: [TabView, TabPanel],
    exports: [TabView, TabPanel],
})
export class TabViewModule {}
