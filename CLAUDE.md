# PrimeNG Showcase - Complete Standalone Conversion Guide

## Project Overview
Convert ALL PrimeNG showcase documentation components from module-based to standalone architecture.

## Current State Analysis
- **Total Components to Convert**: 119 showcase pages
- **Doc Modules to Remove**: 102 `*doc.module.ts` files  
- **Individual Doc Components**: 1,088 components with `standalone: false`
- **Main Page Components**: Already standalone but still importing doc modules

## File Structure
```
apps/showcase/
├── pages/                       # Main showcase pages (119 components)
│   └── [component]/
│       └── index.ts             # Already standalone, needs import updates
├── doc/                         # Documentation components
│   └── [component]/
│       ├── [component]doc.module.ts  # Module to remove (102 files)
│       ├── importdoc.ts              # Convert to standalone
│       ├── basicdoc.ts               # Convert to standalone
│       └── ...other docs.ts          # All need conversion
└── components/
    └── doc/
        ├── app.doc.ts           # Already standalone
        └── app.code.ts # Already standalone
```

## Conversion Process for Each Component

### Step 1: Convert Individual Doc Components
For each `.ts` file in `/apps/showcase/doc/[component]/` (except module files):

**From:**
```typescript
@Component({
    selector: 'component-name-doc',
    standalone: false,
    template: `...`
})
export class ComponentNameDoc {
    // ...
}
```

**To:**
```typescript
@Component({
    selector: 'component-name-doc',
    standalone: true,
    imports: [
        CommonModule,
        // Component-specific PrimeNG module
        ComponentModule,
        // App components (if used in template)
        AppCodeComponent,
        AppDocSectionTextComponent,
        DeferredDemo,
        // Additional imports based on template usage
    ],
    template: `...`
})
export class ComponentNameDoc {
    // ...
}
```

### Step 2: Determine Required Imports
Analyze the component template to identify required imports:

| Template Usage | Required Import |
|---------------|-----------------|
| `*ngIf`, `*ngFor`, `[ngClass]` | `CommonModule` |
| `[(ngModel)]` | `FormsModule` |
| `[formControl]`, `[formGroup]` | `ReactiveFormsModule` |
| `<app-code>` | `AppCodeComponent` |
| `<app-docsectiontext>` | `AppDocSectionTextComponent` |
| `<p-deferred-demo>` | `DeferredDemo` |
| `<p-button>` | `ButtonModule` |
| `<p-dialog>` | `Dialog` |
| `<p-table>` | `TableModule` |
| `<p-dropdown>` | `DropdownModule` |
| `<p-inputtext>` | `InputTextModule` |
| `<p-checkbox>` | `CheckboxModule` |
| `<p-radiobutton>` | `RadioButtonModule` |
| `<p-calendar>` | `CalendarModule` |
| `<p-toast>` | `ToastModule` |
| `<p-selectbutton>` | `SelectButton` |
| `<p-multiselect>` | `MultiSelectModule` |
| `<p-toggleswitch>` | `ToggleSwitchModule` |
| `<p-iconfield>` | `IconFieldModule` |
| `<p-inputicon>` | `InputIconModule` |
| `routerLink` | `RouterModule` |

### Step 3: Update Main Page Component
In `/apps/showcase/pages/[component]/index.ts`:

**From:**
```typescript
import { ComponentDocModule } from '@/doc/[component]/[component]doc.module';

@Component({
    standalone: true,
    imports: [ComponentDocModule]
})
export class ComponentDemo {
    docs = [
        { component: ImportDoc },
        { component: BasicDoc },
        // ...
    ];
}
```

**To:**
```typescript
import { ImportDoc } from '@/doc/[component]/importdoc';
import { BasicDoc } from '@/doc/[component]/basicdoc';
// ... import all doc components (needed for docs array)
import { AppDoc } from '@/components/doc/app.doc';

@Component({
    standalone: true,
    imports: [AppDoc], // Only import components used in template
    template: `<app-doc [docs]="docs" ...></app-doc>`
})
export class ComponentDemo {
    docs = [
        { component: ImportDoc },
        { component: BasicDoc },
        // ...
    ];
}
```

### Step 4: Remove Doc Module
Delete the `/apps/showcase/doc/[component]/[component]doc.module.ts` file.

## Common Import Patterns

### Base Imports (Most Components Need)
```typescript
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
```

### App Components (Already Standalone)
```typescript
import { AppCodeComponent } from '@/components/doc/app.code.component';
import { AppDocSectionTextComponent } from '@/components/doc/app.docsectiontext.component';
import { DeferredDemo } from '@/components/demo/deferreddemo';
```

### Form-Related
```typescript
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
```

### PrimeNG Components (Import as Needed)
**IMPORTANT**: Always import PrimeNG components as modules (e.g., `AnimateOnScrollModule` not `AnimateOnScroll`)

