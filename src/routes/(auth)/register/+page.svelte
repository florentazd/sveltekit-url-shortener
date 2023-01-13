<script lang="ts">
	import { enhance } from "$app/forms";
	import { goto } from "$app/navigation";
    import { toast } from '@zerodevx/svelte-toast'

</script>

<h1>Page d'inscription</h1> <br> <br>
<div class="text-blue-500">
    <a href="/register">Inscription</a><br><br>
    <a href="/login">Connexion</a>
</div>
<br>
<br>
<form method="POST" use:enhance={({form, data, action, cancel})=>{
    return async ({result, update})=>{
        switch(result.status) {
            case 200:
                // @ts-ignore
                const { message }  = result.data

                goto("/login")
                toast.push(message, {
                    theme: {
                        "--toastBackground": "green",
                        "--toastBarBackground": "#27ae60"
                    }
                })
            break;
            case 400:
                // todo show that the email is already used
            break;
            case 401:
                // show that the payload have erorr
                break;
            case 500:
                // @ts-ignore
                const {errorMessage} = result.data
                // show notification of internal error
                toast.push(errorMessage, {
                    theme: {
                        "--toastBackground": "#FFC312",
                        "--toastBarBackground": "#F79F1F"
                    }
                })
            break;
        }
    }
}}>
    <input type="text" class="border-2" name="email" placeholder="Adresse email" id="">
    <input type="password" name="password" placeholder="Mot de passe" class="border-2">
    <input type="password" name="confirmPassword" placeholder="Confirmation mot de passe" id="" class="border-2">
    <button class="border-2 rounded-md bg-red-500">inscription</button>
</form>