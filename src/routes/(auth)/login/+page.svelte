<script>
	import { toast } from '@zerodevx/svelte-toast';
    import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';

</script>
<h1>Page de connexion</h1> <br> <br>
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
</form>