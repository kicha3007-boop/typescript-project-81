import type { Field, FieldType } from "../types.js";

// Отрисовщик одного типа поля
export default interface FieldRenderer<T extends FieldType> {
  render(field: Field<T>): string;
}
