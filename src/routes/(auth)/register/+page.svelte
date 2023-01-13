<script lang="ts">
	import { enhance } from "$app/forms";
	import { goto } from "$app/navigation";
    import { toast } from '@zerodevx/svelte-toast'
	import { fade } from "svelte/transition";
    let passwordError:any, confirmPasswordError:any, emailError:any;

</script>

<form id="login-container" class="w-full sm:w-[500px] p-6 flex flex-col gap-y-6" method="POST" use:enhance={({form, data, action, cancel})=>{
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
                // @ts-ignore
                const { authMessage } = result.data;
                toast.push(authMessage, {
                    theme: {
                        "--toastBackground": "#e74c3c",
                        '--toastBarBackground': "#c0392b"
                    }
                })
            break;
            case 401:
                // show that the payload have erorr

                //@ts-ignore
                passwordError = result.data.passwordError;
                //@ts-ignore
                confirmPasswordError = result.data.confirmPasswordError;
                //@ts-ignore
                emailError = result.data.emailError;
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
    <h1 class="text-2xl font-semibold w-full">Inscription</h1>
    <div class="flex flex-col gap-y-1">
        <label for="userEmail" id="email" class="w-full h-16 bg-[#EBEFF2] rounded flex flex-col p-3 group">
            <span class="uppercase text-xs font-semibold text-[#A4A4A4] group-focus-within:text-[#202020]">Email</span>
            <input type="email" name="email" id="userEmail" class="w-full bg-transparent outline-none text-md">
        </label>
        {#if emailError}
        <span in:fade class="text-xs text-red-500">{emailError}</span>
        {/if}
    </div>
    <div class="flex flex-col gap-y-1">
        <label for="userPassword" id="password" class="w-full h-16 bg-[#EBEFF2] rounded flex flex-col p-3 group">
            <span class="uppercase text-xs font-semibold text-[#A4A4A4] group-focus-within:text-[#202020]">Mot de passe</span>
            <input type="password" name="password" id="userPassword" class="w-full bg-transparent outline-none text-md">
        </label>
        {#if passwordError}
        <span in:fade class="text-xs text-red-500">{passwordError}</span>
        {/if}
    </div>
    <div class="flex flex-col gap-y-1">
        <label for="userPassword" id="password" class="w-full h-16 bg-[#EBEFF2] rounded flex flex-col p-3 group">
            <span class="uppercase text-xs font-semibold text-[#A4A4A4] group-focus-within:text-[#202020]">Confirmation du mot de passe</span>
            <input type="password" name="confirmPassword" id="userPassword" class="w-full bg-transparent outline-none text-md">
        </label>
        {#if confirmPasswordError}
        <span in:fade class="text-xs text-red-500">{confirmPasswordError}</span>
        {/if}
    </div>
    <span class="text-xs">Vous avez déjà un compte ? <a href="/login" class="text-[#3669C9]">Vous connecter</a></span>
    <button class="w-full bg-[#3669C9] text-white text-xs uppercase h-14 rounded mt-4">M'inscrire</button>
</form>

<!-- <h1>Page d'inscription</h1> <br> <br>
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
                // @ts-ignore
                const { authMessage } = result.data;
                console.log(result);
                

                toast.push(authMessage, {
                    theme: {
                        "--toastBackground": "#e74c3c",
                        '--toastBarBackground': "#c0392b"
                    }
                })
            break;
            case 401:
                // show that the payload have erorr

                //@ts-ignore
                const {passwordError, confirPasswordError, emailError} = result.data;
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
</form> -->

<style>
    
</style>