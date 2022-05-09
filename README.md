# SpaceTrading
A game where you buy and sell products while competing against an other AI players. 
I do this project mostly to improve my coding and organization abilities.

## Goals
- Do a project completely TDD
- Try to get better at working organized and structured

## Done
- product lists can be randomly generated and added to a planets market
- a marketvalue can be calculated based on product name
- planets can be generated
- AI players can be generated
- a new "Game" can be created with all the necessary entities
- Everything is fully tested with JEST(>90%)
- CLI Basic game(In progress)
- Buying mechanism
- Player stats are visible
- Selling product on a planet
- complete game implementation in CLI 
- Add min-max range for market numbers
- Move functions between classes so they make more sense  
- Add more non happy-flow tests
- Re-add to market when selling back
- Generate new markets every round
- implement basic AI player behaviour(Rather stupid)
- Add eslint configuration 
- marketvalue calculations should be based on planet markets
- round marketvalue - prio 1
- Add clone function to ship - prio 1
- Diffent planet image using planet name for PNG
- Implement artwork for ship selection
- More logical route names
- Add css to show when a ship is selected
- Add CSS to hover buttons
- PlayerInfo bar improved css(No weird position changes)

## In Progress
- A reactive webapp implementing the game(Basic game implementation is done)
- Create basic html/css interface(CSS needs to be optimized)

## Todo
- css to show when a button is clicked 
- Add mock modules
- Add graphics credits

### Future ideas
- Add scenario mechanism
- Add space sounds
- Planet profiles 
- Animations

## Technical notes

### WebApp color palette
- HEX: #c8c3cc
- HEX: #563f46
- HEX: #8ca3a3
- HEX: #484f4f
- HEX: #e0e2e4

### Frontend
- Build using vue3/vite

### Game logic
- Build using javascript
- Tested using JEST

### Notes
The writting tests are Integration tests which test the complete game logic and should not really be considered Unit Tests.
I will need to do some research how to mock my current code so i can do decent unit testing.
