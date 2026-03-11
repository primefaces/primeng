import { BasicDoc } from '@/doc/icons/basic-doc';
import { ColorDoc } from '@/doc/icons/color-doc';
import { ConstantsDoc } from '@/doc/icons/constants-doc';
import { DownloadDoc } from '@/doc/icons/download-doc';
import { FigmaDoc } from '@/doc/icons/figma-doc';
import { ImportDoc } from '@/doc/icons/import-doc';
import { ListDoc } from '@/doc/icons/list-doc';
import { SizeDoc } from '@/doc/icons/size-doc';
import { SpinDoc } from '@/doc/icons/spin-doc';
import { Component } from '@angular/core';
import { AppDoc } from '@/components/doc/app.doc';

@Component({
    standalone: true,
    imports: [AppDoc],
    template: `
        <app-doc
            title="Angular Icon Library - PrimeNG"
            header="Icons"
            description="PrimeIcons is the default icon library of PrimeNG with over 250 open source icons developed by PrimeTek. PrimeIcons library is optional as PrimeNG components can use any icon with templating."
            [docs]="docs"
            docType="page"
        ></app-doc>
    `,
    styleUrls: ['./iconsdemo.component.scss']
})
export class IconsDemo {
    docs = [
        {
            id: 'download',
            label: 'Download',
            component: DownloadDoc
        },
        {
            id: 'import',
            label: 'Import',
            component: ImportDoc
        },
        {
            id: 'figma',
            label: 'Figma',
            component: FigmaDoc
        },
        {
            id: 'basic',
            label: 'Basic',
            component: BasicDoc
        },
        {
            id: 'size',
            label: 'Size',
            component: SizeDoc
        },
        {
            id: 'color',
            label: 'Color',
            component: ColorDoc
        },
        {
            id: 'spin',
            label: 'Spin',
            component: SpinDoc
        },
        {
            id: 'constants',
            label: 'Constants',
            component: ConstantsDoc
        },
        {
            id: 'list',
            label: 'List',
            component: ListDoc
        }
    ];
}
