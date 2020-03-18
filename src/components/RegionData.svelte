<script>
  import data, { last } from '../data/data.js'
  import Slope from './Slope.svelte'

  export let region

  const rnd2 = x => Math.round(x * 100) / 100
  const rnd0 = x => Math.round(x)

  const recent = last(data.regions[region].total.confirmed, 3)
  const today = recent[2]
  const yesterday = recent[1]
  const twoAgo = recent[0]
  const nowRate = today / yesterday
  const prevRate = yesterday / twoAgo
  const deltaRate = nowRate / prevRate
  const week = today * Math.exp(nowRate, 7)
</script>

<style>
  h3 {
    @apply text-xl font-bold;
  }

  .chart-div {
    max-width: 2.5rem;
    overflow: hidden;
    @apply rounded-full;
  }

  .data-div {
    flex-basis: 70%;
  }
</style>

<div class="flex flex-col">
  <h3>{region}</h3>
  <div class="flex flex-row">
    <div class="chart-div">
      <Slope {region} />
    </div>
    <div class="data-div">
      <div class="data-text">Today: {today}</div>
      <div class="data-text">Yesterday: {yesterday}</div>
      <div class="data-text">Two Days Ago: {twoAgo}</div>
      <div class="data-text">Today's Rate: {rnd2(nowRate)}</div>
      <div class="data-text">Yesterday's Rate: {rnd2(prevRate)}</div>
      <div class="data-text">∆Rate: {rnd2(deltaRate)}</div>
      <div class="data-text">In 7 days at today's rate: {rnd0(week)}</div>
    </div>
  </div>
</div>
