export declare class Tag {
    styleClass: string;
    style: any;
    severity: string;
    value: string;
    icon: string;
    rounded: boolean;
    containerClass(): {
        'p-tag p-component': boolean;
        'p-tag-info': boolean;
        'p-tag-success': boolean;
        'p-tag-warning': boolean;
        'p-tag-danger': boolean;
        'p-tag-rounded': boolean;
    };
}
export declare class TagModule {
}
