import createUser from "$lib/utils/createUser";
import { isSamePassword, isValidEmail, isValidPassword } from "$lib/utils/verification";
import { fail, type Actions } from "@sveltejs/kit";

export const actions: Actions = {
    default: async ({ request, locals }) => {
        let error = false, emailError, confirmPasswordError, passwordError;
        // Get the data from form data
        const formData = await request.formData()
        // get the pb client from locals variales
        const pb = locals.pb
        // Create a new user object
        const user = {
            email: formData.get("email"),
            password: formData.get("password"),
            confirmPassword: formData.get("confirmPassword")
        }
        // check if email is valid 
        if (!isValidEmail(user.email as string)) {
            error = true
            emailError = "The email address isn't valid"
        }
        if (!isValidPassword(user.password as string)) {
            error = true;
            passwordError = "The password isn't valid"
        }
        if (!isSamePassword(user.password as string, user.confirmPassword as string)) {
            error = true;
            confirmPasswordError = "The password don't match"
        }
        if (error) return fail(401, { passwordError: passwordError, emailError: emailError, confirmPasswordError: confirmPasswordError })


        // create the new user
        const { newUser, status } = await createUser(user.email as string, user.password as string, pb)
        let errorMessage: string

        switch (status) {
            case 200:
                // return the succes action to the client.
                return { status: status, message: "Inscription réussie ! Veuillez vous connecter au compte" }

            case 500:
                // Server side error
                errorMessage = "Une erreur interne est survennue lors de l'inscription, Veuillez rééssayer plus tard ! "
                // return a message to the client 
                return fail(500, { errorMessage: errorMessage })

            case 400:
                // The email already exist 
                errorMessage = "L'email utilisé existe déjà"
                // return the error to the client
                return fail(400, { authMessage: errorMessage })
        }
    }
}