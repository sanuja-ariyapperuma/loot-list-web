<template>
  <!-- input -->
  <v-row>
    <v-col cols="12">
      <v-text-field v-model="newItem.title" label="Search or add new item" type="text" variant="outlined" clearable
        :hide-details="true">
        <template v-slot:append-inner>
          <v-fade-transition leave-absolute>
            <v-progress-circular v-if="loading" color="info" size="24" indeterminate></v-progress-circular>
          </v-fade-transition>
        </template>
      </v-text-field>
    </v-col>
    <v-col cols="12">
      <v-row align="center">
        <v-col cols="12" md="3">
          <v-autocomplete label="Brand" variant="outlined" :items="brands" v-model="newItem.brandId"
            :hide-details="true" item-value="id" item-title="title">
            <template #no-data>
              <v-btn class="ma-4" variant="text" block color="success">Add</v-btn>
            </template>
          </v-autocomplete>
        </v-col>
        <v-col cols="12" md="3">
          <v-text-field variant="outlined" label="Price" placeholder="Price" type="number"
            :hide-details="true"></v-text-field>
        </v-col>
        <v-col cols="12" md="3">
          <v-text-field variant="outlined" label="Qunatity" placeholder="Qunatity" type="number"
            :hide-details="true"></v-text-field>
        </v-col>
        <v-col cols="12" md="3">
          <v-combobox v-model="newItem.categories" :items="categories" variant="outlined" label="Tags" chips multiple
            :hide-details="true"></v-combobox>
        </v-col>
      </v-row>
    </v-col>
    <v-col cols="12" class="mb-6">
      <div class="d-flex align-center justify-end">
        <v-btn v-if="newItem.edit" class="mr-4 text-none" prepend-icon="mdi-close" variant="text" size="large" border
          @click="onClear">
          Cancel
        </v-btn>
        <v-btn class="text-none flex-grow-1 mr-4" :disabled="!!!newItem.title"
          :color="newItem.edit ? 'orange-accent-3' : 'green-accent-4'"
          :prepend-icon="newItem.edit ? 'mdi-check' : 'mdi-plus'" variant="flat" size="large">
          {{ newItem.edit ? "Update" : "Add" }}
        </v-btn>
        <v-switch color="success" v-model="isEdit" label="Edit mode" hide-details inset></v-switch>
      </div>
    </v-col>
  </v-row>
  <!-- list -->
  <v-list lines="one">
    <LootListItem :list="filteredList" :brands="brands" :isEdit="isEdit" @onEditEnable="onEditEnable"
      @onDeleteConfirmDialog="onDeleteConfirmDialog" />
  </v-list>
  <!-- delete model -->
  <v-dialog v-model="deleteItem" width="auto">
    <v-card>
      <v-card-title class="text-h5"> Are you sure? </v-card-title>
      <v-card-text>Once deleted you cannot recover</v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="green-darken-1" variant="text" @click="deleteItem = undefined">
          Cancel
        </v-btn>
        <v-btn color="red-darken-1" variant="text" @click="onDeleteConfirm(item)">
          Yes, delete
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts" setup>
import { useListStore } from "@/stores/list";
import { NewLootItem } from "@/types/list.type";

const store = useListStore();

const { list, brands, categories } = store;

const newItem = ref<NewLootItem>({
  title: "",
  brandId: null,
  edit: false,
  isActive: false,
  categories: [],
});

const filteredList = computed(() =>
  // eslint-disable-next-line no-extra-boolean-cast
  !!!newItem.value.title || newItem.value.edit
    ? list
    : list.filter((item: LootItem) =>
      item.title.toLowerCase().includes(newItem.value.title.toLowerCase())
    )
);

const deleteItem = ref<LootItem>();

const isEdit = ref<boolean>(false);

const onClear = () => {
  newItem.value = { title: "", brandId: null, edit: false, isActive: false, categories: [] } as NewLootItem;
};
const onEditEnable = (item: LootItem) => {
  newItem.value = { ...item, brandId: item.brandId, edit: true } as NewLootItem;
};
const onDeleteConfirmDialog = (item: LootItem) => {
  deleteItem.value = item;
};
const onDeleteConfirm = () => {
  deleteItem.value = undefined;
};
</script>

<style lang="scss" scoped>
.list-item {
  min-height: 5rem;
}
</style>
