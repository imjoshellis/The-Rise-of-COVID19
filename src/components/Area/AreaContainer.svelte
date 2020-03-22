<script>
  import { area, dateIdx } from '../../data/stores.js'
  import Area from './Area.svelte'
  import SubAreaGrid from '../SubArea/SubAreaGrid.svelte'
  import SquareGrid from './Square/SquareGrid.svelte'

  const recent = last($area.activeList.slice(0, $dateIdx), 4)
  for (const a in $area.subAreas) {
    $area.a.today = recent[3]
    $area.a.yesterday = recent[2]
    $area.a.twoAgo = recent[1]
    $area.a.threeAgo = recent[0]
  }
</script>

<div class="my-8">
  <Area />
</div>
<SquareGrid />
<SubAreaGrid {subAreas} />
