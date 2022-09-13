<script lang="ts">
	import Entry from './Entry.svelte';
  import { readDir, BaseDirectory, FileEntry } from '@tauri-apps/api/fs';
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

  refresh()
</script>

<div class='sidebar'>
  {#each entries as entry }
    <Entry {entry}></Entry>
  <!-- <div>
    <span>x</span>
    <span> {entry.name} </span>
  </div> -->
  {/each}

</div>

<style style="scss">

</style>
