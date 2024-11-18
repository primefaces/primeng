export var lastId = 0;

export function UniqueComponentId(prefix = 'pn_id_') {
    lastId++;

    return `${prefix}${lastId}`;
}
