import { fail, type Actions } from "@sveltejs/kit";

export const actions: Actions = {
    default: async ({ locals, request }) => {
        const formData = await request.formData()

        const guest = {
            email: formData.get('email'),
            password: formData.get("password")
        }

        try {
            const { record, token } = await locals.pb.collection("users").authWithPassword(guest.email, guest.password)
            return {}
        }
        catch (e) {
            return fail(e.status)
        }
    }
}