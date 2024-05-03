
import { render, screen, fireEvent } from '@testing-library/react';
import ImageUploadComponent from './ImageUploadComponent';

describe('ImageUploadComponent', () => {
  test('renders upload button', () => {
    const mockOnUpload = jest.fn();
    render(<ImageUploadComponent onUpload={mockOnUpload} />);
    expect(screen.getByRole('button', { name: 'Upload' })).toBeInTheDocument();
  });

  test('handles image upload', () => {
    const mockOnUpload = jest.fn();
    render(<ImageUploadComponent onUpload={mockOnUpload} />);
    const file = new File(['dummy content'], 'example.png', { type: 'image/png' });
    fireEvent.change(screen.getByType('file'), { target: { files: [file] } });
    fireEvent.click(screen.getByText('Upload'));
    expect(mockOnUpload).toHaveBeenCalledWith('example.png');
  });
});
