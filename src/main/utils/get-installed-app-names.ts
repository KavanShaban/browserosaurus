import { execSync } from 'node:child_process'
import path from 'node:path'

import { sleep } from 'tings'

import type { App, AppName } from '../../config/apps'
import { apps, augmentApps } from '../../config/apps'
import { retrievedInstalledApps, startedScanning } from '../state/actions'
import { dispatch } from '../state/store'

function getAllInstalledAppNames(): string[] {
  const appNames = execSync(
    'find /Applications -iname "*.app" -prune -not -path "*/.*" 2>/dev/null ||true',
  )
    .toString()
    .trim()
    .split('\n')
    .map((appPath) => path.parse(appPath).name)

  return appNames
}

async function getInstalledAppNames(): Promise<void> {
  dispatch(startedScanning())

  const allInstalledAppNames = getAllInstalledAppNames()

  const checkThisAllInstalledAppNames = allInstalledAppNames.map((x) => ({
    checkThisName: x,
    checkThisNameLower: x.toLowerCase(),
  }))

  const augmentedApps: Record<string, App> = {}

  for (const installedApp of checkThisAllInstalledAppNames) {
    if (installedApp.checkThisNameLower.startsWith('chrome=')) {
      augmentedApps[installedApp.checkThisName] = {
        ...apps['Google Chrome'],
      }
    }
  }

  const augmentedAppsKeys = Object.keys(augmentedApps)

  console.log(
    `Found ${augmentedAppsKeys.length} augmented apps: ${augmentedAppsKeys.join(
      ', ',
    )}`,
  )

  augmentApps(augmentedApps)

  // const { appKeys, appsArray } = appsInfo;

  // for (const appDef of appsArray) {
  //   const { key, keyLower, appMatcher } = appDef;
  //   const appPathExists = allInstalledAppNames.includes(appPath);
  //   let matched = false;
  //   if (appMatcher) {
  //     matched = checkThisAllInstalledAppNamesappMatcher({ allInstalledAppNames });
  //   }
  // }

  // const installedApps: typeof appKeys = [];
  // for (const appKey of appKeys) {
  //   const appDef = apps[appKey];

  // }

  const installedApps = Object.keys(apps).filter((appName) =>
    allInstalledAppNames.includes(appName),
  ) as AppName[]

  // It appears that sometimes the installed app IDs are not fetched, maybe a
  // race with Spotlight index? So if none found, keep retrying.
  // TODO is this needed any more, now using we're `find` method?
  // https://github.com/will-stone/browserosaurus/issues/425
  if (installedApps.length === 0) {
    await sleep(500)
    getInstalledAppNames()
  } else {
    dispatch(retrievedInstalledApps(installedApps))
  }
}

export { getInstalledAppNames }
