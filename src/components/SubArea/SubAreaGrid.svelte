<script>
  import SubAreaContainer from './SubAreaContainer.svelte'
  import { subAreasFiltered, pinnedAreas } from '../../data/stores.js'
  $: allSubAreas = [...$pinnedAreas, ...$subAreasFiltered]
</script>

<div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:mx-24">
  {#each allSubAreas as subArea}
    <SubAreaContainer {subArea} />
  {/each}
</div>
