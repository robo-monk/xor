<script lang="ts">
  import MonacoEditor from './monaco-editor/MonacoEditor.svelte'
  import { nanoid } from 'nanoid';
  import Editor from './editor/Editor.svelte'
  import { onMount } from 'svelte'

  import { readDir, BaseDirectory, FileEntry, readTextFile } from '@tauri-apps/api/fs'
  import Sidebar from './fs/Sidebar.svelte'

  // let paths: string[] = []
  interface Tab {
    file: FileEntry,
    uuid: string
  }

  // let files: FileEntry[] = []
  let tabs: Tab[] = []
  let activeTab: Tab | undefined;
  let activeTabHistory: Tab[] = []

  async function openFile(event: CustomEvent) {
    let file: FileEntry = event.detail.file
    console.log('file', file)
    let contents = await readTextFile(file.path)
    console.log('>>>', contents)

    const tab = {
      file,
      uuid: nanoid()
    } as Tab
    tabs = [...tabs, tab]

    makeTabActive(tab)
  }

  async function makeTabActive(tab: Tab) {
    console.log('make tab active', tab, activeTabHistory);
    if (activeTab) activeTabHistory.push(activeTab);
    activeTab = null
    activeTab = tab;
  }

  async function closeTab(tab: Tab) {
    console.log('close tab', tab, activeTab, activeTab?.uuid == tab.uuid);

    if (activeTab?.uuid == tab.uuid) {
      activeTab = activeTabHistory.pop();
      console.log("new active tab is", activeTab);
    }

    let index = tabs.findIndex(t => tab.uuid == t.uuid)
    tabs.splice(index, 1);
    tabs = tabs
    console.log(tabs)
  }
</script>

<div class="window-container">
  <Sidebar on:openFile={openFile} />

  <div class='tab-header'>
    {#each tabs as tab}
      <div class="tab">
        <div> <span on:click={() => makeTabActive(tab)}> {tab.file.name} </span>
           <span on:click={() => closeTab(tab)}> x </span></div>
        <!-- <MonacoEditor filePath={tab.file.path} /> -->
      </div>
    {/each}
  </div>

  {#if activeTab}
    <!-- {#each tabs as tab} -->
      <div class="tab">
        <div> <span> {activeTab.file.name} </span> <span on:click={() => closeTab(tab)}> x </span></div>
        <MonacoEditor filePath={activeTab.file.path} />
      </div>
    <!-- {/each} -->
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
