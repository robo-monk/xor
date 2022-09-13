<script lang="ts">
	import MonacoEditor from './monaco-editor/MonacoEditor.svelte';
	import Editor from './editor/Editor.svelte';
  import { onMount } from 'svelte'
</script>

<MonacoEditor/>

<style lang="scss">
  :global(body) {
    margin: 0;
    font-family: SFMono, monospace;
    font-size: 18px;
    background-color: #111318;
    color: #f2f2f2;
  }

  h1 {
    color: #ff3700;
  }

  code {
    background: #282b33;
    padding: 2px 5px;
    border-radius: 4px;
  }

</style>
