# Генератор форм на Typescript

[![hexlet-check](https://github.com/kicha3007-boop/typescript-project-81/actions/workflows/hexlet-check.yml/badge.svg)](https://github.com/kicha3007-boop/typescript-project-81/actions)
[![CI](https://github.com/kicha3007-boop/typescript-project-81/actions/workflows/ci.yml/badge.svg)](https://github.com/kicha3007-boop/typescript-project-81/actions/workflows/ci.yml)

Библиотека, с помощью которой удобно создавать формы в шаблонах сайтов. Она заметно сокращает код описания формы за счет автоматической обработки ошибок и различных контролов.

Учебный проект Хекслета: https://ru.hexlet.io/programs/typescript

## Стек

- TypeScript, es-toolkit
- Vitest (покрытие v8 с порогом 90%), oxlint + oxfmt
- GitHub Actions: линтер, проверка типов, тесты с покрытием

## Установка

```bash
git clone https://github.com/kicha3007-boop/typescript-project-81.git
cd typescript-project-81
make install   # npm ci, заодно собирает dist/ с объявлениями типов
```

## Использование

```typescript
import HexletCode from '@hexlet/code';

const template = { name: 'rob', job: 'hexlet', gender: 'm' };

HexletCode.formFor(template, { url: '/users' }, (f) => {
  f.input('name');
  f.input('job', { as: 'textarea' });
  f.submit('Wow');
});
// <form method="post" action="/users">
//   <label for="name">Name</label>
//   <input name="name" type="text" value="rob">
//   <label for="job">Job</label>
//   <textarea cols="20" rows="40" name="job">hexlet</textarea>
//   <input type="submit" value="Wow">
// </form>
```

Переносы строк в примерах — для читаемости, библиотека возвращает одну строку.

- `formFor(template, options, callback)` — `url` становится `action` (по умолчанию `#`),
  `method` по умолчанию `post`, остальные опции — атрибуты тега `form`.
- `input(name, options)` — поле со значением `template[name]` и подписью. `as: 'textarea'` выбирает
  текстовую область (`cols` 20 и `rows` 40 можно переопределить), `label` и `labelHtml` — текст
  и атрибуты подписи, остальные опции — атрибуты поля.
- `submit(text = 'Save')` — кнопка отправки.
- Поле, которого нет в объекте, — ошибка `Field 'age' does not exist in the template.`

```typescript
HexletCode.formFor(template, {}, (f) => {
  f.input('name', { class: 'user-input', label: 'User', labelHtml: { class: 'form-label' } });
  f.input('job', { as: 'textarea', rows: 50, cols: 50 });
  f.submit();
});
// <form method="post" action="#">
//   <label for="name" class="form-label">User</label>
//   <input name="name" type="text" value="rob" class="user-input">
//   <label for="job">Job</label>
//   <textarea cols="50" rows="50" name="job">hexlet</textarea>
//   <input type="submit" value="Save">
// </form>
```

## Как устроено

- `src/FormBuilder.ts` собирает внутреннее представление — данные без разметки: атрибуты формы
  и список полей, у каждого свой тип (`input`, `textarea`, `submit`).
- `src/render/renderForm.ts` отрисовывает поля по типу: у каждого типа свой класс в `src/render/fields/`.
  Новый тип поля — запись в `FieldsByType` (`src/types.ts`) и новый отрисовщик в таблице.
- `src/Tag.ts` строит одиночные и парные теги, значения атрибутов экранируются.

## Разработка

```bash
make test           # тесты
make test-coverage  # тесты с порогом покрытия
make lint           # oxlint + oxfmt
make typecheck      # tsc --noEmit
make build          # сборка в dist/
```

---

<details>
<summary>Автоматические тесты Хекслета</summary>

Тесты запускаются на каждый коммит. За запуск отвечает файл `.github/workflows/hexlet-check.yml` — не удаляйте и не переименовывайте ни его, ни репозиторий.

</details>

## О Хекслете

[Хекслет](https://ru.hexlet.io/) — школа программирования: авторские программы обучения с практикой, поддержкой наставников и реальными проектами, которые остаются в резюме. Этот репозиторий — один из таких проектов.
