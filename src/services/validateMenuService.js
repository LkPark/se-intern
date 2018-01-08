'use strict'

const validateMenuService = (menuList = []) => {
    const result = {
        valid_menus: [],
        invalid_menus: []
    }

    if (menuList.length === 0) {
        return result;
    }

    for (let i = 0, len = menuList.length; i < len; i++) {
        const menuItem = menuList[i];
        if (rootItem(menuItem)) {
            const stack = [];
            const valid = validateMenuItem(menuItem, menuList, stack);
            const resultPlace = valid ? 'valid_menus' : 'invalid_menus';
            result[resultPlace].push({
                root_id: menuItem.id,
                children: stack
            });
        }
    }

    return result;
};

const validateMenuItem = (menuItem, menuList, stack, visited = {}, valid = true) => {

    if (visited[menuItem.id] === true) {
        return false;
    }

    visited[menuItem.id] = true;

    if (!withChildren(menuItem)) {
        return valid;
    }

    for (let i = 0, len = menuItem.child_ids.length; i < len; i++) {
        const menuChildId = menuItem.child_ids[i];
        const menuChildItem = findMenuItem(menuChildId, menuList);
        stack.push(menuChildId);
        valid = validateMenuItem(menuChildItem, menuList, stack, visited, valid);
    }

    return valid;
};

const findMenuItem = (id, menuList) => {
    let found = false;
    for (let i = 0, len = menuList.length; i < len; i++) {
        if (id === menuList[i].id) {
            found = menuList[i];
            break;
        }
    }
    return found;
};

const rootItem = (menuItem) => {
    return !menuItem.parent_id;
};

const withChildren = (menuItem) => {
    return menuItem.child_ids && menuItem.child_ids.length !== 0;
};

module.exports = {
    validate: validateMenuService
};
