
export let lastId = 0;

export function UniqueComponentId() {
    const prefix = 'pr_id_';
    lastId++;
    return `${prefix}${lastId}`;
}
