import { describe, expect, it } from "vitest";
import { opencodeProviderPresets } from "@/config/opencodeProviderPresets";

describe("OpenCode provider presets", () => {
  it("Kimi For Coding preset should use Anthropic with the coding endpoint", () => {
    const kimiForCodingPreset = opencodeProviderPresets.find(
      (p) => p.name === "Kimi For Coding",
    );

    expect(kimiForCodingPreset).toBeDefined();
    expect(kimiForCodingPreset!.settingsConfig.npm).toBe("@ai-sdk/anthropic");
    expect(kimiForCodingPreset!.settingsConfig.options?.baseURL).toBe(
      "https://api.kimi.com/coding/v1",
    );
    expect(kimiForCodingPreset!.templateValues?.baseURL.defaultValue).toBe(
      "https://api.kimi.com/coding/v1",
    );
  });

  it("only exposes the curated OpenCode preset brands", () => {
    expect(opencodeProviderPresets.map((preset) => preset.name)).toEqual([
      "MuskAI",
      "DeepSeek",
      "Zhipu GLM",
      "Bailian",
      "Kimi",
      "Kimi For Coding",
      "Novita AI",
      "OpenRouter",
    ]);
  });
});
