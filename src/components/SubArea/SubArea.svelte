<script>
  import Slope from '../Slope.svelte'
  export let p
  export let pinned
  export let togglePin
</script>

<style type="text/scss">
  h3 {
    @apply text-3xl font-bold;
  }

  .chart-wrap {
    flex-basis: 30%;
    max-width: 24rem;
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

  button {
    @apply px-1 w-6 h-6 rounded mr-2 transition-all duration-300 ease-in-out;
    .feather-lock,
    .feather-unlock {
      @apply transition-all duration-200;
    }
  }

  .pinned {
    @apply bg-purple-900 text-purple-300;

    .feather-lock {
      opacity: 1;
    }
    .feather-unlock {
      opacity: 0;
    }
    &:hover {
      @apply bg-gray-800 text-gray-500;

      .feather-lock {
        opacity: 0;
      }
      .feather-unlock {
        opacity: 1;
      }
    }
  }

  .unpinned {
    @apply bg-gray-800 text-gray-500;

    .feather-lock {
      opacity: 0;
    }
    .feather-unlock {
      opacity: 1;
    }

    &:hover {
      @apply bg-purple-900 text-purple-300;

      .feather-lock {
        opacity: 1;
      }
      .feather-unlock {
        opacity: 0;
      }
    }
  }
</style>

<div class="flex flex-col">
  <div class="flex flex-row justify-start items-center">
    {#if pinned}
      <button on:click={togglePin} class="pinned">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round">
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
          <path class="feather-lock" d="M7 11V7a5 5 0 0 1 10 0v4" />
          <path class="feather-unlock" d="M7 11V7a5 5 0 0 1 9.9-1" />
        </svg>
      </button>
    {:else}
      <button on:click={togglePin} class="unpinned">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round">
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
          <path class="feather-lock" d="M7 11V7a5 5 0 0 1 10 0v4" />
          <path class="feather-unlock" d="M7 11V7a5 5 0 0 1 9.9-1" />
        </svg>
      </button>
    {/if}
    <h3 class="{p.style} text-gray-500">{p.name}</h3>
  </div>
  <div class="flex flex-row">
    <div class="chart-wrap">
      <div class="chart-div">
        <Slope {p} />
      </div>
    </div>
    <div class="flex flex-col">
      <div class="data-div mr-2">
        <h4>Active Cases</h4>
        <div class="data-text ">Today: {p.today}</div>
        <div class="data-subtext">Yesterday: {p.yesterday}</div>
        <div class="data-subtext">Two Days Ago: {p.twoAgo}</div>
      </div>
      <div class="data-div">
        <h4>Rate of Growth</h4>
        <div class="data-text {p.color}">{p.nowRateArrow} Today: {p.nowRate}</div>
        <div class="data-subtext">{p.prevRateArrow} Yesterday: {p.prevRate}</div>
        <div class="data-subtext">Rate of Rate: {p.deltaRate}</div>
      </div>
    </div>
  </div>

</div>
