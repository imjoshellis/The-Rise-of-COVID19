<script>
  import data, { last } from '../data/data.js'

  export let region

  const redGreen = (x, y) => (x > y ? 'bg-red-500' : 'bg-green-500')

  const recent = last(data.regions[region].total.confirmed, 4)
  const today = recent[3]
  const yesterday = recent[2]
  const twoAgo = recent[1]

  const nowRate = today / yesterday
  const prevRate = yesterday / twoAgo

  const color = redGreen(nowRate, prevRate)
</script>

<style type="text/scss">
  .region-square {
    width: 0.75rem;
    height: 0.75rem;
    @apply mr-1 mb-1;
  }
</style>

<div class="region-square {color}" />
