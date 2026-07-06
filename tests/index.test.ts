import {expect, test, describe} from 'vitest'

import waterfoxLocation, {getInstallGuidance} from '../src/index'

describe('waterfox-location module', () => {
  it('returns string or null', () => {
    const res = waterfoxLocation()

    expect(typeof res === 'string' || res === null).toBe(true)
  })

  it('getInstallGuidance renders caller-provided install steps in order', () => {
    const msg = getInstallGuidance({
      steps: [
        {
          summary: 'Install Waterfox for Testing (recommended)',
          command: 'npx extension install waterfox'
        },
        {
          summary: 'Install Waterfox',
          command: 'npx extension install waterfox-stable'
        }
      ]
    })

    expect(msg).toMatch(
      new RegExp(
        '1\\) Install Waterfox for Testing \\(recommended\\)\\n' +
          ' {3}npx extension install waterfox'
      )
    )
    expect(msg).toMatch(
      /2\) Install Waterfox\n {3}npx extension install waterfox-stable/
    )
    expect(msg).not.toMatch(/Install Waterfox from the official site/)
    expect(msg).toMatch(/We couldn't find a Waterfox browser/)
  })

  it('getInstallGuidance with empty steps keeps the default hint', () => {
    expect(getInstallGuidance({steps: []})).toBe(getInstallGuidance())
  })
})
