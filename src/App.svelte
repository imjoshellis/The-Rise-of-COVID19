<script>
  import Tailwindcss from './Tailwindcss.svelte'
  import Chart from './components/Chart.svelte'
  import { onMount } from 'svelte'
</script>

<style>

</style>

<Tailwindcss />
<h1>COVID CURVES</h1>
<div style="height:128px;width:128px;">
  <Chart />
</div>
<Chart />
