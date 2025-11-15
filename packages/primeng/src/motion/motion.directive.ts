import { computed, Directive, effect, inject, InjectionToken, input, output } from '@angular/core';
import { ClassNameOptions, createMotion, MotionInstance, MotionOptions } from '@primeuix/motion';
import { BaseComponent, PARENT_INSTANCE } from 'primeng/basecomponent';
import { applyHiddenStyles, resetStyles } from './motion.utils';
import { MotionStyle } from './style/motion.style';

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

    /**
     * Whether the element is visible or not.
     * @group Props
     */
    visible = input<boolean>(false, { alias: 'pMotion' });
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
    name = input<MotionOptions['name']>(undefined, { alias: 'pMotionName' });
    /**
     * The type of the motion, valid values 'transition' and 'animation'.
     * @group Props
     */
    type = input<MotionOptions['type']>(undefined, { alias: 'pMotionType' });
    /**
     * Whether the motion is safe.
     * @group Props
     */
    safe = input<MotionOptions['safe']>(undefined, { alias: 'pMotionSafe' });
    /**
     * Whether the motion should appear.
     * @group Props
     */
    appear = input<MotionOptions['appear']>(false, { alias: 'pMotionAppear' });
    /**
     * Whether the motion should enter.
     * @group Props
     */
    enter = input<MotionOptions['enter']>(true, { alias: 'pMotionEnter' });
    /**
     * Whether the motion should leave.
     * @group Props
     */
    leave = input<MotionOptions['leave']>(true, { alias: 'pMotionLeave' });
    /**
     * The duration of the motion.
     * @group Props
     */
    duration = input<MotionOptions['duration']>(undefined, { alias: 'pMotionDuration' });
    /**
     * The hide strategy of the motion, valid values 'display' and 'visibility'.
     * @group Props
     */
    hideStrategy = input<'display' | 'visibility'>('display', { alias: 'pMotionHideStrategy' });
    /**
     * The enter from class of the motion.
     * @group Props
     */
    enterFromClass = input<ClassNameOptions['from']>(undefined, { alias: 'pMotionEnterFromClass' });
    /**
     * The enter to class of the motion.
     * @group Props
     */
    enterToClass = input<ClassNameOptions['to']>(undefined, { alias: 'pMotionEnterToClass' });
    /**
     * The enter active class of the motion.
     * @group Props
     */
    enterActiveClass = input<ClassNameOptions['active']>(undefined, { alias: 'pMotionEnterActiveClass' });
    /**
     * The leave from class of the motion.
     * @group Props
     */
    leaveFromClass = input<ClassNameOptions['from']>(undefined, { alias: 'pMotionLeaveFromClass' });
    /**
     * The leave to class of the motion.
     * @group Props
     */
    leaveToClass = input<ClassNameOptions['to']>(undefined, { alias: 'pMotionLeaveToClass' });
    /**
     * The leave active class of the motion.
     * @group Props
     */
    leaveActiveClass = input<ClassNameOptions['active']>(undefined, { alias: 'pMotionLeaveActiveClass' });

    /******************** All Inputs ********************/

    /**
     * The motion options.
     * @group Props
     */
    options = input<MotionOptions>({}, { alias: 'pMotionOptions' });

    /******************** Outputs ********************/

    /**
     * Callback fired before the enter transition/animation starts.
     * @param element The element being transitioned/animated.
     * @group Emits
     */
    onBeforeEnter = output<Element | undefined>({ alias: 'pMotionOnBeforeEnter' });
    /**
     * Callback fired when the enter transition/animation starts.
     * @param element The element being transitioned/animated.
     * @group Emits
     */
    onEnter = output<Element | undefined>({ alias: 'pMotionOnEnter' });
    /**
     * Callback fired after the enter transition/animation ends.
     * @param element The element being transitioned/animated.
     * @group Emits
     */
    onAfterEnter = output<Element | undefined>({ alias: 'pMotionOnAfterEnter' });
    /**
     * Callback fired when the enter transition/animation is cancelled.
     * @param element The element being transitioned/animated.
     * @group Emits
     */
    onEnterCancelled = output<Element | undefined>({ alias: 'pMotionOnEnterCancelled' });
    /**
     * Callback fired before the leave transition/animation starts.
     * @param element The element being transitioned/animated.
     * @group Emits
     */
    onBeforeLeave = output<Element | undefined>({ alias: 'pMotionOnBeforeLeave' });
    /**
     * Callback fired when the leave transition/animation starts.
     * @param element The element being transitioned/animated.
     * @group Emits
     */
    onLeave = output<Element | undefined>({ alias: 'pMotionOnLeave' });
    /**
     * Callback fired after the leave transition/animation ends.
     * @param element The element being transitioned/animated.
     * @group Emits
     */
    onAfterLeave = output<Element | undefined>({ alias: 'pMotionOnAfterLeave' });
    /**
     * Callback fired when the leave transition/animation is cancelled.
     * @param element The element being transitioned/animated.
     * @group Emits
     */
    onLeaveCancelled = output<Element | undefined>({ alias: 'pMotionOnLeaveCancelled' });

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
