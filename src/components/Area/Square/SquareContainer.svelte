<script>
  import Square from './Square.svelte'
  import { colorizeBg } from '../../../data/data.js'
  export let subArea
  let p = { ...subArea }

  p.nowRate = (p.today / p.yesterday).toPrecision(3)
  p.prevRate = (p.yesterday / p.twoAgo).toPrecision(3)

  p.color = colorizeBg(p.nowRate, p.prevRate, p.today)
</script>

<Square {p} />
