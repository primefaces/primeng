import { Component } from '@angular/core';
import { Code } from '@domain/code';

@Component({
    selector: 'template-doc',
    template: `
        <app-docsectiontext>
            <p>Content can also be placed using the <i>start</i>, <i>center</i> and <i>end</i> templates.</p>
        </app-docsectiontext>
        <div class="card">
            <p-toolbar styleClass="bg-gray-900 shadow" [style]="{ 'border-radius': '3rem', 'background-image': 'linear-gradient(to right, var(--bluegray-500), var(--bluegray-800))' }">
                <ng-template pTemplate="start">
                    <img src="https://primefaces.org/cdn/primeng/images/primeng.svg" />
                </ng-template>
                <ng-template pTemplate="center">
                    <div class="flex flex-wrap items-center gap-4">
                        <button class="p-link inline-flex justify-center items-center text-white h-12 w-12 rounded-full hover:bg-white/10 transition-all duration-200"><i class="pi pi-home text-2xl"></i></button>
                        <button class="p-link inline-flex justify-center items-center text-white h-12 w-12 rounded-full hover:bg-white/10 transition-all duration-200"><i class="pi pi-user text-2xl"></i></button>
                        <button class="p-link inline-flex justify-center items-center text-white h-12 w-12 rounded-full hover:bg-white/10 transition-all duration-200"><i class="pi pi-search text-2xl"></i></button>
                    </div>
                </ng-template>
                <ng-template pTemplate="end">
                    <div class="flex items-center gap-2">
                        <p-avatar image="https://primefaces.org/cdn/primeng/images/demo/avatar/amyelsner.png" shape="circle" />
                        <span class="font-bold text-slate-50">Amy Elsner</span>
                    </div>
                </ng-template>
            </p-toolbar>
        </div>
        <app-code [code]="code" selector="toolbar-template-demo"></app-code>
    `
})
export class TemplateDoc {
    code: Code = {
        basic: `<p-toolbar 
    styleClass="bg-gray-900 shadow" 
    [style]="{ 'border-radius': '3rem', 'background-image': 'linear-gradient(to right, var(--bluegray-500), var(--bluegray-800))' }">
        <ng-template pTemplate="start">
            <img src="https://primefaces.org/cdn/primeng/images/primeng.svg" />
        </ng-template>
        <ng-template pTemplate="center">
            <div class="flex flex-wrap items-center gap-4">
                <button class="p-link inline-flex justify-center items-center text-white h-12 w-12 rounded-full hover:bg-white/10 transition-all duration-200">
                    <i class="pi pi-home text-2xl"></i>
                </button>
                <button class="p-link inline-flex justify-center items-center text-white h-12 w-12 rounded-full hover:bg-white/10 transition-all duration-200">
                    <i class="pi pi-user text-2xl"></i>
                </button>
                <button class="p-link inline-flex justify-center items-center text-white h-12 w-12 rounded-full hover:bg-white/10 transition-all duration-200">
                    <i class="pi pi-search text-2xl"></i>
                </button>
            </div>
        </ng-template>
        <ng-template pTemplate="end">
            <div class="flex items-center gap-2">
                <p-avatar 
                    image="https://primefaces.org/cdn/primeng/images/demo/avatar/amyelsner.png" 
                    shape="circle" />
                <span class="font-bold text-slate-50">
                    Amy Elsner
                </span>
            </div>
        </ng-template>
</p-toolbar>`,

        html: `<div class="card">
<p-toolbar 
    styleClass="bg-gray-900 shadow" 
    [style]="{ 'border-radius': '3rem', 'background-image': 'linear-gradient(to right, var(--bluegray-500), var(--bluegray-800))' }">
    <ng-template pTemplate="start">
        <img src="https://primefaces.org/cdn/primeng/images/primeng.svg" />
    </ng-template>
    <ng-template pTemplate="center">
        <div class="flex flex-wrap items-center gap-4">
            <button class="p-link inline-flex justify-center items-center text-white h-12 w-12 rounded-full hover:bg-white/10 transition-all duration-200">
                <i class="pi pi-home text-2xl"></i>
            </button>
            <button class="p-link inline-flex justify-center items-center text-white h-12 w-12 rounded-full hover:bg-white/10 transition-all duration-200">
                <i class="pi pi-user text-2xl"></i>
            </button>
            <button class="p-link inline-flex justify-center items-center text-white h-12 w-12 rounded-full hover:bg-white/10 transition-all duration-200">
                <i class="pi pi-search text-2xl"></i>
            </button>
        </div>
    </ng-template>
    <ng-template pTemplate="end">
        <div class="flex items-center gap-2">
            <p-avatar 
                image="https://primefaces.org/cdn/primeng/images/demo/avatar/amyelsner.png" 
                shape="circle" />
            <span class="font-bold text-slate-50">
                Amy Elsner
            </span>
        </div>
    </ng-template>
</p-toolbar>
</div>`,

        typescript: `import { Component } from '@angular/core';
import { ToolbarModule } from 'primeng/toolbar';
import { AvatarModule } from 'primeng/avatar';
import { SharedModule } from 'primeng/api';

@Component({
    selector: 'toolbar-template-demo',
    templateUrl: './toolbar-template-demo.html',
    standalone: true,
    imports: [ToolbarModule, AvatarModule, SharedModule]
})
export class ToolbarTemplateDemo {
   
}`
    };
}
