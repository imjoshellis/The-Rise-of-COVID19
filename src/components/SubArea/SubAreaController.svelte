<script>
  import SubAreaView from './SubAreaView.svelte'
  import { last, colorizeText } from '../../data/data.js'
  import { dateIdx, data, dates } from '../../data/stores.js'

  let p = {}

  export let country

  p.header = country
  const arrow = (x, y) => (x > y ? '▴' : x === y ? '·' : '▾')

  const recent = last($dates.slice(0, $dateIdx), 4)
  p.today = $data.countries[country].total.active[recent[3]]
  p.yesterday = $data.countries[country].total.active[recent[2]]
  p.twoAgo = $data.countries[country].total.active[recent[1]]
  p.threeAgo = $data.countries[country].total.active[recent[0]]

  p.nowRate = (p.today / p.yesterday).toPrecision(3)
  p.prevRate = (p.yesterday / p.twoAgo).toPrecision(3)
  p.prevprevRate = (p.twoAgo / p.threeAgo).toPrecision(3)

  p.deltaRate = (p.nowRate / p.prevRate).toPrecision(3)
  p.prevDeltaRate = (p.prevRate / p.prevprevRate).toPrecision(3)
  p.color = colorizeText(p.nowRate, p.prevRate, p.today)
</script>

{#if p.nowRate > 0 && p.nowRate !== Infinity && p.prevRate !== Infinity && p.yesterday > 0 && p.twoAgo > 0}
  <SubAreaView {p} />
{/if}
