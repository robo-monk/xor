<script lang="ts">
  import MonacoEditor from './monaco-editor/MonacoEditor.svelte'
  import Editor from './editor/Editor.svelte'
  import { onMount } from 'svelte'

  import { readDir, BaseDirectory, FileEntry, readTextFile } from '@tauri-apps/api/fs'
  import Sidebar from './fs/Sidebar.svelte'

  let paths: string[] = []

  async function openFile(event: CustomEvent) {
    let file: FileEntry = event.detail.file
    console.log('file', file)
    let contents = await readTextFile(file.path)
    console.log('>>>', contents)
    paths = [...paths, file.path]
  }
</script>

<div class="window-container">
  <Sidebar on:openFile={openFile} />

  {#if paths.length}
    {#each paths as path}
      <div class="tab">
        <MonacoEditor filePath={path} />
      </div>
    {/each}
  {/if}
</div>

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

  .window-container {
    display: flex;
    flex-direction: row;
  }

  .tab {
    border: 1px solid white;
    min-width: 150px;
    width: 100%;
  }
</style>
