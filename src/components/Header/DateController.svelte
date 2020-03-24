<script>
  import { dates, dateValue, dateIdx, dateMax } from '../../data/stores.js'
  import { parseData } from '../../data/data.js'
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
          $dateIdx++
        } else {
          clearInterval(interval)
          playing = false
        }
      }, 400)
    } else {
      clearInterval(interval)
    }
  }

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

  $: currentDate = months[$dateValue.getMonth()] + ' ' + $dateValue.getDate() + ', ' + $dateValue.getFullYear()

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

<style type="text/scss">
  button {
    @apply rounded px-2 py-1 mx-1 border-none transition-all duration-200 ease-out;
  }

  button svg {
    @apply fill-current;
  }

  button:hover {
    @apply ease-in;
  }

  button:disabled {
    opacity: 0.75;
    cursor: not-allowed;
    @apply bg-gray-800;
  }

  button:disabled svg {
    @apply stroke-current text-gray-600;
  }

  .skip {
    @apply rounded px-1 py-1 mx-0  text-gray-500;
  }

  .skip:hover {
    @apply bg-gray-500  text-gray-200;
  }

  controls {
    @apply flex flex-row justify-center items-center;
  }

  .about-day-number {
    @apply mr-1 text-xs self-start;

    &:hover::after {
      content: ' (of available data)';
    }
  }
</style>

<div class="flex flex-col mx-4">
  <controls>
    <button class="skip" on:click={() => ($dateIdx = 0)}>
      <i style="height:1.25rem;width:1.25rem;" data-feather="skip-back" />
    </button>
    <button class="skip" on:click={decreaseDate}>
      <i style="height:1.25rem;width:1.25rem;" data-feather="rewind" />
    </button>
    <div class="w-full h-2 ml-4 mr-5" bind:this={slider} />
    <button
      class={playing ? 'text-red-200 bg-red-500' : 'text-green-200 bg-green-500'}
      {disabled}
      on:click={togglePlay}>
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
  <div class="flex flex-row justify-center">
    <div>Day {$dateIdx + 1}</div>
    <div class="about-day-number">?</div>
    <div>- {currentDate}</div>
  </div>
</div>
