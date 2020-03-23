<script>
  import Slope from '../Slope.svelte'
  export let p
  export let setArea
  export let pinned
  export let togglePin
</script>

<style type="text/scss">
  h3 {
    @apply text-3xl font-bold;
  }

  .chart-wrap {
    flex-basis: 30%;
  }
  .chart-div {
    overflow: hidden;
    border-radius: 9999px;
    @apply mx-2;
  }

  .data-div {
    flex-basis: 70%;
    @apply text-sm flex flex-col font-mono;
  }

  .data-subtext {
    @apply text-xs;
  }

  h4 {
    @apply font-bold mt-2;
  }

  svg {
    @apply h-4 w-4;
  }

  .unlock {
    .feather-lock {
      display: block;
    }
    .feather-unlock {
      display: none;
    }
    &:hover {
      .feather-lock {
        display: none;
      }
      .feather-unlock {
        display: block;
      }
    }
  }

  .lock {
    .feather-lock {
      display: none;
    }
    .feather-unlock {
      display: block;
    }
    &:hover {
      .feather-lock {
        display: block;
      }
      .feather-unlock {
        display: none;
      }
    }
  }
</style>

<div class="flex flex-col">
  <div class="flex flex-row justify-start items-center">
    {#if pinned}
      <button
        on:click={togglePin}
        class="unlock bg-purple-900 hover:bg-purple-500 text-purple-300 hover:text-purple-100 px-2 w-8 h-8 rounded mr-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="feather feather-lock">
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="feather feather-unlock">
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
          <path d="M7 11V7a5 5 0 0 1 9.9-1" />
        </svg>
      </button>
    {:else}
      <button
        on:click={togglePin}
        class="lock bg-purple-400 hover:bg-purple-700 text-purple-900 hover:text-purple-400 px-2 w-8 h-8 rounded mr-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="feather feather-lock">
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="feather feather-unlock">
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
          <path d="M7 11V7a5 5 0 0 1 9.9-1" />
        </svg>
      </button>
    {/if}
    <h3 on:click={setArea} class="{p.style} text-gray-500">{p.name}</h3>
  </div>
  <div class="flex flex-row">
    <div class="chart-wrap">
      <div class="chart-div">
        <Slope {p} />
      </div>
    </div>
    <div class="data-div">
      <h4>Active Cases</h4>
      <div class="data-text ">Today: {p.today}</div>
      <div class="data-subtext">Yesterday: {p.yesterday}</div>
      <div class="data-subtext">Two Days Ago: {p.twoAgo}</div>
      <h4>Rate of Growth</h4>
      <div class="data-text {p.color}">{p.nowRateArrow} Today: {p.nowRate}</div>
      <div class="data-subtext">{p.prevRateArrow} Yesterday: {p.prevRate}</div>
      <div class="data-subtext">Rate of Rate: {p.deltaRate}</div>
    </div>
  </div>

</div>
