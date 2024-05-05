import { getAllByRole,fireEvent, render, screen, getByText } from '@testing-library/react';
import Game from './../components/Game';
import React from 'react';

describe('Game Component ',()=>{

    it('should render the board ',() => {

    const {getAllByRole} = render(<Game />);

    expect(getAllByRole('button').length).toBe(10);//There are 10 buttons because one is "Go to the start of the game"
    
    });


    it('should pass the correct value props to Square components', () => {

        const { getAllByRole } = render(<Game />);
        const button = getAllByRole('button')[0];

        fireEvent.click(button);

        expect(button.textContent).toBe("X");

    });

    it('should render O on the second move ', () =>{

        const { getAllByRole } = render(<Game />);
        const button = getAllByRole('button');

        fireEvent.click(button[0]);
        expect(button[0].textContent).toBe("X");

        fireEvent.click(button[1]);
        expect(button[1].textContent).toBe("O");


    });


    it('should be able to change the content of the square only when it is empty ',() =>{

        const { getAllByRole } = render(<Game />);
        const button = getAllByRole('button');

        fireEvent.click(button[0]);

        expect(button[0].textContent).toBe("X");

        fireEvent.click(button[0]);

        expect(button[0].textContent).toBe("X");
    });

    it('should declare "X" as the winner in a row', () => {

        const {getByText} = render(<Game />);
        const squares = screen.getAllByRole("button");
    
        
        fireEvent.click(squares[0]);
        fireEvent.click(squares[1]);
        fireEvent.click(squares[3]);
        fireEvent.click(squares[4]);
        fireEvent.click(squares[6]);
    
 
        expect(getByText("Winner: X")).toBeInTheDocument();

    });


    it('should update Board and moves list when a square is clicked', () => {

        render(<Game />);
        
        const squareElements = screen.getAllByRole('button');

        fireEvent.click(squareElements[0]);
        
        expect(squareElements[0]).toHaveTextContent('X');
        expect(screen.getByText('Next player: O')).toBeInTheDocument();
        
        const movesListItems = screen.getAllByRole('listitem');

        expect(movesListItems.length).toBe(2);
        expect(movesListItems[1]).toHaveTextContent('Go to move #1');

    });


    it('should reset all squares to null when clicked Go to the Game Start ', () => {
        
        const {getAllByRole} = render(<Game />);
        const goToStartButton = screen.getByText('Go to game start');

        fireEvent.click(goToStartButton);
      
        expect(getAllByRole('button', { name: '' })).toHaveLength(9);
        
    });


    it('should be able to navigate back in the history', () => {
        const { getAllByRole, getAllByTestId } =  render(<Game />);;
    
        fireEvent.click(getAllByRole('button', { name: '' })[0]);
        fireEvent.click(getAllByRole('button', { name: '' })[4]);
        fireEvent.click(getAllByRole('button', { name: '' })[1]);
        fireEvent.click(getAllByRole('button', { name: '' })[2]);
    
        const moves = screen.getAllByTestId('moves');
        
        if (moves.length > 1) {
          fireEvent.click(screen.getAllByTestId('moves')[1]);// Check if the element at index 1 exists
        }

    
        expect(getAllByRole('button', { name: '' })[0]).toBeInTheDocument();
        expect(getAllByRole('button', { name: '' })[4]).toBeInTheDocument();
    
    });
});

