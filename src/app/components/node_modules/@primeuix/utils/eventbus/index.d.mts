interface EventBusOptions {
    on(type: string, handler: Function): void;
    off(type: string, handler: Function): void;
    emit(type: string, evt?: any): void;
    clear(): void;
}
declare function EventBus(): EventBusOptions;

export { EventBus, type EventBusOptions };
