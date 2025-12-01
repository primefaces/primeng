import { NgModule } from '@angular/core';
import { BindModule } from 'primeng/bind';
import { Tab } from './tab';
import { TabList } from './tablist';
import { TabPanel } from './tabpanel';
import { TabPanels } from './tabpanels';
import { Tabs } from './tabs';

@NgModule({
    imports: [Tabs, TabPanels, TabPanel, TabList, Tab, BindModule],
    exports: [Tabs, TabPanels, TabPanel, TabList, Tab, BindModule]
})
export class TabsModule {}
