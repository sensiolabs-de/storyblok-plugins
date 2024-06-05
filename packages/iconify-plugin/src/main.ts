import {createApp, Plugin} from 'vue'
import IconifyPlugin from './IconifyPlugin.vue'
import '@storyblok/design-system/dist/storyblok-design-system.css'
import BlokInk from '@storyblok/design-system'

if (!document.querySelector('#app')) {
  // In production, `#app` may or may not exist.
  const rootElement = document.createElement('div')
  rootElement.id = 'app'
  document.body.appendChild(rootElement)
}
createApp(IconifyPlugin)
  .use(BlokInk as Plugin)
  .mount('#app')

// This error replaces another error which message is harder to understand and impossible to avoid util the issue https://github.com/storyblok/field-plugin/issues/107 has been resolved.
throw new Error(
  `This error can be safely ignored. It is caused by the legacy field plugin API. See issue https://github.com/storyblok/field-plugin/issues/107`,
)
