<script lang="ts">
	import Entry from './Entry.svelte';
  import { readDir, BaseDirectory, FileEntry, readTextFile } from '@tauri-apps/api/fs';
  import { createEventDispatcher } from "svelte";
 	const dispatch = createEventDispatcher();


  // Reads the `$APPDIR/users` directory recursively
  let currentPath = "vl"
  let entries: FileEntry[] = []

  async function refresh() {
    // const entries = await readDir(currentPath, { dir: BaseDirectory.App, recursive: true });
    entries = await readDir(currentPath, { dir: BaseDirectory.Document, recursive: false });

    function processEntries(entries: FileEntry[]) {
      for (const entry of entries) {
        console.log(`Entry: ${entry.path}`, entry.name);
        if (entry.children) {
          processEntries(entry.children)
        }
      }
    }

    processEntries(entries)
  }

  async function openFile(event: CustomEvent) {
    dispatch("openFile", {
      file: event.detail.file
    });

  }

  refresh()
</script>

<div class='sidebar'>
  {#each entries as entry }
    <Entry {entry} on:openFile={openFile}></Entry>
  <!-- <div>
    <span>x</span>
    <span> {entry.name} </span>
  </div> -->
  {/each}

</div>

<style style="scss">
  .sidebar {
    z-index: 999999999999999999999;
    display: inline-flex;
    flex-direction: column;
    /* position: absolute; */
    width: 300px;
    height: 100vh;
    overflow: scroll;
    backdrop-filter: blur(2px);
    -webkit-backdrop-filter: blur(2px);
  }
</style>
