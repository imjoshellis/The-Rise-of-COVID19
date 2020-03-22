<script>
  import SubAreaContainer from './SubAreaContainer.svelte'
  import { last } from '../../data/data.js'
  import { subAreas, dateIdx, data, dates } from '../../data/stores.js'
</script>

<div class="grid lg:grid-cols-3 gap-4">
  {#each $subAreas as subArea}
    <SubAreaContainer {subArea} />
  {/each}
</div>
