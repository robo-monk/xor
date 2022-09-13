<script lang="ts">
  import * as monaco from 'monaco-editor'
  import { onMount } from 'svelte'
  let container: HTMLElement

  onMount(() => {
    const editor = monaco.editor.create(container, {
      value: ['function x() {', '\tconsole.log("Hello world!");', '}'].join('\n'),
      language: 'javascript',
    })

    // editor.

    window.addEventListener('resize', () => {
      window.requestAnimationFrame(() => {
        editor.layout()
      })
    })
  })
</script>

<div>
  <div id="editor" bind:this={container} />
</div>

<style lang="scss">
  #editor {
    height: 100vh;
    width: 100vw;
  }
</style>
