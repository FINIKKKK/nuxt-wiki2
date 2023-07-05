<template>
  <ul class="map">
    <!-- Основные разделы -->
    <li
      v-for="section in sectionsController.sections"
      class="item"
      :class="{ active: Number(route.params.id) === section.id }"
    >
      <NuxtLink
        class="link"
        :to="`${teamStore.activeTeamSlug}/sections/${section.id}`"
        >{{ section.name }}
      </NuxtLink>

      <!-- Дочерние разделы -->
      <ul class="children">
        <li
          v-for="childSection in section.children"
          class="child"
          :class="{ active: Number(route.params.id) === childSection.id }"
        >
          <NuxtLink
            class="link2"
            :to="`${teamStore.activeTeamSlug}/sections/${childSection.id}`"
            >{{ childSection.name }}
          </NuxtLink>

          <!-- Статьи внутри дочерних разделов -->
          <ul class="children">
            <li
              v-for="childArticle in childSection.items"
              class="child item2"
              :class="{ active: Number(route.params.id) === childArticle.id }"
            >
              <NuxtLink
                :to="`${teamStore.activeTeamSlug}/articles/${childArticle.id}`"
                >{{ childArticle.name }}
              </NuxtLink>
            </li>
          </ul>
        </li>

        <!-- Статьи внутри основных разделов -->
        <li
          v-for="article in section.items"
          class="child"
          :class="{ active: Number(route.params.id) === article.id }"
        >
          <NuxtLink :to="`${teamStore.activeTeamSlug}/sections/${article.id}`"
            >{{ article.name }}
          </NuxtLink>
        </li>
      </ul>
    </li>
  </ul>
</template>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<script lang="ts" setup>
import { useTeamStore } from '~/stores/TeamContoller';
import { useSectionsStore } from '~/stores/SectionContoller';

/**
 * Системные переменные ----------------
 */
const route = useRoute(); // Роут
const sectionsController = useSectionsStore(); // Хранилище сайдбара
const teamStore = useTeamStore(); // Хранилище активной команды
</script>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<style lang="scss" scoped>
.map {
  .item,
  .child {
    &:not(:last-child) {
      margin-bottom: 15px;
    }
    &.active .link {
      color: $blue;
    }
  }
  .child.active {
    .link2 {
      color: $blue;
    }
  }
  .item2.active {
    a {
      color: $blue;
    }
  }
  .children {
    margin-top: 15px;
    padding-left: 25px;
    position: relative;
    &::before {
      content: '';
      position: absolute;
      width: 1px;
      height: 100%;
      top: 0;
      left: 7px;
      background-color: rgba($black, 0.2);
    }
  }
  a {
    color: $gray;
    &:hover {
      text-decoration: none;
      color: $blue;
    }
  }
}
</style>
