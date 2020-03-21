<script>
  import SubAreaContainer from './SubAreaContainer.svelte'
  import { last } from '../../data/data.js'
  import { dateIdx, data, dates } from '../../data/stores.js'

  export let subAreas // [{ name: '', today: '', yesterday: '', twoAgo: '', threeAgo: '' }]
</script>

<div class="grid lg:grid-cols-3 gap-4">
  {#each subAreas as subArea}
    <SubAreaContainer {subArea} />
  {/each}
</div>
