"use client";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

export interface AgendaEventInfo {
    titre: string;
    description?: string;
    date: string;
    lieu?: string;
    participants?: string[];
}

interface EventInfoDialogProps {
    event: AgendaEventInfo | null;
    onOpenChange: (open: boolean) => void;
}

export function EventInfoDialog({ event, onOpenChange }: EventInfoDialogProps) {
    return (
        <Dialog open={event !== null} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-md">
                <DialogHeader>
                    <DialogTitle>{event?.titre}</DialogTitle>
                </DialogHeader>

                {event && (
                    <div className="flex flex-col gap-3 text-sm">
                        {event.description && (
                            <p className="text-muted-foreground">
                                {event.description}
                            </p>
                        )}

                        <div className="flex items-start gap-2">
                            <span
                                className="material-symbols-rounded shrink-0 text-muted-foreground"
                                style={{ fontSize: 18 }}
                            >
                                calendar_month
                            </span>
                            <span>{event.date}</span>
                        </div>

                        {event.lieu && (
                            <div className="flex items-start gap-2">
                                <span
                                    className="material-symbols-rounded shrink-0 text-muted-foreground"
                                    style={{ fontSize: 18 }}
                                >
                                    location_on
                                </span>
                                <span>{event.lieu}</span>
                            </div>
                        )}

                        {event.participants && event.participants.length > 0 && (
                            <div className="flex items-start gap-2">
                                <span
                                    className="material-symbols-rounded shrink-0 text-muted-foreground"
                                    style={{ fontSize: 18 }}
                                >
                                    groups
                                </span>
                                <span>{event.participants.join(", ")}</span>
                            </div>
                        )}
                    </div>
                )}
            </DialogContent>
        </Dialog>
    );
}
