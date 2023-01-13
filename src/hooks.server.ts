import { PUBLIC_API_URL } from "$env/static/public"
import { redirect, type Handle } from "@sveltejs/kit"
import Pocketbase from "pocketbase"

// create a new pocketbase client
const pb = new Pocketbase(PUBLIC_API_URL)

export const handle: Handle = async ({ event, resolve }) => {

    // Set the locals pocketbase data to send it into the app
    event.locals.pb = pb

    // A chaque requete on load l'uilisateur depuis le cookie
    event.locals.pb.authStore.loadFromCookie(event.request.headers.get("cookie") || "")


    if (!event.locals.pb.authStore.isValid) {
        // if the user is not connected
        if (event.url.pathname.startsWith("/dashboard")) throw redirect(307, "/login")
        // redirect the user to the login page
    } else {
        if (event.url.pathname == "/login" || event.url.pathname == "/register")
            throw redirect(307, "/dashboard")
    }

    // resolve the event
    const response = await resolve(event)

    response.headers.set("set-cookie", event.locals.pb.authStore.exportToCookie({ secure: false }))

    // return the response to the client
    return response;
}