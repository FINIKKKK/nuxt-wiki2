<template>
  <div class="body">
    <template v-for="obj in data" :key="obj.id">
      <!-- paragraph -->
      <p
        v-if="obj.type === 'paragraph'"
        class="el text"
        v-html="obj.data.text"
      ></p>

      <!-- list -->
      <ul
        v-else-if="obj.type === 'list'"
        class="el list"
        :class="{ ordered: obj.data.style === 'ordered' }"
      >
        <li v-for="(item, index) in obj.data.items" :key="index">
          {{ item }}
        </li>
      </ul>

      <!-- delimeter -->
      <div v-else-if="obj.type === 'delimiter'" class="el delimiter">***</div>

      <!-- headers -->
      <h6
        v-else-if="obj.type === 'header' && obj.data.level === 6"
        class="title"
      >
        {{ obj.data.text }}
      </h6>
      <h5
        v-else-if="obj.type === 'header' && obj.data.level === 5"
        class="title"
      >
        {{ obj.data.text }}
      </h5>
      <h4
        v-else-if="obj.type === 'header' && obj.data.level === 4"
        class="title"
      >
        {{ obj.data.text }}
      </h4>
      <h3
        v-else-if="obj.type === 'header' && obj.data.level === 3"
        class="title"
      >
        {{ obj.data.text }}
      </h3>
      <h2
        v-else-if="obj.type === 'header' && obj.data.level === 2"
        class="title"
      >
        {{ obj.data.text }}
      </h2>
      <h1
        v-else-if="obj.type === 'header' && obj.data.level === 1"
        class="title"
      >
        {{ obj.data.text }}
      </h1>

      <!-- codebox -->
      <div v-else-if="obj.type === 'codeBox'" class="el code">
        <div class="code__lg">
          {{ obj.data.language !== 'Auto-detect' ? obj.data.language : ' ' }}
        </div>
        <code v-html="obj.data.code"></code>
      </div>

      <!-- quote -->
      <div v-else-if="obj.type === 'quote'" class="el quote">
        <svg-icon name="document" />
        <div class="quote__content">
          <h3>{{ obj.data.text }}</h3>
          <p>{{ obj.data.caption }}</p>
        </div>
      </div>

      <!-- image -->
      <div v-else-if="obj.type === 'image'" class="el img">
        <img :src="obj.data.file.url" alt="img" />
      </div>

      <!-- checklist -->
      <div v-else-if="obj.type === 'checklist'" class="el checkbox">
        <input
          type="checkbox"
          :id="obj.data.items[0].text"
          :name="obj.data.items[0].text"
          :checked="obj.data.items[0].checked"
        />
        <label :for="obj.data.items[0].text">{{
          obj.data.items[0].text
        }}</label>
      </div>

      <!-- table -->
      <table v-else-if="obj.type === 'table'" class="el table">
        <tr v-for="(row, index) in obj.data.content" :key="index">
          <td v-for="(str, index) in row" :key="index">
            {{ str }}
          </td>
        </tr>
      </table>
    </template>
  </div>
</template>

<script lang="ts" setup>
import { OutputBlockData } from '@editorjs/editorjs';

/**
 * Пропсы ----------------
 */
const props = defineProps<{
  data: OutputBlockData[];
}>();
</script>

<style lang="scss">
.body {
  .el:not(:last-child) {
    margin-bottom: 15px;
  }
  // text ###############
  b {
    font-weight: 700;
  }
  i {
    font-style: italic;
  }
  // inline-code ###############
  code.inline-code {
    font-size: 14px !important;
    padding: 3px 4px;
    border-radius: 5px;
    font-family: 'Consolas', serif;
    background-color: $blue4;
    color: $blue;
  }
  // list ###############
  .list {
    counter-reset: list;
    li {
      padding-left: 40px;
      position: relative;
      &::before {
        content: '';
        position: absolute;
        width: 6px;
        height: 6px;
        left: 12px;
        top: 10.5px;
        background-color: $black;
        border-radius: 50%;
      }
      &:not(:last-child) {
        margin-bottom: 10px;
      }
    }
    &.ordered {
      li {
        &::before {
          counter-increment: list;
          content: counter(list) '.';
          width: auto;
          height: auto;
          background: none;
          top: 1px;
          left: 12px;
        }
      }
    }
  }
  // delimiter ###############
  .delimiter {
    font-size: 40px;
    line-height: 40px;
    text-align: center;
    letter-spacing: 10px;
    margin-top: 25px;
  }
  // headers ###############
  .title {
    font-weight: 700;
  }
  h1.title {
    font-size: 45px;
    line-height: 50px;
  }
  h2.title {
    font-size: 38px;
    line-height: 42px;
  }
  h3.title {
    font-size: 32px;
    line-height: 36px;
  }
  h4.title {
    font-size: 26px;
    line-height: 32px;
  }
  h5.title {
    font-size: 20px;
    line-height: 28px;
  }
  h6.title {
    font-size: 16px;
    line-height: 26px;
  }
  // code ###############
  .code {
    padding: 55px 15px 10px;
    position: relative;
    overflow: hidden;
    background-color: #39304d;
    border-radius: 15px;
    code {
      padding: 0 !important;
      padding-bottom: 15px !important;
    }
    code div {
      background-color: #39304d !important;
    }
    .code__lg {
      position: absolute;
      top: 0;
      left: 0;
      padding: 5px 15px;
      background-color: #352b49;
      width: 100%;
      font-size: 14px;
    }
  }
  // quote ###############
  .quote {
    display: flex;
    align-items: flex-start;
    background-color: $blue4;
    padding: 15px 25px;
    border-radius: 15px;
    svg {
      fill: $blue;
      width: 25px;
      height: 25px;
      margin-right: 20px;
    }
    .quote__content {
      width: 100%;
    }
    h3 {
      font-style: italic;
      color: $blue;
    }
    p {
      margin-top: 15px;
      color: $blue;
      text-align: right;
      font-weight: 700;
    }
  }
  // img ###############
  .img {
    width: 100%;
    img {
      border-radius: 10px;
      max-width: 100%;
      max-height: 500px;
      object-fit: cover;
    }
  }
  // checkbox ###############
  .checkbox {
    pointer-events: none;
    input {
      position: absolute;
      z-index: -1;
      opacity: 0;
    }
    input + label {
      display: inline-flex;
      align-items: center;
      user-select: none;
    }
    input + label::before {
      transition: 0.3s;
      content: '';
      display: inline-block;
      width: 17px;
      height: 17px;
      flex-shrink: 0;
      flex-grow: 0;
      border: 1px solid $blue3;
      border-radius: 4px;
      margin-right: 0.5em;
      background-repeat: no-repeat;
      background-position: center center;
      background-size: 50% 50%;
    }
    input:checked + label::before {
      border-color: $blue;
      background-color: $blue;
      background-image: url('data:image/svg+xml,%3Csvg%20width%3D%2212%22%20height%3D%2210%22%20viewBox%3D%220%200%2012%2010%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M10%202L4.5%208L2%205.27273%22%20stroke%3D%22white%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22square%22%2F%3E%0A%3C%2Fsvg%3E%0A');
    }
  }
  // table ###############
  .table {
    tr {
      border-bottom: 1px solid rgba($blue, 0.1);
    }
  }
}
</style>
