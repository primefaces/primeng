import { CommonModule } from '@angular/common';
import { Component, computed, Directive, effect, inject, InjectionToken, input, NgModule, output, signal } from '@angular/core';
import { ClassNameOptions, createMotion, MotionInstance, MotionOptions } from '@primeuix/motion';
import { nextFrame } from '@primeuix/utils';
import { BaseComponent, PARENT_INSTANCE } from 'primeng/basecomponent';
import { Bind, BindModule } from 'primeng/bind';
import { applyHiddenStyles, resetStyles } from './motion.utils';
import { MotionStyle } from './style/motionstyle';

const MOTION_INSTANCE = new InjectionToken<Motion>('MOTION_INSTANCE');

const MOTION_DIRECTIVE_INSTANCE = new InjectionToken<MotionDirective>('MOTION_DIRECTIVE_INSTANCE');

/**
 * Motion Directive is directive to apply motion effects to elements.
 * @group Components
 */
@Directive({
    selector: '[pMotion]',
    standalone: true,
    providers: [MotionStyle, { provide: MOTION_DIRECTIVE_INSTANCE, useExisting: MotionDirective }, { provide: PARENT_INSTANCE, useExisting: MotionDirective }]
})
export class MotionDirective extends BaseComponent {
    $pcMotionDirective: MotionDirective | undefined = inject(MOTION_DIRECTIVE_INSTANCE, { optional: true, skipSelf: true }) ?? undefined;

    /******************** Inputs ********************/

    visible = input<boolean>(false, { alias: 'pMotion' });
    name = input<MotionOptions['name']>(undefined, { alias: 'pMotionName' });
    type = input<MotionOptions['type']>(undefined, { alias: 'pMotionType' });
    safe = input<MotionOptions['safe']>(undefined, { alias: 'pMotionSafe' });
    appear = input<MotionOptions['appear']>(false, { alias: 'pMotionAppear' });
    enter = input<MotionOptions['enter']>(true, { alias: 'pMotionEnter' });
    leave = input<MotionOptions['leave']>(true, { alias: 'pMotionLeave' });
    duration = input<MotionOptions['duration']>(undefined, { alias: 'pMotionDuration' });
    hideStrategy = input<'display' | 'visibility'>('display', { alias: 'pMotionHideStrategy' });
    enterFromClass = input<ClassNameOptions['from']>(undefined, { alias: 'pMotionEnterFromClass' });
    enterToClass = input<ClassNameOptions['to']>(undefined, { alias: 'pMotionEnterToClass' });
    enterActiveClass = input<ClassNameOptions['active']>(undefined, { alias: 'pMotionEnterActiveClass' });
    leaveFromClass = input<ClassNameOptions['from']>(undefined, { alias: 'pMotionLeaveFromClass' });
    leaveToClass = input<ClassNameOptions['to']>(undefined, { alias: 'pMotionLeaveToClass' });
    leaveActiveClass = input<ClassNameOptions['active']>(undefined, { alias: 'pMotionLeaveActiveClass' });

    /******************** All Inputs ********************/

    options = input<MotionOptions>({}, { alias: 'pMotionOptions' });

    /******************** Outputs ********************/

    onBeforeEnter = output<Element | undefined>({ alias: 'pMotionOnBeforeEnter' });
    onEnter = output<Element | undefined>({ alias: 'pMotionOnEnter' });
    onAfterEnter = output<Element | undefined>({ alias: 'pMotionOnAfterEnter' });
    onEnterCancelled = output<Element | undefined>({ alias: 'pMotionOnEnterCancelled' });
    onBeforeLeave = output<Element | undefined>({ alias: 'pMotionOnBeforeLeave' });
    onLeave = output<Element | undefined>({ alias: 'pMotionOnLeave' });
    onAfterLeave = output<Element | undefined>({ alias: 'pMotionOnAfterLeave' });
    onLeaveCancelled = output<Element | undefined>({ alias: 'pMotionOnLeaveCancelled' });

    /******************** Computed ********************/

    private motionOptions = computed<MotionOptions>(() => {
        const options = this.options();

        return {
            name: options.name ?? this.name(),
            type: options.type ?? this.type(),
            safe: options.safe ?? this.safe(),
            appear: options.appear ?? this.appear(),
            enter: options.enter ?? this.enter(),
            leave: options.leave ?? this.leave(),
            duration: options.duration ?? this.duration(),
            enterClass: {
                from: options.enterClass?.from ?? this.enterFromClass(),
                to: options.enterClass?.to ?? this.enterToClass(),
                active: options.enterClass?.active ?? this.enterActiveClass()
            },
            leaveClass: {
                from: options.leaveClass?.from ?? this.leaveFromClass(),
                to: options.leaveClass?.to ?? this.leaveToClass(),
                active: options.leaveClass?.active ?? this.leaveActiveClass()
            },
            onBeforeEnter: options.onBeforeEnter ?? this.handleBeforeEnter,
            onEnter: options.onEnter ?? this.handleEnter,
            onAfterEnter: options.onAfterEnter ?? this.handleAfterEnter,
            onEnterCancelled: options.onEnterCancelled ?? this.handleEnterCancelled,
            onBeforeLeave: options.onBeforeLeave ?? this.handleBeforeLeave,
            onLeave: options.onLeave ?? this.handleLeave,
            onAfterLeave: options.onAfterLeave ?? this.handleAfterLeave,
            onLeaveCancelled: options.onLeaveCancelled ?? this.handleLeaveCancelled
        };
    });

