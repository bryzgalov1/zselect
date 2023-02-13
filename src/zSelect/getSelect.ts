import { TSelectDestroy, TSelectRender } from "../types";

import { KEY } from "./constants";

import setSelectId from "../utils/setSelectId";
import getMenuList from "../utils/getMenuList";
import getSelectedOptions from "../utils/getSelectedOptions";
import setSelected from "../utils/setSelected";

import getUpdate from "./getUpdate";

type TGetSelect = (select: HTMLSelectElement, render: TSelectRender) => TSelectDestroy;

const getSelect: TGetSelect = (select, render) => {
    const [selectId, removeSelectIdIfNeed] = setSelectId(select);

    const [update, removeUpdate] = getUpdate(select);

    let stateOpen = false;

    const listReplace = [
        ['$open()', `zSelect('${selectId}').setOpen(true)`],
        ['$close()', `zSelect('${selectId}').setOpen(false)`],
        ['$toggle()', `zSelect('${selectId}').setOpenToggle()`],
        ['$select(', `zSelect('${selectId}').setSelectOption(true,`],
        ['$unselect(', `zSelect('${selectId}').setSelectOption(false,`],
    ];

    /**
     * updateBlock
     */
    const updateBlock = () => {
        const menuList = getMenuList(select);
        const selectedOptions = getSelectedOptions(select);
        const focus = document.activeElement === select;

        let html = render({
            selectId,
            focus,
            open: stateOpen,
            menuList,
            selectedOptions,
        });

        for (const [key, value] of listReplace) {
            html = html.replaceAll(key, value);
        }

        update(html);
    };

    /**
     * runUpdate
     */
    const runUpdate = (() => {
        let updatedTimeoutId: number | undefined = undefined;
        return () => {
            if (updatedTimeoutId) {
                window.clearTimeout(updatedTimeoutId);
            }
            updatedTimeoutId = window.setTimeout(() => {
                updateBlock();
            }, 10);
        }
    })();

    /** 
     * onSetOpen
    */
    const onSetOpen = (event: CustomEvent) => {
        stateOpen = event.detail.bool;
        select.focus();
        runUpdate();
    };

    select.addEventListener('setOpen', onSetOpen as EventListener);

    /** 
     * onSetOpenToggle
    */
    const onSetOpenToggle = () => {
        stateOpen = !stateOpen;
        select.focus();
        runUpdate();
    };

    select.addEventListener('setOpenToggle', onSetOpenToggle as EventListener);

    /** 
     * setSelectOption
    */
    const setSelectOption = (event: CustomEvent) => {
        const optionIndex = event.detail.optionIndex as number;
        const selected = event.detail.selected as boolean;

        setSelected(select, optionIndex, selected);

        select.dispatchEvent(new Event('change', { bubbles: true }));

        runUpdate();
    };

    select.addEventListener('setSelectOption', setSelectOption as EventListener);

    /** 
     * onChange
    */
    const onChange = () => {
        runUpdate();
    };

    select.addEventListener('change', onChange);

    /** 
     * onFocus
    */
    const onFocus = () => {
        runUpdate();
    };

    select.addEventListener('focus', onFocus);

    /** 
     * onBlur
    */
    const onBlur = () => {
        stateOpen = false;
        runUpdate();
    };

    select.addEventListener('blur', onBlur);

    /** 
     * onKeydown
    */
    const onKeydown = (event: KeyboardEvent) => {
        if (event.keyCode === KEY.RETURN) {
            stateOpen = !stateOpen;
            runUpdate();
        }
    };
    select.addEventListener('keydown', onKeydown);


    runUpdate();

    /** 
     * destroy
    */
    const destroy = () => {
        select.removeEventListener('setOpen', onSetOpen as EventListener);
        select.removeEventListener('setOpenToggle', onSetOpenToggle as EventListener);
        select.removeEventListener('setSelectOption', setSelectOption as EventListener);

        select.removeEventListener('change', onChange);
        select.removeEventListener('focus', onFocus);
        select.removeEventListener('blur', onBlur);
        select.removeEventListener('keydown', onKeydown);

        removeSelectIdIfNeed();

        removeUpdate();
    };

    return destroy;
};

export default getSelect;
