<template>
    <div class="q-px-md q-gutter-sm">
        <div class="row no-wrap">
            <div class="col-6 q-pr-md q-pt-md">
                <common-table title="Users" description="" :columns="userTableColumns" :rows="userTableData"
                    buttonLabel="" searchInputPlaceholder="Users" />
            </div>
            <q-separator vertical />
            <div class="col-6 q-pl-md q-pt-md">
                <common-table title="SSO Providers" description="" :columns="ssoTableColumns" :rows="ssoTableData"
                    buttonLabel="" searchInputPlaceholder="Providers" />
            </div>

        </div>
    </div>
</template>
<script>
import { defineComponent } from 'vue';
import CommonTable from '../shared/CommonTable.vue';

export default defineComponent({
    name: "AuthComponent",
    components: {
        CommonTable
    },
    data() {
        return {
            userTableColumns: [
                { name: "uid", label: "UID", align: "left", field: "uid", sortable: true },
                { name: "name", label: "Name", align: "left", field: "name", },
                { name: "email", label: "Email", align: "left", field: "email", classes: 'text-custom-dark', },
                { name: "actions", label: "Actions", align: "center" },
            ],
            userTableData: [
                { uid: 1, name: "John Doe", email: "johndoe@example.com" },
                { uid: 2, name: "John Doe", email: "johndoe@example.com" },
                { uid: 3, name: "John Doe", email: "johndoe@example.com" },
                { uid: 4, name: "John Doe", email: "johndoe@example.com" },
                { uid: 5, name: "John Doe", email: "johndoe@example.com" },
                { uid: 6, name: "John Doe", email: "johndoe@example.com" },

            ],
            ssoTableColumns: [
                { name: "emailType", label: "Email Type", align: "left", field: "emailType", sortable: true },
                { name: "enabled", label: "Enabled", align: "center", field: "Enabled", },
                { name: "actions", label: "Actions", align: "center" },
            ],
            ssoTableData: [
                { emailType: "Google", enabled: true, },
                { emailType: "Github", enabled: false, },
                { emailType: "Yahoo", enabled: true, },
                { emailType: "LinkedIn", enabled: false, },
                { emailType: "Stackoverflow", enabled: true, },
                { emailType: "Custom", enabled: false, },

            ]
        }
    }
})
</script>