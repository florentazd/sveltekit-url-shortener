<script lang="ts">
    export let data;
    const {user, links} = data
    
    $: viewsArray = links.map((link:any) => link.views)
    $: totalViews = viewsArray.length > 0 ? viewsArray.reduce((a:number, b:number) => parseInt(a)+ parseInt(b)) : 0
</script>

<p>{user.username}</p>

<div>
    <h1 class="text-red-400 text-2xl">New url creator</h1>
    <form action="?/create" method="post">
        <input type="text" name="link" class="bg-[#F5F5F5]" placeholder="Nouveau lien">
        <button class="bg-blue-400">Creer mon lien</button>
    </form>
</div>

<h3>Nombre de liens: {links.length}</h3>
<h3>Nombre de vue: {totalViews}</h3>
<br><br><br>
<!-- show all list items -->
{#each links as link}
<div>
    <p>Lien original: {link.origin}</p>
    <p>Lien court: http://127.0.0.1:5173/{link.short}</p>
    <p>nombre de vue: {link.views}</p>
    <form action="?/drop" method="post">
        <button>Supprimer</button>
        <input type="hidden" name="linkId" value={link.id}>
    </form>
    <br><br>
</div>
{:else}
<i>La liste est vide</i>
{/each}

<br><br>
<a href="/logout" class="text-red-500">Déconnexion</a>