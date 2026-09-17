import { clerkClient } from "@clerk/nextjs/server";
import { verifyWebhook } from "@clerk/nextjs/webhooks";
import type { NextRequest } from "next/server";

// import { prisma } from "@/lib/prisma"; // TODO: décommenter une fois Prisma branché

/**
 * Stratégie "whitelist employé" (gratuite, sans mode Invite-only payant) :
 *
 * 1. Le sign-up Clerk reste ouvert à tout le monde.
 * 2. Ce webhook écoute "user.created" : dès qu'un compte est créé, on vérifie
 *    si son email correspond à un Employe déjà créé par le Directeur en base.
 * 3. Si oui -> on ne fait rien, le compte est légitime.
 * 4. Si non -> on supprime IMMÉDIATEMENT le compte Clerk fraîchement créé.
 *    La personne est déconnectée et ne peut plus se reconnecter avec cet email.
 *
 * Nécessite dans le dashboard Clerk (Webhooks) un endpoint pointant vers
 * /api/webhooks/clerk, écoutant l'événement "user.created", et la variable
 * d'environnement CLERK_WEBHOOK_SIGNING_SECRET (fournie par Clerk à la création
 * de l'endpoint) dans .env.
 */
export async function POST(request: NextRequest) {
    let evt;
    try {
        // Vérifie la signature Svix - ne jamais sauter cette étape, même en dev.
        evt = await verifyWebhook(request);
    } catch (err) {
        console.error("Signature webhook Clerk invalide :", err);
        return new Response("Signature invalide", { status: 400 });
    }

    if (evt.type !== "user.created") {
        return new Response("Événement ignoré", { status: 200 });
    }

    const email = evt.data.email_addresses[0]?.email_address;
    if (!email) {
        return new Response("Aucun email sur ce compte", { status: 200 });
    }

    // TODO: remplacer par une vraie requête Prisma une fois branché :
    // const employe = await prisma.employe.findUnique({ where: { email } });
    const employe = null as { id: string } | null;

    if (!employe) {
        // Email non whitelisté -> le compte Clerk n'aurait jamais dû être créé.
        const client = await clerkClient();
        await client.users.deleteUser(evt.data.id);
        console.warn(`Compte Clerk refusé et supprimé (email non whitelisté) : ${email}`);
        return new Response("Email non autorisé, compte supprimé", { status: 200 });
    }

    // TODO: lier le compte Clerk à la fiche Employe (stocker evt.data.id sur l'Employe)
    // await prisma.employe.update({ where: { id: employe.id }, data: { clerkUserId: evt.data.id } });

    return new Response("OK", { status: 200 });
}
