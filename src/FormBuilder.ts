import { upperFirst } from "es-toolkit";
import type {
  AttributeValue,
  Attributes,
  Field,
  Form,
  FormOptions,
  InputOptions,
  Template,
} from "./types.js";

// Значения по умолчанию — только здесь
const DEFAULT_METHOD = "post";
const DEFAULT_ACTION = "#";
const DEFAULT_SUBMIT_TEXT = "Save";

const isAttributeValue = (value: unknown): value is AttributeValue =>
  typeof value === "string" || typeof value === "number";

// Оставляет в опциях только то, что можно вывести атрибутом
const toAttributes = (options: Readonly<Record<string, unknown>>): Attributes =>
  Object.fromEntries(
    Object.entries(options).filter((entry): entry is [string, AttributeValue] =>
      isAttributeValue(entry[1]),
    ),
  );

const buildFormAttributes = ({ url, method, ...attributes }: FormOptions): Attributes => ({
  method: method ?? DEFAULT_METHOD,
  action: url ?? DEFAULT_ACTION,
  ...toAttributes(attributes),
});

// Собирает внутреннее представление формы: список полей и атрибуты формы.
// Про HTML ничего не знает — это дело renderForm
export default class FormBuilder {
  readonly #template: Template;
  readonly #fields: Field[] = [];

  constructor(template: Template) {
    this.#template = template;
  }

  input(name: string, options: InputOptions = {}): void {
    if (!Object.hasOwn(this.#template, name)) {
      throw new Error(`Field '${name}' does not exist in the template.`);
    }

    const { as: type = "input", label = upperFirst(name), labelHtml = {}, ...attributes } = options;

    this.#fields.push({
      type,
      name,
      value: String(this.#template[name] ?? ""),
      label: { text: label, attributes: labelHtml },
      attributes: toAttributes(attributes),
    });
  }

  submit(value: string = DEFAULT_SUBMIT_TEXT, attributes: Attributes = {}): void {
    this.#fields.push({ type: "submit", value, attributes });
  }

  toForm(options: FormOptions): Form {
    return {
      attributes: buildFormAttributes(options),
      fields: [...this.#fields],
    };
  }
}
