import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { createRouter, createMemoryHistory } from 'vue-router'
import { nextTick } from 'vue'
import Navbar from '@/components/Navbar.vue'

function createTestRouter() {
  return createRouter({
    history: createMemoryHistory(),
    routes: [
      { path: '/', component: { template: '<div>Home</div>' } },
      { path: '/about', component: { template: '<div>About</div>' } },
      { path: '/login', component: { template: '<div>Login</div>' } },
      { path: '/dashboard', component: { template: '<div>Dashboard</div>' } },
      { path: '/supplements', component: { template: '<div>Supplements</div>' } },
      { path: '/profile', component: { template: '<div>Profile</div>' } },
    ],
  })
}

describe('Navbar', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('shows Login when no user is logged in', async () => {
    const router = createTestRouter()
    router.push('/')
    await router.isReady()

    const wrapper = mount(Navbar, {
      global: {
        plugins: [router],
      },
    })

    await nextTick()

    expect(wrapper.text()).toContain('Login')
    expect(wrapper.text()).not.toContain('Dashboard')
    expect(wrapper.text()).not.toContain('Supplements')
    expect(wrapper.text()).not.toContain('Profile')
  })

  it('shows protected navigation when user is logged in', async () => {
    localStorage.setItem('userId', '1')

    const router = createTestRouter()
    router.push('/')
    await router.isReady()

    const wrapper = mount(Navbar, {
      global: {
        plugins: [router],
      },
    })

    await nextTick()

    expect(wrapper.text()).toContain('Dashboard')
    expect(wrapper.text()).toContain('Supplements')
    expect(wrapper.text()).toContain('Profile')
    expect(wrapper.text()).toContain('Logout')
  })
})
