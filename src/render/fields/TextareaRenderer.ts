import { escape } from "es-toolkit";
import Tag from "../../Tag.js";
import type { Field } from "../../types.js";
import type FieldRenderer from "../FieldRenderer.js";
import renderLabel from "../renderLabel.js";

const DEFAULT_COLS = 20;
const DEFAULT_ROWS = 40;

export default class TextareaRenderer implements FieldRenderer<"textarea"> {
  render(field: Field<"textarea">): string {
    const { name, value, attributes } = field;
    const textarea = new Tag(
      "textarea",
      { cols: DEFAULT_COLS, rows: DEFAULT_ROWS, name, ...attributes },
      escape(value),
    );

    return `${renderLabel(field)}${textarea.toString()}`;
  }
}
