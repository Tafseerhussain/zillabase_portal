<template>
      <q-table
        :rows="rows"
        :columns="columns"
        row-key="name"
        flat
        :rows-per-page-options="[]"
        hideBottom
        class="editable-table"
      >
        <template v-slot:body="props">
          <q-tr :props="props" :class="{ 'row-primary': props.row.primary }">
            <q-td v-for="col in columns" :key="col.name" :props="props">
              <template v-if="col.name === 'name'">
                <div class="flex items-center">
                    <q-icon name="swap_vert" size="md" class="text-custom-dark" />
                    <q-input
                    v-model="props.row.name"
                    outlined
                    dense
                    placeholder="Enter name"
                    />
                </div>
              </template>
  
              <template v-else-if="col.name === 'type'">
                <q-select
                  v-model="props.row.type"
                  :options="typeOptions"
                  outlined
                  dense
                  placeholder="Select type"
                  dropdown-icon="keyboard_arrow_down"
                />
              </template>
  
              <template v-else-if="col.name === 'defaultValue'">
                <q-input
                  v-model="props.row.defaultValue"
                  outlined
                  dense
                  placeholder="Default value"
                />
              </template>
  
              <template v-else-if="col.name === 'primary'">
                <q-checkbox
                  v-model="props.row.primary"
                  dense
                  color="light-green"
                />
              </template>
  
              <template v-else-if="col.name === 'actions'">
                 <!-- Show action buttons for all rows except the last one -->
                <template v-if="props.row !== rows[rows.length - 1]">
                    <q-btn
                    icon="o_settings"
                    flat
                    dense
                    class="text-custom-dark"
                    @click="onSettingsClick(props.row)"
                    />
                    <q-btn
                    icon="o_disabled_by_default"
                    flat
                    dense
                    color="negative"
                    @click="removeRow(props.row)"
                    />
                </template>
                <template v-else>
                <q-btn
                unelevated
                  icon="add"
                  color="light-green"
                  @click="addRow"
                  style="width: 30px; min-height: 30px"
                  class="rounded-10 q-pa-none"
                />
                </template>
              </template>
            </q-td>
          </q-tr>
        </template>
      </q-table>
  </template>
  
  <script>
  import { ref, defineComponent } from "vue";

  export default defineComponent({
    name: "DataTypeTable",
    setup() {
      const rows = ref([
        { name: "id", type: "id", defaultValue: "id", primary: true },
        { name: "name", type: "varchar()", defaultValue: "", primary: false },
        { name: "created_at", type: "timestamps()", defaultValue: "", primary: false },
        { name: "", type: "", defaultValue: "", primary: false },
      ]);
  
      const columns = [
        { name: "name", required: true, label: "Name", align: "left", field: "name" },
        { name: "type", label: "Type", align: "left", field: "type" },
        { name: "defaultValue", label: "Default Value", align: "left", field: "defaultValue" },
        { name: "primary", label: "Primary", align: "center", field: "primary" },
        { name: "actions", label: "Actions", align: "center" },
      ];
  
      const typeOptions = ["id", "varchar()", "timestamps()", "int", "float"];
  

  
      return {
        rows,
        columns,
        typeOptions,
      };
    },
    methods: {
      addRow() {
        rows.value.push({ name: "", type: "", defaultValue: "", primary: false });
      },
  
      removeRow(row) {
        rows.value = rows.value.filter((r) => r !== row);
      },
      onSettingsClick(row) {
        // Handle settings button click
        console.log("Settings clicked for row:", row);
        this.$emit("setting-row", row);
      },
    }
  });
  </script>
  
  <style scoped>

  </style>
  