<script>
  import SubAreaContainer from './SubAreaContainer.svelte'
  import { subAreasFiltered, pinnedAreas } from '../../data/stores.js'
  $: allSubAreas = [...$pinnedAreas, ...$subAreasFiltered]
</script>

<div class="grid lg:grid-cols-3 gap-4">
  {#each allSubAreas as subArea}
    <SubAreaContainer {subArea} />
  {/each}
</div>
