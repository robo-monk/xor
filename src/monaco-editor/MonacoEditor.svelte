<script lang="ts">
  import { monaco } from './monaco';
  import { onMount } from 'svelte'
  import { emit, listen } from '@tauri-apps/api/event'

  let container: HTMLElement

  onMount(async () => {

    const editor = monaco.editor.create(container, {
      value: ['function x() {', '\tconsole.log("Hello world!");', '}'].join('\n'),
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
    pressedKeys.add(e.key);
    console.log(Array.from(pressedKeys));
  });

  addEventListener('keyup', (e) => {
    pressedKeys.delete(e.key);
  });

</script>

<div>
  <div id="editor" bind:this={container} />
</div>

<style lang="scss">
  #editor {
    display: none;
    height: 100vh;
    width: 100vw;
  }
</style>
