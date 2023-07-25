<template>
  <Popup :isOpen="props.isOpen" @close="emits('close')">
    <div class="header">
      <h3 class="title">{{ $t.sharePopup.title }}</h3>
      <UIToggle v-model="publicCheck" type="big" />
    </div>

    <p class="text">{{ $t.sharePopup.text1 }}</p>
    <p class="text">{{ $t.sharePopup.text2 }}</p>

    <UIInput
      :label="$t.sharePopup.input"
      v-model="linkValue"
      :isRead="true"
      :message="inputMessage"
      @btnClick="onCopyLink"
      class="input"
    >
      <template #btn2>
        <i class="fa-regular fa-files" :title="$t.sharePopup.copy" />
      </template>
    </UIInput>

    <div class="option">
      <p>{{ $t.sharePopup.comments }}</p>
      <UIToggle v-model="commentsCheck" />
    </div>
    <div class="option">
      <p>{{ $t.sharePopup.indexing }}</p>
      <UIToggle v-model="indexingCheck" />
    </div>
  </Popup>
</template>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<script lang="ts" setup>
/**
 * Пропсы ----------------
 */
const props = defineProps<{
  isOpen: boolean;
  modelValue: any;
}>();

/**
 * События ----------------
 */
const emits = defineEmits(['update:modelValue', 'close']);
const config = useRuntimeConfig();
const linkValue = ref(`${config.public.url}article/public/356`);
const inputMessage = ref('');
const publicCheck = ref(false);
const commentsCheck = ref(false);
const indexingCheck = ref(false);
const $t = await useTranslate('elem');

// Значение
const model = computed({
  get() {
    return props.modelValue;
  },
  set(val) {
    emits('update:modelValue', val);
  },
});

/**
 * Методы ----------------
 */
// Скопировать ссылку
const onCopyLink = () => {
  navigator.clipboard.writeText(linkValue.value);
  inputMessage.value = 'Ссылка скопирована в буфер обмена!';
  setTimeout(() => {
    inputMessage.value = '';
  }, 4000);
};
</script>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<style lang="scss" scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: -32px -32px 0px -32px;
  padding: 0 32px 24px;
  margin-bottom: 24px;
  border-bottom: 1px solid $blue3;
}

.input {
  margin-top: 45px;
  margin-bottom: 35px !important;
}

.option {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 15px;
}
</style>
