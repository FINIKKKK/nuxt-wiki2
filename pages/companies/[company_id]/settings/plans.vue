<template>
  <NuxtLayout name="main" :nav="nav">
    <UIWarning
      v-if="requestController.errors[url]?.length || successMessage"
      :errors="requestController.errors[url]"
      :message="successMessage"
      class="warning-m"
    />

    <h2 class="title">{{ $t.title }}</h2>
    <p class="text">{{ $t.text }}</p>

    <div class="cards">
      <div class="card" v-for="card in plans" :key="card.id">
        <div class="content">
          <h4 class="name">{{ $t.card[`plan_${card.id}`] }}</h4>
          <h2 class="price">{{ card.price }}$</h2>
          <ul class="features">
            <li v-for="feature in card.features">
              {{ $t.features[`${feature.code}_${feature.feature_data.value}`] }}
            </li>
          </ul>
        </div>
        <button
          class="btn"
          :class="{ btn2: userController.plan?.id !== card.id }"
          @click="() => onChangePlan(card.id)"
        >
          {{
            userController.plan?.id !== card.id
              ? $t.card.btnChange
              : $t.card.btnMy
          }}
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
import { useRequestStore } from '~/stores/RequestController';

/**
 * Переменные ----------------
 */
const teamController = useTeamStore();
const userController = useUserStore();
const requestController = useRequestStore();
const $t = await useTranslate('plans');
const route = useRoute();
const nav = [
  { label: $t.nav.settings, link: `${teamController.activeTeamSlug}/settings` },
  { label: $t.title, link: route.path },
];
const url = 'billing/plans/change';
const successMessage = ref('');

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

/**
 * Методы ----------------
 */
// Сменить план
const onChangePlan = async (id: number) => {
  const { data } = await useCustomFetch(url, {
    body: { team_id: teamController.activeTeamId, plan_id: id },
    method: 'POST',
  });

  if (data) {
  }
};
</script>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<style lang="scss" scoped>
.title {
  margin-bottom: 25px;
}
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