import Tag from "../../Tag.js";
import type { Field } from "../../types.js";
import type FieldRenderer from "../FieldRenderer.js";
import renderLabel from "../renderLabel.js";

export default class InputRenderer implements FieldRenderer<"input"> {
  render(field: Field<"input">): string {
    const { name, value, attributes } = field;
    const input = new Tag("input", { name, type: "text", value, ...attributes });

    return `${renderLabel(field)}${input.toString()}`;
  }
}
