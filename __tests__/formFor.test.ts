import fs from "node:fs";
import path from "node:path";
import { describe, expect, test } from "vitest";
import HexletCode from "../src/index.js";
import type { FormBuilder, FormOptions } from "../src/index.js";

const getFixturePath = (filename: string): string =>
  path.join(import.meta.dirname, "..", "__fixtures__", filename);
const readFixture = (filename: string): string =>
  fs.readFileSync(getFixturePath(filename), "utf-8").trim();

const user = { name: "rob", job: "hexlet", gender: "m" };

interface Case {
  readonly title: string;
  readonly fixture: string;
  readonly template: Readonly<Record<string, string | number>>;
  readonly options: FormOptions;
  readonly describe: (form: FormBuilder) => void;
}

const cases: readonly Case[] = [
  {
    title: "empty form with defaults",
    fixture: "empty.html",
    template: user,
    options: {},
    describe: () => {},
  },
  {
    title: "form attributes: method, url as action, extra attributes",
    fixture: "form-attributes.html",
    template: user,
    options: { method: "get", url: "/users", class: "search" },
    describe: () => {},
  },
  {
    title: "input, textarea and submit with labels",
    fixture: "full.html",
    template: user,
    options: { url: "/users" },
    describe: (f) => {
      f.input("name");
      f.input("job", { as: "textarea" });
      f.submit("Wow");
    },
  },
  {
    title: "field attributes and overridden textarea defaults",
    fixture: "field-attributes.html",
    template: user,
    options: {},
    describe: (f) => {
      f.input("name", { class: "user-input" });
      f.input("job", { as: "textarea", rows: 50, cols: 50 });
    },
  },
  {
    title: "custom label and default submit text",
    fixture: "label-and-default-submit.html",
    template: user,
    options: {},
    describe: (f) => {
      f.input("name", { label: "User name", labelHtml: { class: "form-label" } });
      f.submit();
    },
  },
  {
    title: "values are escaped and stringified",
    fixture: "escaping.html",
    template: { bio: "<b>Tom & Jerry</b>", quote: '"hi"', age: 42 },
    options: {},
    describe: (f) => {
      f.input("bio", { as: "textarea" });
      f.input("quote");
      f.input("age");
    },
  },
];

describe("HexletCode.formFor", () => {
  test.each(cases)("$title", ({ fixture, template, options, describe: build }) => {
    expect(HexletCode.formFor(template, options, build)).toBe(readFixture(fixture));
  });

  test("renders an empty form without options and callback", () => {
    expect(HexletCode.formFor(user)).toBe(readFixture("empty.html"));
  });

  test("throws when the field is missing in the template", () => {
    expect(() =>
      HexletCode.formFor(user, {}, (f) => {
        f.input("name");
        f.input("age");
      }),
    ).toThrow("Field 'age' does not exist in the template.");
  });

  test("does not mutate passed options", () => {
    const options = Object.freeze({ url: "/users" });
    const inputOptions = Object.freeze({ as: "textarea" as const, rows: 10 });

    HexletCode.formFor(user, options, (f) => f.input("job", inputOptions));

    expect(options).toEqual({ url: "/users" });
    expect(inputOptions).toEqual({ as: "textarea", rows: 10 });
  });
});
