"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

export interface FilterField {
    key: string;
    label: string;
    options: { value: string; label: string }[];
}

interface FiltersPopoverProps {
    fields: FilterField[];
    values: Record<string, string>;
    onChange: (key: string, value: string) => void;
    onReset: () => void;
}

const TOUS = "__tous__";

/** Bouton "Filtres" générique (select par champ) réutilisé sur toutes les listes. */
export function FiltersPopover({ fields, values, onChange, onReset }: FiltersPopoverProps) {
    const actifs = Object.values(values).filter(Boolean).length;

    return (
        <Popover>
            <PopoverTrigger render={<Button variant="outline" />}>
                <span className="material-symbols-rounded" style={{ fontSize: 16 }}>
                    tune
                </span>
                Filtres
                {actifs > 0 && (
                    <span className="ml-1 flex h-5 w-5 items-center justify-center rounded-full bg-zinc-900 text-xs text-white">
                        {actifs}
                    </span>
                )}
            </PopoverTrigger>
            <PopoverContent align="end" className="flex w-64 flex-col gap-4">
                {fields.map((field) => (
                    <div key={field.key} className="flex flex-col gap-1.5">
                        <Label>{field.label}</Label>
                        <Select
                            value={values[field.key] || TOUS}
                            onValueChange={(v) => onChange(field.key, v === TOUS ? "" : v)}
                        >
                            <SelectTrigger>
                                <SelectValue>
                                    {(v: string) =>
                                        v === TOUS
                                            ? "Tous"
                                            : field.options.find((o) => o.value === v)?.label ?? "Tous"
                                    }
                                </SelectValue>
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value={TOUS}>Tous</SelectItem>
                                {field.options.map((option) => (
                                    <SelectItem key={option.value} value={option.value}>
                                        {option.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                ))}

                {actifs > 0 && (
                    <Button variant="ghost" size="sm" onClick={onReset}>
                        Réinitialiser
                    </Button>
                )}
            </PopoverContent>
        </Popover>
    );
}
