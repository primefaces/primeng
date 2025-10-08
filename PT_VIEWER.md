# PT Viewer Creation Guide

This guide helps you create PT (PassThrough) viewer components for PrimeNG showcase.

## Overview

PT Viewer components are used to showcase component PassThrough options with an interactive viewer that highlights elements on hover.

## Steps to Create PT Viewer for a Component

### 1. Find the PrimeVue PT Viewer Example

First, locate the PrimeVue PT viewer example:
```
/Users/cetincakiroglu/Development/primetek/primevue/apps/showcase/<componentname>/pt/ptviewer
```

### 2. Create Directory Structure

Create the PT directory for the component:
```bash
mkdir -p apps/showcase/doc/<componentname>/pt
```

### 3. Create PTViewer.ts

Create `apps/showcase/doc/<componentname>/pt/PTViewer.ts` with the following structure:

```typescript
import { AppDocPtViewer, getPTOptions } from '@/components/doc/app.docptviewer';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { <ComponentName>Module } from 'primeng/<componentname>';

@Component({
    selector: '<componentname>-pt-viewer',
    standalone: true,
    imports: [CommonModule, AppDocPtViewer, <ComponentName>Module],
    template: `
        <app-docptviewer [docs]="docs">
            <!-- Port the PrimeVue example here -->
            <!-- Replace Vue syntax with Angular syntax -->
        </app-docptviewer>
    `
})
export class PTViewer {
    docs = [
        {
            data: getPTOptions('<ComponentName>'),
            key: '<ComponentName>'
        }
    ];
}
```

### 4. Port PrimeVue Template to Angular

When porting the PrimeVue template, apply these conversions:

| Vue Syntax | Angular Syntax |
|------------|----------------|
| `<ComponentName>` | `<p-componentname>` |
| `:prop="value"` | `[prop]="value"` |
| `@event="handler"` | `(event)="handler($event)"` |
| `v-if="condition"` | `*ngIf="condition"` |
| `v-for="item in items"` | `*ngFor="let item of items"` |
| `v-model="value"` | `[(ngModel)]="value"` |

### 5. Create PTComponent.ts

Create `apps/showcase/doc/<componentname>/pt/PTComponent.ts`:

```typescript
import { AppDocApiTable } from '@/components/doc/app.docapitable';
import { getPTOptions } from '@/components/doc/app.docptviewer';
import { AppDocSection } from '@/components/doc/app.docsection';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { PTViewer } from './PTViewer';

@Component({
    selector: '<componentname>-pt-component',
    standalone: true,
    imports: [CommonModule, AppDocSection],
    template: `<div class="doc-main">
        <div class="doc-intro">
            <h1><ComponentName> Pass Through</h1>
        </div>
        <app-docsection [docs]="docs" />
    </div>`
})
export class PTComponent {
    docs = [
        {
            id: 'pt.viewer',
            label: 'Viewer',
            component: PTViewer
        },
        {
            id: 'pt.doc.<componentname>',
            label: '<ComponentName> PT Options',
            component: AppDocApiTable,
            data: getPTOptions('<ComponentName>')
        }
    ];
}
```

### 6. Update Component Demo Page

Update `apps/showcase/pages/<componentname>/index.ts`:

1. Import PTComponent:
```typescript
import { PTComponent } from '@/doc/<componentname>/pt/PTComponent';
```

2. Add ptDocs to template:
```typescript
template: ` <app-doc ... [ptDocs]="ptComponent"></app-doc> `
```

3. Add ptComponent property:
```typescript
export class <ComponentName>Demo {
    // ... existing code ...

    ptComponent = PTComponent;
}
```

## Example: Panel Component

### PrimeVue Source
Located at: `/Users/mcetin/Desktop/development/primevue/apps/showcase/doc/componentname/pt`
### Angular Implementation

**PTViewer.ts:**
```typescript
import { AppDocPtViewer, getPTOptions } from '@/components/doc/app.docptviewer';
import { CommonModule } from '@angular/core';
import { Component } from '@angular/core';
import { PanelModule } from 'primeng/panel';

@Component({
    selector: 'panel-pt-viewer',
    standalone: true,
    imports: [CommonModule, AppDocPtViewer, PanelModule],
    template: `
        <app-docptviewer [docs]="docs">
            <p-panel header="Header" toggleable>
                <p class="m-0">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit...
                </p>
            </p-panel>
        </app-docptviewer>
    `
})
export class PTViewer {
    docs = [
        {
            data: getPTOptions('Panel'),
            key: 'Panel'
        }
    ];
}
```

## Example: Divider Component

### PrimeVue Source
Located at: `/Users/cetincakiroglu/Development/primetek/primevue/apps/showcase/doc/divider/pt/PTViewer.vue`

### Angular Implementation

**PTViewer.ts:**
```typescript
import { AppDocPtViewer, getPTOptions } from '@/components/doc/app.docptviewer';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { DividerModule } from 'primeng/divider';

@Component({
    selector: 'divider-pt-viewer',
    standalone: true,
    imports: [CommonModule, AppDocPtViewer, DividerModule],
    template: `
        <app-docptviewer [docs]="docs">
            <div>
                <p>Lorem ipsum dolor sit amet consectetur...</p>

                <p-divider align="left" type="solid">
                    <b>Left</b>
                </p-divider>

                <p>Sed ut perspiciatis unde omnis...</p>

                <p-divider align="center" type="dotted">
                    <b>Center</b>
                </p-divider>

                <p>Temporibus autem quibusdam...</p>

                <p-divider align="right" type="dashed">
                    <b>Right</b>
                </p-divider>
            </div>
        </app-docptviewer>
    `
})
export class PTViewer {
    docs = [
        {
            data: getPTOptions('Divider'),
            key: 'Divider'
        }
    ];
}
```

## Naming Conventions

- **Component Name**: Use PascalCase (e.g., Panel, Divider, DataTable)
- **Selector**: Use kebab-case with `-pt-viewer` suffix (e.g., panel-pt-viewer, divider-pt-viewer)
- **File Names**: Use PascalCase (e.g., PTViewer.ts, PTComponent.ts)
- **Module Import**: Use PascalCase with Module suffix (e.g., PanelModule, DividerModule)
- **Element Tag**: Use lowercase with `p-` prefix (e.g., `<p-panel>`, `<p-divider>`)

## Notes

- Always use `getPTOptions('<ComponentName>')` to fetch PT options from API documentation
- The `docs` array must have a `data` and `key` property for the PT viewer to work
- Keep the example simple but representative of the component's main features
- Use realistic content in examples (e.g., Lorem ipsum text)
