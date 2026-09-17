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
    /** Si vrai, "Supprimer" est désactivé (ex. résident, événement terminé). */
    deleteBlocked?: boolean;
    deleteBlockedReason?: string;
    /** Utilisé dans la confirmation : "cette activité", "ce résident"... */
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
        <div onClick={(e) => e.stopPropagation()}>
            <DropdownMenu>
                <DropdownMenuTrigger render={<button type="button" title="Plus d'actions" />}>
                    <span className="material-symbols-rounded text-muted-foreground" style={{ fontSize: 18 }}>
                        more_vert
                    </span>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    {(onView || onEdit) && (
                        <DropdownMenuGroup>
                            {onView && <DropdownMenuItem onSelect={onView}>Voir la fiche</DropdownMenuItem>}
                            {onEdit && <DropdownMenuItem onSelect={onEdit}>Modifier la fiche</DropdownMenuItem>}
                        </DropdownMenuGroup>
                    )}
                    {onDelete && (
                        <>
                            <DropdownMenuSeparator />
                            <DropdownMenuGroup>
                                <DropdownMenuItem
                                    variant="destructive"
                                    disabled={deleteBlocked}
                                    onSelect={() => setConfirmOuvert(true)}
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
                                onClick={() => {
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
        </div>
    );
}
