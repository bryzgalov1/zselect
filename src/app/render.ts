import { TMenuItemOptgroup, TMenuItemOption, TSelectRenderProps } from "../types";

function render(selectProps: TSelectRenderProps) {
    const {
        focus,
    } = selectProps;

    const className = `zSelect__wrap ${focus ? 'zSelect__wrap--focus' : ''}`;

    const html = `
        <div class="zSelect" 
            q="$open()" 
            w="$close()" 
            e="$toggle()" 
            r="$select(77)" 
            t="$unselect(99)" 
        >
            <div class="${className}">
                ${renderSelectBody(selectProps)}
                ${renderSelectList(selectProps)}
            </div>
        </div>
    `;
    return html;
}

function renderSelectBody(selectProps: TSelectRenderProps) {
    const {
        selectedOptions,
    } = selectProps;

    let text = '';
    for (const option of selectedOptions) {
        text = text + option.text;
    }
    const html = `
        <div 
            class="zSelect__body" 
            onClick="$toggle()"
        >
            ${text}
        </div>
    `;
    return html;
}

function renderSelectList(selectProps: TSelectRenderProps) {
    const {
        open,
        menuList,
    } = selectProps;

    const body = menuList.reduce((str, child) => {
        if ('OPTION' === child.type) {
            return str + renderOption(child, selectProps);
        }
        if ('OPTGROUP' === child.type) {
            return str + renderOptgroup(child, selectProps);
        }
        return str;
    }, '');

    const className = `zSelect__menu-list-popup ${open ? 'zSelect__menu-list-popup--open' : ''}`;

    const html = `
        <div 
            class="${className}" 
        >
            ${body}
        </div>
    `;
    return html;
}

function renderOption(selectOption: TMenuItemOption, _selectProps: TSelectRenderProps) {
    const {
        selected,
        disabled,
        text,
        index,
    } = selectOption;

    const className = `
        zSelect__menu-list-option
        ${selected ? 'zSelect__menu-list-option--selected' : ''}
        ${disabled ? 'zSelect__menu-list-option--disabled' : ''}
    `;

    const onClick = !disabled ? `onClick="$select('${index}');$close();"` : '';

    const html = `
        <div 
            class="${className}"
            ${onClick}
        >
            ${text}
        </div>
    `;
    return html;
}

function renderOptgroup(selectOptgroup: TMenuItemOptgroup, selectProps: TSelectRenderProps) {
    const {
        label,
        optgroupOptions,
    } = selectOptgroup;

    let html = ``;

    if (optgroupOptions) {
        const htmlOptions = optgroupOptions.reduce((str, selectOption) => {
            return str + renderOption(selectOption, selectProps);
        }, '');

        html = `
            <div class="zSelect__menu-list-optgroup">
                <div class="zSelect__menu-list-optgroup-label">
                    ${label}
                </div>
                <div class="zSelect__menu-list-optgroup-childs">
                    ${htmlOptions}
                </div>
            </div>
        `;
    }
    return html;
}

export default render;
