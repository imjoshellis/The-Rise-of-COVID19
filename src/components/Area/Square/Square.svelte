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
    background-color: black;
    color: #fff;
    text-align: center;
    padding: 5px;
    border-radius: 6px;

    /* Position the tooltip text - see examples below! */
    position: absolute;
    top: -5px;
    right: 130%;
    z-index: 1;
  }

  /* Show the tooltip text when you mouse over the tooltip container */
  .tooltip:hover .tooltiptext {
    visibility: visible;
  }
</style>

<div on:click={pinArea} class="region-square tooltip text-xs cursor-pointer {p.color}">
  <div class="pin-highlight {pinColor}" />
  <span class="tooltiptext">{p.name}</span>
</div>
