<template>
  <Popup :isOpen="props.isOpen" @close="emits('close')">
    <!-- Сменить мод -->
    <div class="header">
      <h3 class="title">{{ $t?.sharePopup.title }}</h3>
      <UIToggle v-model="publicCheck" type="big" @click="onChangeMode" />
    </div>

    <template v-if="publicCheck">
      <p class="text">{{ $t?.sharePopup.text1 }}</p>
      <p class="text">{{ $t?.sharePopup.text2 }}</p>

      <!-- Поле ввода с ссылкой -->
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

      <!-- Дополнительные настройки -->
      <div class="option">
        <p>{{ $t?.sharePopup.comments }}</p>
        <UIToggle v-model="commentsCheck" />
      </div>
      <div class="option">
        <p>{{ $t?.sharePopup.indexing }}</p>
        <UIToggle v-model="indexingCheck" />
      </div>
    </template>
  </Popup>
</template>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<script lang="ts" setup>
import { useTeamStore } from '~/stores/TeamContoller';
import { useCustomFetch } from '~/hooks/useCustomFetch';
import { useElemStore } from '~/stores/ElemController';

/**
 * Пропсы ----------------
 */
const props = defineProps<{
  isOpen: boolean;
  isPublic: boolean;
}>();

/**
 * События ----------------
 */
const emits = defineEmits(['close']);

/**
 * Переменные ----------------
 */
const teamController = useTeamStore();
const route = useRoute();
const config = useRuntimeConfig();
const elemController = useElemStore();
const linkValue = ref(
  `${config.public.url}${teamController.activeTeamSlug}/${
    elemController.type === 'section' ? 'sections' : 'articles'
  }/public/${route.params.id}`,
);
const inputMessage = ref('');
const publicCheck = ref(props.isPublic);
const commentsCheck = ref(false);
const indexingCheck = ref(false);
const $t = await useTranslate('elem');

/**
 * Методы ----------------
 */
// Скопировать ссылку
const onCopyLink = () => {
  navigator.clipboard.writeText(linkValue.value);
  inputMessage.value = $t.sharePopup.copyText;
  setTimeout(() => {
    inputMessage.value = '';
  }, 4000);
};

// Поменять уровень доступа у статьи
const onChangeMode = async () => {
  const { message } = await useCustomFetch(
    `team/${elemController.type === 'section' ? 'section' : 'article'}/mode`,
    {
      body: {
        team_id: teamController.activeTeamId,
        ...(elemController.type === 'article' && {
          article_id: route.params.id,
        }),
        ...(elemController.type === 'section' && {
          section_id: route.params.id,
        }),
        public: Number(publicCheck.value),
      },
      method: 'POST',
    },
  );
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
