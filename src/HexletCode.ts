import FormBuilder from "./FormBuilder.js";
import renderForm from "./render/renderForm.js";
import type { FormOptions, Template } from "./types.js";

export default class HexletCode {
  // Пайплайн: описание формы в колбэке → внутреннее представление → HTML
  static formFor(
    template: Template,
    options: FormOptions = {},
    describe: (form: FormBuilder) => void = () => {},
  ): string {
    const builder = new FormBuilder(template);
    describe(builder);

    return renderForm(builder.toForm(options));
  }
}
