#!/usr/bin/env node
'use strict';

const api = require('./dist/index.cjs');
const locateWaterfox = api.default || api;
const getWaterfoxVersion = api.getWaterfoxVersion;
const getInstallGuidance = api.getInstallGuidance;

const argv = process.argv.slice(2);
const allowFallback = argv.includes('--fallback') || argv.includes('-f');
const printBrowserVersion =
  argv.includes('--waterfox-version') || argv.includes('--browser-version');
const allowExec = argv.includes('--allow-exec');

try {
  const waterfoxPath =
    (typeof locateWaterfox === 'function' && locateWaterfox(allowFallback)) ||
    (typeof locateWaterfox === 'function' && locateWaterfox(true)) ||
    null;

  if (!waterfoxPath) {
    const guidance =
      (typeof getInstallGuidance === 'function' && getInstallGuidance()) ||
      'Waterfox not found.';
    console.error(guidance);
    process.exit(1);
  }

  if (printBrowserVersion && typeof getWaterfoxVersion === 'function') {
    const v = getWaterfoxVersion(waterfoxPath, { allowExec });
    if (!v) {
      console.log('');
      process.exit(2);
    }
    console.log(String(v));
    process.exit(0);
  }

  console.log(String(waterfoxPath));
} catch (e) {
  console.error(String(e?.message ? e.message : e));
  process.exit(1);
}

