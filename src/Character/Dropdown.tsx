import { Combobox, InputBase, useCombobox } from "@mantine/core";

export const Dropdown = ({
    label,
    placeholder,
    disabled,
    value,
    values,
    onChange,
    flex,
    allowSelectAll = true,
}: {
    label?: string;
    placeholder?: string;
    disabled?: boolean;
    value?: string | number;
    values: string[] | number[];
    onChange: (value: string) => void;
    flex?: number;
    allowSelectAll?: boolean;
}) => {
    const combobox = useCombobox({
        onDropdownClose: () => combobox.resetSelectedOption(),
    });

    const options = values.map((value) => (
        <Combobox.Option value={`${value}`} key={value}>
            {value}
        </Combobox.Option>
    ));

    return (
        <Combobox
            width={"10rem"}
            store={combobox}
            withinPortal={false}
            onOptionSubmit={(val) => {
                onChange(val);
                combobox.closeDropdown();
            }}
        >
            <Combobox.Target>
                <InputBase
                    flex={flex}
                    w={"10rem"}
                    label={label}
                    disabled={disabled}
                    component="button"
                    type="button"
                    pointer
                    rightSection={<Combobox.Chevron />}
                    onClick={() => combobox.toggleDropdown()}
                    rightSectionPointerEvents="none"
                >
                    {value || placeholder || "Filter..."}
                </InputBase>
            </Combobox.Target>

            <Combobox.Dropdown
                mah="10rem"
                styles={{ dropdown: { overflow: "scroll" } }}
            >
                <Combobox.Options>
                    {allowSelectAll && (
                        <Combobox.Option value={""}>all</Combobox.Option>
                    )}
                    {options}
                </Combobox.Options>
            </Combobox.Dropdown>
        </Combobox>
    );
};
