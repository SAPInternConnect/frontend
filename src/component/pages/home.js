import React from 'react';
import UserCard from '../../component/UserCard';
import '../../style/Home.css';
import axios from 'axios';

const db = [
    {
      name: 'Richard Hendricks',
      position: 'software engineer intern',
      url: 'https://d1qxviojg2h5lt.cloudfront.net/images/01DVE8XQTBZY43FEMZQ3Q97XGT/middleditch.valley570.png'
    },
    {
      name: 'Erlich Bachman',
      position: 'software engineer intern',
      url: 'https://pyxis.nymag.com/v1/imgs/de0/2c7/f20dde2c4980b2a4cc88051d8499258b13-30-5-tjmiller.rhorizontal.w700.jpg'
    },
    {
      name: 'Monica Hall',
      position: 'software engineer intern',
      url: 'https://pyxis.nymag.com/v1/imgs/de0/2c7/f20dde2c4980b2a4cc88051d8499258b13-30-5-tjmiller.rhorizontal.w700.jpg'
    },
    {
      name: 'Jared Dunn',
      position: 'software engineer intern',
      url: 'https://assets3.thrillist.com/v1/image/1732495/1584x1056/crop;jpeg_quality=60;progressive.jpg'
    },
    {
      name: 'Dinesh Chugtai',
      position: 'software engineer intern',
      url: 'https://pbs.twimg.com/media/EMR0_AeUwAEthPT?format=jpg&name=medium'
    }
  ]

function Home() {

    const users = db;

    return (<div>
        <h1> this is the home page</h1>
        
        <UserCard users={users}/>

    </div>
    )
}

export default Home