"use client";

import { useState } from "react";

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface RowActionsProps {
    onView?: () => void;
    onEdit?: () => void;
    onDelete?: () => void;
    deleteBlocked?: boolean;
    deleteBlockedReason?: string;
    entityLabel?: string;
}

// Menu "..." unique : Voir / Modifier / Supprimer + confirmation.
export function RowActions({
    onView,
    onEdit,
    onDelete,
    deleteBlocked = false,
    deleteBlockedReason,
    entityLabel = "cet élément",
}: RowActionsProps) {
    const [confirmOuvert, setConfirmOuvert] = useState(false);

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger
                    render={
                        <button
                            type="button"
                            title="Plus d'actions"
                            onClick={(e) => e.stopPropagation()}
                        />
                    }
                >
                    <span className="material-symbols-rounded text-muted-foreground" style={{ fontSize: 18 }}>
                        more_vert
                    </span>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    {(onView || onEdit) && (
                        <DropdownMenuGroup>
                            {onView && (
                                <DropdownMenuItem onClick={(e) => { e.stopPropagation(); onView(); }}>
                                    Voir la fiche
                                </DropdownMenuItem>
                            )}
                            {onEdit && (
                                <DropdownMenuItem onClick={(e) => { e.stopPropagation(); onEdit(); }}>
                                    Modifier la fiche
                                </DropdownMenuItem>
                            )}
                        </DropdownMenuGroup>
                    )}
                    {onDelete && (
                        <>
                            <DropdownMenuSeparator />
                            <DropdownMenuGroup>
                                <DropdownMenuItem
                                    variant="destructive"
                                    disabled={deleteBlocked}
                                    onClick={(e) => { e.stopPropagation(); setConfirmOuvert(true); }}
                                    title={deleteBlocked ? deleteBlockedReason : undefined}
                                >
                                    Supprimer la fiche
                                </DropdownMenuItem>
                            </DropdownMenuGroup>
                        </>
                    )}
                </DropdownMenuContent>
            </DropdownMenu>

            {onDelete && (
                <AlertDialog open={confirmOuvert} onOpenChange={setConfirmOuvert}>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Supprimer {entityLabel} ?</AlertDialogTitle>
                            <AlertDialogDescription>
                                Cette action est définitive et ne peut pas être annulée.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Annuler</AlertDialogCancel>
                            <AlertDialogAction
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onDelete();
                                    setConfirmOuvert(false);
                                }}
                            >
                                Supprimer
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            )}
        </>
    );
}
