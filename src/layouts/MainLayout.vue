<template>
  <q-layout view="lHh Lpr lFf" class="zillbase-dashboard">
    <q-header bordered class="zillbase-header bg-custom-dark-color">
      <q-toolbar>
        <q-toolbar-title>
          <dynamic-bread-crumb />
        </q-toolbar-title>
        <q-space />
        <q-btn flat color="grey" :icon="darkModeIcon" @click="toggleDarkMode" />
        <q-separator dark color="grey" vertical />
        <q-btn flat color="grey" icon="o_notifications" />
        <q-separator dark color="grey" vertical />
        <q-btn flat color="grey" icon="o_contact_support" />
        <q-separator dark color="grey" vertical />
        <div class="row no-wrap items-center">
          <q-avatar size="42px" class="q-mr-sm">
            <q-img src="/icons/person-01.svg" height="28px" width="28px" />
          </q-avatar>
          <div class="column">
            <div class="text-subtitle1 text-custom-text-secondary">
              John Doe
            </div>
            <div class="text-caption text-custom-gray-dark">Web Developer</div>
          </div>
          <q-btn flat icon="arrow_drop_down" color="grey" />
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      class="bg-custom-primary"
    >
      <q-list>
        <q-item-label header class="flex justify-between items-center q-pb-sm">
          <q-img
            :src="
              leftDrawerOpen ? '/images/logo.svg' : '/images/short-logo.svg'
            "
            fit="contain"
            style="width: 150px; height: 22px"
          />
          <q-btn
            unelevated
            size="sm"
            color="light-green"
            :icon="leftDrawerOpen ? 'chevron_left' : 'chevron_right'"
            style="width: 38px; border-radius: 10px"
            @click="leftDrawerOpen = !leftDrawerOpen"
          />
        </q-item-label>
        <q-separator class="q-mb-md" />

        <q-item v-for="item in NavLinks" :key="item.groupTitle" class="column">
          <q-item-section avatar class="q-pb-md q-pr-none">
            <q-item-label
              class="text-uppercase text-custom-gray-light text-subtitle2"
              >{{ item.groupTitle }}</q-item-label
            >
          </q-item-section>
          <q-item-section
            v-for="link in item.children"
            :key="link.title"
            class="nav-items q-py-sm"
          >
            <q-tooltip
              v-if="!leftDrawerOpen"
              anchor="center right"
              self="center middle"
            >
              {{ link.title }}
            </q-tooltip>
            <q-icon
              size="sm"
              :name="link.icon"
              style="color: var(--q-color-text-custom-dark)"
            >
            </q-icon>
            <q-item-label class="text-subtitle2 text-custom-dark">{{
              link.title
            }}</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <div class="q-px-md q-py-lg">
        <div class="flex items-center q-gutter-sm">
          <h6
            class="text-custom-text-secondary text-weight-bold text-h4 q-my-none"
          >
            Overview
          </h6>
          <q-icon
            size="sm"
            name="o_layers"
            style="color: var(--q-color-text-secondary)"
          />
        </div>
      </div>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from "vue";
import { Dark } from "quasar";
import NavLinks from "src/assets/data/navlinks";
import DynamicBreadCrumb from "src/pages/shared/DynamicBreadCrumb.vue";

export default defineComponent({
  name: "DashBoardLayout",

  components: {
    DynamicBreadCrumb,
  },
  data() {
    return {
      darkModeIcon: Dark.isActive ? "o_light_mode" : "o_bedtime",
    };
  },
  methods: {
    toggleDarkMode() {
      Dark.set(!Dark.isActive);
      this.darkModeIcon = Dark.isActive ? "o_light_mode" : "o_bedtime";
    },
  },

  setup() {
    return {
      leftDrawerOpen: ref(false),
      NavLinks: NavLinks,
    };
  },
});
</script>
<style scoped lang="scss">
.zillbase-header {
}
.nav-items {
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 12px;
  margin-left: 0 !important;

  .q-item__label,
  .q-icon {
    transition: color 0.3s ease, filter 0.3s ease;
  }

  &:hover {
    .q-item__label,
    .q-icon {
      color: $light-green !important;
    }
  }
}
</style>
