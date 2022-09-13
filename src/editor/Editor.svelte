<script lang="ts">
  import { Editor, Line } from './Editor'
  const editor = new Editor()

  let lines: [number, Line][] = []

  addEventListener('keydown', (e) => {
    console.log(e.key)
    editor.writeAtCursorAndFwd(e.key)
  })

  editor.addEventListener('input', (e) => {
    lines = Array.from(editor.lines.entries())
  })
</script>

<div class="code-wrapper">
  {#each lines as [lineNumber, line]}
    <div class="line">
      <div class="line-number">{lineNumber}</div>
      <div>{line.join("")}</div>
    </div>
  {/each}
</div>

<style lang="scss">
  .code-wrapper {
    padding: 25px;
    position: relative;
  }

  .line {
    .line-number {
      /* position: relative; */
      /* left: -5px; */
      /* text-align: right; */
      width: 20px;
      /* display: inline; */
      white-space: normal;
      text-align: right;
    }

    // white-space: pre-line;
    display: flex;
    gap: 10px;
    margin: 0;
  }
</style>
