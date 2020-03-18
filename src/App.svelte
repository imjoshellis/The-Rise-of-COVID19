<script>
  import Tailwindcss from './Tailwindcss.svelte'
  import Chart from './components/Chart.svelte'
  import { onMount } from 'svelte'
</script>

<style>

</style>

<Tailwindcss />
<h1>COVID CURVES</h1>
<div class="text-red-500">
  <Chart />
</div>
<Chart />
<Chart />
<Chart />
<Chart />
