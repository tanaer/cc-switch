const PRESET_DISPLAY_ORDER = [
  "muskai",
  "claude official",
  "gemini native",
  "deepseek",
  "zhipu glm",
  "bailian",
  "bailian for coding",
  "kimi",
  "kimi for coding",
  "novita ai",
  "openrouter",
] as const;

const PRESET_NAME_ALIASES: Record<string, string> = {
  "claude desktop official": "claude official",
  "google official": "gemini native",
  "kimi k2.6": "kimi",
};

const PRESET_DISPLAY_NAMES: Record<string, string> = {
  muskai: "MuskAI",
  "claude official": "Claude Official",
  "gemini native": "Gemini Native",
  deepseek: "DeepSeek",
  "zhipu glm": "Zhipu GLM",
  bailian: "Bailian",
  "bailian for coding": "Bailian For Coding",
  kimi: "Kimi",
  "kimi for coding": "Kimi For Coding",
  "novita ai": "Novita AI",
  openrouter: "OpenRouter",
};

const PRESET_ORDER_INDEX: Map<string, number> = new Map(
  PRESET_DISPLAY_ORDER.map((name, index) => [name, index]),
);

function normalizePresetName(name: string): string {
  const normalized = name.trim().toLowerCase();
  return PRESET_NAME_ALIASES[normalized] ?? normalized;
}

export function filterProviderPresets<
  T extends { name: string; icon?: string; iconColor?: string },
>(presets: T[]): T[] {
  return presets
    .map((preset) => {
      const normalizedName = normalizePresetName(preset.name);
      if (!PRESET_ORDER_INDEX.has(normalizedName)) {
        return null;
      }

      return {
        ...preset,
        name: PRESET_DISPLAY_NAMES[normalizedName] ?? preset.name,
        ...(normalizedName === "muskai"
          ? { icon: "muskai", iconColor: undefined }
          : {}),
      } as T;
    })
    .filter((preset): preset is T => preset !== null)
    .sort((a, b) => {
      const aIndex = PRESET_ORDER_INDEX.get(normalizePresetName(a.name)) ?? 999;
      const bIndex = PRESET_ORDER_INDEX.get(normalizePresetName(b.name)) ?? 999;
      return aIndex - bIndex;
    });
}
