<script>
  import SquareContainer from './SquareContainer.svelte'
  import { subAreas } from '../../../data/stores.js'
</script>

<style type="text/scss">
  .region-squares {
    @apply flex flex-row flex-wrap max-w-3xl items-center justify-start mb-16 content-center;
  }
</style>

<div class="region-squares mx-2 md:mx-auto">
  {#each $subAreas as subArea}
    <SquareContainer {subArea} />
  {/each}
</div>
