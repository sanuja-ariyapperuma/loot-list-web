// Utilities
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { Brand, LootItem } from '../types/list.type'

export const useListStore = defineStore('list', () => {
  const list = ref<LootItem[]>([
    {
      id: 1,
      title: "Dish soap",
      brandId: 1,
      isActive: false,
      tags: ["cleaning", "kitchen"],
    },
    {
      id: 2,
      title: "Hand soap",
      brandId: 2,
      isActive: false,
      tags: ["cleaning", "bathroom"],
    },
    {
      id: 3,
      title: "Fabric softener",
      brandId: 3,
      isActive: false,
      tags: ["cleaning", "laundry"],
    },
    {
      id: 4,
      title: "Aluminum foil",
      brandId: 3,
      isActive: false,
      tags: ["kitchen"],
    },
    {
      id: 5,
      title: "Paper towels",
      brandId: 3,
      isActive: false,
      tags: ["kitchen"],
    },
    {
      id: 6,
      title: "Trash bags",
      brandId: 3,
      isActive: false,
      tags: ["cleaning"],
    },
    {
      id: 7,
      title: "Hand soap",
      brandId: 3,
      isActive: false,
      tags: ["cleaning", "bathroom"],
    },
    {
      id: 8,
      title: "Shampoo",
      brandId: 3,
      isActive: false,
      tags: ["cleaning", "bathroom"],
    },
    {
      id: 9,
      title: "Bath towels",
      brandId: 3,
      isActive: false,
      tags: ["cleaning", "bathroom"],
    },
    {
      id: 10,
      title: "Lint roller",
      brandId: 3,
      isActive: false,
      tags: ["cleaning", "laundry"],
    },
    {
      id: 11,
      title: "Dryer sheets",
      brandId: 3,
      isActive: false,
      tags: ["cleaning", "laundry"],
    },
    {
      id: 12,
      title: "Knives",
      brandId: 3,
      isActive: false,
      tags: ["kitchen"],
    },
  ])
  const brands = ref<Brand[]>([
    {
      id: 1,
      title: "Anchor",
    },
    {
      id: 2,
      title: "Maliban",
    },
    {
      id: 3,
      title: "Arpico",
    },
    {
      id: 4,
      title: "Keells",
    },
  ])
  const categories = ref(["cleaning", "kitchen", "bathroom", "laundry"])
  return { list, brands, categories }
})
