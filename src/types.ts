// Значение HTML-атрибута и набор атрибутов тега
export type AttributeValue = string | number;
export type Attributes = Readonly<Record<string, AttributeValue>>;

// Объект, из которого форма берёт значения полей
export type TemplateValue = string | number | boolean | null | undefined;
export type Template = Readonly<Record<string, TemplateValue>>;

// Опции formFor: url становится action, остальное — атрибуты тега form
export interface FormOptions {
  readonly url?: string;
  readonly method?: string;
  readonly [attribute: string]: AttributeValue | undefined;
}

// Опции поля: as выбирает тип поля, label и labelHtml — подпись,
// остальное — атрибуты самого поля
export interface InputOptions {
  readonly as?: InputType;
  readonly label?: string;
  readonly labelHtml?: Attributes;
  readonly [attribute: string]: AttributeValue | Attributes | undefined;
}

export type InputType = "input" | "textarea";

// Внутреннее представление формы: данные без разметки

export interface Label {
  readonly text: string;
  readonly attributes: Attributes;
}

export interface InputField {
  readonly name: string;
  readonly value: string;
  readonly label: Label;
  readonly attributes: Attributes;
}

export interface SubmitField {
  readonly value: string;
  readonly attributes: Attributes;
}

// Тип поля → его данные. Новый тип поля добавляется сюда и в таблицу отрисовщиков
export interface FieldsByType {
  readonly input: InputField;
  readonly textarea: InputField;
  readonly submit: SubmitField;
}

export type FieldType = keyof FieldsByType;

export type Field<T extends FieldType = FieldType> = {
  [K in T]: { readonly type: K } & FieldsByType[K];
}[T];

export interface Form {
  readonly attributes: Attributes;
  readonly fields: readonly Field[];
}
