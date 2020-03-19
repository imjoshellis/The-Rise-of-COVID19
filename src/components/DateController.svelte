<script>
  import data from '../data/data.js'
  import { dateValue, dateIdx, dateMax } from '../stores.js'

  export let regions
</script>

<label>
  <input type="range" bind:value={$dateIdx} max={$dateMax} />
</label>
<div>Day: {$dateIdx}, {$dateValue}</div>
