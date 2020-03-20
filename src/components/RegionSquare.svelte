<script>
  import { last } from '../data/data.js'
  import { dateIdx, data, dates } from '../data/stores.js'

  export let country

  const redGreen = (x, y) => (x > y ? 'bg-red-500' : 'bg-green-500')

  $: recent = last($dates.slice(0, $dateIdx), 4)
  $: today = $data.countries[country].total.confirmed[recent[3]]
  $: yesterday = $data.countries[country].total.confirmed[recent[2]]
  $: twoAgo = $data.countries[country].total.confirmed[recent[1]]

  $: nowRate = today / yesterday
  $: prevRate = yesterday / twoAgo

  $: color = redGreen(nowRate, prevRate)
</script>

<style type="text/scss">
  .region-square {
    width: 0.75rem;
    height: 0.75rem;
    @apply mr-1 mb-1 rounded-sm transition-all duration-200 ease-in-out;
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

<div class="region-square tooltip {color}">
  <span class="tooltiptext">{country}</span>
</div>
