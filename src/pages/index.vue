<template>
  <!-- input -->
  <v-row>
    <v-col cols="12">
      <v-text-field
        v-model="newLootItem.title"
        label="Add new item"
        type="text"
        variant="outlined"
        clearable
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

        <template v-slot:append>
          <v-col cols="auto">
            <v-autocomplete
              :items="brands"
              v-model="newLootItem.brandId"
              :hide-details="true"
            >
              <template #no-data>
                <v-btn
                  class="ma-4"
                  variant="text"
                  block
                  color="success"
                  >Add</v-btn
                >
              </template>
            </v-autocomplete>
          </v-col>
          <v-col cols="auto">
            <v-btn
              :disabled="!!!newLootItem.title"
              icon="mdi-plus"
              color="green-accent-4"
            ></v-btn>
          </v-col>
        </template>
      </v-text-field>
    </v-col>
  </v-row>
  <!-- list -->
  <v-list lines="one">
    <v-list-item
      v-for="item in lootList"
      :key="item.id"
      :title="item.title"
      :subtitle="item.subtitle"
      :value="item.id"
    >
      <template #prepend="{ isActive }">
        <v-list-item-action start>
          <v-checkbox-btn :model-value="isActive"></v-checkbox-btn>
        </v-list-item-action>
      </template>
      <v-list-item-title>{{ item.title }}</v-list-item-title>
      <v-list-item-subtitle>
        {{ item.subtitle }}
      </v-list-item-subtitle>
      <template v-slot:append="{ isActive }">
        <v-list-item-action end>
          <v-col cols="auto">
            <v-btn icon="mdi-pencil"></v-btn>
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
const newLootItem = ref({
  title: "",
  subtitle: "",
  brandId: 0,
});
const brands = computed(() => [
  {
    id: 1,
    title: "Brand 1",
  },
  {
    id: 2,
    title: "Brand 2",
  },
  {
    id: 3,
    title: "Brand 3",
  },
]);
const lootList = computed(() => [
  {
    id: 1,
    title: "Item 1",
    subtitle: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
    isActive: false,
  },
  {
    id: 2,
    title: "Item 2",
    subtitle: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
    isActive: true,
  },
  {
    id: 3,
    title: "Item 3",
    subtitle: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
    isActive: false,
  },
]);
const deleteItem = ref();
const onDeleteConfirmDialog = (item) => {
  deleteItem.value = item;
};
const onDeleteConfirm = (item) => {
  deleteItem.value = undefined;
};
</script>
