<template>
  <div>
    <div class="flex justify-between q-pb-lg">
      <div class="">
        <p class="text-custom-text-secondary text-h6 fw-600">{{ title }}</p>
        <p class="text-custom-gray-dark text-subtitle1 text-weight-light">
          {{ description }}
        </p>
      </div>
      <div class="flex q-gutter-md">
        <q-btn
          label="Add Table"
          icon="add"
          :ripple="false"
          class="bg-light-green rounded-10 text-white text-capitalize self-center"
        />
        <q-input
          outlined
          v-model="searchQuery"
          dense
          placeholder="Search Data..."
          class="rounded-10 self-center search-input text-weight-light"
        >
          <template v-slot:append>
            <q-icon name="search" style="color: var(--q-color-gray-dark)" />
          </template>
        </q-input>
      </div>
    </div>

    <q-table
      :rows="filteredRows"
      :columns="columns"
      row-key="id"
      flat
      bordered
      :rows-per-page-options="[]"
      hideBottom
      class="rounded-15 data-table"
    >
      <template v-slot:header-cell-ztable="props">
        <q-th :props="props">
            {{ props.col.label }}
          <q-icon
            name="o_contact_support"
            class="fs-20 text-custom-gray-dark"
          />
        </q-th>
      </template>
      <template v-slot:body-cell-ztable="props">
        <q-td :props="props">
          <q-icon
            size="sm"
            :name="props.row.ztable ? 'check_circle' : 'cancel'"
            :color="props.row.ztable ? '' : 'negative'"
            :class="props.row.ztable ? 'text-default-light-green' : ''"
          />
        </q-td>
      </template>

      <template v-slot:body-cell-actions="props">
        <q-td :props="props">
          <q-btn
            flat
            dense
            icon="bi-pencil-square"
            class="text-custom-text-secondary"
            @click="editRow(props.row)"
          />
          <q-btn
            flat
            dense
            icon="o_delete"
            color="negative"
            @click="deleteRow(props.row)"
          />
        </q-td>
      </template>
    </q-table>
  </div>
</template>
<script>
import { defineComponent } from "vue";
export default defineComponent({
  name: "CommonTable",
  props: {
    title: {
      type: String,
      default: "Example Table",
    },
    description: {
      type: String,
      default: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
    columns: {
      type: Array,
      required: true,
    },
    rows: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      searchQuery: "",
    };
  },
  computed: {
    filteredRows() {
      if (!this.searchQuery) return this.rows;
      const query = this.searchQuery.toLowerCase();
      return this.rows.filter((row) =>
        Object.values(row).some((value) =>
          String(value).toLowerCase().includes(query)
        )
      );
    },
  },
  methods: {
    editRow(row) {
      // Handle edit row action
    },
    deleteRow(row) {
      // Handle delete row action
      this.$emit("delete-row", row);
    },
  },
});
</script>
<style scoped lang="scss">

</style>
