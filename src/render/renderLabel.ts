import { escape } from "es-toolkit";
import Tag from "../Tag.js";
import type { InputField } from "../types.js";

const renderLabel = ({ name, label }: InputField): string =>
  new Tag("label", { for: name, ...label.attributes }, escape(label.text)).toString();

export default renderLabel;
