import React from 'react';
import TinderCard from 'react-tinder-card';
import '../style/UserCard.css';

function UserCard({users}) {

  console.log("User card: ");
  console.log(users);

  const [connect, setConnect] = React.useState();

  const swiped = (direction) => {
    console.log(direction);
    if (direction == 'left') {
      setConnect(false);
    } else {
      setConnect(true);
    }
  }

  const outOfFrame = (name) => {
    console.log(name + ' left the screen!')
  }


  return (
  <div className="userCardSection">
       <h1>Swipe right to connect with other interns!</h1>
        
        <div className='cardContainer'>
            {users.map((character) =>
             <TinderCard 
                className='swipe' 
                key={character.userId} 
                onSwipe={(dir) => swiped(dir)} 
                onCardLeftScreen={() => outOfFrame(character.firstName)}
                preventSwipe={['up', 'down']}>
                    
                <div style={{ backgroundImage: 'url(' + character.imageUrl + ')' }} className='card'>
              
                <h3 style={{ color: 'white'}}>{`${character.firstName} ${character.lastName}`}</h3>

                </div>
            </TinderCard>
            )}
        </div>
   
        {connect ? 
        <h2 className='infoText'>Request to connect sent!</h2>
         : 
        <h2 className='infoText'>Maybe next time</h2>}
        
  </div>
  )
}

export default UserCard