import { OverviewDemo } from './index';
import { UIKitV3Demo } from './guide/v3';
import { UIKitV4Demo } from './guide/v4';

export default [
    {
        path: '',
        component: OverviewDemo
    },
    {
        path: 'guide/v3',
        component: UIKitV3Demo
    },
    {
        path: 'guide/v4',
        component: UIKitV4Demo
    }
];
