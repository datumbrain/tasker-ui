import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'

import Login from '../LoginView.vue'

describe('Login [Unit]', () => {
  beforeEach(() => {
    // Set up Pinia before each test
    const pinia = createPinia()
    setActivePinia(pinia)
  })

  it('renders properly', () => {
    const wrapper = mount(Login, {
      global: {
        plugins: [createPinia()] // Provide Pinia
      }
    })

    expect(wrapper.text()).toContain('Login')
  })
})
