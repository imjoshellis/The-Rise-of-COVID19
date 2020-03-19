<script>
  import data from '../data/data.js'

  let i = 0
  export let regions
</script>

<label>
  <input type="range" bind:value={i} max={regions.length} />
</label>
