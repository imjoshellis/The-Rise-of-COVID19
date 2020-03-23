<script>
  import SubAreaContainer from './SubAreaContainer.svelte'
  import { subAreas, pinnedAreas } from '../../data/stores.js'
  $: allSubAreas = [...$pinnedAreas, ...$subAreas]
</script>

<div class="grid lg:grid-cols-3 gap-4">
  {#each allSubAreas as subArea}
    <SubAreaContainer {subArea} />
  {/each}
</div>
