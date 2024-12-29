<script lang="ts">
    import type { BootstrapIcon } from '$/types/bootstrap_icons';

    const { name, class: cls = '' }: { name: BootstrapIcon; class?: string } = $props();
</script>

<i class="bi {name} {cls}"></i>