    private motion: MotionInstance | undefined;
    private isInitialMount = true;
    private cancelled = false;

    private readonly handleBeforeEnter = (el?: Element) => this.onBeforeEnter.emit(el);
    private readonly handleEnter = (el?: Element) => this.onEnter.emit(el);
    private readonly handleAfterEnter = (el?: Element) => this.onAfterEnter.emit(el);
    private readonly handleEnterCancelled = (el?: Element) => this.onEnterCancelled.emit(el);
    private readonly handleBeforeLeave = (el?: Element) => this.onBeforeLeave.emit(el);
    private readonly handleLeave = (el?: Element) => this.onLeave.emit(el);
    private readonly handleAfterLeave = (el?: Element) => this.onAfterLeave.emit(el);
    private readonly handleLeaveCancelled = (el?: Element) => this.onLeaveCancelled.emit(el);

    constructor() {
        super();

        effect(() => {
            if (!this.motion) {
                this.motion = createMotion(this.$el, this.motionOptions());
            } else {
                this.motion.update(this.$el, this.motionOptions());
            }
        });

        effect(() => {
            if (!this.$el) return;

            const shouldAppear = this.isInitialMount && this.visible() && this.appear();
            const hideStrategy = this.hideStrategy();

            if (this.visible()) {
                resetStyles(this.$el, hideStrategy);

                if (shouldAppear || !this.isInitialMount) {
                    this.motion?.enter();
                }
            } else if (!this.isInitialMount) {
                this.motion?.leave()?.then(() => {
                    if (this.$el && !this.cancelled && !this.visible()) {
                        applyHiddenStyles(this.$el, hideStrategy);
                    }
                });
            } else {
                applyHiddenStyles(this.$el, hideStrategy);
            }

            this.isInitialMount = false;
        });
    }

    onDestroy(): void {
        this.cancelled = true;

        this.motion?.cancel();
        this.motion = undefined;

        resetStyles(this.$el, this.hideStrategy());

        this.isInitialMount = true;
    }
}

/**
 * Motion component is a container to apply motion effects to its content.
 * @group Components
 */
@Component({
    selector: 'p-motion',
    standalone: true,
    imports: [CommonModule, BindModule],
    template: `
        @if (rendered()) {
            <ng-content />
        }
    `,
    providers: [MotionStyle, { provide: MOTION_INSTANCE, useExisting: Motion }, { provide: PARENT_INSTANCE, useExisting: Motion }],
    host: {
        '[class]': "cx('root')"
    },
    hostDirectives: [Bind]
})
export class Motion extends BaseComponent {
    $pcMotion: Motion | undefined = inject(MOTION_INSTANCE, { optional: true, skipSelf: true }) ?? undefined;

    bindDirectiveInstance = inject(Bind, { self: true });

    onAfterViewChecked(): void {
        this.bindDirectiveInstance.setAttrs(this.ptms(['host', 'root']));
    }

    _componentStyle = inject(MotionStyle);

    /******************** Inputs ********************/

    visible = input<boolean>(false);
    mountOnEnter = input<boolean>(true);
    unmountOnLeave = input<boolean>(true);
    name = input<MotionOptions['name']>(undefined);
    type = input<MotionOptions['type']>(undefined);
    safe = input<MotionOptions['safe']>(undefined);
    appear = input<MotionOptions['appear']>(false);
    enter = input<MotionOptions['enter']>(true);
    leave = input<MotionOptions['leave']>(true);
    duration = input<MotionOptions['duration']>(undefined);
    hideStrategy = input<'display' | 'visibility'>('display');
    enterFromClass = input<ClassNameOptions['from']>(undefined);
    enterToClass = input<ClassNameOptions['to']>(undefined);
    enterActiveClass = input<ClassNameOptions['active']>(undefined);
    leaveFromClass = input<ClassNameOptions['from']>(undefined);
    leaveToClass = input<ClassNameOptions['to']>(undefined);
    leaveActiveClass = input<ClassNameOptions['active']>(undefined);

