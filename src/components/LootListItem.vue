<template>
  <v-list-item v-for="item in list" :key="item.id" :value="item.id">
    <template #prepend="{}">
      <v-list-item-action start class="list-item">
        <v-checkbox-btn v-model="item.isActive"></v-checkbox-btn>
      </v-list-item-action>
    </template>
    <v-list-item-title>{{ item.title }}</v-list-item-title>
    <v-list-tile-sub-title>
      <v-chip class="mr-2" color="pink" label>
        <v-icon icon="mdi-shape" start></v-icon>
        {{ brands.find((brand) => brand.id === item.brandId).title }}
      </v-chip>
      <v-chip v-for="tag in item.tags" :key="tag" class="mr-2" color="primary">
        {{ tag }}
      </v-chip>
    </v-list-tile-sub-title>
    <template v-slot:append="{ isActive }">
      <v-list-item-action v-if="isEdit" end>
        <v-col cols="auto">
          <v-btn color="orange-accent-3" icon="mdi-pencil" @click.stop="onEditEnable(item)"></v-btn>
        </v-col>
        <v-col cols="auto">
          <v-btn variant="tonal" color="red-accent-3" icon="mdi-delete"
            @click.stop="onDeleteConfirmDialog(item)"></v-btn>
        </v-col>
      </v-list-item-action>
    </template>
  </v-list-item>
</template>

<script lang="ts" setup>
import { LootItem } from "../types/list.type";

const { list, brands, isEdit } =
  defineProps({
    list: {
      type: Array as PropType<LootItem[]>,
      required: true,
    },
    brands: {
      type: Array as PropType<Brand[]>,
      required: true,
    },
    isEdit: {
      type: Boolean as PropType<boolean>,
      required: true,
    },
  });

const emit = defineEmits(["onEditEnable", "onDeleteConfirmDialog"]);
const onEditEnable = (item: LootItem) => emit("onEditEnable", item);
const onDeleteConfirmDialog = (item: LootItem) => emit("onDeleteConfirmDialog", item);
</script>
