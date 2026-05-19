import { describe, expect, it } from "vitest";
import { providerPresets } from "@/config/claudeProviderPresets";
import { claudeDesktopProviderPresets } from "@/config/claudeDesktopProviderPresets";
import { codexProviderPresets } from "@/config/codexProviderPresets";
import { geminiProviderPresets } from "@/config/geminiProviderPresets";
import { opencodeProviderPresets } from "@/config/opencodeProviderPresets";
import { openclawProviderPresets } from "@/config/openclawProviderPresets";
import { hermesProviderPresets } from "@/config/hermesProviderPresets";
import { universalProviderPresets } from "@/config/universalProviderPresets";

const namesOf = (presets: Array<{ name: string }>) =>
  presets.map((preset) => preset.name);

const expectInOrder = (names: string[], expected: string[]) => {
  const indexes = expected.map((name) => names.indexOf(name));

  expect(indexes).not.toContain(-1);
  expect(indexes).toEqual(expected.map((_, index) => indexes[0] + index));
};

describe("provider preset order", () => {
  it("MuskAI 预设在各应用入口可直接选择", () => {
    expectInOrder(namesOf(providerPresets), ["Claude Official", "MuskAI"]);
    expectInOrder(namesOf(claudeDesktopProviderPresets), [
      "Claude Desktop Official",
      "MuskAI",
    ]);
    expectInOrder(namesOf(codexProviderPresets), [
      "OpenAI Official",
      "MuskAI",
    ]);
    expectInOrder(namesOf(geminiProviderPresets), [
      "Google Official",
      "MuskAI",
    ]);
    expect(opencodeProviderPresets[0]?.name).toBe("MuskAI");
    expect(openclawProviderPresets[0]?.name).toBe("MuskAI");
    expect(hermesProviderPresets[0]?.name).toBe("MuskAI");
    expect(universalProviderPresets[0]).toMatchObject({
      name: "MuskAI",
      websiteUrl: "https://muskapi.cc",
    });
  });

  it("Claude Desktop 预设包含官方登录入口", () => {
    expect(claudeDesktopProviderPresets[0]).toMatchObject({
      name: "Claude Desktop Official",
      category: "official",
      baseUrl: "",
      mode: "direct",
    });
  });

  it("MuskAI 预设使用指定的官网和 API 地址", () => {
    expect(providerPresets[1]).toMatchObject({
      name: "MuskAI",
      websiteUrl: "https://muskapi.cc",
      settingsConfig: {
        env: {
          ANTHROPIC_BASE_URL: "https://api.muskapi.cc",
        },
      },
    });
    expect(codexProviderPresets[1]?.config).toContain(
      'base_url = "https://api.muskapi.cc/v1"',
    );
  });
});
