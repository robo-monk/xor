<script lang="ts">
  export let entry: import('@tauri-apps/api/fs').FileEntry
  import { readDir, BaseDirectory, FileEntry } from '@tauri-apps/api/fs'

  let expanded = false;

  async function expand() {
    entry.children = await readDir(entry.path)
    expanded = true
  }

  async function shrink() {
    entry.children = []
    expanded = false
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
        <svelte:self {entry} />
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
