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
  <div class="content text-gray-300">
    <h3 class="font-bold text-lg">Data Source</h3>
    <p>
      This tool is designed to visualize and compare the day-over-day growth rate of COVID-19 in various regions. It
      processes data from the
      <a href="https://github.com/CSSEGISandData/COVID-19" target="_blank">Johns Hopkins Github repository,</a>
      which is updated daily.
    </p>
    <p>
      It is important to note that the calculations (especially future projections) can be
      <span class="font-bold text-red-500">extremely volatile,</span>
      meaning they can change dramatically day-to-day for a variety of reasons. Make conclusions at your own risk, and
      use this tool wisely.
    </p>
    <h3 class="font-bold text-lg">Colors</h3>
    <h4 class="font-bold text-red-500">Red</h4>
    <p>
      If an item is red, that means the amount of new confirmed cases (growth rate) is worse (larger) today than
      yesterday.
    </p>
    <h4 class="font-bold text-orange-500">Orange</h4>
    <p>If an item is orange, that means the amount of new cases today is equal to the new cases yesterday.</p>
    <h4 class="font-bold text-yellow-500">Yellow</h4>
    <p>If an item is yellow, it means the amount of new confirmed cases (growth rate) is better (lower) today.</p>
    <h4 class="font-bold text-gray-500">Gray</h4>
    <p>
      If an item is light gray, that means there were no new cases. If it is dark gray, there isn't enough data yet for
      the model to work correctly.
    </p>
    <span on:click={toggleAbout} class="text-xs cursor-pointer">( close this message )</span>
  </div>
</div>
