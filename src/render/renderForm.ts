import Tag from "../Tag.js";
import type { Field, FieldType, Form } from "../types.js";
import type FieldRenderer from "./FieldRenderer.js";
import InputRenderer from "./fields/InputRenderer.js";
import SubmitRenderer from "./fields/SubmitRenderer.js";
import TextareaRenderer from "./fields/TextareaRenderer.js";

type Renderers = { readonly [T in FieldType]: FieldRenderer<T> };

// Тип поля → отрисовщик. Новый тип поля — новая строка здесь
const renderers: Renderers = {
  input: new InputRenderer(),
  textarea: new TextareaRenderer(),
  submit: new SubmitRenderer(),
};

const renderField = <T extends FieldType>(field: Field<T>): string =>
  renderers[field.type].render(field);

const renderForm = ({ attributes, fields }: Form): string =>
  new Tag("form", attributes, fields.map(renderField).join("")).toString();

export default renderForm;
