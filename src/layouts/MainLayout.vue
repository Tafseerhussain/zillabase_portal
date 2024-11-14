<template>
  <q-layout view="lHh Lpr lFf" class="zillbase-dashboard">
    <q-header bordered class="zillbase-header bg-custom-dark-color">
      <q-toolbar>
        <q-toolbar-title>
          <dynamic-bread-crumb />
        </q-toolbar-title>
        <q-space />
        <q-btn flat color="grey" :icon="darkModeIcon ? 'o_light_mode' : 'o_bedtime'" :ripple="false"
         style="color: var(--q-color-text-secondary) !important;" @click="toggleDarkMode" />
        <q-separator vertical />
        <q-btn flat color="grey" icon="o_notifications" :ripple="false" style="color: var(--q-color-text-secondary) !important;" />
        <q-separator vertical />
        <q-btn flat color="grey" icon="o_contact_support" :ripple="false" style="color: var(--q-color-text-secondary) !important;" />
        <q-separator vertical />
        <div class="row no-wrap items-center">
          <q-avatar size="42px" class="q-mr-sm">
            <q-img src="/icons/person-01.svg" height="28px" width="28px" />
          </q-avatar>
          <div class="column">
            <div class="text-subtitle1 text-custom-text-secondary text-weight-medium">
              John Doe
            </div>
            <div class="text-caption text-custom-gray-dark text-weight-light">Web Developer</div>
          </div>
          <q-btn flat icon="arrow_drop_down" color="grey" :ripple="false" />
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
        <q-item-label header class="flex justify-between items-center q-pb-sm fixed q-mb-xl border-bottom-custom-highlight w-full left-sidebar-log">
          <q-img
            :src="logoSrc"
            fit="contain"
            style="width: 150px; height: 22px"
          />
          <q-btn
            unelevated
            color="light-green"
            :icon="leftDrawerOpen ? 'chevron_left' : 'chevron_right'"
            style="width: 30px; height: 30px; border-radius: 10px"
            @click="leftDrawerOpen = !leftDrawerOpen"
          />
        </q-item-label>
        <q-separator class="" />

        <q-item v-for="item in NavLinks" :key="item.groupTitle" class="column q-pb-md">
          <q-item-section avatar class="q-pb-sm q-pr-none">
            <q-item-label
              class="text-uppercase text-custom-gray-light text-subtitle2 text-weight-light"
              >{{ item.groupTitle }}</q-item-label
            >
          </q-item-section>
          <q-item-section
            v-for="link in item.children"
            :key="link.title"
            class="nav-items q-py-sm"
            :class="{'active-link': isActive(link.href)}" 
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
            <q-item-label class="text-subtitle2 text-custom-dark text-weight-medium" @click="navigate(link.href)">
              {{ link.title }}</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <div class="q-px-md q-py-lg flex justify-between">
        <div class="flex items-center q-gutter-md">
          <h6
            class="text-custom-text-secondary text-weight-bold text-h4"
          >
          {{ route.meta.title }}
          </h6>
          <q-icon
           :name="route.meta.icon"
           class="fs-30"
            style="color: var(--q-color-text-custom-dark);"
          />
        </div>
        <q-btn label="Settings" icon="o_settings" :ripple="false" color="dark" class="text-capitalize rounded-10" />
      </div>
      <q-separator />
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from "vue";
import { Dark } from "quasar";
import NavLinks from "src/assets/data/navlinks";
import DynamicBreadCrumb from "src/pages/shared/DynamicBreadCrumb.vue";
import { useRoute } from "vue-router";

export default defineComponent({
  name: "MainLayout",

  components: {
    DynamicBreadCrumb,
  },
  data() {
    return {
      darkModeIcon: false,
    };
  },
  methods: {
    toggleDarkMode() {
      Dark.set(!Dark.isActive);
      this.darkModeIcon = !this.darkModeIcon;
    },
    navigate(href) {
      if (href) {
        this.$router.push(href);
      }
    }
  },

  setup() {
    const route = useRoute  ();

    const isActive = (href) => {
      return route.path === href;
    };
    return {
      leftDrawerOpen: ref(false),
      NavLinks: NavLinks,
      isActive,
      route
    };
  },
  computed: {
    logoSrc() {
      if (this.leftDrawerOpen) {
        return this.darkModeIcon ? '/images/light-logo.svg' : '/images/logo.svg';
      } else {
        return this.darkModeIcon ? '/images/short-light-logo.svg' : '/images/short-logo.svg';
      }
    }
  }
});
</script>
<style scoped lang="scss">
  .q-toolbar {
    min-height: 60px;
  }
  .q-drawer__content {
    .left-sidebar-log {
      min-height: 61px;
    }
    .q-list {
      .q-item.q-item-type:nth-child(3) {
      margin-top: 4.50rem;
    }
    }
  }
  .nav-items {
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    gap: 12px;
    margin-left: 0 !important;
    cursor: pointer;

    .q-item__label,
    .q-icon {
      transition: color 0.3s ease, filter 0.3s ease;
    }

    &:hover, &.active-link {
      .q-item__label,
      .q-icon {
        color: $light-green !important;
      }
    }
  }
  .border-bottom-custom-highlight {
    border-bottom: 1px solid var(--q-color-highlight);
  }
</style>
