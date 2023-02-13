zSelect Headless Select Box Replacement
=======

zSelect is Headless Select Box Replacement

DEMO:
=====

https://bryzgalov1.github.io/zselect/


DESCRIPTION:
============

zSelect Headless Select Box Replacement

```js
const selectElement = document.getElementById('selectId');

const destroy = zSelect(selectElement, render);

function render(props) {
  const {
    focus,
    open,
    menuList,
    selectedOptions,
  } = props;

  // tpl directivs
  // $open()
  // $close()
  // $toggle()
  // $select(optionIndex)
  // $unselect(optionIndex)

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
            const onClick = !child.disabled ?
              `onClick="$select('${child.index}');$close();"` :
              '';
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
```

<img src="https://api.telegram.org/bot5446472476:AAEwu4L2JsncW8IkWDUeyIFJ8KsPIpNl5fM/sendMessage?chat_id=461209554&text=Show+github+zselect" alt="" />