```typescript
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';  // Use DialogModule, not Dialog
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { CheckboxModule } from 'primeng/checkbox';
import { RadioButtonModule } from 'primeng/radiobutton';
import { CalendarModule } from 'primeng/calendar';
import { ToastModule } from 'primeng/toast';
import { SelectButtonModule } from 'primeng/selectbutton';  // Use SelectButtonModule, not SelectButton
import { MultiSelectModule } from 'primeng/multiselect';
import { ContextMenuModule } from 'primeng/contextmenu';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { AnimateOnScrollModule } from 'primeng/animateonscroll';
import { AvatarModule } from 'primeng/avatar';
```

## Component Priority Order

### Phase 1: Simple Components (Fewer Dependencies)
- button, badge, tag, chip, skeleton
- progressbar, progressspinner, avatar
- divider, splitter, scrollpanel

### Phase 2: Input Components
- inputtext, textarea, inputnumber, inputmask
- checkbox, radiobutton, togglebutton, toggleswitch
- selectbutton, listbox, dropdown, multiselect
- rating, colorpicker, knob, slider

### Phase 3: Button Components
- button, speeddial, splitbutton

### Phase 4: Data Components
- table, dataview, datascroller, virtualscroller
- orderlist, organizationchart, paginator
- picklist, tree, treetable, timeline

### Phase 5: Panel Components
- accordion, card, deferred, divider, fieldset
- panel, scrollpanel, splitter, stepper, tabview, toolbar

### Phase 6: Overlay Components
- confirmationdialog, confirmpopup, dialog
- drawer, dynamicdialog, popover, sidebar, tooltip

### Phase 7: File Components
- fileupload

### Phase 8: Menu Components
- breadcrumb, contextmenu, dock, menu, menubar
- megamenu, panelmenu, steps, tabmenu, tieredmenu

### Phase 9: Chart Components
- chart

### Phase 10: Messages Components
- messages, toast

### Phase 11: Media Components
- carousel, galleria, image, imagecompare

### Phase 12: Misc Components
- animateonscroll, autofocus, blockui, defer
- focustrap, iftalabel, fluid, inplace, metergroup
- overlay, ripple, scrolltop, styleclass, terminal

## Verification Steps

### After Each Component Conversion
1. Build the component: `npm run build`
2. Test in development: `npm run dev`
3. Check browser console for errors
4. Verify all demos work correctly
5. Ensure code examples display properly

### Common Issues to Check
- Missing imports (check browser console)
- Circular dependencies
- Template reference errors
- Service injection issues
- Change detection problems

## Benefits of Standalone Architecture
- ✅ Better tree-shaking and smaller bundles
- ✅ Faster initial load times
- ✅ More modular and maintainable code
- ✅ Easier to test individual components
- ✅ Aligns with Angular's modern best practices
- ✅ Simplified dependency management

## Automation Script Template
```bash
# Example script structure for bulk conversion
for file in apps/showcase/doc/*/*.ts; do
  # Skip module files
  if [[ $file == *"doc.module.ts" ]]; then
    continue
  fi
  
  # Add standalone: true
  # Analyze template for required imports
  # Add imports array
  # Update file
done
```

## Important Rules

### Template Import Rule
**CRITICAL**: Only import components that are **actually used in the template**. 

- ✅ **Correct**: Import `AppDoc` because `<app-doc>` is used in template
- ❌ **Wrong**: Import all doc components in the `imports` array when they're only used in the `docs` property

**Example:**
```typescript
@Component({
    template: `<app-doc [docs]="docs"></app-doc>`, // Only app-doc is used in template
    imports: [AppDoc], // Only import what's used in template
})
export class ComponentDemo {
    docs = [
        { component: ImportDoc }, // ImportDoc is used in property, not template
        { component: BasicDoc }   // BasicDoc is used in property, not template
    ];
}
```

### Conversion Completeness Rule
**CRITICAL**: Convert ALL doc components found in the module's declarations array, not just some of them.

- ✅ **Correct**: Convert every single doc component listed in the module
- ❌ **Wrong**: Skip doc components, leaving some unconverted

### Main Page Component Rule
**CRITICAL**: Only add doc sections that already exist in the original main page component.

- ✅ **Correct**: Keep the existing docs array structure intact
- ❌ **Wrong**: Add new doc sections that weren't in the original index.ts

**Example of what NOT to do:**
```typescript
// Original docs array had 5 items
docs = [
    { id: 'import', component: ImportDoc },
    { id: 'basic', component: BasicDoc },
    // ... 3 more existing items
];

// ❌ WRONG: Don't add new sections like 'directive', 'position', 'style'
// that weren't in the original docs array
```


## Notes
- AppCode and AppDocSectionText components are already standalone
- Some components use `Dialog` directly instead of `DialogModule`
- Watch for components that need both FormsModule and ReactiveFormsModule
- Services (like NodeService, CustomerService) don't need to be in imports
- Doc components in the `docs` array don't need to be in the `imports` array unless used in template