<script>
  import { last, colorizeText } from '../data/data.js'
  import { dateIdx, data, dates } from '../data/stores.js'
  import Slope from './Slope.svelte'

  export let country

  const arrow = (x, y) => (x > y ? '▴' : x === y ? '·' : '▾')

  $: recent = last($dates.slice(0, $dateIdx), 4)
  $: today = $data.countries[country].total.active[recent[3]]
  $: yesterday = $data.countries[country].total.active[recent[2]]
  $: twoAgo = $data.countries[country].total.active[recent[1]]
  $: threeAgo = $data.countries[country].total.active[recent[0]]

  $: nowRate = (today / yesterday).toPrecision(3)
  $: prevRate = (yesterday / twoAgo).toPrecision(3)
  $: prevprevRate = (twoAgo / threeAgo).toPrecision(3)

  $: deltaRate = (nowRate / prevRate).toPrecision(3)
  $: prevDeltaRate = (prevRate / prevprevRate).toPrecision(3)

  $: color = colorizeText(nowRate, prevRate, today)
</script>

{#if nowRate > 0 && nowRate !== Infinity && prevRate !== Infinity && yesterday > 0 && twoAgo > 0}
  <div class="flex flex-col">
    <h3>{country}</h3>
    <div class="flex flex-row">
      <div class="chart-wrap">
        <div class="chart-div">
          <Slope {nowRate} {color} />
        </div>
      </div>
      <div class="data-div">
        <h4>Active Cases</h4>
        <div class="data-text ">Today: {today}</div>
        <div class="data-subtext">Yesterday: {yesterday}</div>
        <div class="data-subtext">Two Days Ago: {twoAgo}</div>
        <h4>Rate of Growth</h4>
        <div class="data-text {color}">{arrow(nowRate, prevRate)} Today: {nowRate}</div>
        <div class="data-subtext">{arrow(prevRate, prevprevRate)} Yesterday: {prevRate}</div>
        <div class="data-subtext">{arrow(deltaRate, prevDeltaRate)} Rate of Rate: {deltaRate}</div>
      </div>
    </div>

  </div>
{/if}
