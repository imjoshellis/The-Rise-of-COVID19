<script>
  export let toggleAbout
</script>

<style type="text/scss">
  button {
    cursor: pointer;
  }
  a {
    cursor: pointer;
    @apply text-purple-400 transition-all duration-300 ease-out;
    &:hover {
      @apply text-purple-100;
    }
  }
  p {
    @apply mb-2;
  }
</style>

<div class="bg-gray-800 mx-auto mb-6 p-4 max-w-5xl rounded">
  <div class="flex flex-row items-center justify-between">
    <h2 class="text-2xl font-bold">About</h2>
    <button class="close-button" on:click={toggleAbout}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="feather feather-x">
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
      </svg>
    </button>
  </div>
  <div class="content">
    <p>
      This tool is designed to highlight the day-over-day growth rate of COVID-19 in various regions. It processes data
      from the
      <a href="https://github.com/CSSEGISandData/COVID-19" target="_blank">Johns Hopkins Github repository,</a>
      which is updated daily.
    </p>
    <p>
      It is important to note that the calculations (espeically "confirmed cases in 7 days based on current rate") can
      be
      <span class="font-bold text-red-500">extremely volatile,</span>
      meaning they can change dramatically day-to-day for a variety of reasons. Make conclusions at your own risk.
    </p>
    <p>
      If an item is red, that means the amount of new confirmed cases (growth rate) is worse (larger) today than
      yesterday. If it's green, it means the amount of new confirmed cases (growth rate) is better (lower) today. Green
      does not necessarily mean that the growth rate is "good" -- just that it's better than yesterday.
    </p>
    <p>
      Note for color-blind users: I'm currently working on a color-blind mode toggle, but for now, you can tell whether
      something is better/worse by looking at the arrows (up is bad, down is good).
    </p>
    <a on:click={toggleAbout} class="text-xs">( close this message )</a>
  </div>
</div>
