<script>
  import Square from './Square.svelte'
  import { subAreas } from '../../../data/stores.js'
</script>

<style type="text/scss">
  .region-squares {
    @apply flex flex-col flex-wrap h-16 items-center justify-start content-center;
  }
</style>

<div class="region-squares">
  {#each $subAreas as subArea}
    <Square {subArea} />
  {/each}
</div>
