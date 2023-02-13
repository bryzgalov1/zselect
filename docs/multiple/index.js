let destroy = null;

document.getElementById('init_zSelect').addEventListener('click', initZSelect);
document.getElementById('destroy_zSelect').addEventListener('click', destroyZSelect);

const selectElement = document.getElementById('selectId');

initZSelect();

function initZSelect() {
    if (!destroy) {
        destroy = zSelect(selectElement, render);
    }
}

function destroyZSelect() {
    if (destroy) {
        destroy();
        destroy = null;
    }
}

function render(props) {
    const {
        focus,
        open,
        menuList,
        selectedOptions,
    } = props;

    return `
        <div class="zSct ${focus ? 'zSct--focus' : ''}">
            <div class="zSct__body">
                ${selectedOptions.reduce((acc, option) => {
                    return acc + `
                        <div class="zSct__body-option">
                            <div class="zSct__body-text">${option.text}</div>
                            <div class="zSct__body-unselect" onClick="$unselect(${option.index})">x</div>
                        </div>
                    `;
                }, '')}
                <div class="zSct__body-toggle" onClick="$toggle()"></div>
            </div>
            <div class="zSelect__menu ${open ? 'zSelect__menu--open' : ''}">
                ${menuList.reduce((str, child) => {
                    if ('OPTION' === child.type) {
                        return str + renderOption(child, props);
                    }
                    if ('OPTGROUP' === child.type) {
                        return str + renderOptgroup(child, props);
                    }
                    return str;
                }, '')}
            </div>
        </div>
    `;
}

function renderOption(selectOption, _selectProps) {
    const {
        selected,
        disabled,
        text,
        index,
    } = selectOption;

    const className = `zSct__option
        ${selected ? 'zSct__option--selected' : ''}
        ${disabled ? 'zSct__option--disabled' : ''}
    `;

    const onClick = !disabled ? (selected ? `onClick="$unselect('${index}')"` : `onClick="$select('${index}')"`) : '';

    const html = `
        <div class="${className}" ${onClick}>
            ${text}
        </div>
    `;
    return html;
}

function renderOptgroup(selectOptgroup, selectProps) {
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
