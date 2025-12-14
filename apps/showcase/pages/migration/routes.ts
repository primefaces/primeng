import { v19MigrationDemoComponent } from './v19.component';
import { v20MigrationDemoComponent } from './v20.component';
import { v21MigrationDemoComponent } from './v21.component';

export default [
    {
        path: 'v21',
        component: v21MigrationDemoComponent
    },
    {
        path: 'v20',
        component: v20MigrationDemoComponent
    },
    {
        path: 'v19',
        component: v19MigrationDemoComponent
    }
];
