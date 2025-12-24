import { CommonModule } from '@angular/common';
import { afterRenderEffect, Component, computed, effect, inject, InjectionToken, input, output, signal } from '@angular/core';
import { type ClassNameOptions, createMotion, type MotionEvent, type MotionInstance, type MotionOptions } from '@primeuix/motion';
import { nextFrame } from '@primeuix/utils';
import { BaseComponent, PARENT_INSTANCE } from 'primeng/basecomponent';
import { Bind, BindModule } from 'primeng/bind';
import type { MotionPassThrough } from 'primeng/types/motion';
import { applyHiddenStyles, resetStyles } from './motion.utils';
import { MotionStyle } from './style/motion.style';

const MOTION_INSTANCE = new InjectionToken<Motion>('MOTION_INSTANCE');

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
export class Motion extends BaseComponent<MotionPassThrough> {
    $pcMotion: Motion | undefined = inject(MOTION_INSTANCE, { optional: true, skipSelf: true }) ?? undefined;

    bindDirectiveInstance = inject(Bind, { self: true });

    onAfterViewChecked(): void {
        const options = this.options() as any;
        const optionsAttrs = options?.root || {};
        this.bindDirectiveInstance.setAttrs({ ...this.ptms(['host', 'root']), ...optionsAttrs });
    }

    _componentStyle = inject(MotionStyle);

    /******************** Inputs ********************/

    /**
     * Whether the element is visible or not.
     * @group Props
     */
    visible = input<boolean>(false);
    /**
     * Whether to mount the element on enter.
     * @group Props
     */
    mountOnEnter = input<boolean>(true);
    /**
     * Whether to unmount the element on leave.
     * @group Props
     */
    unmountOnLeave = input<boolean>(true);
    /**
     * The name of the motion. It can be a predefined motion name or a custom one.
     * phases:
     *     [name]-enter
     *     [name]-enter-active
     *     [name]-enter-to
     *     [name]-leave
     *     [name]-leave-active
     *     [name]-leave-to
     * @group Props
     */
    name = input<MotionOptions['name']>(undefined);
    /**
     * The type of the motion, valid values 'transition' and 'animation'.
     * @group Props
     */
    type = input<MotionOptions['type']>(undefined);
    /**
     * Whether the motion is safe.
     * @group Props
     */
    safe = input<MotionOptions['safe']>(undefined);
    /**
     * Whether the motion is disabled.
     * @group Props
     */
    disabled = input<MotionOptions['disabled']>(false);
    /**
     * Whether the motion should appear.
     * @group Props
     */
    appear = input<MotionOptions['appear']>(false);
    /**
     * Whether the motion should enter.
     * @group Props
     */
    enter = input<MotionOptions['enter']>(true);
    /**
     * Whether the motion should leave.
     * @group Props
     */
    leave = input<MotionOptions['leave']>(true);
    /**
     * The duration of the motion.
     * @group Props
     */
    duration = input<MotionOptions['duration']>(undefined);
    /**
     * The hide strategy of the motion, valid values 'display' and 'visibility'.
     * @group Props
     */
    hideStrategy = input<'display' | 'visibility'>('display');
    /**
     * The enter from class of the motion.
     * @group Props
     */
    enterFromClass = input<ClassNameOptions['from']>(undefined);
    /**
     * The enter to class of the motion.
     * @group Props
     */
    enterToClass = input<ClassNameOptions['to']>(undefined);
    /**
     * The enter active class of the motion.
     * @group Props
     */
    enterActiveClass = input<ClassNameOptions['active']>(undefined);
    /**
     * The leave from class of the motion.
     * @group Props
     */
    leaveFromClass = input<ClassNameOptions['from']>(undefined);
    /**
     * The leave to class of the motion.
     * @group Props
     */
    leaveToClass = input<ClassNameOptions['to']>(undefined);
    /**
     * The leave active class of the motion.
     * @group Props
     */
    leaveActiveClass = input<ClassNameOptions['active']>(undefined);

    /******************** All Inputs ********************/

    /**
     * The motion options.
     * @group Props
     */
    options = input<MotionOptions>({});

    /******************** Outputs ********************/

