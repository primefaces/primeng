import APIDoc from '@/doc/apidoc/index.json';
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, computed, ElementRef, inject, input, InputSignal, viewChild } from '@angular/core';
import { RouterModule } from '@angular/router';
import { addClass, find, removeClass } from '@primeuix/utils/dom';
import { PrimeNG } from 'primeng/config';
import { AppDocSectionText } from './app.docsectiontext';

interface DocItem {
    label: string;
    value: string;
}

interface Doc {
    key: string;
    data: DocItem[];
}

export const getPTOptions = (name) => {
    // TODO: will be removed later. Map sub-components to their parent component
    const componentMapping = {
        steplist: 'stepper',
        step: 'stepper',
        stepitem: 'stepper',
        steppanel: 'stepper',
        steppanels: 'stepper',
        stepperseparator: 'stepper',
        tablist: 'tabs',
        tab: 'tabs',
        tabpanel: 'tabs',
        tabpanels: 'tabs',
        accordionpanel: 'accordion',
        accordionheader: 'accordion',
        accordioncontent: 'accordion',
        contextmenusub: 'contextmenu',
        columnfilter: 'table'
    };

    const passthroughNameMapping = {
        scroller: 'virtualscroller'
    };

    const passthroughName = passthroughNameMapping[name.toLowerCase()] || name;

    const lookupName = componentMapping[name.toLowerCase()] || name.toLowerCase();

    const componentTypes = APIDoc[lookupName]?.types;

    const passThrough = componentTypes.interfaces.values.find((t) => t.name.toLowerCase() === `${passthroughName}passthroughoptions`.toLowerCase());

    const { props } = passThrough;

    const options = componentTypes.interfaces.values.find((t) => t.name.toLowerCase() === `${passthroughName}passthroughmethodoptions`.toLowerCase());

    let data = [];

    for (const [i, prop] of props.entries()) {
        if (options) {
            if (!prop.deprecated) {
                data.push({
                    value: i + 1,
                    label: prop.name,
                    options: options?.props,
                    type: prop.type
                });
            }
        } else {
            data.push({
                value: i + 1,
                label: prop.name,
                type: prop.type
            });
        }
    }

    return data;
};

@Component({
    selector: 'app-docptviewer',
    standalone: true,
    imports: [CommonModule, AppDocSectionText, RouterModule],
    template: `
        <app-docsectiontext>
            <p>
                Some sections may not be visible due to the availability of the particular feature. Section names that start with the <i>pc</i> prefix indicate that the element is a PrimeNG component not a DOM element. Visit the
                <a routerLink="/passthrough">pass-through</a> documentation for more information.
            </p>
        </app-docsectiontext>
        <div #container class="doc-ptviewerwrapper card">
            <div id="doc-ptviewer" class="doc-ptviewer">
                <ng-content />
            </div>
            <div class="doc-ptoptions">
                <ng-container *ngIf="docs() && docs()[0]?.data">
                    <ng-container *ngFor="let doc of docs()">
                        <div *ngFor="let item of handleData(doc.data)" class="doc-ptoption" (mouseenter)="enterSection(item, doc.key)" (mouseleave)="leaveSection()">
                            <span class="doc-ptoption-text">
                                {{ item.label }}
                                {{ findComponentName(item.label, doc) }}
                            </span>
                        </div>
                    </ng-container>
                </ng-container>
            </div>
        </div>
    `
})
export class AppDocPtViewer {
    header: InputSignal<any[] | undefined | null> = input<any[] | undefined | null>();

    docs: InputSignal<Doc[] | undefined | null> = input<Doc[] | undefined | null>(null);

    componentName: InputSignal<string | undefined | null> = input<string | undefined | null>(null);

    container = viewChild<ElementRef>('container');

    primeng: PrimeNG = inject(PrimeNG);

    hoveredElements: any[] = [];

    ptOptions = computed(() => getPTOptions(this.componentName()));

    navItems = computed(() => []);

    cd: ChangeDetectorRef = inject(ChangeDetectorRef);

    ngAfterViewChecked() {
        this.cd.detectChanges();
    }

    findComponentName(label: string, doc: Doc): string {
        let text = '';

        if (this.docs() && this.docs().length > 1) {
            text += ` | ${doc.key}`;
        }

        if (label.includes('pc')) {
            let reservedNames = ['Decrement', 'File', 'Increment', 'JumpToPage', 'Maximize', 'Node', 'Option', 'Prev', 'Remove', 'RowPerPage', 'Source', 'Target', 'MoveAllTo', 'MoveAll', 'MoveTop', 'MoveTo'];
            let whiteList = [...reservedNames, ...Object.keys(this.primeng.translation), ...Object.keys(this.primeng.translation.aria)];
            let elemName = label.replace('pc', '');

            if (elemName.includes('FilterContainer')) elemName = elemName.replace('FilterContainer', 'IconField');
            else if (elemName.includes('FilterIconContainer')) elemName = elemName.replace('FilterIconContainer', 'InputIcon');
            else if (elemName.includes('Filter')) elemName = elemName.replace('Filter', 'InputText');

            if (elemName.includes('Action')) elemName = elemName.replace('Action', 'Button');
            if (elemName.includes('Dropdown')) elemName = elemName.replace('Dropdown', 'Select');

            for (const word of whiteList) {
                if (elemName.toLowerCase().includes(word.toLowerCase())) {
                    const regex = new RegExp(word, 'gi');
                    elemName = elemName.replace(regex, '');
                }
            }
        }

        return text;
    }

    enterSection(item: DocItem, componentName: string): void {
        let selector: string;
        let cmpName = componentName;

        if (componentName === 'ConfirmDialog') cmpName = 'Dialog';
        if (componentName === 'ScrollTop') selector = `[data-pc-extend="button"][data-pc-section="root"]`;
        if (item.label === 'host') selector = `p-${cmpName.toLowerCase()}[data-pc-section="host"]`;
        else if (item.label === 'root') selector = `[data-pc-name="${cmpName.toLowerCase()}"][data-pc-section="root"]`;
        else if (item.label.startsWith('pc')) selector = `[data-pc-name="${item.label.toLowerCase()}"][data-pc-section="root"]`;
        else if (componentName === 'InputMask') selector = `[data-pc-name="inputtext"][data-pc-section="root"]`;
        else selector = `[data-pc-section="${item.label.toLowerCase()}"]`;

        if (this.hoveredElements.length === 0) {
            const body = document.querySelector('body');
            if (body) {
                this.hoveredElements = find(body, selector);
            }
        }

        this.hoveredElements?.forEach((el) => {
            addClass(el, '!ring !ring-blue-500 !z-10');
        });
    }

    leaveSection(): void {
        this.hoveredElements.forEach((el) => {
            removeClass(el, '!ring !ring-blue-500 !z-10');
        });

        this.hoveredElements = [];
    }

    handleData(doc: DocItem[]): DocItem[] {
        return doc.filter((item) => item.label !== 'hooks' && item.label !== 'transition' && !item.label.includes('hidden'));
    }
}
