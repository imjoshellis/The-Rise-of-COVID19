<script>
  import { dates, dateValue, dateIdx, dateMax } from '../data/stores.js'
  import noUiSlider from 'nouislider'
  import { onMount } from 'svelte'

  let slider

  const increaseDate = () => {
    $dateIdx += 1
  }

  const decreaseDate = () => {
    $dateIdx -= 1
  }

  $: playing = false
  $: disabled = $dateIdx === $dateMax
  $: playButtonClass = 'bg-green-500'
  let interval

  const togglePlay = () => {
    playing = !playing
    playButtonClass = playing ? 'bg-red-500' : 'bg-green-500'
    if (playing) {
      interval = setInterval(() => {
        if ($dateIdx != $dateMax) {
          console.log('tick')
          $dateIdx++
        } else {
          clearInterval(interval)
          playing = false
        }
      }, 250)
    } else {
      clearInterval(interval)
    }
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

    feather.replace()
  })
</script>

<style type="text/css">
  button {
    @apply rounded px-2 py-1 mx-1 border-none transition-all duration-200 ease-out;
  }

  button:hover {
    @apply ease-in;
  }

  button:disabled {
    opacity: 0.75;
    cursor: not-allowed;
  }

  .skip {
    @apply rounded px-1 py-1 mx-0;
  }

  .skip:hover {
    @apply bg-gray-500;
  }

  controls {
    @apply flex flex-row ml-2 justify-center items-center;
  }
</style>

<div class="flex flex-col w-full">
  <controls>
    <button class="skip" on:click={() => ($dateIdx = 0)}>
      <i style="height:1.25rem;width:1.25rem;" data-feather="skip-back" />
    </button>
    <button class="skip" on:click={decreaseDate}>
      <i style="height:1.25rem;width:1.25rem;" data-feather="rewind" />
    </button>
    <div class="w-full h-2 ml-4 mr-5" bind:this={slider} />
    <button class={playing ? 'bg-red-500' : 'bg-green-500'} {disabled} on:click={togglePlay}>
      {#if playing}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="feather feather-pause">
          <rect x="6" y="4" width="4" height="16" />
          <rect x="14" y="4" width="4" height="16" />
        </svg>
      {:else}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="feather feather-play">
          <polygon points="5 3 19 12 5 21 5 3" />
        </svg>
      {/if}
    </button>
    <button class="skip" on:click={increaseDate}>
      <i style="height:1.25rem;width:1.25rem;" data-feather="fast-forward" />
    </button>
    <button class="skip" on:click={() => ($dateIdx = $dateMax)}>
      <i style="height:1.25rem;width:1.25rem;" data-feather="skip-forward" />
    </button>
  </controls>
  <div class="w-48 mx-auto ">Day {$dateIdx + 1}: {currentDate}</div>
</div>
