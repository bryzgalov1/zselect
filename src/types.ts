export type TMenuItemOptgroup = {
    type: 'OPTGROUP',
    label: string;
    optgroupOptions?: TMenuItemOption[];
};

export type TMenuItemOption = {
    type: 'OPTION',
    selected: boolean;
    disabled: boolean;
    text: string;
    value: string;
    index: number;
};

export type TMenuItem = TMenuItemOptgroup | TMenuItemOption;

type TMenuList = TMenuItem[];

type THtmlString = string;

export type TSelectedOption = {
    text: string;
    value: string;
    disabled: boolean;
    index: number;
};

export type TSelectRenderProps = {
    selectId: string;

    focus: boolean;
    open: boolean;

    menuList: TMenuList;
    selectedOptions: TSelectedOption[];
};

export type TSelectRender = (props: TSelectRenderProps) => THtmlString;

export type TSelectDestroy = () => void;

export type TSelectId = string;
