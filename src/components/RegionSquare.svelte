<script>
  import { last } from '../data/data.js'
  import { dateIdx, data, dates } from '../data/stores.js'

  export let country

  let display = true

  $: recent = last($dates.slice(0, $dateIdx), 4)
  $: today = $data.countries[country].total.active[recent[3]]
  $: yesterday = $data.countries[country].total.active[recent[2]]
  $: twoAgo = $data.countries[country].total.active[recent[1]]

  $: nowRate = (today / yesterday).toPrecision(3)
  $: prevRate = (yesterday / twoAgo).toPrecision(3)

  const redGreen = (x, y) => {
    const diff = x / y
    if (today > 0) {
      if (today === yesterday) {
        return 'border-gray-700 bg-gray-800'
      } else if (diff > 1) {
        return 'border-red-600 bg-red-700'
      } else if (x === y) {
        return 'border-orange-500 bg-orange-600'
      } else if (diff < 1) {
        return 'border-yellow-500 bg-yellow-600'
      } else {
        return 'border-gray-800 bg-gray-900'
      }
    } else {
      return 'border-gray-800 bg-gray-900'
    }
  }

  $: color = redGreen(nowRate, prevRate)
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

{#if display}
  <div class="region-square tooltip text-xs {color}">
    <span class="tooltiptext">{country}</span>
  </div>
{/if}
