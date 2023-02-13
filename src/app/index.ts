import zSelect from "../zSelect";
import { TSelectDestroy } from "../types";

import render from "./render";
import renderMultiple from "./renderMultiple";

let init = false;
let destroyList: TSelectDestroy[] = [];

document.getElementById('init')!.addEventListener('click', initZSelect);
document.getElementById('destroy')!.addEventListener('click', destroyZSelect);

function initZSelect() {
    if (!init) {
        {
            const nodeList = document.querySelectorAll('.js-zselect');
            for (const select of nodeList) {
                const destroy = zSelect(select, render);
                destroyList.push(destroy as TSelectDestroy);
            }
        }
        {
            const nodeList = document.querySelectorAll('.js-zselect-multiple');
            for (const select of nodeList) {
                const destroy = zSelect(select, renderMultiple);
                destroyList.push(destroy as TSelectDestroy);
            }
        }
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

export { };
