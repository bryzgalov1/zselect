const getSelectApi = (selectId: string) => {

    const setOpen = (bool: boolean) => {
        const select = document.getElementById(selectId);
        if (select) {
            const detail = {
                bool,
            };
            const event = new CustomEvent('setOpen', { detail });
            select.dispatchEvent(event);
        }
    };

    const setOpenToggle = () => {
        const select = document.getElementById(selectId);
        if (select) {
            const event = new CustomEvent('setOpenToggle', {});
            select.dispatchEvent(event);
        }
    };

    const setSelectOption = (selected: boolean, optionIndex: number) => {
        const select = document.getElementById(selectId);
        if (select) {
            const detail = {
                optionIndex,
                selected,
            };
            const event = new CustomEvent('setSelectOption', { detail });
            select.dispatchEvent(event);
        }
    };

    return {
        setOpen,
        setOpenToggle,
        setSelectOption,
    };
};

export type TSelectApi = ReturnType<typeof getSelectApi>;

export default getSelectApi;
