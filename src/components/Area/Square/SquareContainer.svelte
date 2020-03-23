<script>
  import Square from './Square.svelte'
  import { colorizeBg } from '../../../data/data.js'
  import { pinnedAreas } from '../../../data/stores.js'
  export let subArea
  let p
  let pinColor = ''
  $: p = { ...subArea }

  $: p.nowRate = (p.today / p.yesterday).toPrecision(3)
  $: p.prevRate = (p.yesterday / p.twoAgo).toPrecision(3)

  $: p.color = colorizeBg(p.nowRate, p.prevRate, p.today)

  const pinArea = () => {
    p.pinned = true
    pinColor = 'bg-gray-100 w-full h-full opacity-75'
    $pinnedAreas = [p, ...$pinnedAreas]
  }
</script>

<Square {p} {pinColor} {pinArea} />
