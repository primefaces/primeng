
export var lastId = 0;

export function UniqueComponentId () {
    let prefix = 'pr_id_';
    lastId++;
    return `${prefix}${lastId}`;
}