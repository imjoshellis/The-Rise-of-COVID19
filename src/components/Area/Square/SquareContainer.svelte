<script>
  import Square from './Square.svelte'
  import { colorizeBg } from '../../../data/data.js'
  import { pinnedAreasList } from '../../../data/stores.js'
  export let subArea
  let p
  let pinColor = ''
  $: p = { ...subArea }

  $: p.nowRate = (p.today / p.yesterday).toPrecision(3)
  $: p.prevRate = (p.yesterday / p.twoAgo).toPrecision(3)

  $: p.color = colorizeBg(p.nowRate, p.prevRate, p.today)

  const pinArea = () => {
    let arr = $pinnedAreasList.filter(pinnedAreaName => {
      return pinnedAreaName === p.name
    })
    console.log(arr, p.name, $pinnedAreasList)
    if (arr.length > 0) {
      $pinnedAreasList = $pinnedAreasList.filter(pinnedAreaName => {
        return pinnedAreaName !== p.name
      })
      pinColor = ''
    } else {
      pinColor = 'bg-gray-100 w-full h-full opacity-75'
      $pinnedAreasList = [p.name, ...$pinnedAreasList]
    }
  }
</script>

<Square {p} {pinColor} {pinArea} />