    /**
     * Callback fired before the enter transition/animation starts.
     * @param {MotionEvent} [event] - The event object containing details about the motion.
     * @param {Element} event.element - The element being transitioned/animated.
     * @group Emits
     */
    onBeforeEnter = output<MotionEvent | undefined>();
    /**
     * Callback fired when the enter transition/animation starts.
     * @param {MotionEvent} [event] - The event object containing details about the motion.
     * @param {Element} event.element - The element being transitioned/animated.
     * @group Emits
     */
    onEnter = output<MotionEvent | undefined>();
    /**
     * Callback fired after the enter transition/animation ends.
     * @param {MotionEvent} [event] - The event object containing details about the motion.
     * @param {Element} event.element - The element being transitioned/animated.
     * @group Emits
     */
    onAfterEnter = output<MotionEvent | undefined>();
    /**
     * Callback fired when the enter transition/animation is cancelled.
     * @param {MotionEvent} [event] - The event object containing details about the motion.
     * @param {Element} event.element - The element being transitioned/animated.
     * @group Emits
     */
    onEnterCancelled = output<MotionEvent | undefined>();
    /**
     * Callback fired before the leave transition/animation starts.
     * @param {MotionEvent} [event] - The event object containing details about the motion.
     * @param {Element} event.element - The element being transitioned/animated.
     * @group Emits
     */
    onBeforeLeave = output<MotionEvent | undefined>();
    /**
     * Callback fired when the leave transition/animation starts.
     * @param {MotionEvent} [event] - The event object containing details about the motion.
     * @param {Element} event.element - The element being transitioned/animated.
     * @group Emits
     */
    onLeave = output<MotionEvent | undefined>();
    /**
     * Callback fired after the leave transition/animation ends.
     * @param {MotionEvent} [event] - The event object containing details about the motion.
     * @param {Element} event.element - The element being transitioned/animated.
     * @group Emits
     */
    onAfterLeave = output<MotionEvent | undefined>();
    /**
     * Callback fired when the leave transition/animation is cancelled.
     * @param {MotionEvent} [event] - The event object containing details about the motion.
     * @param {Element} event.element - The element being transitioned/animated.
     * @group Emits
     */
    onLeaveCancelled = output<MotionEvent | undefined>();

    /******************** Computed ********************/

    private motionOptions = computed<MotionOptions>(() => {
        const options = this.options();

        return {
            name: options.name ?? this.name(),
            type: options.type ?? this.type(),
            safe: options.safe ?? this.safe(),
            disabled: options.disabled ?? this.disabled(),
            appear: false,
            enter: options.enter ?? this.enter(),
            leave: options.leave ?? this.leave(),
            duration: options.duration ?? this.duration(),
            enterClass: {
                from: options.enterClass?.from ?? (!options.name ? this.enterFromClass() : undefined),
                to: options.enterClass?.to ?? (!options.name ? this.enterToClass() : undefined),
                active: options.enterClass?.active ?? (!options.name ? this.enterActiveClass() : undefined)
            },
            leaveClass: {
                from: options.leaveClass?.from ?? (!options.name ? this.leaveFromClass() : undefined),
                to: options.leaveClass?.to ?? (!options.name ? this.leaveToClass() : undefined),
                active: options.leaveClass?.active ?? (!options.name ? this.leaveActiveClass() : undefined)
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
    private destroyed = false;

    rendered = signal(false);

    private readonly handleBeforeEnter = (event?: MotionEvent) => !this.destroyed && this.onBeforeEnter.emit(event);
    private readonly handleEnter = (event?: MotionEvent) => !this.destroyed && this.onEnter.emit(event);
    private readonly handleAfterEnter = (event?: MotionEvent) => !this.destroyed && this.onAfterEnter.emit(event);
    private readonly handleEnterCancelled = (event?: MotionEvent) => !this.destroyed && this.onEnterCancelled.emit(event);
    private readonly handleBeforeLeave = (event?: MotionEvent) => !this.destroyed && this.onBeforeLeave.emit(event);
    private readonly handleLeave = (event?: MotionEvent) => !this.destroyed && this.onLeave.emit(event);
    private readonly handleAfterLeave = (event?: MotionEvent) => !this.destroyed && this.onAfterLeave.emit(event);
    private readonly handleLeaveCancelled = (event?: MotionEvent) => !this.destroyed && this.onLeaveCancelled.emit(event);

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
                // @todo: Update motion options method to update options dynamically
                //this.motion.update(this.$el, this.motionOptions());
            }
        });

        afterRenderEffect(async () => {
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
        this.destroyed = true;
        this.cancelled = true;

        this.motion?.cancel();
        this.motion = undefined;

        resetStyles(this.$el, this.hideStrategy());

        this.isInitialMount = true;
    }
}
