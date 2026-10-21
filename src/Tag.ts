import { escape } from "es-toolkit";
import type { Attributes } from "./types.js";

// Одиночные теги: у них нет содержимого и закрывающего тега
const VOID_TAGS: ReadonlySet<string> = new Set([
  "area",
  "base",
  "br",
  "col",
  "embed",
  "hr",
  "img",
  "input",
  "link",
  "meta",
  "source",
  "track",
  "wbr",
]);

// Тег с атрибутами. content — готовый HTML, текст экранирует вызывающий код
export default class Tag {
  readonly name: string;
  readonly attributes: Attributes;
  readonly content: string;

  constructor(name: string, attributes: Attributes = {}, content = "") {
    this.name = name;
    this.attributes = attributes;
    this.content = content;
  }

  toString(): string {
    const attributes = Object.entries(this.attributes)
      .map(([key, value]) => ` ${key}="${escape(String(value))}"`)
      .join("");
    const opening = `<${this.name}${attributes}>`;

    return VOID_TAGS.has(this.name) ? opening : `${opening}${this.content}</${this.name}>`;
  }
}
