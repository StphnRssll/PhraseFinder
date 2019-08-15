import React from 'react';

function Home(props) {
  return (
    <div className="home">
        <p>
            Search YouTube videos while searching captions within them
        </p>
        <p>
            For example, <a href="/results?capQuery=trump&vidQuery=congressional%20hearing">click here to search for everytime "Trump" is said during Robert Muller's congressional hearing</a>
        </p>
        <p>
            Or <a href="/results?capQuery=flavor&vidQuery=Guy%20Fieri">click here to search for everytime Guy Fieri says "flavor"</a>
        </p>
    </div>
  )
}
export default Home;