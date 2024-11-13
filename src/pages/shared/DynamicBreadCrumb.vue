<template>
  <q-breadcrumbs separator-color="grey" class="text-subtitle2">
    <q-breadcrumbs-el
      v-for="(crumb, index) in breadcrumbs"
      :key="index"
      :label="getBreadcrumbLabel(crumb, index)"
    />
  </q-breadcrumbs>
</template>

<script>
import { useRoute } from "vue-router";

export default {
  props: {
    staticCrumbs: {
      type: Array,
      default: () => ["zillabase", "user_account"],
    },
    dynamicLabel: {
      type: String,
      default: "Overview",
    },
  },
  setup(props) {
    const route = useRoute();

    // Combine static crumbs with the dynamic crumb at the end
    const breadcrumbs = [...props.staticCrumbs, props.dynamicLabel];

    // Function to set the last breadcrumb based on the route
    const getBreadcrumbLabel = (crumb, index) => {
      if (index === breadcrumbs.length - 1) {
        return route.meta.title || props.dynamicLabel; // Use route meta if available
      }
      return crumb;
    };

    return {
      breadcrumbs,
      getBreadcrumbLabel,
    };
  },
};
</script>
<style scoped lang="scss">
.q-breadcrumbs {
  .q-breadcrumbs__el {
    color: var(--q-color-gray-dark);
  }
  .q-breadcrumbs--last {
    .q-breadcrumbs__el {
      color: var(--q-color-text-secondary);
    }
  }
}
</style>
