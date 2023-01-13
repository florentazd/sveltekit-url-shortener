import { isShortExist } from "$lib/utils/short";
import { fail, type Actions, type ServerLoad } from "@sveltejs/kit";
import randomstring from "randomstring"

export const load: ServerLoad = async ({ locals }) => {

    const user = JSON.parse(JSON.stringify(locals.pb.authStore.model))

    // Get all links created by the user
    const links = JSON.parse(JSON.stringify(await locals.pb.collection("links").getFullList(200, {
        filter: `id = '${user.id}'`,
        sort: "-created"
    })))

    return { user, links }
}

export const actions: Actions = {
    create: async ({ request, locals }) => {
        let isStringAvailable = true;
        // create a new link here
        const formData = await request.formData()

        const link = formData.get("link")

        // TODO: check the link validity
        let short: string
        do {
            // Generate a 7 letters string
            short = randomstring.generate(5)
            // check if string already exist in the db
            isStringAvailable = await isShortExist(short as string, locals.pb)

        } while (isStringAvailable)

        // insert into the db

        const data = {
            origin: link,
            creator: locals.pb.authStore.model.id,
            short: short,
            views: 0
        }

        try {
            const record = await locals.pb.collection("links").create(data)
            return {
                // link: JSON.parse(JSON.stringify(link))
            }
        } catch (e) {
            // console.log(e);

            return fail(e.status)
        }
    },

    drop: async ({ request, locals }) => {
        const formData = await request.formData();

        const linkId = formData.get("linkId");

        try {
            await locals.pb.collection("links").delete(linkId)
            return {}
        } catch (e) {
            return fail(e.status)
        }
    }
}