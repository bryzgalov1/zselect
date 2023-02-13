import { TMenuItemOptgroup, TMenuItemOption, TSelectRenderProps } from "../types";

function render(props: TSelectRenderProps) {
    const classRoot = `zSelect 
        ${props.focus ? 'zSelect--focus' : ''}
        ${props.open ? 'zSelect--open' : ''}
    `;

    const menu = props.menuList.reduce((str, child) => {
        if ('OPTION' === child.type) {
            return str + renderOption(child, props);
        }
        if ('OPTGROUP' === child.type) {
            return str + renderOptgroup(child, props);
        }
        return str;
    }, '');

    const html = `
        <div class="${classRoot}">
            <div class="zSelect__body" onClick="$toggle()">
                ${renderBody(props)}
            </div>
            <div class="zSelect__menu">
                ${menu}
            </div>
        </div>
    `;
    return html;
}

function renderBody(props: TSelectRenderProps) {
    return props.selectedOptions.reduce((acc, option) => {
        return acc + `
            <div class="zSelect__selected">
                ${option.text}
                <div class="zSelect__delete" onClick="$unselect(${option.index})">x</div>
            </div>
        `;
    }, '');
}

function renderOption(selectOption: TMenuItemOption, _props: TSelectRenderProps) {
    const {
        selected,
        disabled,
        text,
        index,
    } = selectOption;

    const className = `zSelect__option
        ${selected ? 'zSelect__option--selected' : ''}
        ${disabled ? 'zSelect__option--disabled' : ''}
    `;

    const onClick = !disabled ? `onClick="$select('${index}');"` : '';

    const tpl = `
        <div class="${className}" ${onClick}>
            ${text}
        </div>
    `;
    return tpl;
}

function renderOptgroup(selectOptgroup: TMenuItemOptgroup, props: TSelectRenderProps) {
    const {
        label,
        optgroupOptions,
    } = selectOptgroup;

    if (optgroupOptions) {
        const options = optgroupOptions.reduce((str, selectOption) => {
            return str + renderOption(selectOption, props);
        }, '');

        return `
            <div class="zSelect__optgroup">
                <div class="zSelect__optgroup-label">
                    ${label}
                </div>
                <div class="zSelect__optgroup-childs">
                    ${options}
                </div>
            </div>
        `;
    }
    return '';
}

export default render;
