<template>
    <div class="q-px-sm q-pb-sm q-gutter-sm">
        <q-splitter v-model="splitterModel" class="storage-tab-splitter">
            <template v-slot:before>
                <q-tabs v-model="selectedTab" vertical class="text-primary" align="left" animated>
                    <q-card-section class="flex justify-between q-pa-sm q-mt-md q-mb-sm">
                        <div class="flex">
                            <p class="text-custom-text-secondary text-h6 fw-600 text-left">
                                All Snippets
                            </p>
                        </div>
                        <q-btn unelevated icon="add" :ripple="false"
                            class="bg-light-green rounded-10 text-white text-capitalize self-center q-pa-sm" />
                        <div class="row q-mt-md">
                            <q-input outlined dense :placeholder="`Search Snippets...`"
                                class="rounded-10 self-center search-input text-weight-light rounded-input">
                                <template v-slot:append>
                                    <q-icon name="img:/icons/search.svg" class="fs-lg filter-gray-dark" />
                                </template>
                            </q-input>
                        </div>
                    </q-card-section>
                    <q-tab v-for="(tab, index) in tabs" :key="tab.name" :name="tab.name">
                        <!-- <div class="row q-pl-sm justify-between items-center"> -->
                        <!-- Tab name on the left -->
                        <span class="text-custom-gray-dark text-capitalize text-weight-light">{{ tab.name }}</span>
                        <!-- Buttons on the right -->
                        <div class="flex">
                            <q-btn flat dense icon="img:/icons/edit.svg" class="filter-text-secondary"
                                @click="editTab(index)" size="14px" />
                            <q-btn flat dense icon="img:/icons/trash.svg" class="q-ml-md" @click="deleteTab(index)"
                                size="14px" />
                        </div>
                        <!-- </div> -->
                    </q-tab>
                </q-tabs>
            </template>

            <template v-slot:after>
                <q-tab-panels v-model="selectedTab" animated swipeable vertical transition-prev="jump-up"
                    transition-next="jump-up" class="q-mt-sm">
                    <q-tab-panel name="initialTab">
                        <div class="flex justify-between q-pb-lg">
                            <div class="">
                                <p class="text-custom-text-secondary text-h6 fw-600">
                                    Select A Snippet To Start Editing
                                </p>
                            </div>
                        </div>

                        <div class="row justify-center q-pt-lg">
                            <div class="column q-pa-lg bg-custom-primary text-center select-bucket">
                                <div class="flex flex-center q-mb-md">
                                    <q-icon class="fs-60" name='img:/icons/sql-snippet.svg' />
                                </div>
                                <div class="fs-18 text-custom-text-secondary">
                                    Select a <b>Snippet</b> to Edit
                                </div>
                                <div class="text-caption text-custom-text-secondary q-my-sm">
                                    OR
                                </div>
                                <q-btn unelevated label="Add A Snippet" icon="add" :ripple="false"
                                    class="bg-light-green rounded-10 text-white text-capitalize self-center btn-add-new q-mt-sm"
                                    @click="handleClick" />
                            </div>
                        </div>
                    </q-tab-panel>
                    <q-tab-panel v-for="tab in tabs" :key="tab.name" :name="tab.name">
                        <p class="text-custom-text-secondary text-h6 fw-600 q-pb-lg">{{ tab.name }}</p>

                        <q-input
                        outlined
                        type="textarea"
                        placeholder="SELECT * FROM `ZillaBase` ORDER BY id;"
                        rows="12"
                        autogrow 
                        class="rounded-10 self-center text-weight-light rounded-input"
                    />
                    </q-tab-panel>
                </q-tab-panels>

            </template>
        </q-splitter>
    </div>

</template>
<script>
import { defineComponent } from 'vue';
import { ref } from "vue";
export default defineComponent({
    name: "SqlComponent",
    data() {
        return {

            selectedTab: "initialTab",
            tabs: [{
                name: "Snippet 1",
            },
            {
                name: "Snippet 2",
            },
            {
                name: "Snippet 3",
            }
            ],
        }
    },
    setup() {
        return {
            splitterModel: ref(20),
        };
    },
})
</script>
<style scoped lang="scss">
.search-input {
    width: 222px;
    color: rgba(0, 0, 0, 0.57);
}

.select-bucket {
    border: 2px dashed var(--q-color-gray-dark);
    border-radius: 20px;
    width: 400px;
}

.q-dialog__inner {
    .q-card {
        border-radius: 15px;
        background-color: var(--q-color-bg);
        box-shadow: none;
        width: 550px;

        .q-card__actions {
            .q-btn--rectangle {
                min-width: 80px;
            }
        }
    }
}
</style>