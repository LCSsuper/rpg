import { Combobox, InputBase, ScrollArea, useCombobox } from "@mantine/core";

export const Dropdown = ({
    label,
    placeholder,
    disabled,
    value,
    values,
    onChange,
    flex,
    allowSelectAll,
    w,
}: {
    label?: string;
    placeholder?: string;
    disabled?: boolean;
    value?: string | number;
    values: string[] | number[];
    onChange: (value: string) => void;
    flex?: number;
    allowSelectAll?: boolean;
    w?: string;
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
            store={combobox}
            withinPortal={true}
            onOptionSubmit={(val) => {
                onChange(val);
                combobox.closeDropdown();
            }}
            width={w}
        >
            <Combobox.Target>
                <InputBase
                    flex={flex}
                    label={label}
                    disabled={disabled}
                    component="button"
                    type="button"
                    pointer
                    rightSection={<Combobox.Chevron />}
                    onClick={() => combobox.toggleDropdown()}
                    rightSectionPointerEvents="none"
                    w={w}
                >
                    {value || placeholder || "Filter"}
                </InputBase>
            </Combobox.Target>

            <Combobox.Dropdown>
                <Combobox.Options>
                    <ScrollArea.Autosize type="scroll" mah="10rem">
                        {allowSelectAll && (
                            <Combobox.Option flex={flex} value={""}>
                                all
                            </Combobox.Option>
                        )}
                        {options}
                    </ScrollArea.Autosize>
                </Combobox.Options>
            </Combobox.Dropdown>
        </Combobox>
    );
};
