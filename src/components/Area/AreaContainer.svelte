<script>
  import Area from './Area.svelte'
  import SubAreaGrid from '../SubArea/SubAreaGrid.svelte'
  import SquareGrid from './Square/SquareGrid.svelte'
  import { area, pinnedAreasList } from '../../data/stores.js'
  import { colorizeText } from '../../data/data.js'
  const arrow = (x, y) => (x > y ? '▴' : x === y ? '·' : '▾')
  let p
  $: p = $area

  $: p.nowRate = (p.today / p.yesterday).toPrecision(3)
  $: p.prevRate = (p.yesterday / p.twoAgo).toPrecision(3)
  $: p.prevprevRate = (p.twoAgo / p.threeAgo).toPrecision(3)

  $: p.nowRateArrow = arrow(p.nowRate, p.prevRate)
  $: p.prevRateArrow = arrow(p.prevRate, p.prevprevRate)

  $: p.deltaRate = (p.nowRate / p.prevRate).toPrecision(3)
  $: p.prevDeltaRate = (p.prevRate / p.prevprevRate).toPrecision(3)

  $: p.color = colorizeText(p.nowRate, p.prevRate, p.today)
  $: p.back = p.name === 'Global' ? '' : '‹ '

  $: valid = p.nowRate > 0 && p.nowRate !== Infinity && p.prevRate !== Infinity && p.yesterday > 0 && p.twoAgo > 0
</script>

<div class="px-16">
  <div class="my-8 max-w-3xl mx-auto">
    <Area {p} />
  </div>
  <SquareGrid />
  <SubAreaGrid />
</div>
