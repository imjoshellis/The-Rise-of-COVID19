<script>
  import { dateValue, dateIdx, dateMax } from '../data/stores.js'
  import noUiSlider from 'nouislider'
  import { onMount } from 'svelte'

  const increaseDate = () => {
    $dateIdx < $dateMax ? ($dateIdx += 1) : $dateIdx
  }

  const decreaseDate = () => {
    $dateIdx > 4 ? ($dateIdx -= 1) : $dateIdx
  }

  $: currentDate = $dateValue.toLocaleDateString()

  let slider

  onMount(() => {
    noUiSlider.create(slider, {
      range: {
        min: 0,
        max: $dateMax
      },
      start: $dateIdx,
      connect: 'lower',
      pips: { mode: 'count', values: 5 }
    })

    slider.noUiSlider.on('update', value => {
      $dateIdx = Math.round(value)
    })
  })
</script>

<style type="text/css">
  button {
    @apply rounded px-2 py-1 m-4;
  }

  controls {
    @apply flex flex-row justify-center items-center;
  }

  .slider {
  }
</style>

<controls>
  <button on:click={decreaseDate}>‹</button>
  <div class="w-full h-2" bind:this={slider} />
  <button on:click={increaseDate}>›</button>
  <div>Day {$dateIdx}: {currentDate}</div>
</controls>
