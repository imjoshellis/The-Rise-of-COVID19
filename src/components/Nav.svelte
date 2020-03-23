<script>
  import { dateIdx, dateMax, filterStr, pinnedAreasList } from '../data/stores.js'
  const reset = () => {
    $dateIdx = $dateMax
    $filterStr = ''
    $pinnedAreasList = []
  }
  export let toggleAbout
</script>

<style type="text/scss">
  nav {
    button {
      @apply flex flex-row text-sm px-4 py-2 text-purple-300 bg-purple-800 cursor-pointer rounded mx-1 transition-all duration-300 ease-out items-center justify-center;
      &:hover {
        @apply bg-purple-600 text-purple-100 ease-in;
      }
      span {
        @apply ml-2 whitespace-no-wrap;
      }
    }
  }
</style>

<nav>
  <div class="flex flex-row">
    <button on:click={reset}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="feather feather-refresh-cw">
        <polyline points="23 4 23 10 17 10" />
        <polyline points="1 20 1 14 7 14" />
        <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
      </svg>
      <span>Reset</span>
    </button>
    <button on:click={toggleAbout}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="feather feather-help-circle">
        <circle cx="12" cy="12" r="10" />
        <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
        <line x1="12" y1="17" x2="12.01" y2="17" />
      </svg>
      <span>About</span>
    </button>
    <a href="https://github.com/imjoshellis/covid-curves" target="_blank">
      <button>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="feather feather-github">
          <path
            d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20
            4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5
            4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
        </svg>
        <span>Contribute on GitHub</span>
      </button>
    </a>
  </div>
</nav>
