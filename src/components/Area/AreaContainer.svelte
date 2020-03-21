<script>
  const recent = last($dates.slice(0, $dateIdx), 4)
  for (const a in subAreas) $: today = $data.countries[country].total.active[recent[3]]
  $: yesterday = $data.countries[country].total.active[recent[2]]
  $: twoAgo = $data.countries[country].total.active[recent[1]]
  $: threeAgo = $data.countries[country].total.active[recent[0]]
</script>

<Area />
<SquareGrid />
<SubAreaGrid {subAreas} />
