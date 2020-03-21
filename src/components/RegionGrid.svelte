<script>
  import SubAreaController from './SubArea/SubAreaController.svelte'
  import { countries } from '../data/stores.js'
</script>

<div class="grid lg:grid-cols-3 gap-4">
  {#each $countries as country}
    <SubAreaController {country} />
  {/each}
</div>
