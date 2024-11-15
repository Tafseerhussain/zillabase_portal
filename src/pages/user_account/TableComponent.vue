<template>
    <div class="q-pa-md q-gutter-sm">
        <common-table
        title="Example Table"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
        :columns="tableColumns"
        :rows="tableData"
        buttonLabel="Add Table"
        @delete-row="openDeleteDialog"
    />
    </div>
    <q-dialog v-model="isDeleteDialogOpen" backdrop-filter="blur(4px)" class="delete-dialog">
      <q-card>
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
          <q-btn label="Cancel" color="dark" class="rounded-10 text-capitalize min-w-80" @click="isDeleteDialogOpen = false" />
          <q-btn label="Delete" color="negative" class="rounded-10 text-capitalize min-w-80" @click="confirmDelete" />
        </q-card-actions>
      </q-card>
    </q-dialog>
</template>
<script>
import { defineComponent } from "vue";
import CommonTable from "../shared/CommonTable.vue";
export default defineComponent({
    name: "TableComponent",
    components: {
        CommonTable
    },
    data() {
    return {
        isDeleteDialogOpen: false,
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
</style>
