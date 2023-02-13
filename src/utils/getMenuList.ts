import { TMenuItem, TMenuItemOptgroup, TMenuItemOption } from "../types";

const getMenuItemOption = (child: HTMLOptionElement): TMenuItemOption => {
    const {
        selected,
        disabled,
        text,
        value,
        index,
    } = child;

    const selectOption: TMenuItemOption = {
        type: 'OPTION',
        selected,
        disabled,
        text,
        value,
        index,
    };

    return selectOption;
};

const getOptgroupOptions = (optGroup: HTMLOptGroupElement): TMenuItemOption[] | undefined => {
    let optgroupOptions: TMenuItemOption[] = [];

    for (const child of optGroup.children) {
        if ('OPTION' === child.tagName) {
            const option = getMenuItemOption(child as HTMLOptionElement);
            optgroupOptions = [
                ...optgroupOptions,
                option,
            ];
        }
    }
    if (optgroupOptions.length > 0) {
        return optgroupOptions;
    }

    return undefined;
};

const getOptgroup = (child: HTMLOptGroupElement): TMenuItemOptgroup => {
    const label = child.label;

    const optgroupOptions = getOptgroupOptions(child);

    const selectOptgroup: TMenuItemOptgroup = {
        type: 'OPTGROUP',
        label,
        optgroupOptions,
    };

    return selectOptgroup;
};

type TGtMenuList = (select: HTMLSelectElement) => TMenuItem[];

const getMenuList: TGtMenuList = (select) => {
    let list: TMenuItem[] = [];

    for (const child of select.children) {
        if ('OPTGROUP' === child.tagName) {
            const optgroup = getOptgroup(child as HTMLOptGroupElement);
            list = [
                ...list,
                optgroup,
            ];
        }

        if ('OPTION' === child.tagName) {
            const option = getMenuItemOption(child as HTMLOptionElement);
            list = [
                ...list,
                option,
            ];
        }
    }

    return list;
};

export default getMenuList;
