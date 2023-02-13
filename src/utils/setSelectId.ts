import uniq from "./uniq";

type TSelectId = string;
type TRemoveSelectIdIfNeed = () => void;
type TSetSelectId = (select: HTMLSelectElement) => [
    TSelectId,
    TRemoveSelectIdIfNeed
];

const setSelectId: TSetSelectId = (select) => {
    const selectId = select.id;

    if (!selectId) {
        const id = uniq();

        select.setAttribute('id', id);

        const removeSelectIdIfNeed = () => {
            select.removeAttribute('id');
        };

        return [
            id,
            removeSelectIdIfNeed,
        ];
    }

    return [
        selectId,
        () => { }
    ];
};

export default setSelectId;
