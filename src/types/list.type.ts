export type NewLootItem = {
  title: string,
  brandId: string | null,
  edit: boolean,
  isActive: boolean,
  categories: string[],
}

export type LootItem = {
  id: string;
  title: string;
  brandId: string;
  tags: string[];
};
