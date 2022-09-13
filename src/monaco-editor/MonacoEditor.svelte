<script lang="ts">
  import { monaco } from './monaco';
  // import * as monaco from 'monaco-editor'
  import { onMount } from 'svelte'
  import { emit, listen } from '@tauri-apps/api/event'

  // import editorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker'
  // import jsonWorker from 'monaco-editor/esm/vs/language/json/json.worker?worker'
  // import cssWorker from 'monaco-editor/esm/vs/language/css/css.worker?worker'
  // import htmlWorker from 'monaco-editor/esm/vs/language/html/html.worker?worker'
  // import tsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker'

  let container: HTMLElement


  onMount(async () => {

    const editor = monaco.editor.create(container, {
      value: ['function x() {', '\tconsole.log("Hello world!");', '}'].join('\n'),
      language: 'javascript',
    })

    monaco.editor.setTheme('vs-dark')
    // monaco.editor.setTheme("hc-black");
    console.log('>> ', monaco.editor)

    // editor.

    window.addEventListener('resize', () => {
      window.requestAnimationFrame(() => {
        editor.layout()
      })
    })
  })

  const pressedKeys = new Map()

  addEventListener('keydown', (e) => {})

  addEventListener('keyup', (e) => {})
</script>

<div>
  <div id="editor" bind:this={container} />
</div>

<style lang="scss">
  #editor {
    // display: none;
    height: 100vh;
    width: 100vw;
  }
</style>
