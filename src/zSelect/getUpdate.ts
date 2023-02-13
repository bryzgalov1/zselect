type TRemoveUpdate = () => void;
type TUpdate = (html: string) => void;

type TGetUpdate = (select: HTMLSelectElement) => [
    TUpdate,
    TRemoveUpdate,
];

type Tmp = {
    value: Element | null;
};

const getUpdate: TGetUpdate = (select) => {
    const tmp: Tmp = {
        value: null,
    };

    const update: TUpdate = (html) => {
        const template = document.createElement('template');
        template.innerHTML = html.trim();

        const rootElement = template.content.children[0];

        rootElement.addEventListener('mousedown', (event) => {
            event.preventDefault();
            event.stopPropagation();
        }, false);

        if (tmp.value) {
            tmp.value.parentElement?.removeChild(tmp.value);
        }

        tmp.value = rootElement;

        select.before(rootElement);
    };

    const removeUpdate = () => {
        if (tmp.value) {
            tmp.value.parentElement?.removeChild(tmp.value);
            tmp.value = null;
        }
    };

    return [
        update,
        removeUpdate,
    ];
};

export default getUpdate;
