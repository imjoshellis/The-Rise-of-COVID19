<script>
  export let p
  export let pinArea
  export let pinColor
</script>

<style type="text/scss">
  .region-square {
    @apply w-4 h-4 mr-1 mb-1 rounded-sm border-solid border-2 transition-all duration-200 ease-in-out;
  }

  /* Tooltip container */
  .tooltip {
    position: relative;
    display: inline-block;
  }

  /* Tooltip text */
  .tooltip .tooltiptext {
    visibility: hidden;
    text-align: center;
    padding: 8px;
    border-radius: 6px;

    opacity: 0;
    transition: all 0.15s ease-in;
    /* Position the tooltip text - see examples below! */
    position: absolute;
    top: -5px;
    right: 150%;
    z-index: 1;
  }

  /* Show the tooltip text when you mouse over the tooltip container */
  .tooltip:hover .tooltiptext {
    visibility: visible;
    opacity: 1;
    transition: all 0.25s ease-out;
  }
  .pin-highlight {
    @apply bg-gray-100 w-full h-full;
  }
  .pin-highlight:hover {
    @apply opacity-50;
  }
</style>

<div on:click={pinArea} class="region-square tooltip text-xs cursor-pointer {p.color}">
  <div class="pin-highlight {pinColor}" />
  <span class="tooltiptext border-solid border-2 font-bold whitespace-no-wrap {p.color}">{p.name}</span>
</div>
