'use client'

import Header from '.'
import type { Meta, StoryObj } from '@storybook/react'

export default {
  title: 'common/components/Header',
  component: Header,
} as Meta<typeof Header>

type Story = StoryObj<typeof Header>

export const Client: Story = {
  args: {
    isAdmin: false,
  },
}

export const Admin: Story = {
  args: {
    isAdmin: true,
  },
}
