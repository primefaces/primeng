import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FieldsetModule } from 'primeng/fieldset';
import { FormsModule } from '@angular/forms';
import { DesignerService } from '@/service/designerservice';
import { DesignTokenField } from '@/components/layout/designer/editor/designtokenfield';

@Component({
    selector: 'design-border-radius',
    standalone: true,
    imports: [CommonModule, DesignTokenField, FieldsetModule, FormsModule],
    template: ` <p-fieldset legend="Rounded" [toggleable]="true">
        <section class="grid grid-cols-4 gap-2">
            <div class="flex flex-col gap-1">
                <design-token-field [(modelValue)]="borderRadiusNone" label="None" />
            </div>
            <div class="flex flex-col gap-1">
                <design-token-field [(modelValue)]="borderRadiusXs" label="Extra Small" />
            </div>
            <div class="flex flex-col gap-1">
                <design-token-field [(modelValue)]="borderRadiusSm" label="Small" />
            </div>
            <div class="flex flex-col gap-1">
                <design-token-field [(modelValue)]="borderRadiusMd" label="Medium" />
            </div>
            <div class="flex flex-col gap-1">
                <design-token-field [(modelValue)]="borderRadiusLg" label="Large" />
            </div>
            <div class="flex flex-col gap-1">
                <design-token-field [(modelValue)]="borderRadiusXl" label="Extra Large" />
            </div>
        </section>
    </p-fieldset>`,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DesignBorderRadius {
    designerService = inject(DesignerService);

    get borderRadiusNone() {
        return this.designerService.designer().theme?.preset?.primitive.borderRadius.none;
    }
    set borderRadiusNone(value: any) {
        this.designerService.designer.update((prev) => ({
            ...prev,
            theme: { ...prev.theme, preset: { ...prev.theme.preset, primitive: { ...prev.theme.preset.primitive, borderRadius: { ...prev.theme.preset.primitive.borderRadius, none: value } } } }
        }));
    }

    get borderRadiusXs() {
        return this.designerService.designer().theme?.preset?.primitive.borderRadius.xs;
    }
    set borderRadiusXs(value: any) {
        this.designerService.designer.update((prev) => ({
            ...prev,
            theme: { ...prev.theme, preset: { ...prev.theme.preset, primitive: { ...prev.theme.preset.primitive, borderRadius: { ...prev.theme.preset.primitive.borderRadius, xs: value } } } }
        }));
    }

    get borderRadiusSm() {
        return this.designerService.designer().theme?.preset?.primitive.borderRadius.sm;
    }
    set borderRadiusSm(value: any) {
        this.designerService.designer.update((prev) => ({
            ...prev,
            theme: { ...prev.theme, preset: { ...prev.theme.preset, primitive: { ...prev.theme.preset.primitive, borderRadius: { ...prev.theme.preset.primitive.borderRadius, sm: value } } } }
        }));
    }

    get borderRadiusMd() {
        return this.designerService.designer().theme?.preset?.primitive.borderRadius.md;
    }
    set borderRadiusMd(value: any) {
        this.designerService.designer.update((prev) => ({
            ...prev,
            theme: { ...prev.theme, preset: { ...prev.theme.preset, primitive: { ...prev.theme.preset.primitive, borderRadius: { ...prev.theme.preset.primitive.borderRadius, md: value } } } }
        }));
    }

    get borderRadiusLg() {
        return this.designerService.designer().theme?.preset?.primitive.borderRadius.lg;
    }
    set borderRadiusLg(value: any) {
        this.designerService.designer.update((prev) => ({
            ...prev,
            theme: { ...prev.theme, preset: { ...prev.theme.preset, primitive: { ...prev.theme.preset.primitive, borderRadius: { ...prev.theme.preset.primitive.borderRadius, lg: value } } } }
        }));
    }

    get borderRadiusXl() {
        return this.designerService.designer().theme?.preset?.primitive.borderRadius.xl;
    }
    set borderRadiusXl(value: any) {
        this.designerService.designer.update((prev) => ({
            ...prev,
            theme: { ...prev.theme, preset: { ...prev.theme.preset, primitive: { ...prev.theme.preset.primitive, borderRadius: { ...prev.theme.preset.primitive.borderRadius, xl: value } } } }
        }));
    }
}
