import type { Meta, StoryObj } from '@storybook/react';
import CertificateForm from '../components/certificates/CertificateForm';

const meta = {
  title: 'Certificados/CertificateForm',
  component: CertificateForm,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof CertificateForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    initialData: {
      title: '',
      description: '',
      template_id: '1',
      customFields: {},
    },
    onSubmit: (data) => console.log('Form submitted:', data),
    onCancel: () => console.log('Form cancelled'),
    loading: false,
  },
};

export const Loading: Story = {
  args: {
    ...Default.args,
    loading: true,
  },
};

export const WithInitialData: Story = {
  args: {
    initialData: {
      title: 'Certificado de Conclusão',
      description: 'Certificado de conclusão do curso de React',
      template_id: '1',
      customFields: {
        courseName: 'React Avançado',
        duration: '40 horas',
      },
    },
    onSubmit: (data) => console.log('Form submitted:', data),
    onCancel: () => console.log('Form cancelled'),
    loading: false,
  },
}; 