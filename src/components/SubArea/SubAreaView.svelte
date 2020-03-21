<script>
  import Slope from '../Slope.svelte'
  export let p
</script>

<style type="text/scss">
  h3 {
    @apply text-3xl font-bold;
  }

  .chart-wrap {
    flex-basis: 30%;
  }
  .chart-div {
    overflow: hidden;
    border-radius: 9999px;
    @apply mx-2;
  }

  .data-div {
    flex-basis: 70%;
    @apply text-sm flex flex-col font-mono;
  }

  .data-subtext {
    @apply text-xs;
  }

  h4 {
    @apply font-bold mt-2;
  }
</style>

<div class="flex flex-col">
  <h3>{p.header}</h3>
  <div class="flex flex-row">
    <div class="chart-wrap">
      <div class="chart-div">
        <Slope {p} />
      </div>
    </div>
    <div class="data-div">
      <h4>Active Cases</h4>
      <div class="data-text ">Today: {p.today}</div>
      <div class="data-subtext">Yesterday: {p.yesterday}</div>
      <div class="data-subtext">Two Days Ago: {p.twoAgo}</div>
      <h4>Rate of Growth</h4>
      <div class="data-text {p.color}">{p.nowRateArrow} Today: {p.nowRate}</div>
      <div class="data-subtext">{p.prevRateArrow} Yesterday: {p.prevRate}</div>
      <div class="data-subtext">Rate of Rate: {p.deltaRate}</div>
    </div>
  </div>

</div>
