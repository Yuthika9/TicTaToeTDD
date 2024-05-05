describe("Tic Tac Toe game", () => {

  it('should render a board ', () => {

		cy.visit("http://localhost:3000");

		cy.get('[data-testid="board"]').should('exist');

	});

  it("should render the board with 9 squares ", () => {

    cy.visit("http://localhost:3000");
    const expectedCount = 9;

    cy.get('.square').should('have.length',expectedCount);

  });

  it("should allow to make moves" , () => {

    cy.visit("http://localhost:3000");

    cy.get('.square').first().click();

    cy.get('.square').first().should('have.text', 'X');

  })

  it("should not allow to make move in already filled square ", () =>{

    cy.visit("http://localhost:3000");

    // Simulate moves
    cy.get('.board-row').eq(0).children().eq(0).click(); // Selecting the first square
    cy.get('.board-row').eq(0).children().eq(0).should('have.text', 'X');

    //Try to move to the same square once more
    cy.get('.board-row').eq(0).children().eq(0).click();
    cy.get('.board-row').eq(0).children().eq(0).should('have.text', 'X');
     
    
  });

  it("should display the next player correctly ", () =>{
    cy.visit("http://localhost:3000");

    // Check the initial status
    cy.get('.status').should('contain.text', 'Next player: X');

    //We assume that the first player is X then the second be O
    cy.get('.board-row').eq(0).children().eq(0).click(); 
    cy.get('.status').should('contain.text', 'Next player: O');

    // Simulate a move by player O
    cy.get('.board-row').eq(1).children().eq(1).click(); 
    cy.get('.status').should('contain.text', 'Next player: X');
  });

  it("Should display the winner correctly ",()=>{
    cy.visit("http://localhost:3000");

     // If (X wins)
     cy.get('.board-row').eq(0).children().eq(0).click(); // X
     cy.get('.board-row').eq(1).children().eq(0).click(); // O
     cy.get('.board-row').eq(0).children().eq(1).click(); // X
     cy.get('.board-row').eq(1).children().eq(1).click(); // O
     cy.get('.board-row').eq(0).children().eq(2).click(); // X
 
     // Check if the correct winner is displayed
     cy.get('.status').should('contain.text', 'Winner: X');
  });

  it("should display and allow time travel ",()=>{
    cy.visit("http://localhost:3000");

    // Simulate multiple moves
    cy.get('.board-row').eq(0).children().eq(0).click(); // X
    cy.get('.board-row').eq(1).children().eq(0).click(); // O
    cy.get('.board-row').eq(0).children().eq(1).click(); // X
    cy.get('.board-row').eq(1).children().eq(1).click(); // O
    cy.get('.board-row').eq(0).children().eq(2).click(); // X

   // Find and click the button to go to the start of the game
   cy.contains('Go to game start').click();

   // Check if the correct board state is displayed after going back to the start of the game
   cy.get('.status').should('contain.text', 'Next player: X');
   cy.get('.board-row button').each(($button) => {
     cy.wrap($button).should('have.text', ''); // All squares should be empty
   });

   // Find and click the button to go to move #1
   cy.contains('Go to move #1').click();

   // Check if the correct board state is displayed after going to move #1
   cy.get('.status').should('contain.text', 'Next player: O');
   cy.get('.board-row').eq(0).children().eq(0).should('contain.text', 'X');

  });
});