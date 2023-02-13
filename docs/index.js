let init = false;
let destroyList = [];

document.getElementById('init_zSelect').addEventListener('click', initZSelect);
document.getElementById('destroy_zSelect').addEventListener('click', destroyZSelect);
document.getElementById('cleaReventConsole').addEventListener('click', logClear);

const selectElement = document.getElementById('selectId');
const eventConsole = document.getElementById('eventConsole');

selectElement.addEventListener('focus', () => {
    log('onFocus');
});
selectElement.addEventListener('blur', () => {
    log('onBlur');
});
selectElement.addEventListener('change', () => {
    log('onChange');
});

initZSelect();

function initZSelect() {
    if (!init) {
        const destroy = zSelect(selectElement, render);
        destroyList.push(destroy);
        init = true;
    }
}

function destroyZSelect() {
    if (init) {
        for (const destroy of destroyList) {
            destroy();
        }
        destroyList = [];
        init = false;
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
            <div class="zSct__body" onClick="$toggle()">
                ${selectedOptions.reduce((acc, option) => acc + option.text, '')}
            </div>
            <div class="zSct__menu ${open ? 'zSct__menu--open' : ''}">
                ${menuList.reduce((str, child) => {
                    if ('OPTION' === child.type) {
                        const className = `zSct__option
                            ${child.selected ? 'zSct__option--selected' : ''}
                            ${child.disabled ? 'zSct__option--disabled' : ''}
                        `;
                        const onClick = !child.disabled ? `onClick="$select('${child.index}');$close();"` : '';
                        return str + `
                            <div class="${className}" ${onClick}>
                                ${child.text}
                            </div>
                        `;
                    }
                    return str;
                }, '')}
            </div>
        </div>
    `;
}

function log(text) {
    eventConsole.innerHTML += `${text}<br>`;
}

function logClear() {
    eventConsole.innerHTML = '';
}
