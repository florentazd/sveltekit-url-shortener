<script>
    import "../app.css";
    import { SvelteToast } from '@zerodevx/svelte-toast'

</script>
<svelte:head>
    <title>URL Shortener</title>
</svelte:head>
<SvelteToast />
<main class="h-screen w-screen">
    <slot />
</main>
