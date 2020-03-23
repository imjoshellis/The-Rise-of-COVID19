<script>
  import Square from './Square.svelte'
  import { colorizeBg } from '../../../data/data.js'
  import { pinnedAreasList } from '../../../data/stores.js'
  import { beforeUpdate } from 'svelte'
  export let subArea
  let p
  export let pinColor = 'opacity-0'
  $: p = { ...subArea }

  $: p.nowRate = (p.today / p.yesterday).toPrecision(3)
  $: p.prevRate = (p.yesterday / p.twoAgo).toPrecision(3)

  $: p.color = colorizeBg(p.nowRate, p.prevRate, p.today)

  beforeUpdate(() => {
    let arr = $pinnedAreasList.filter(pinnedAreaName => {
      return pinnedAreaName === p.name
    })
    if (arr.length > 0) {
      pinColor = 'bg-gray-100 w-full h-full opacity-75'
    } else {
      pinColor = 'opacity-0'
    }
  })

  const pinArea = () => {
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

<Square {p} {pinColor} {pinArea} />
