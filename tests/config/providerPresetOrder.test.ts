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

describe("provider preset order", () => {
  it("only exposes the curated provider presets and keeps MuskAI first", () => {
    expect(namesOf(providerPresets)).toEqual([
      "MuskAI",
      "Claude Official",
      "Gemini Native",
      "DeepSeek",
      "Zhipu GLM",
      "Bailian",
      "Bailian For Coding",
      "Kimi",
      "Kimi For Coding",
      "Novita AI",
      "OpenRouter",
    ]);
    expect(namesOf(claudeDesktopProviderPresets)).toEqual([
      "MuskAI",
      "Claude Official",
      "Gemini Native",
      "DeepSeek",
      "Zhipu GLM",
      "Bailian",
      "Bailian For Coding",
      "Kimi",
      "Kimi For Coding",
      "Novita AI",
      "OpenRouter",
    ]);
    expect(namesOf(codexProviderPresets)).toEqual(["MuskAI", "OpenRouter"]);
    expect(namesOf(geminiProviderPresets)).toEqual([
      "MuskAI",
      "Gemini Native",
      "OpenRouter",
    ]);
    expect(namesOf(opencodeProviderPresets)).toEqual([
      "MuskAI",
      "DeepSeek",
      "Zhipu GLM",
      "Bailian",
      "Kimi",
      "Kimi For Coding",
      "Novita AI",
      "OpenRouter",
    ]);
    expect(namesOf(openclawProviderPresets)).toEqual([
      "MuskAI",
      "DeepSeek",
      "Zhipu GLM",
      "Kimi",
      "Kimi For Coding",
      "Novita AI",
      "OpenRouter",
    ]);
    expect(namesOf(hermesProviderPresets)).toEqual([
      "MuskAI",
      "DeepSeek",
      "Zhipu GLM",
      "Bailian",
      "Bailian For Coding",
      "Kimi",
      "Kimi For Coding",
      "Novita AI",
      "OpenRouter",
    ]);
    expect(namesOf(universalProviderPresets)).toEqual(["MuskAI"]);
  });

  it("MuskAI presets use the requested logo and endpoints", () => {
    expect(providerPresets[0]).toMatchObject({
      name: "MuskAI",
      icon: "muskai",
      websiteUrl: "https://muskapi.cc",
    });
    expect(
      (providerPresets[0]!.settingsConfig as { env: Record<string, string> })
        .env,
    ).toMatchObject({
      ANTHROPIC_BASE_URL: "https://api.muskapi.cc",
    });
    expect(codexProviderPresets[0]?.icon).toBe("muskai");
    expect(codexProviderPresets[0]?.config).toContain(
      'base_url = "https://api.muskapi.cc/v1"',
    );
  });
});
