import React from 'react';

function Home(props) {
  return (
    <div className="home">
        <h2>YouTube PhraseFinder</h2>
        <p><b>
            Search YouTube videos while searching captions within them
        </b></p>
        
        <p>
            For example, <a href="/results?capQuery=malaria&vidQuery=bill%20gates%20philanthropy">click here to search for the word "<b>malaria</b>" across videos about <b>Bill Gates' Philanthropy</b> </a>
        </p>
        <p>
            Or <a href="http://e7cce6c0.ngrok.io/results?capQuery=batter&vidQuery=tesla%20shareholder%20meeting">click here to search for each time <b>batteries</b> are discussed in <b>tesla shareholder meetings</b></a>
        </p>
        <p>
            Or <a href="/results?capQuery=flavor&vidQuery=Guy%20Fieri">click here to search for everytime <b>Guy Fieri</b> says "<b>flavor</b>"</a>
        </p>
    </div>
  )
}
export default Home;