    /******************** All Inputs ********************/

    options = input<MotionOptions>({});

    /******************** Outputs ********************/

    onBeforeEnter = output<Element | undefined>();
    onEnter = output<Element | undefined>();
    onAfterEnter = output<Element | undefined>();
    onEnterCancelled = output<Element | undefined>();
    onBeforeLeave = output<Element | undefined>();
    onLeave = output<Element | undefined>();
    onAfterLeave = output<Element | undefined>();
    onLeaveCancelled = output<Element | undefined>();

    /******************** Computed ********************/

    private motionOptions = computed<MotionOptions>(() => {
        const options = this.options();

        return {
            name: options.name ?? this.name(),
            type: options.type ?? this.type(),
            safe: options.safe ?? this.safe(),
            appear: false,
            enter: options.enter ?? this.enter(),
            leave: options.leave ?? this.leave(),
            duration: options.duration ?? this.duration(),
            enterClass: {
                from: options.enterClass?.from ?? this.enterFromClass(),
                to: options.enterClass?.to ?? this.enterToClass(),
                active: options.enterClass?.active ?? this.enterActiveClass()
            },
            leaveClass: {
                from: options.leaveClass?.from ?? this.leaveFromClass(),
                to: options.leaveClass?.to ?? this.leaveToClass(),
                active: options.leaveClass?.active ?? this.leaveActiveClass()
            },
            onBeforeEnter: options.onBeforeEnter ?? this.handleBeforeEnter,
            onEnter: options.onEnter ?? this.handleEnter,
            onAfterEnter: options.onAfterEnter ?? this.handleAfterEnter,
            onEnterCancelled: options.onEnterCancelled ?? this.handleEnterCancelled,
            onBeforeLeave: options.onBeforeLeave ?? this.handleBeforeLeave,
            onLeave: options.onLeave ?? this.handleLeave,
            onAfterLeave: options.onAfterLeave ?? this.handleAfterLeave,
            onLeaveCancelled: options.onLeaveCancelled ?? this.handleLeaveCancelled
        };
    });

    private motion: MotionInstance | undefined;
    private isInitialMount = true;
    private cancelled = false;

    rendered = signal(false);

    private readonly handleBeforeEnter = (el?: Element) => this.onBeforeEnter.emit(el);
    private readonly handleEnter = (el?: Element) => this.onEnter.emit(el);
    private readonly handleAfterEnter = (el?: Element) => this.onAfterEnter.emit(el);
    private readonly handleEnterCancelled = (el?: Element) => this.onEnterCancelled.emit(el);
    private readonly handleBeforeLeave = (el?: Element) => this.onBeforeLeave.emit(el);
    private readonly handleLeave = (el?: Element) => this.onLeave.emit(el);
    private readonly handleAfterLeave = (el?: Element) => this.onAfterLeave.emit(el);
    private readonly handleLeaveCancelled = (el?: Element) => this.onLeaveCancelled.emit(el);

    constructor() {
        super();

        effect(() => {
            const hideStrategy = this.hideStrategy();

            if (this.isInitialMount) {
                applyHiddenStyles(this.$el, hideStrategy);
                this.rendered.set((this.visible() && this.mountOnEnter()) || !this.mountOnEnter());
            } else if (this.visible() && !this.rendered()) {
                applyHiddenStyles(this.$el, hideStrategy);
                this.rendered.set(true);
            }
        });

        effect(() => {
            if (!this.motion) {
                this.motion = createMotion(this.$el, this.motionOptions());
            } else {
                this.motion.update(this.$el, this.motionOptions());
            }
        });

        effect(async () => {
            if (!this.$el) return;

            const shouldAppear = this.isInitialMount && this.visible() && this.appear();
            const hideStrategy = this.hideStrategy();

            if (this.visible()) {
                await nextFrame();
                resetStyles(this.$el, hideStrategy);

                if (shouldAppear || !this.isInitialMount) {
                    this.motion?.enter();
                }
            } else if (!this.isInitialMount) {
                await nextFrame();
                this.motion?.leave()?.then(async () => {
                    if (this.$el && !this.cancelled && !this.visible()) {
                        applyHiddenStyles(this.$el, hideStrategy);

                        if (this.unmountOnLeave()) {
                            await nextFrame();
                            if (!this.cancelled) {
                                this.rendered.set(false);
                            }
                        }
                    }
                });
            }

            this.isInitialMount = false;
        });
    }

    onDestroy(): void {
        this.cancelled = true;

        this.motion?.cancel();
        this.motion = undefined;

        resetStyles(this.$el, this.hideStrategy());

        this.isInitialMount = true;
    }
}

@NgModule({
    imports: [Motion, MotionDirective],
    exports: [Motion, MotionDirective]
})
export class MotionModule {}
