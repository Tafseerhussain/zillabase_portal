<template>
  <div class="q-pa-lg">
    <common-table
      title="Example Table"
      description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
      :columns="tableColumns"
      :rows="tableData"
      buttonLabel="Add Table"
      @delete-row="openDeleteDialog"
      @add-new="openTableDialog"
    />
  </div>

  <q-dialog
    v-model="addNewTable"
    persistent
    full-height
    maximized
    position="right"
    backdrop-filter="blur(4px)"
    class="add-new-dialog"
  >
    <q-card class="full-height">
      <q-card-section class="flex justify-between items-center q-pa-lg">
        <div class="flex q-gutter-lg">
          <q-btn
            unelevated
            color="light-green"
            :icon="addNewTable ? 'chevron_left' : 'chevron_right'"
            style="width: 30px; min-height: 30px"
            @click="addNewTable = !addNewTable"
            class="rounded-10"
          />
          <p class="text-custom-text-secondary text-h6 fw-600">
            Create New Table
          </p>
        </div>
        <q-icon
          name="img:/icons/grid-6.svg"
          class="fs-30 filter-custom-dark"
          style="min-height: 30px"
        />
      </q-card-section>
      <q-separator />
      <q-card-section class="q-py-xl px-28">
        <div class="row items-center">
          <div class="col-3">
            <span class="text-custom-gray-dark text-subtitle1 text-weight-light"
              >Name</span
            >
          </div>
          <div class="col-9">
            <q-input
              dense
              outlined
              v-model="tableInfo.name"
              placeholder="Table Name"
              class="rounded-10 self-center text-weight-light rounded-input"
            />
          </div>
        </div>
        <div class="row items-start q-mt-lg">
          <div class="col-3">
            <span class="text-custom-gray-dark text-subtitle1 text-weight-light"
              >Description</span
            >
          </div>
          <div class="col-9">
            <q-input
              outlined
              type="textarea"
              placeholder="Table Description..."
              rows="6"
              v-model="tableInfo.description"
              autogrow
              class="rounded-10 self-center text-weight-light rounded-input"
            />
          </div>
        </div>
      </q-card-section>
      <q-separator />
      <q-card-section class="q-py-lg px-28">
        <div class="row items-center">
          <div class="col-3 flex items-center">
            <span class="text-custom-gray-dark text-subtitle1 text-weight-light"
              >ZView</span
            >
            <div>
              <q-icon
                name="img:icons/question-circle.svg"
                class="fs-lg filter-gray-dark q-ml-sm"
              />
              <q-tooltip anchor="bottom middle" self="top middle">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </q-tooltip>
              <q-tooltip anchor="bottom middle" self="top middle">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </q-tooltip>
            </div>
          </div>
          <div class="col-9">
            <q-checkbox dense v-model="zTableVal" color="light-green" />
          </div>
        </div>
      </q-card-section>
      <q-separator />
      <q-card-section class="q-py-lg px-28">
        <div class="flex justify-between items-center q-mb-sm">
          <p class="text-custom-text-secondary text-subtitle1 fw-600">
            Columns
          </p>
          <div>
            <q-tooltip anchor="center left" self="center end">
              Data Type Docs
            </q-tooltip>
            <q-btn
              flat
              icon="img:/icons/export.svg"
              size="md"
              class="filter-light-green"
              :ripple="false"
            />
          </div>
        </div>
        <data-type-table
          :columns="dataTypeColumns"
          :rows="dataTypeRow"
          :typeOptions="dataTypeOptions"
          ref="dataTypeTable"
          @add-row="addRow"
          @remove-row="removeRow"
          @setting-row="openRowSettingDialog"
        />
      </q-card-section>
      <q-separator />
      <!-- <q-card-section class="q-py-lg px-28">
        <div class="flex justify-between items-center q-mb-sm">
          <p class="text-custom-text-secondary text-subtitle1 fw-600">
            Foreign Keys
          </p>
          <div>
            <q-tooltip anchor="center left" self="center end">
              Foreign Key Docs
            </q-tooltip>
            <q-btn
              flat
              icon="img:/icons/export.svg"
              size="md"
              class="filter-light-green"
              :ripple="false"
            />
          </div>
        </div>
        <div class="flex justify-between q-pa-md foreign-key rounded-10">
          <span class="text-custom-gray-dark">No Foreign Keys</span>
          <q-btn
            unelevated
            color="light-green"
            icon="add"
            style="width: 30px; min-height: 30px"
            class="rounded-10 q-pa-none text-custom-dark-color"
          />
        </div>
      </q-card-section> -->
      <q-separator />
      <q-card-section class="flex justify-end q-gutter-lg q-pa-lg">
        <q-btn
          unelevated
          label="Cancel"
          @click="addNewTable = !addNewTable"
          :ripple="false"
          color="dark"
          class="text-capitalize rounded-10 highlighted-border"
        />
        <q-btn
          unelevated
          label="Add Table"
          @click="addTable"
          icon="add"
          :ripple="false"
          class="bg-light-green rounded-10 text-white text-capitalize self-center"
        />
      </q-card-section>
    </q-card>
  </q-dialog>

  <!-- Delete Dialog -->
  <q-dialog
    v-model="isDeleteDialogOpen"
    backdrop-filter="blur(4px)"
    class="delete-dialog"
  >
    <q-card class="highlighted-border">
      <q-card-section class="flex justify-between items-center q-pa-lg">
        <div class="flex items-center">
          <q-icon size="sm" name="img:/icons/trash.svg" />
          <p class="text-custom-text-secondary fw-600 q-ml-md text-subtitle1">
            Delete Table?
          </p>
        </div>
        <q-icon
          name="close"
          class="cursor-pointer fs-20"
          @click="isDeleteDialogOpen = false"
        />
      </q-card-section>
      <q-separator />
      <q-card-section>
        <p class="text-custom-gray-dark text-weight-light q-pa-sm w-90">
          Are you sure you want to delete this
          <span class="fw-600">Table</span>? This action is irreversible.
        </p>
      </q-card-section>
      <q-separator />
      <q-card-actions align="right" class="q-pa-md">
        <q-btn
          label="Cancel"
          unelevated
          color="dark"
          class="rounded-10 text-capitalize min-w-80 highlighted-border"
          @click="isDeleteDialogOpen = false"
        />
        <q-btn
          label="Delete"
          unelevated
          color="negative"
          class="rounded-10 text-capitalize min-w-80"
          @click="confirmDelete"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>

  <!-- Row Setting Dialog -->
  <q-dialog
    v-model="isRowSettingDialogOpen"
    backdrop-filter="blur(4px)"
    class="row-setting-dialog"
    @update:model-value="closeSettings"
  >
    <q-card class="highlighted-border">
      <q-card-section class="flex justify-between items-center q-pa-lg">
        <div class="flex items-center q-gutter-md">
          <q-icon
            size="sm"
            name="img:/icons/setting-2.svg"
            class="filter-custom-white-dark"
          />
          <p class="text-custom-text-secondary fw-600 text-subtitle1">
            Row Settings
          </p>
        </div>
        <q-icon
          name="close"
          class="cursor-pointer fs-20"
          @click="
            isRowSettingDialogOpen = false;
            closeSettings();
          "
        />
      </q-card-section>
      <q-separator />
      <q-card-section>
        <div
          v-for="setting in rowSettingData"
          :key="setting.id"
          class="flex items-start q-gutter-md q-pa-sm"
        >
          <q-checkbox v-model="setting.primary" dense color="light-green" />
          <div>
            <p class="text-custom-text-secondary text-weight-medium">
              {{ setting.label }}
            </p>
            <p class="text-custom-gray-dark text-weight-light q-mt-xs">
              {{ setting.description }}
            </p>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>
