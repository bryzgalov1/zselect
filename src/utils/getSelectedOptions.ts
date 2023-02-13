import { TSelectedOption } from "../types";

type TGetSelectedOptions = (select: HTMLSelectElement) => TSelectedOption[];

const getSelectedOptions: TGetSelectedOptions = (select) => {
    const list: TSelectedOption[] = [];

    for (const selectedOption of select.selectedOptions) {
        const {
            text,
            value,
            disabled,
            index,
        } = selectedOption;

        list.push({
            text,
            value,
            disabled,
            index,
        });
    }

    return list;
};

export default getSelectedOptions;
