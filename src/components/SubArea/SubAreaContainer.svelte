<script context="module">
  import SubArea from './SubArea.svelte'
  import { beforeUpdate } from 'svelte'
  import { colorizeText } from '../../data/data.js'
  import { area, pinnedAreasList, filterStr } from '../../data/stores.js'

  const arrow = (x, y) => (x > y ? '▴' : x === y ? '·' : '▾')
</script>

<script>
  export let subArea
  let p
  $: p = { ...subArea }

  $: p.nowRate = (p.today / p.yesterday).toPrecision(3)
  $: p.prevRate = (p.yesterday / p.twoAgo).toPrecision(3)
  $: p.prevprevRate = (p.twoAgo / p.threeAgo).toPrecision(3)

  $: p.nowRateArrow = arrow(p.nowRate, p.prevRate)
  $: p.prevRateArrow = arrow(p.prevRate, p.prevprevRate)

  $: p.deltaRate = (p.nowRate / p.prevRate).toPrecision(3)
  $: p.prevDeltaRate = (p.prevRate / p.prevprevRate).toPrecision(3)

  $: p.color = colorizeText(p.nowRate, p.prevRate, p.today)

  $: valid = p.nowRate > 0 && p.nowRate !== Infinity && p.prevRate !== Infinity && p.yesterday > 0 && p.twoAgo > 0

  let pinned = false

  beforeUpdate(() => {
    let arr = $pinnedAreasList.filter(pinnedAreaName => {
      return pinnedAreaName === p.name
    })
    if (arr.length > 0) {
      pinned = true
    } else {
      pinned = false
    }
  })

  const togglePin = () => {
    let arr = $pinnedAreasList.filter(pinnedAreaName => {
      return pinnedAreaName === p.name
    })
    if (arr.length > 0) {
      $pinnedAreasList = $pinnedAreasList.filter(pinnedAreaName => {
        return pinnedAreaName !== p.name
      })
    } else {
      $pinnedAreasList = [p.name, ...$pinnedAreasList]
    }
  }
</script>

{#if valid}
  <SubArea {p} {pinned} {togglePin} />
{/if}
