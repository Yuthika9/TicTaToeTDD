import { fireEvent, getAllByRole, render, screen } from '@testing-library/react';
import Square from './../components/Square';

describe('Square Component', () => {
  it('should render a button', () => {

    const {getAllByRole} = render(<Square />);

    expect(getAllByRole('button').length).toBeGreaterThan(0);
  });


 it('should be a button that is clickable  ', () => {

    const { getByRole } = render(<Square value="X" />);

    const button = getByRole('button');

    fireEvent.click(button);
    expect(button.textContent).not.toBe('');

 });


 it('should call the onSquareClick prop when clicked', () => {
    
    const mockOnSquareClick = jest.fn();
    const { getByText } = render(<Square value="0" onSquareClick={mockOnSquareClick} />);

    fireEvent.click(getByText('0'));

    expect(mockOnSquareClick).toHaveBeenCalledTimes(1);

    });

});

