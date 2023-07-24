<template>
  <NuxtLayout name="main" :title="$t.title" :nav="nav">
    <p class="text">{{ $t.text }}</p>

    <div class="cards">
      <div class="card" v-for="card in plans">
        <div class="content">
          <h4 class="name">{{ card.name }}</h4>
          <h2 class="price">{{ card.price }}$</h2>
          <ul class="features">
            <li v-for="feature in card.features">{{ feature.code }}</li>
          </ul>
        </div>
        <button
          class="btn"
          :class="{ btn2: userController.plan?.id !== card.id }"
        >
          {{ userController.plan?.id !== card.id ? 'Сменить тариф' : 'Ваш тариф' }}
        </button>
      </div>
    </div>
  </NuxtLayout>
</template>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<script lang="ts" setup>
import { useCustomFetch } from '~/hooks/useCustomFetch';
import { useTeamStore } from '~/stores/TeamContoller';
import { useUserStore } from '~/stores/UserController';
import { TMyBilling, TPlan } from '~/utils/types/plan';

/**
 * Переменные ----------------
 */
const teamController = useTeamStore();
const userController = useUserStore();
const $t = await useTranslate('billing');
const route = useRoute();
const nav = [
  { label: $t.nav.settings, link: `${teamController.activeTeamSlug}/settings` },
  { label: $t.title, link: route.path },
];

/**
 * Получение данных ----------------
 */
// Список планов
const { data: plans } = await useCustomFetch<TPlan[]>(`billing/plans`, {
  query: { team_id: teamController.activeTeamId },
});
const { data: billing } = await useCustomFetch<TMyBilling>(`billing`, {
  query: { team_id: teamController.activeTeamId },
});
userController.changePlan(billing.plan);
</script>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<style lang="scss" scoped>
.text {
  margin-top: -15px;
  margin-bottom: 40px;
}

.cards {
  display: flex;
  flex-wrap: wrap;
  margin-right: -32px;
  margin-bottom: -32px;
}

.card {
  margin-right: 32px;
  margin-bottom: 32px;
  width: 320px;
  min-height: 430px;
  box-shadow: 0 0 10px rgba($blue, 0.2);
  border-radius: 3px;
  padding: 32px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .name {
    font-size: 24px;
    line-height: 32px;
    margin-bottom: 16px;
  }
  .price {
    font-size: 64px;
    line-height: 70px;
    color: $blue;
    margin-bottom: 16px;
  }
  .features {
    margin-bottom: 16px;
    li {
      &:not(:last-child) {
        margin-bottom: 8px;
      }
      color: $gray;
    }
  }
  .btn2 {
    margin-top: auto;
    width: 100%;
    pointer-events: visible !important;
  }
  .btn {
    pointer-events: none;
  }
}
</style>