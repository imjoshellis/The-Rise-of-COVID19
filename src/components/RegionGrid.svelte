<script>
  import SubAreaContainer from './SubArea/SubAreaContainer.svelte'
  import { countries } from '../data/stores.js'
</script>

<div class="grid lg:grid-cols-3 gap-4">
  {#each $countries as country}
    <SubAreaContainer subArea={country} />
  {/each}
</div>
