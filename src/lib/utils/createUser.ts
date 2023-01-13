export default async function createUser(email: string, password: string, pb: any) {
    try {
        const user = {
            email: email,
            password: password,
            passwordConfirm: password
        }

        // Try to create a user
        const newUser = await pb.collection("users").create(user)

        // If user is welll created
        const result = { newUser: newUser, status: 200 }

        // return data to the register function
        return result;

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
        // If error occur 
        const result = { newUser: {}, status: e.status }
        return result
    }
}