import { TSelectRender, TSelectId, TSelectDestroy } from "../types";

import getSelectApi, { TSelectApi } from "./getSelectApi";
import getSelect from "./getSelect";

type TZSelect = (
    select: HTMLSelectElement | TSelectId | unknown,
    render: TSelectRender,
) => TSelectDestroy | TSelectApi;

const zSelect: TZSelect = (select, render) => {
    if (typeof select === 'string') {
        return getSelectApi(select);
    }

    if (select instanceof HTMLSelectElement) {
        return getSelect(select, render);
    }

    throw new Error('Что то пошло не так.');
};

export default zSelect;
