<script>
  import data from '../data/data.js'

  let i = 0
  let regions = data.regions.keys()
</script>

<label>
  <input type="range" bind:value={i} max={regions.length} />
</label>
