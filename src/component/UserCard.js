import React from 'react';
import TinderCard from 'react-tinder-card';
import '../style/UserCard.css';

function UserCard({users}) {

  const [connect, setConnect] = React.useState(false);

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
                key={character.name} 
                onSwipe={(dir) => swiped(dir)} 
                onCardLeftScreen={() => outOfFrame(character.name)}
                preventSwipe={['up', 'down']}>
                    
                <div style={{ backgroundImage: 'url(' + character.url + ')' }} className='card'>
              
                <h3 style={{ color: 'white'}}>{character.name}</h3>

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