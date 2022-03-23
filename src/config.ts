export const version = import.meta.env.SNOWPACK_PUBLIC_GIT_SHA || "unset_version";
export const sha = import.meta.env.SNOWPACK_PUBLIC_VERSION || "unset_sha";
export const title = import.meta.env.SNOWPACK_PUBLIC_TITLE || "Core-List";
export const basename = import.meta.env.SNOWPACK_PUBLIC_URL;
export const ghUrl = "https://github.com/nexys-system/core-list";

export const github = { sha: `${ghUrl}/commit/${sha}`, version: `${ghUrl}/releases/tag/${version}`, url: ghUrl };
