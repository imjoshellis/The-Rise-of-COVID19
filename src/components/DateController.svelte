<script>
  import { dateValue, dateIdx, dateMax } from '../data/stores.js'

  const increaseDate = () => {
    $dateIdx < $dateMax ? ($dateIdx += 1) : $dateIdx
  }

  const decreaseDate = () => {
    $dateIdx > 4 ? ($dateIdx -= 1) : $dateIdx
  }

  $: currentDate = $dateValue.toLocaleDateString()
</script>

<style type="text/css">
  button {
    @apply rounded px-2 py-1 m-4;
  }
  input[type='range'] {
    -webkit-appearance: none; /* Hides the slider so that custom slider can be made */
    width: 100%; /* Specific width is required for Firefox. */
    background: transparent; /* Otherwise white in Chrome */
  }

  input[type='range']::-webkit-slider-thumb {
    -webkit-appearance: none;
  }

  input[type='range']:focus {
    outline: none; /* Removes the blue border. You should probably do some kind of focus styling for accessibility reasons though. */
  }

  input[type='range']::-ms-track {
    width: 100%;
    cursor: pointer;

    /* Hides the slider so custom styles can be added */
    background: transparent;
    border-color: transparent;
    color: transparent;
  }

  /* THUMB */
  /* Special styling for WebKit/Blink */
  input[type='range']::-webkit-slider-thumb {
    -webkit-appearance: none;
    @apply cursor-pointer bg-gray-200 rounded h-4 w-4 border-solid border-gray-400 border;
    margin-top: -4px; /* You need to specify a margin in Chrome, but in Firefox and IE it is automatic */
  }

  /* All the same stuff for Firefox */
  input[type='range']::-moz-range-thumb {
    @apply cursor-pointer bg-gray-200 rounded h-4 w-4 border-solid border-gray-400 border;
  }

  /* All the same stuff for IE */
  input[type='range']::-ms-thumb {
    @apply cursor-pointer bg-gray-200 rounded h-4 w-4 border-solid border-gray-400 border;
  }

  /* TRACK */
  input[type='range']::-webkit-slider-runnable-track {
    width: 100%;
    @apply bg-gray-700 rounded-sm h-2 cursor-pointer;
  }

  input[type='range']:focus::-webkit-slider-runnable-track {
    @apply bg-gray-600;
  }

  input[type='range']::-moz-range-track {
    width: 100%;
    @apply bg-gray-700 rounded-sm h-2 cursor-pointer;
  }

  input[type='range']::-ms-track {
    width: 100%;
    @apply bg-gray-700 rounded-sm h-2 cursor-pointer;
    background: transparent;
    color: transparent;
  }
  input[type='range']::-ms-fill-lower {
    @apply bg-gray-700 rounded-sm h-2 cursor-pointer;
  }
  input[type='range']:focus::-ms-fill-lower {
    @apply bg-gray-600;
  }
  input[type='range']::-ms-fill-upper {
    @apply bg-gray-700 rounded-sm h-2 cursor-pointer;
  }
  input[type='range']:focus::-ms-fill-upper {
    @apply bg-gray-600;
  }

  controls {
    @apply flex flex-row justify-center items-center;
  }
</style>

<controls>
  <button on:click={decreaseDate}>‹</button>
  <input type="range" bind:value={$dateIdx} min="4" max={$dateMax} />
  <button on:click={increaseDate}>›</button>
  <div>Day {$dateIdx}: {currentDate}</div>
</controls>
