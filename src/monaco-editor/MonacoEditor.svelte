<script lang="ts">
  import { monaco } from './monaco'
  // import * as monaco from 'monaco-editor'
  import { onDestroy, onMount } from 'svelte'
  import { emit, listen } from '@tauri-apps/api/event'
  import { readDir, BaseDirectory, FileEntry, readTextFile } from '@tauri-apps/api/fs'

  export let filePath = "";

  async function openFile(path: string) {
    // let file: FileEntry = event.detail.file
    // console.log('file', file)
    return await readTextFile(path)
  }

  let container: HTMLElement
  let editor: monaco.editor.IStandaloneCodeEditor 

  export function reload() {
    console.log(">>>")
  }

  onDestroy(() => {
    console.log('destroy')
    editor.dispose();
  })

  onMount(async () => {
    editor = monaco.editor.create(container, {
      value: [ await openFile(filePath) ].join('\n'),
      language: 'javascript',
    })


    monaco.editor.setTheme('vs-dark')

    window.addEventListener('resize', () => {
      window.requestAnimationFrame(() => {
        editor.layout()
      })
    })
  })

  const pressedKeys = new Set()

  addEventListener('keydown', (e) => {
    pressedKeys.add(e.key)
    console.log(Array.from(pressedKeys))
  })

  addEventListener('keyup', (e) => {
    pressedKeys.delete(e.key)
  })
</script>

<!-- <div> -->
<div id="editor" bind:this={container} />
<!-- </div> -->

<style lang="scss">
  #editor {
    // display: none;
    // height: 100vh;
    // width: 100vw;
    width: 100%;
    height: 100%;
  }
</style>
