<script>
  import Slope from '../Slope.svelte'
  export let p
  export let back
</script>

<style type="text/scss">
  h3 {
    @apply text-4xl font-bold text-gray-400;
  }

  .chart-wrap {
    flex-basis: 30;
  }
  .chart-div {
    overflow: hidden;
    border-radius: 9999px;
    @apply mx-2;
  }

  .data-div {
    flex-basis: 70%;
    @apply flex justify-around font-mono;
  }

  .col {
    @apply flex flex-col mr-2;
  }

  .data-text {
    @apply text-xl;
  }

  h4 {
    @apply font-bold mt-2 text-2xl;
  }
</style>

<div class="flex flex-col">
  <h3 on:click={back} class={p.style}>{p.back}{p.name}</h3>
  <div class="flex sm:flex-row flex-col">
    <div class="chart-wrap w-48">
      <div class="chart-div">
        <Slope {p} />
      </div>
    </div>
    <div class="data-div md:flex-row flex-col">
      <div class="col">
        <h4>Active Cases</h4>
        <div class="data-text ">Today: {p.today}</div>
        <div class="data-subtext">Yesterday: {p.yesterday}</div>
        <div class="data-subtext">Two Days Ago: {p.twoAgo}</div>
      </div>
      <div class="col">
        <h4>Rate of Growth</h4>
        <div class="data-text {p.color}">{p.nowRateArrow} Today: {p.nowRate}</div>
        <div class="data-subtext">{p.prevRateArrow} Yesterday: {p.prevRate}</div>
        <div class="data-subtext">Rate of Rate: {p.deltaRate}</div>
      </div>
    </div>
  </div>

</div>
