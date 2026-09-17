"use client";

import {
    Combobox,
    ComboboxChip,
    ComboboxChips,
    ComboboxChipsInput,
    ComboboxContent,
    ComboboxEmpty,
    ComboboxItem,
    ComboboxList,
    ComboboxValue,
} from "@/components/ui/combobox";

export interface PersonOption {
    id: string;
    nom: string;
}

interface PersonComboboxProps {
    options: PersonOption[];
    value: PersonOption[];
    onValueChange: (value: PersonOption[]) => void;
    placeholder?: string;
}

/** Sélecteur multiple (résidents ou éducateurs) réutilisé dans les formulaires de création. */
export function PersonCombobox({ options, value, onValueChange, placeholder }: PersonComboboxProps) {
    return (
        <Combobox
            items={options}
            multiple
            value={value}
            onValueChange={onValueChange}
            itemToStringValue={(item: PersonOption) => item.nom}
        >
            <ComboboxChips>
                <ComboboxValue>
                    {value.map((item) => (
                        <ComboboxChip key={item.id}>{item.nom}</ComboboxChip>
                    ))}
                </ComboboxValue>
                <ComboboxChipsInput placeholder={placeholder} />
            </ComboboxChips>
            <ComboboxContent>
                <ComboboxEmpty>Aucun résultat.</ComboboxEmpty>
                <ComboboxList>
                    {(item: PersonOption) => (
                        <ComboboxItem key={item.id} value={item}>
                            {item.nom}
                        </ComboboxItem>
                    )}
                </ComboboxList>
            </ComboboxContent>
        </Combobox>
    );
}
