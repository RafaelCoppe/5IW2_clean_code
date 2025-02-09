export interface SparePart {
  id: number;
  label: string;
  picture_link: string;
}

export interface SparePartCommand {
  id: number;
  ordered_quantity: number;
  total_price: number;
  date_order: string;
  fk_spare_part: SparePart;
}
