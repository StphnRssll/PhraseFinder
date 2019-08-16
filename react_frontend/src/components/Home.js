import React from 'react';

function Home(props) {
  return (
    <div className="home">
        <p>
            Search YouTube videos while searching captions within them
        </p>
        <p>
            For example, <a href="/results?capQuery=tesla&vidQuery=electricity%20documentary">click here to search for everytime "<b>Tesla</b>" is mentioned during a documentary on the <b>history of electricity</b></a>
        </p>
        <p>
            Or <a href="/results?capQuery=flavor&vidQuery=Guy%20Fieri">click here to search for everytime <b>Guy Fieri</b> says "<b>flavor</b>"</a>
        </p>
        <p>
            Or <a href="/results?capQuery=malaria&vidQuery=bill%20gates%20philanthropy">click here to search for the word "<b>malaria</b>" across videos about <b>Bill Gates' Philanthropy</b> </a>
        </p>
    </div>
  )
}
export default Home;