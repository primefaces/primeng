import { DesignerDemo } from './';
import { GuideDemo } from './guide';
import { CIDemo } from './ci';

export default [
    {
        path: '',
        component: DesignerDemo
    },
    {
        path: 'guide',
        component: GuideDemo
    },
    {
        path: 'ci',
        component: CIDemo
    }
];
