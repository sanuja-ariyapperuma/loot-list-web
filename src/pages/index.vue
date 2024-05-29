<template>
  <!-- input -->
  <v-row>
    <v-col cols="12">
      <v-text-field
        v-model="newItem.title"
        label="Search or add new item"
        type="text"
        variant="outlined"
        clearable
        :hide-details="true"
      >
        <template v-slot:append-inner>
          <v-fade-transition leave-absolute>
            <v-progress-circular
              v-if="loading"
              color="info"
              size="24"
              indeterminate
            ></v-progress-circular>
          </v-fade-transition>
        </template>
      </v-text-field>
    </v-col>
    <v-col cols="12" class="mb-6">
      <v-row align="center">
        <v-col cols="12" md="4">
          <v-autocomplete
            label="Brand"
            variant="outlined"
            :items="brands"
            v-model="newItem.brandId"
            :hide-details="true"
            item-value="id"
            item-title="title"
          >
            <template #no-data>
              <v-btn class="ma-4" variant="text" block color="success">Add</v-btn>
            </template>
          </v-autocomplete>
        </v-col>
        <v-col cols="12" md="3">
          <v-text-field
            variant="outlined"
            label="Price"
            placeholder="Price"
            type="number"
            :hide-details="true"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="3">
          <v-text-field
            variant="outlined"
            label="Qunatity"
            placeholder="Qunatity"
            type="number"
            :hide-details="true"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="2">
          <div class="d-flex align-center justify-end">
            <v-btn
              v-if="newItem.edit"
              icon="mdi-close"
              class="ml-4"
              @click="onClear"
            ></v-btn>
            <v-btn
              :disabled="!!!newItem.title"
              :icon="newItem.edit ? 'mdi-check' : 'mdi-plus'"
              :color="newItem.edit ? 'orange-accent-3' : 'green-accent-4'"
              class="ml-4"
            ></v-btn>
          </div>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
  <!-- list -->
  <v-list lines="one">
    <v-list-item
      v-for="item in filteredList"
      :key="item.id"
      :title="item.title"
      :subtitle="item.subtitle"
      :value="item.id"
    >
      <template #prepend="{}">
        <v-list-item-action start>
          <v-checkbox-btn v-model="item.isActive"></v-checkbox-btn>
        </v-list-item-action>
      </template>
      <v-list-item-title>{{ item.title }}</v-list-item-title>
      <v-list-item-subtitle>
        {{ item.subtitle }}
      </v-list-item-subtitle>
      <template v-slot:append="{ isActive }">
        <v-list-item-action end>
          <v-col cols="auto">
            <v-btn
              color="orange-accent-3"
              icon="mdi-pencil"
              @click.stop="onEditEnable(item)"
            ></v-btn>
          </v-col>
          <v-col cols="auto">
            <v-btn
              variant="tonal"
              color="red-accent-3"
              icon="mdi-delete"
              @click.stop="onDeleteConfirmDialog(item)"
            ></v-btn>
          </v-col>
        </v-list-item-action>
      </template>
    </v-list-item>
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

const store = useListStore();

const { list, brands } = store;

const newItem = ref({
  title: "",
  subtitle: "",
  brandId: null,
  edit: false,
  isActive: false,
});

const filteredList = computed(() =>
  !!!newItem.value.title || newItem.value.edit
    ? list
    : list.filter((item) =>
        item.title.toLowerCase().includes(newItem.value.title.toLowerCase())
      )
);
const deleteItem = ref();

const onClear = () => {
  newItem.value = { title: "", subtitle: "", brandId: null, edit: false };
};
const onEditEnable = (item) => {
  newItem.value = { ...item, brandId: item.brandId, edit: true };
};
const onDeleteConfirmDialog = (item) => {
  deleteItem.value = item;
};
const onDeleteConfirm = (item) => {
  deleteItem.value = undefined;
};
</script>
