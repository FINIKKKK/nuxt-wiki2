<template>
  <div class="main">
    <!-- Главный шаблон -->
    <NuxtLayout name="main" :nav="nav">
      <div class="content">
        <!--------------------------------------
          Шапка элемента
        ---------------------------------------->
        <div class="elem__header">
          <i
            class="fa-regular fa-bookmark"
            :class="{ active: isFavorite }"
            v-if="props.type === 'article'"
            @click="toggleFavorite"
          />
          <!-- Заголовок -->
          <h1 class="title" id="title">{{ props.data.name }}</h1>
        </div>

        <!--------------------------------------
          Информация об элементе
        ---------------------------------------->
        <ul class="elem__info">
          <!-- Автор -->
          <li class="elem__info-item">
            {{ $t?.author }}:
            <span>{{
              `${props.data?.creator.first_name} ${props.data?.creator.last_name}`
            }}</span>
          </li>
          <!-- Время -->
          <li
            class="elem__info-item"
            v-html="
              useDateString(
                props.data.created_at,
                props.data.updated_at,
                userController.lang,
              )
            "
          ></li>
        </ul>

        <!--------------------------------------
          Слот
        ---------------------------------------->
        <slot />

        <!--------------------------------------
         Попап для публичного доступа
        ---------------------------------------->
        <PopupShare
          :isOpen="elemController.isOpenShare"
          @close="elemController.closeShare()"
          :isPublic="isPublic"
        />

        <!--------------------------------------
         Попап для доспупа пользователям или группам
        ---------------------------------------->
        <PopupAccess
          :isOpen="elemController.isOpenAccess"
          @close="elemController.closeAccess()"
          v-model="elemController.abilities"
        />
      </div>
    </NuxtLayout>
  </div>
</template>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<script lang="ts" setup>
import { useDateString } from '~/hooks/useDateString';
import { TSection } from '~/utils/types/secton';
import { TArticle, TProperties } from '~/utils/types/article';
import { useTeamStore } from '~/stores/TeamContoller';
import { useCustomFetch } from '~/hooks/useCustomFetch';
import { TMessage } from '~/utils/types';
import { useSectionsStore } from '~/stores/sectionsController';
import { useUserStore } from '~/stores/UserController';
import { useElemStore } from '~/stores/ElemController';

/**
 * Пропсы ----------------
 */
const props = defineProps<{
  data: TSection | TArticle;
  properties?: TProperties;
  type: 'section' | 'article';
}>();

/**
 * Переменные ----------------
 */
const route = useRoute();
const teamController = useTeamStore();
const elemController = useElemStore();
const sectionsController = useSectionsStore();
const userController = useUserStore();
const isFavorite = ref(props.properties?.bookmark || false);
const $t = await useTranslate('elem');
const nav = [
  {
    label: sectionsController.breadCrumbs[0]?.name,
    link: `${teamController.activeTeamSlug}/sections/${sectionsController.breadCrumbs[0]?.id}`,
  },
  {
    label: sectionsController.breadCrumbs[1]?.name || null,
    link: `${teamController.activeTeamSlug}/sections/${sectionsController.breadCrumbs[1]?.id}`,
  },
  {
    label:
      props.data.name !== sectionsController?.breadCrumbs[1]?.name &&
      props.data.name !== sectionsController?.breadCrumbs[0]?.name
        ? props.data.name
        : null,
    link: `${teamController.activeTeamSlug}/articles/${props.data.id}`,
  },
];
const isPublic =
  elemController.type === 'section'
    ? Boolean(elemController.section?.public)
    : Boolean(elemController.article?.article.public);

/**
 * Методы ----------------
 */
const flag = ref(true);
// let flag = false;

watch(flag, () => {
  console.log('flag', flag.value);
});

// flag.value = true;
watch(
  () => elemController.abilities,
  async () => {
    if (flag.value) {
      flag.value = false;
      return false;
    }

    const isEdit = elemController.abilities.find(
      (obj) => obj.user.id === elemController.currentAbility?.user.id,
    );

    // Данные
    const dto = {
      team_id: teamController.activeTeamId,
      entity_type: 'article',
      entity_id: route.params.id,
      ...(!isEdit && {
        user_id:
          elemController.abilities[elemController.abilities.length - 1].user.id,
        permission:
          elemController.abilities[elemController.abilities.length - 1]
            .permission.value,
      }),
      ...(isEdit && {
        user_id: elemController.currentAbility?.user.id,
        permission: elemController.currentAbility?.permission.value,
      }),
    };

    await useCustomFetch(`team/abilities/${isEdit ? 'edit' : 'add'}`, {
      body: dto,
      method: 'POST',
    });
  },
  { deep: true },
);
/**
 * Методы ----------------
 */
// Добавить или удалить из избранного
const toggleFavorite = async () => {
  const dto = { article_id: route.params.id };

  if (!isFavorite.value) {
    const { message } = await useCustomFetch<TMessage>(
      `account/bookmarks/add`,
      {
        body: dto,
        method: 'POST',
      },
    );
    if (message) {
      isFavorite.value = !isFavorite.value;
    }
  } else {
    const { message } = await useCustomFetch<TMessage>(
      `account/bookmarks/remove`,
      {
        body: dto,
        method: 'POST',
      },
    );
    if (message) {
      isFavorite.value = !isFavorite.value;
    }
  }
};
</script>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<style lang="scss" scoped>
.main {
  background-color: $white;
}

.content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.elem__header {
  display: flex;
  align-items: center;
  margin-bottom: 12px;
  position: relative;
  i {
    font-size: 18px;
    width: 20px;
    height: 20px;
    position: absolute;
    left: -30px;
    cursor: pointer;
    &.active {
      font-weight: 700;
    }
  }
}

.title {
  font-size: 24px;
  line-height: 28px;
}

.elem__info {
  display: flex;
  align-items: center;
  margin-bottom: 30px;
}

.elem__info-item {
  margin-right: 12px;
  color: $gray;
  span {
    color: $black;
  }
}

.access {
  margin-top: 50px;
}
</style>
