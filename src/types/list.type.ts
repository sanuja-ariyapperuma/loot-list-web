export type NewLootItem = {
  title: string,
  brandId: string | null,
  edit: boolean,
  isActive: boolean,
  categories: string[],
}

export type LootItem = {
  id: number;
  title: string;
  brandId: number;
  isActive?: boolean;
  tags: string[];
};

export type Brand = {
  id: number,
  title: string,
}
