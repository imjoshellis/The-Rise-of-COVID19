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
  <Chart country="US" />
</div>
<div class="text-yellow-500">
  <Chart country="Japan" />
</div>
<div class="text-green-500">
  <Chart country="Italy" />
</div>
<div class="text-blue-500">
  <Chart country="Korea, South" />
</div>
<div class="text-purple-500">
  <Chart country="Canada" />
</div>
