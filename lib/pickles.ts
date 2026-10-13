export const spiceLevels = ["Mild", "Medium", "Traditional heat", "Extra hot"] as const;

export type SpiceLevel = (typeof spiceLevels)[number];
