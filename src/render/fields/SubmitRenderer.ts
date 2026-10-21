import Tag from "../../Tag.js";
import type { Field } from "../../types.js";
import type FieldRenderer from "../FieldRenderer.js";

export default class SubmitRenderer implements FieldRenderer<"submit"> {
  render({ value, attributes }: Field<"submit">): string {
    return new Tag("input", { type: "submit", value, ...attributes }).toString();
  }
}
