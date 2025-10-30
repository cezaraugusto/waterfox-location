[npm-version-image]: https://img.shields.io/npm/v/waterfox-location.svg?color=00a2ff
[npm-version-url]: https://www.npmjs.com/package/waterfox-location
[npm-downloads-image]: https://img.shields.io/npm/dm/waterfox-location.svg?color=2ecc40
[npm-downloads-url]: https://www.npmjs.com/package/waterfox-location
[action-image]: https://github.com/cezaraugusto/waterfox-location/actions/workflows/ci.yml/badge.svg?branch=main
[action-url]: https://github.com/cezaraugusto/waterfox-location/actions

> Approximates the current location of the Waterfox browser across platforms.

# waterfox-location [![Version][npm-version-image]][npm-version-url] [![Downloads][npm-downloads-image]][npm-downloads-url] [![workflow][action-image]][action-url]

<img alt="Waterfox" align="right" src="https://cdn.jsdelivr.net/gh/extension-js/media@9ef31f005a0192907d9f6405838e43776aca2124/browser_logos/png/waterfox.png" width="10.5%" />

* By default checks only `stable`. Optionally can cascade to `current` / `classic`.
* Supports macOS / Windows / Linux
* Works both as an ES module or CommonJS

## Support table

This table lists the default locations where Waterfox is typically installed for each supported platform and channel. By default, only the Stable channel is checked. When fallback is enabled, the package checks these paths (in order) and returns the first one found.

<table>
  <thead>
    <tr>
      <th>Platform</th>
      <th>Channel</th>
      <th>Paths checked</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td rowspan="3" align="center"><img alt="" width="64" height="64" src="https://cdn.jsdelivr.net/gh/extension-js/media@db5deb23fbfa85530f8146718812972998e13a4d/platform_logos/macos.png" /><br><strong>macOS</strong></td>
      <td align="center">Waterfox (Stable)</td>
      <td>
        <ul>
          <li><code>/Applications/Waterfox.app/Contents/MacOS/waterfox</code></li>
          <li><code>~/Applications/Waterfox.app/Contents/MacOS/waterfox</code></li>
        </ul>
      </td>
    </tr>
    <tr>
      <td align="center">Waterfox Current</td>
      <td>
        <ul>
          <li><code>/Applications/Waterfox Current.app/Contents/MacOS/waterfox</code></li>
          <li><code>~/Applications/Waterfox Current.app/Contents/MacOS/waterfox</code></li>
        </ul>
      </td>
    </tr>
    <tr>
      <td align="center">Waterfox Classic</td>
      <td>
        <ul>
          <li><code>/Applications/Waterfox Classic.app/Contents/MacOS/waterfox</code></li>
          <li><code>~/Applications/Waterfox Classic.app/Contents/MacOS/waterfox</code></li>
        </ul>
      </td>
    </tr>
    <tr>
      <td rowspan="3" align="center"><img alt="" width="64" height="64" src="https://cdn.jsdelivr.net/gh/extension-js/media@db5deb23fbfa85530f8146718812972998e13a4d/platform_logos/windows.png" /><br><strong>Windows</strong></td>
      <td align="center">Waterfox (Stable)</td>
      <td>
        <ul>
          <li><code>%LOCALAPPDATA%\Waterfox\waterfox.exe</code></li>
          <li><code>%PROGRAMFILES%\Waterfox\waterfox.exe</code></li>
          <li><code>%PROGRAMFILES(X86)%\Waterfox\waterfox.exe</code></li>
        </ul>
      </td>
    </tr>
    <tr>
      <td align="center">Waterfox Current</td>
      <td>
        <ul>
          <li><code>%LOCALAPPDATA%\Waterfox Current\waterfox.exe</code></li>
          <li><code>%PROGRAMFILES%\Waterfox Current\waterfox.exe</code></li>
          <li><code>%PROGRAMFILES(X86)%\Waterfox Current\waterfox.exe</code></li>
        </ul>
      </td>
    </tr>
    <tr>
      <td align="center">Waterfox Classic</td>
      <td>
        <ul>
          <li><code>%LOCALAPPDATA%\Waterfox Classic\waterfox.exe</code></li>
          <li><code>%PROGRAMFILES%\Waterfox Classic\waterfox.exe</code></li>
          <li><code>%PROGRAMFILES(X86)%\Waterfox Classic\waterfox.exe</code></li>
        </ul>
      </td>
    </tr>
    <tr>
      <td rowspan="3" align="center"><img alt="" width="64" height="64" src="https://cdn.jsdelivr.net/gh/extension-js/media@db5deb23fbfa85530f8146718812972998e13a4d/platform_logos/linux.png" /><br><strong>Linux/other</strong></td>
      <td align="center">Waterfox (Stable)</td>
      <td>
        <ul>
          <li><code>waterfox</code> (on <code>$PATH</code>)</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td align="center">Waterfox Current</td>
      <td>
        <ul>
          <li><code>waterfox-current</code> (on <code>$PATH</code>)</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td align="center">Waterfox Classic</td>
      <td>
        <ul>
          <li><code>waterfox-classic</code> (on <code>$PATH</code>)</li>
        </ul>
      </td>
    </tr>
  </tbody>
</table>

Returns the first existing path found (given selected channels), or <code>null</code> if none are found.

## Usage

**Via Node.js (strict by default):**

```js
import waterfoxLocation from "waterfox-location";

// Strict (Stable only)
console.log(waterfoxLocation());
// => "/Applications/Waterfox.app/Contents/MacOS/waterfox" or null

// Enable fallback (Stable / Current / Classic)
console.log(waterfoxLocation(true));
// => first found among Stable/Current/Classic or null
```

**Via CLI:**

```bash
npx waterfox-location
# Strict (Stable only)

npx waterfox-location --fallback
# Enable cascade (Stable / Current / Classic)
```

## Related projects

* [brave-location](https://github.com/cezaraugusto/brave-location)
* [chrome-location2](https://github.com/cezaraugusto/chrome-location2)
* [edge-location](https://github.com/cezaraugusto/edge-location)
* [firefox-location2](https://github.com/cezaraugusto/firefox-location2)
* [opera-location2](https://github.com/cezaraugusto/opera-location2)
* [vivaldi-location2](https://github.com/cezaraugusto/vivaldi-location2)
* [yandex-location](https://github.com/cezaraugusto/yandex-location2)
* [librewolf-location](https://github.com/cezaraugusto/librewolf-location)

## License

MIT (c) Cezar Augusto.


