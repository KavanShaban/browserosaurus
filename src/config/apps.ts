type App = {
  privateArg?: string
  convertUrl?: (url: string) => string
  // appMatcher?: ({ }: { appDefName: string, appDefNameLower: string, checkThisName: string, checkThisNameLower: string }) => boolean;
}

const typeApps = <T extends Record<string, App>>(apps: T) => apps

const appsStatic = typeApps({
  'Arc': {},
  'Blisk': {},
  'Brave Browser': {
    privateArg: '--incognito',
  },
  'Brave Browser Beta': {
    privateArg: '--incognito',
  },
  'Brave Browser Nightly': {
    privateArg: '--incognito',
  },
  'Brave Dev': {
    privateArg: '--incognito',
  },
  'Chromium': {
    privateArg: '--incognito',
  },
  'Discord': {
    convertUrl: (url) =>
      url.replace(
        /^https?:\/\/(?:(?:ptb|canary)\.)?discord\.com\//u,
        'discord://-/',
      ),
  },
  'Discord Canary': {
    convertUrl: (url) =>
      url.replace(
        /^https?:\/\/(?:(?:ptb|canary)\.)?discord\.com\//u,
        'discord://-/',
      ),
  },
  'Discord PTB': {
    convertUrl: (url) =>
      url.replace(
        /^https?:\/\/(?:(?:ptb|canary)\.)?discord\.com\//u,
        'discord://-/',
      ),
  },
  'Dissenter': {},
  'DuckDuckGo': {},
  'Epic': {},
  'Figma': {},
  'Figma Beta': {},
  'Finicky': {},
  'Firefox': {
    privateArg: '--private-window',
  },
  'Firefox Developer Edition': {
    privateArg: '--private-window',
  },
  'Firefox Nightly': {
    privateArg: '--private-window',
  },
  'Framer': {},
  'FreeTube': {},
  'Google Chrome': {
    privateArg: '--incognito',
  },
  'Google Chrome Beta': {
    privateArg: '--incognito',
  },
  'Google Chrome Canary': {
    privateArg: '--incognito',
  },
  'Google Chrome Dev': {
    privateArg: '--incognito',
  },
  'IceCat': {
    privateArg: '--private-window',
  },
  'Iridium': {},
  'Lagrange': {},
  'LibreWolf': {
    privateArg: '--private-window',
  },
  'Linear': {},
  'Maxthon': {},
  'Microsoft Edge': {},
  'Microsoft Edge Beta': {},
  'Microsoft Edge Canary': {},
  'Microsoft Edge Dev': {},
  'Microsoft Teams': {
    convertUrl: (url) =>
      url.replace('https://teams.microsoft.com/', 'msteams:/'),
  },
  'Min': {},
  'Miro': {},
  'Mullvad Browser': {
    privateArg: '--private-window',
  },
  'NAVER Whale': {},
  'Notion': {},
  'Opera': {},
  'Opera Beta': {},
  'Opera CD': {},
  'Opera Crypto': {},
  'Opera Dev': {},
  'Opera GX': {},
  'Opera Neon': {},
  'Orion': {},
  'Pocket': {
    convertUrl: (url) => `pocket://add?url=${url}`,
  },
  'Polypane': {},
  'qutebrowser': {},
  'Safari': {},
  'Safari Technology Preview': {},
  'Sidekick': {
    privateArg: '--incognito',
  },
  'SigmaOS': {},
  'Sizzy': {},
  'Slack': {},
  'Spotify': {},
  'Tor Browser': {},
  'Twitter': {},
  'Vivaldi': {},
  'Vivaldi Snapshot': {},
  'Waterfox': {},
  'Wavebox': {
    privateArg: '--incognito',
  },
  'Whist': {},
  'Yandex': {},
  'Yattee': {},
  'zoom.us': {},
})

export type StringKeys<KKeys extends PropertyKey> = KKeys extends string
  ? KKeys
  : never
export type StringKeysOf<T> = StringKeys<keyof T>

function setupApps<T extends Record<string, App>>(appsExtra: T) {
  const appKeys: StringKeys<keyof typeof appsExtra>[] = Object.keys(
    appsExtra,
  ) as any

  const appsArray = appKeys.map((appKey) => {
    const appDef: App = appsExtra[appKey]
    return {
      key: appKey,
      keyLower: appKey.toLowerCase(),
      ...appDef,
    } as const
  })

  return {
    apps: appsExtra,
    appsInfo: {
      appKeys,
      appsArray,
    },
  }
}

let { apps, appsInfo } = setupApps(appsStatic)

function augmentApps<T extends Record<string, App>>(appsExtra: T) {
  const res = setupApps({
    ...appsStatic,
    ...appsExtra,
  })

  apps = res.apps
  appsInfo = res.appsInfo as any
  return res
}

type Apps = typeof apps

type AppName = keyof typeof apps

export { App, AppName, Apps, apps, appsInfo, augmentApps }
