<template>
    <div class="q-pa-md q-gutter-sm">
        <common-table title="External & Embedded" description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
            :columns="tableColumns" :rows="tableData" buttonLabel="Add function" searchInputPlaceholder="Functions" @delete-row="openDeleteDialog" />
    </div>

</template>
<script>
import { defineComponent } from "vue";
import CommonTable from "../shared/CommonTable.vue";

export default defineComponent({
    nname: "FunctionComponent",
    components: {
        CommonTable,
    },
    data() {
        return {
            isDeleteDialogOpen: false,
            selectedRow: null,
            tableColumns: [
                { name: "name", label: "Name", align: "left", field: "name" },
                { name: "parameters", label: "Parameters", align: "left", field: "parameters", },
                { name: "returnType", label: "Return Type", align: "center", field: "returnType", sortable: true, },
                { name: "language", label: "Language", align: "center", field: "language", sortable: true, },
                { name: "type", label: "Type", align: 'center' , field: "type", sortable: true, },
                { name: "bodyOrExternalName", label: "Body/ External Name", align: "center", field: "bodyOrExternalName", sortable: true, },
                { name: "actions", label: "Actions", align: "center" },
            ],
            tableData: [
                { id: 1, name: "Example Data Table", parameters: "Lorem ipsum", returnType: "Lorem ipsum", language: "PHP", type:"External"},
                { id: 2, name: "Example Data Table", parameters: "Lorem ipsum", returnType: "Lorem ipsum", language: "JavaScript", type:"Embedded"},
                { id: 3, name: "Example Data Table", parameters: "Lorem ipsum", returnType: "Lorem ipsum", language: "R", type:"External"},
                { id: 4, name: "Example Data Table", parameters: "Lorem ipsum", returnType: "Lorem ipsum", language: "PHP", type:"Embedded"},
                { id: 5, name: "Example Data Table", parameters: "Lorem ipsum", returnType: "Lorem ipsum", language: "SQL", type:"External"},
                { id: 6, name: "Example Data Table", parameters: "Lorem ipsum", returnType: "Lorem ipsum", language: "Python", type:"Embedded"},

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
</style>
