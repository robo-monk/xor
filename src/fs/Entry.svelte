<script lang="ts">
  export let entry: import('@tauri-apps/api/fs').FileEntry
  import { readDir, BaseDirectory, FileEntry } from '@tauri-apps/api/fs'
  import { createEventDispatcher } from "svelte";

 	const dispatch = createEventDispatcher();

  let expanded = false;

  async function expand() {
    entry.children = await readDir(entry.path).catch(e => {
      const event = new CustomEvent("fileOpen", {
        detail: {
          file: entry
        }
      });
      openFile(event);
    }) || []
    expanded = true
  }

  async function shrink() {
    entry.children = []
    expanded = false
  }

  function openFile(event: CustomEvent) {
    dispatch('openFile', {
      file: event.detail.file
    });
  }

</script>

<div class="entry" >
  <div on:click={expanded ? shrink : expand}>
    <span>x</span>
    <span> {entry.name} </span>
  </div>

  <div class="children">
    {#if entry.children?.length }
      {#each entry.children || [] as entry}
        <svelte:self {entry} on:openFile={openFile}/>
      {/each}
    {/if}
  </div>
</div>

<style lang="scss">
  .entry {
    cursor: pointer;
    background-color: rgba(255, 255, 255, 0.115);
    .children {
      margin-left: 10px;
    }
  }
</style>
