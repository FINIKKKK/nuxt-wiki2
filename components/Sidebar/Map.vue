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
            <template v-for="childArticle in childSection.items">
              <li
                class="child item2"
                :class="{ active: Number(route.params.id) === childArticle.id }"
                v-if="childArticle.status_id === 3"
              >
                <NuxtLink
                  :to="`${teamStore.activeTeamSlug}/articles/${childArticle.id}`"
                  >{{ childArticle.name }}
                </NuxtLink>
              </li>
            </template>
          </ul>
        </li>

        <!-- Статьи внутри основных разделов -->
        <template v-for="article in section.items">
          <li
            class="child"
            :class="{ active: Number(route.params.id) === article.id }"
            v-if="article.status_id === 3"
          >
            <NuxtLink :to="`${teamStore.activeTeamSlug}/articles/${article.id}`"
              >{{ article.name }}
            </NuxtLink>
          </li>
        </template>
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
 * Переменные ----------------
 */
const route = useRoute();
const sectionsController = useSectionsStore();
const teamStore = useTeamStore();
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
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 100%;
    &:hover {
      text-decoration: none;
      color: $blue;
    }
  }
}
</style>
