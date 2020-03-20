<script>
  import getApi from './data.js'
  import { data } from './stores.js'

  $: (async () => ($data = await getApi()))()
</script>
