import * as __SNOWPACK_ENV__ from './_snowpack/env.js';

export const sha = __SNOWPACK_ENV__.SNOWPACK_PUBLIC_GIT_SHA || "unset_sha";
export const version = __SNOWPACK_ENV__.SNOWPACK_PUBLIC_VERSION || "unset_version";
export const title = __SNOWPACK_ENV__.SNOWPACK_PUBLIC_TITLE || "react-headless";
export const basename = __SNOWPACK_ENV__.SNOWPACK_PUBLIC_URL;
export const ghUrl = "https://github.com/nexys-system/react-headless";
export const github = {
  sha: `${ghUrl}/commit/${sha}`,
  version: `${ghUrl}/releases/tag/${version}`,
  url: ghUrl
};