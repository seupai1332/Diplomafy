import type { Meta, StoryObj } from '@storybook/react';
import LoadingSpinner from '../components/common/LoadingSpinner';

const meta = {
  title: 'Componentes/LoadingSpinner',
  component: LoadingSpinner,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Tamanho do spinner',
    },
    fullScreen: {
      control: 'boolean',
      description: 'Se o spinner deve ocupar a tela inteira',
    },
  },
} satisfies Meta<typeof LoadingSpinner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Small: Story = {
  args: {
    size: 'sm',
    fullScreen: false,
  },
};

export const Medium: Story = {
  args: {
    size: 'md',
    fullScreen: false,
  },
};

export const Large: Story = {
  args: {
    size: 'lg',
    fullScreen: false,
  },
};

export const FullScreen: Story = {
  args: {
    size: 'md',
    fullScreen: true,
  },
  parameters: {
    layout: 'fullscreen',
  },
}; 