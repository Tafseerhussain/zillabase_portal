<template>
    <div class="q-pa-md q-gutter-sm">
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

    <q-dialog v-model="addNewTable" persistent full-height maximized position="right"  backdrop-filter="blur(4px)" class="add-new-dialog">
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
            <p class="text-custom-text-secondary text-h6 fw-600">Create New Table</p>
            </div>
            <q-icon
           name="o_space_dashboard"
           class="fs-30"
            style="color: var(--q-color-text-custom-dark); min-height: 30px;"
          />
          </q-card-section>
          <q-separator />
          <q-card-section class="q-px-md q-py-xl">
              <div class="row items-center">
                <div class="col-3">
                  <span class="text-custom-gray-dark text-subtitle1 text-weight-light">Name</span>
                </div>
                <div class="col-9">
                  <q-input
                    dense
                    outlined
                    placeholder="Table Name"
                    class="rounded-10 self-center text-weight-light rounded-input"
                  />
                </div>
              </div>
              <div class="row items-center q-mt-lg">
                <div class="col-3">
                  <span class="text-custom-gray-dark text-subtitle1 text-weight-light">Description</span>
                </div>
                <div class="col-9">
                  <q-input
                    outlined
                    type="textarea"
                    placeholder="Table Description..."
                    rows="6"
                    autogrow 
                    class="rounded-10 self-center text-weight-light rounded-input"
                  />
                </div>
              </div>
            </q-card-section>
            <q-separator />
            <q-card-section class="q-py-lg">
              <div class="row items-center">
                <div class="col-3 flex items-center">
                  <span class="text-custom-gray-dark text-subtitle1 text-weight-light">ZTable</span>
                  <div>
                    <q-icon   
                    name="bi-question-circle"
                    class="fs-lg text-custom-gray-dark q-ml-sm"
                  />
                  <q-tooltip  
                  anchor="bottom middle"
                  self="top middle">
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
            <q-card-section class="q-py-lg">
              <div class="flex justify-between items-center q-mb-sm">
                <p class="text-custom-text-secondary text-subtitle1 fw-600">Columns</p>
                <div>
                  <q-tooltip  
                    anchor="center left" 
                    self="center end">
                    Data Type Docs
                    </q-tooltip>
                  <q-btn flat icon="o_open_in_new" size="md" color="light-green" :ripple="false" />
                </div>
              </div>
              <data-type-table @setting-row="openRowSettingDialog" />
            </q-card-section>
            <q-separator />
            <q-card-section class="q-py-lg">
              <div class="flex justify-between items-center q-mb-sm">
                <p class="text-custom-text-secondary text-subtitle1 fw-600">Foreign Keys</p>
                <div>
                  <q-tooltip  
                    anchor="center left" 
                    self="center end">
                    Foreign Key Docs
                    </q-tooltip>
                    <q-btn flat icon="o_open_in_new" size="md" color="light-green" :ripple="false" />
                </div>
              </div>
              <div class="flex justify-between q-pa-md foreign-key rounded-10">
                <span class="text-custom-gray-dark">No Foreign Keys</span>
                <q-btn 
                  unelevated
                  color="light-green"
                  icon="add"
                  style="width: 30px; min-height: 30px"
                  class="rounded-10 q-pa-none"
                />
              </div>
            </q-card-section>
            <q-separator />
            <q-card-section class="flex justify-end q-gutter-lg q-pa-lg">
              <q-btn label="Cancel" :ripple="false" color="dark" class="text-capitalize rounded-10 highlighted-border" />
              <q-btn
                label="Add Table"
                icon="add"
                :ripple="false"
                class="bg-light-green rounded-10 text-white text-capitalize self-center"
              />
            </q-card-section>
        </q-card>
    </q-dialog>

      <!-- Delete Dialog -->
    <q-dialog v-model="isDeleteDialogOpen" backdrop-filter="blur(4px)" class="delete-dialog">
      <q-card class="highlighted-border">
        <q-card-section class="flex justify-between items-center q-pa-lg">
            <div class="flex items-center q-gutter-sm">
                <q-icon size="sm" name="o_delete" color="negative" />
                <p class="text-custom-text-secondary fw-600">Delete Table?</p>
            </div>
            <q-icon name="close" class="cursor-pointer fs-20" @click="isDeleteDialogOpen = false" />
        </q-card-section>
        <q-separator />
        <q-card-section>
            <p class="text-custom-gray-dark text-weight-light q-pa-sm w-90">Are you sure you want to delete this <span class="fw-600">Table</span>? This action is irreversible.</p>
        </q-card-section>
        <q-separator />
        <q-card-actions align="right" class="q-pa-md">
          <q-btn label="Cancel" unelevated color="dark" class="rounded-10 text-capitalize min-w-80 highlighted-border" @click="isDeleteDialogOpen = false" />
          <q-btn label="Delete" unelevated color="negative" class="rounded-10 text-capitalize min-w-80" @click="confirmDelete" />
        </q-card-actions>
      </q-card>
    </q-dialog>

      <!-- Row Setting Dialog -->
    <q-dialog v-model="isRowSettingDialogOpen" backdrop-filter="blur(4px)" class="row-setting-dialog">
      <q-card class="highlighted-border">
        <q-card-section class="flex justify-between items-center q-pa-lg">
            <div class="flex items-center q-gutter-sm">
                <q-icon size="sm" name="o_settings" class="text-custom-dark" />
                <p class="text-custom-text-secondary fw-600">Row Settings</p>
            </div>
            <q-icon name="close" class="cursor-pointer fs-20" @click="isDeleteDialogOpen = false" />
        </q-card-section>
        <q-separator />
        <q-card-section>
            <p class="text-custom-gray-dark text-weight-light q-pa-sm w-90">Are you sure you want to delete this <span class="fw-600">Table</span>? This action is irreversible.</p>
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
        DataTypeTable
    },
    data() {
    return {
        isDeleteDialogOpen: false,
        addNewTable: false,
        isRowSettingDialogOpen: false,
        zTableVal: true,
        selectedRow: null,
        tableColumns: [
            { name: 'name', label: 'Table Name', align: 'left', field: 'name' },
            { name: 'description', label: 'Description', align: 'left', field: 'description' },
            { name: 'ztable', label: 'Ztable', align: 'center', field: 'ztable' },
            { name: 'rows', label: 'Rows', align: 'right', field: 'rows' },
            { name: 'columns', label: 'Columns', align: 'right', field: 'columns' },
            { name: 'actions', label: 'Actions', align: 'center' },
        ],
        tableData: [
            { id: 1, name: 'Example Data Table', description: 'Lorem ipsum dolor sit amet.', ztable: true, rows: 79, columns: "03" },
            { id: 2, name: 'Example Data Table', description: 'Lorem ipsum dolor sit amet.', ztable: false, rows: 79, columns: "03" },
            { id: 3, name: 'Example Data Table', description: 'Lorem ipsum dolor sit amet.', ztable: true, rows: 79, columns: "03" },
            { id: 4, name: 'Example Data Table', description: 'Lorem ipsum dolor sit amet.', ztable: true, rows: 79, columns: "03" },
            { id: 5, name: 'Example Data Table', description: 'Lorem ipsum dolor sit amet.', ztable: false, rows: 79, columns: "03" },
            { id: 6, name: 'Example Data Table', description: 'Lorem ipsum dolor sit amet.', ztable: true, rows: 79, columns: "03" },
        ],
    };
  },
  methods: {
    openDeleteDialog(row) {
      this.selectedRow = row;
      this.isDeleteDialogOpen = true;
    },
    confirmDelete() {
      // Handle deletion logic here
      this.isDeleteDialogOpen = false;
      this.selectedRow = null;
    },
    openTableDialog() {
      this.addNewTable = !this.addNewTable;
    },
    openRowSettingDialog(row) {
      this.isRowSettingDialogOpen = !this.isRowSettingDialogOpen;
    }
  }
  
})
</script>
<style scoped lang="scss">
.q-dialog__inner  {
    .q-card  {
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
