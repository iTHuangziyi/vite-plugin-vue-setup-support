import { parse, compileScript } from '@vue/compiler-sfc'
import MagicString from 'magic-string'

export function supportScriptName(code: string, id: string) {
  let s: MagicString | undefined
  const str = () => s || (s = new MagicString(code))
  const { descriptor } = parse(code)
  if (!descriptor.script && descriptor.scriptSetup) {
    const result = compileScript(descriptor, { id })
    const name = result.attrs.name
    const lang = result.attrs.lang
    if (name) {
      str().appendLeft(
        0,
        `<script ${lang ? `lang="${lang}"` : ''}>import { defineComponent } from 'vue';export default defineComponent({name: '${name}',})</script>\n`,
      )
    }
    return {
      map: str().generateDecodedMap(),
      code: str().toString(),
    }
  } else {
    return null
  }
}
