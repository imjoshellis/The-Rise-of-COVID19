<script>
  import { regions, regionStr } from '../stores.js'
</script>

<input type="text" name="region" id="region" bind:value={$regionStr} />
<div>{$regions}</div>
