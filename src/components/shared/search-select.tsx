"use client";

import { useEffect, useState } from "react";

import {
    Combobox,
    ComboboxContent,
    ComboboxEmpty,
    ComboboxInput,
    ComboboxItem,
    ComboboxList,
} from "@/components/ui/combobox";

interface SearchSelectProps<T> {
    options: T[];
    value: T | null;
    onValueChange: (value: T | null) => void;
    getId: (item: T) => string;
    getLabel: (item: T) => string;
    placeholder?: string;
}

// value et inputValue sont 2 states séparés côté Base UI. Sur select, onInputValueChange
// renvoie parfois du texte foireux (JSON brut, bug lib) -> ignoré sauf vraie frappe clavier.
export function SearchSelect<T>({
    options,
    value,
    onValueChange,
    getId,
    getLabel,
    placeholder,
}: SearchSelectProps<T>) {
    const [inputValue, setInputValue] = useState(value ? getLabel(value) : "");

    useEffect(() => {
        setInputValue(value ? getLabel(value) : "");
    }, [value, getLabel]);

    function handleValueChange(nouvelleValeur: T | null) {
        onValueChange(nouvelleValeur);
        setInputValue(nouvelleValeur ? getLabel(nouvelleValeur) : "");
    }

    function handleInputValueChange(texte: string, eventDetails: { reason?: string }) {
        if (eventDetails?.reason === "input-change" || eventDetails?.reason === "input-clear") {
            setInputValue(texte);
        }
    }

    return (
        <Combobox
            items={options}
            value={value}
            onValueChange={handleValueChange}
            inputValue={inputValue}
            onInputValueChange={handleInputValueChange}
            itemToStringValue={getLabel}
        >
            <ComboboxInput placeholder={placeholder ?? "Rechercher un nom..."} />
            <ComboboxContent>
                <ComboboxEmpty>Aucun résultat.</ComboboxEmpty>
                <ComboboxList>
                    {(item: T) => (
                        <ComboboxItem key={getId(item)} value={item}>
                            {getLabel(item)}
                        </ComboboxItem>
                    )}
                </ComboboxList>
            </ComboboxContent>
        </Combobox>
    );
}
