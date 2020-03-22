<script context="module">
  import SubArea from './SubArea.svelte'
  import { colorizeText } from '../../data/data.js'

  const arrow = (x, y) => (x > y ? '▴' : x === y ? '·' : '▾')
</script>

<script>
  export let subArea
  let p = { ...subArea }

  p.nowRate = (p.today / p.yesterday).toPrecision(3)
  p.prevRate = (p.yesterday / p.twoAgo).toPrecision(3)
  p.prevprevRate = (p.twoAgo / p.threeAgo).toPrecision(3)

  p.nowRateArrow = arrow(p.nowRate, p.prevRate)
  p.prevRateArrow = arrow(p.prevRate, p.prevprevRate)

  p.deltaRate = (p.nowRate / p.prevRate).toPrecision(3)
  p.prevDeltaRate = (p.prevRate / p.prevprevRate).toPrecision(3)

  p.color = colorizeText(p.nowRate, p.prevRate, p.today)

  const valid = p.nowRate > 0 && p.nowRate !== Infinity && p.prevRate !== Infinity && p.yesterday > 0 && p.twoAgo > 0
</script>

{#if valid}
  <SubArea {p} />
{/if}
