import { getAllByRole,fireEvent, render, screen, getByText } from '@testing-library/react';
import Board from './../components/Board';
import React from 'react';

describe('Board Component ',()=>{
    it('should render the board with squares', () => {
      
        const squares = Array(9).fill(null);
      
        render(<Board squares={squares} onPlay={jest.fn()} />);
      
        expect(screen.queryAllByRole('button')).toHaveLength(9);
        
      });
 

      it('should call the onPlay when called ', () => {

        const mockOnPlay = jest.fn();
        const squares = Array(9).fill(null);

        render(<Board squares={squares} onPlay={mockOnPlay} />);
        fireEvent.click(screen.getAllByRole('button', { name: '' })[0]);

        expect(mockOnPlay).toHaveBeenCalledTimes(1);

      });

});