import { error, redirect, type ServerLoad } from "@sveltejs/kit";

export const load: ServerLoad = async ({ params, locals }) => {
    const short = params.short
    let record;

    // On cherche si le lien existe dans la base de données.
    try {
        record = await locals.pb.collection("links").getFirstListItem(`short = '${short}'`)

        //  si le lien existe ! on incrémente le compteur de vus
        locals.pb.collection("links").update(record.id, {
            views: (parseInt(record.views) + 1)
        })

    } catch (e) {
        console.log(e);

        throw error(404, "Le lien n'existe pas !")
    }
    // rediriger l'utilisateur vers le lien
    throw redirect(308, record.origin)
}