<script>
	import { toast } from '@zerodevx/svelte-toast';
    import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';

</script>

<form id="login-container" class="w-full sm:w-[500px] p-6 flex flex-col gap-y-6" method="post" use:enhance={({form, action, data})=>{
    return async ({result, update})=>{
        switch(result.status){
            case 200: 
                goto("/dashboard")
            break;
            default:
                toast.push("Connexion échoué !", {
                    theme: {
                        "--toastBackground": "#e74c3c",
                        "--toastBarBackground": "#c0392b"
                    }
                })
            break;
        }
    }
}}>
    <h1 class="text-2xl font-semibold w-full">Connexion</h1>
    <label for="userEmail" id="email" class="w-full h-16 bg-[#EBEFF2] rounded flex flex-col p-3 group border">
        <span class="uppercase text-xs font-semibold text-[#A4A4A4] group-focus-within:text-[#202020]">Email</span>
        <input type="email" name="email" id="userEmail" class="w-full bg-transparent outline-none text-md ">
    </label>
    <label for="userPassword" id="password" class="w-full h-16 bg-[#EBEFF2] rounded flex flex-col p-3 group border">
        <span class="uppercase text-xs font-semibold text-[#A4A4A4] group-focus-within:text-[#202020]">Mot de passe</span>
        <input type="password" name="password" id="userPassword" class="w-full bg-transparent outline-none text-md">
    </label>
    <span class="text-xs">Vous n'avez pas de compte ? <a href="/register" class="text-[#3669C9]">Vous inscrire</a></span>
    <button class="w-full bg-[#3669C9] text-white text-xs uppercase h-14 rounded mt-4">Me connecter</button>
</form>

<!-- <h1>Page de connexion</h1> <br> <br>
<div class="text-blue-500">
    <a href="/register">Inscription</a><br><br>
    <a href="/login">Connexion</a>
</div>
<br>
<br>
<form method="post" use:enhance={({form, action, data})=>{
    return async ({result, update})=>{
        switch(result.status){
            case 200: 
                goto("/dashboard")
            break;
            default:
                toast.push("Connexion échoué !", {
                    theme: {
                        "--toastBackground": "#e74c3c",
                        "--toastBarBackground": "#c0392b"
                    }
                })
            break;
        }
    }
}}>
    <input type="text" class="border-2" name="email" placeholder="Adresse email" id="">
    <input type="password" name="password" placeholder="Mot de passe" class="border-2">
    <button class="border-2 rounded-md bg-red-500">Connexion</button>
</form> -->