<script>
import { defineComponent } from "vue";
import CommonTable from "../shared/CommonTable.vue";
import DataTypeTable from "../shared/DataTypeTable.vue";
export default defineComponent({
  name: "TableComponent",
  components: {
    CommonTable,
    DataTypeTable,
  },
  data() {
    return {
      isDeleteDialogOpen: false,
      addNewTable: false,
      isRowSettingDialogOpen: false,
      zTableVal: true,
      selectedRow: null,
      activeRowSetting: {},
      tableInfo: {
        name: "",
        description: "",
      },
      tableColumns: [
        { name: "name", label: "Table Name", align: "left", field: "name" },
        {
          name: "description",
          label: "Description",
          align: "left",
          field: "description",
        },
        { name: "ztable", label: "ZView", align: "center", field: "ztable" },
        { name: "rows", label: "Rows", align: "right", field: "rows" },
        { name: "columns", label: "Columns", align: "right", field: "columns" },
        { name: "actions", label: "Actions", align: "center" },
      ],
      tableData: [],
      dataTypeRow: [
        { name: "id", type: "id", defaultValue: "id", primary: true, id: 1 },
        {
          name: "name",
          type: "varchar()",
          defaultValue: "",
          primary: false,
          id: 2,
        },
        {
          name: "created_at",
          type: "timestamps()",
          defaultValue: "",
          primary: false,
          id: 3,
        },
        { name: "", type: "", defaultValue: "", primary: false, id: 4 },
      ],
      dataTypeColumns: [
        {
          name: "name",
          required: true,
          label: "Name",
          align: "left",
          field: "name",
        },
        { name: "type", label: "Type", align: "left", field: "type" },
        {
          name: "defaultValue",
          label: "Default Value",
          align: "left",
          field: "defaultValue",
        },
        {
          name: "primary",
          label: "Primary",
          align: "center",
          field: "primary",
        },
        { name: "actions", label: "Actions", align: "center" },
      ],
      dataTypeOptions: ["id", "varchar()", "timestamps()", "int", "float"],
      rowSettingData: [
        {
          id: 1,
          primary: true,
          label: "IsUnique()",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        },
        {
          id: 2,
          primary: false,
          label: "IsNullable()",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        },
        {
          id: 3,
          primary: false,
          label: "IsIdentity()",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        },
      ],
    };
  },
  mounted() {
    this.$ws.connect(() => {
      this.getTableInformations();
    });
    this.$ws.addMessageHandler((data) => {
      this.tableData = data.map((x, i) => ({
        id: i + 1,
        name: x.table_name,
        description: x.table_description,
        columns: x.total_columns,
        rows: x.total_rows,
        ztable: false,
      }));
    });
  },
  beforeUnmount() {
    this.$ws.removeAll();
  },
  methods: {
    getTableInformations() {
      this.$ws.sendMessage(`SELECT 
          t.table_name,
          pg_catalog.obj_description(c.oid) AS table_description,
          (SELECT count(*) FROM information_schema.columns c2 WHERE c2.table_name = t.table_name) AS total_columns,
          (SELECT n_live_tup FROM pg_stat_user_tables WHERE relname = t.table_name) AS total_rows
          FROM 
              information_schema.tables t
          JOIN 
              pg_catalog.pg_class c ON c.relname = t.table_name
          WHERE 
              t.table_schema = 'public'
              AND t.table_type = 'BASE TABLE'
          ORDER BY 
              t.table_name;
          `);
    },
    addTable() {
      const columns = this.$refs.dataTypeTable.rows.map((field) => {
        let columnDef = `${field.name} ${field.type.toUpperCase()}`;

        if (!field.nullable) {
          columnDef += " NOT NULL";
        }

        if (field.defaultValue) {
          columnDef += ` DEFAULT ${field.defaultValue}`;
        }

        if (field.identity) {
          columnDef += " GENERATED ALWAYS AS IDENTITY";
        }

        return columnDef;
      });

      const primaryKey = this.$refs.dataTypeTable.rows
        .filter((field) => field.primary)
        .map((field) => field.name);
      if (primaryKey.length > 0) {
        columns.push(`PRIMARY KEY (${primaryKey.join(", ")})`);
      }

      const query = `CREATE TABLE \"${this.tableInfo.name}\" (${columns.join(
        ",\n    "
      )})`;

      console.log(query);
    },
    openDeleteDialog(row) {
      this.selectedRow = row;
      this.isDeleteDialogOpen = true;
    },
    confirmDelete() {
      this.isDeleteDialogOpen = false;
      this.selectedRow = null;
    },
    openTableDialog() {
      this.addNewTable = !this.addNewTable;
    },
    openRowSettingDialog(row) {
      this.activeRowSetting = this.dataTypeRow.find((x) => x.id == row.id);
      this.isRowSettingDialogOpen = !this.isRowSettingDialogOpen;
      this.rowSettingData.find((x) => x.id == 1).primary =
        this.activeRowSetting.unique || false;
      this.rowSettingData.find((x) => x.id == 2).primary =
        this.activeRowSetting.nullable || false;
      this.rowSettingData.find((x) => x.id == 3).primary =
        this.activeRowSetting.identity || false;
    },
    closeSettings() {
      this.activeRowSetting.unique =
        this.rowSettingData.find((x) => x.id == 1)?.primary || false;
      this.activeRowSetting.nullable =
        this.rowSettingData.find((x) => x.id == 2)?.primary || false;
      this.activeRowSetting.identity =
        this.rowSettingData.find((x) => x.id == 3)?.primary || false;
    },
    addRow() {
      this.dataTypeRow.push({
        id: Date.now().valueOf(),
        name: "",
        type: "",
        defaultValue: "",
        primary: false,
      });
    },
    removeRow(row) {
      this.dataTypeRow = this.dataTypeRow.filter((r) => r.id !== row.id);
    },
  },
});
</script>
<style scoped lang="scss">
.q-dialog__inner {
  .q-card {
    border-radius: 15px;
    background-color: var(--q-color-bg);
    box-shadow: none;
    .q-card__actions {
      .q-btn--rectangle {
        min-width: 80px;
      }
    }
  }
}

.foreign-key {
  border: 2px dashed var(--q-color-highlight);
}
</style>
