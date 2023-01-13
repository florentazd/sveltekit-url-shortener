<script>
    import "../app.css";
    import { SvelteToast } from '@zerodevx/svelte-toast'

</script>
<SvelteToast />
<main class="h-screen w-screen">
    <slot />
</main>
