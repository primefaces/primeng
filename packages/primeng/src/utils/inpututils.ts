export const transformToBoolean = (value: any): boolean => {
    return !!value;
};

export const transformToNumber = (value: string | number): number => {
    return typeof value === 'string' ? parseFloat(value) : value;
};
