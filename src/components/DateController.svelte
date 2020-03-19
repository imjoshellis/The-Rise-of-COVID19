<script>
  import { dateValue, dateIdx, dateMax } from '../stores.js'

  const increaseDate = () => {
    $dateIdx < $dateMax ? ($dateIdx += 1) : $dateIdx
  }

  const decreaseDate = () => {
    $dateIdx > 4 ? ($dateIdx -= 1) : $dateIdx
  }
</script>

<style type="text/css">
  button {
    @apply rounded px-4 py-2;
  }
</style>

<label>
  <button on:click={decreaseDate}>‹</button>
  <input type="range" bind:value={$dateIdx} min="4" max={$dateMax} />
  <button on:click={increaseDate}>›</button>
</label>
<div>Day: {$dateIdx}, {$dateValue}</div>
