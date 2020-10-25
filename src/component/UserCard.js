import axios from 'axios';
import React from 'react';
import TinderCard from 'react-tinder-card';
import '../style/UserCard.css';

function UserCard({users}) {

  console.log("User card: ");
  console.log(users);

  const [lastDirection, setLastDirection] = React.useState();

  const swiped = (direction, userNameToAdd) => {
    console.log(direction, userNameToAdd);
    setLastDirection(direction);
    if (direction == 'right') {
      axios.post('/add_friend', {friend: userNameToAdd})
      .then(response => {
        console.log("Post to add_friend successful");
      })
      .catch(err => {
        console.log("Post failed");
        console.error(err);
      })
    }
  }

  const outOfFrame = (name) => {
    console.log(name + ' left the screen!');
  }


  return (
  <div className="userCardSection">
       <h1>Swipe right to connect with other interns!</h1>
        
        <div className='cardContainer'>
            {users.map((character) =>
             <TinderCard 
                className='swipe' 
                key={character.userId} 
                onSwipe={(dir) => swiped(dir, character.username)} 
                onCardLeftScreen={() => outOfFrame(character.firstName)}
                preventSwipe={['up', 'down']}>
                    
                <div style={{ backgroundImage: 'url(' + character.imageUrl + ')' }} className='card'>
              
                <h3 style={{ color: 'white'}}>{`${character.firstName} ${character.lastName}`}</h3>

                </div>
            </TinderCard>
            )}
        </div>
   
            {lastDirection? <h2 className='infoText'>Swiped {lastDirection}</h2> : <h2 className='infoText' />}
        
  </div>
  )
}

export default UserCard