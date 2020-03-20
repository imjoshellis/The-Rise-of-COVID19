<script>
  import { dateValue, dateIdx, dateMax } from '../data/stores.js'
  import noUiSlider from 'nouislider'
  import { onMount } from 'svelte'

  let slider

  const increaseDate = () => {
    $dateIdx < $dateMax ? ($dateIdx += 1) : $dateIdx
  }

  const decreaseDate = () => {
    $dateIdx > 4 ? ($dateIdx -= 1) : $dateIdx
  }

  $: currentDate = $dateValue.toLocaleDateString()

  onMount(() => {
    noUiSlider.create(slider, {
      padding: [4, 0],
      range: {
        min: 0,
        max: $dateMax
      },
      start: $dateIdx,
      connect: 'lower'
    })

    slider.noUiSlider.on('update', value => {
      $dateIdx = Math.round(value)
    })

    dateIdx.subscribe(v => {
      slider.noUiSlider.set(v)
    })
  })
</script>

<style type="text/css">
  button {
    @apply rounded px-2 py-1 mx-6 bg-gray-700 border-none transition-all duration-200 ease-out;
  }

  button:hover {
    @apply bg-gray-500 ease-in;
  }

  controls {
    @apply flex flex-row justify-center items-center;
  }
</style>

<controls>
  <button on:click={decreaseDate}>‹</button>
  <div class="w-full h-2" bind:this={slider} />
  <button on:click={increaseDate}>›</button>
  <div class="w-24">Day {$dateIdx}: {currentDate}</div>
</controls>
