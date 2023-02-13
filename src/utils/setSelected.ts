type TSetSelected = (select: HTMLSelectElement, optionIndex: number, selected: boolean) => void;

const setSelected: TSetSelected = (select, optionIndex, selected) => {
    const option = select[optionIndex];
    if (option) {
        if (option.tagName === 'OPTION') {
            (option as HTMLOptionElement).selected = selected;
        }
    }
};

export default setSelected;
