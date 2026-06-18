import {afterEach, describe, expect, it, vi} from 'vitest'

/* Biome-ignore-all lint/suspicious/noExplicitAny: test harness uses dynamic imports with untyped injected deps */

describe('waterfox-location scanners', () => {
  afterEach(() => {
    vi.restoreAllMocks()
    vi.resetModules()
  })

  it('macOS: strict finds stable Waterfox.app', async () => {
    const scanOsxPath = (await import('../src/scan-osx-path')).default as any
    const found = scanOsxPath(false, {
      fs: {existsSync: (p: string) => p.includes('/Waterfox.app/')},
      userhome: () => '/Users/test/Applications'
    })

    expect(typeof found === 'string' && /\/Waterfox\.app\//.test(found)).toBe(
      true
    )
  })

  it('macOS: strict ignores Current; fallback finds Waterfox Current', async () => {
    const scanOsxPath = (await import('../src/scan-osx-path')).default as any
    const onlyCurrent = {
      fs: {existsSync: (p: string) => p.includes('Waterfox Current.app')},
      userhome: () => '/Users/test/Applications'
    }

    expect(scanOsxPath(false, onlyCurrent)).toBeNull()

    const fallback = scanOsxPath(true, onlyCurrent)

    expect(
      typeof fallback === 'string' && /Waterfox Current\.app/.test(fallback)
    ).toBe(true)
  })

  it('Windows: strict stable only; fallback finds Classic', async () => {
    const scanWindowsPath = (await import('../src/scan-windows-path'))
      .default as any
    const onlyClassic = {
      fs: {existsSync: (p: string) => /Waterfox Classic/.test(p)},
      env: {LOCALAPPDATA: 'C:\\Local'} as any
    }

    expect(scanWindowsPath(false, onlyClassic)).toBeNull()

    const fallback = scanWindowsPath(true, onlyClassic)

    expect(
      typeof fallback === 'string' && /Waterfox Classic/.test(fallback)
    ).toBe(true)
  })

  it('Windows: returns null when nothing installed', async () => {
    const scanWindowsPath = (await import('../src/scan-windows-path'))
      .default as any

    expect(
      scanWindowsPath(true, {
        fs: {existsSync: () => false},
        env: {LOCALAPPDATA: 'C:\\Local'} as any
      })
    ).toBeNull()
  })

  it('Linux/other: strict resolves waterfox; fallback tries classic', async () => {
    const scanUnknown = (await import('../src/scan-unknown-platform-path'))
      .default as any
    const onlyClassic = {
      which: {
        sync: (cmd: string) => {
          if (cmd === 'waterfox-classic') return '/usr/bin/waterfox-classic'
          throw new Error('not found')
        }
      }
    }

    expect(scanUnknown(false, onlyClassic)).toBeNull()
    expect(scanUnknown(true, onlyClassic)).toBe('/usr/bin/waterfox-classic')
  })

  it('Linux/other: returns null when which finds nothing', async () => {
    const scanUnknown = (await import('../src/scan-unknown-platform-path'))
      .default as any

    expect(
      scanUnknown(true, {
        which: {
          sync: () => {
            throw new Error('not found')
          }
        }
      })
    ).toBeNull()
  })
})
