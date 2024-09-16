//  import React from 'react';

import React from "react";

class StarWars extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      character: null,
      loading: true
    };
    this.fetchRandomCharacter = this.fetchRandomCharacter.bind(this); // Bind the function to use `this`
  }

  // Function to fetch a random character by ID
  fetchRandomCharacter() {
    const randomId = Math.floor(Math.random() * 88) + 1; // Random ID between 1 and 88
    this.setState({ loading: true }); // Set loading state while fetching

    fetch(`https://akabab.github.io/starwars-api/api/id/${randomId}.json`)
      .then((response) => response.json())
      .then((data) => {
        this.setState({ character: data, loading: false }); // Store character data in state
      })
      .catch((error) => {
        console.error("Failed to fetch character:", error);
        this.setState({ loading: false });
      });
  }

  // Fetch a random character on initial render
  componentDidMount() {
    this.fetchRandomCharacter();
  }

  render() {
    const { character, loading } = this.state;

    if (loading) {
      return <div>Loading...</div>;
    }

    return (
      <div style={{ textAlign: 'center', margin: '20px' }}>
        <h1>Star Wars Character</h1>
        {character && (
          <div>
            <h2>{character.name}</h2>
            <img
              src={character.image}
              alt={character.name}
              style={{ width: '200px', height: 'auto' }}
            />
            <p>
              <strong>Height:</strong> {character.height}
            </p>
            <p>
              <strong>Homeworld:</strong> {character.homeworld}
            </p>
            <p>
              <strong>Films:</strong> {character.films?.join(", ") || 'N/A'}
            </p>
            <p>
                 <strong>Wiki:</strong> <a href={character.wiki} target="_blank" rel="noopener noreferrer">Visit Wikipedia</a>
            </p>
          </div>
        )}
        <button className='blt' 
          onClick={this.fetchRandomCharacter}
          style={{ marginTop: '20px', padding: '10px 20px' }}
        >
          Fetch Another Character
        </button>
      </div>
    );
  }
}

export default StarWars;


// class FilmesItemRow extends React.Component {
//     render() {
//         return (
//             <li>
//                 <a href={this.props.url}>{this.props.url}</a>
//             </li>
//         );
//     }
// }

// class StarWars extends React.Component {
//     constructor() {
//         super();
//         this.state = {
//             loadedCharacter: false,
//             name: null,
//             height: null,
//             homeworld: null,
//             films: [],
//             image: null,
//             error: null
//         };
//     }

//     getNewCharacter = () => {
//         console.log("Button is clicked");
//         const randomNum = Math.floor(Math.random() * 88) + 1;
//         const url = `https://akabab.github.io/starwars-api/api/id/${randomNum}.json`;

//         fetch(url)
//             .then(response => {
//                 if (!response.ok) {
//                     return Promise.reject('Network response was not ok');
//                 }
//                 return response.json();
//             })
//             .then(data => {
//                 this.setState({
//                     loadedCharacter: true,
//                     name: data.name,
//                     height: data.height,
//                     homeworld: data.homeworld,
//                     films: data.films || [],
//                     image: data.image,
//                     error: null
//                 });
//             })
//             .catch(error => {
//                 this.setState({ error });
//             });
//     };

//     render() {
//         const movies = this.state.films.map((url, index) => {
//             return <FilmesItemRow key={index} url={url} />;
//         });

//         return (
//             <div className="character">
//                 {this.state.error && <p>Error: {this.state.error}</p>}
//                 {this.state.loadedCharacter && (
//                     <div>
//                         <h1>{this.state.name}</h1>
//                         <p>{this.state.height} cm</p>
//                         <p>Homeworld: <a href={this.state.homeworld}>This is my homeworld</a></p>
//                         <ul>{movies}</ul>
//                         <img src={this.state.image} alt="Character" />
//                     </div>
//                 )}
//                 <button className="blt" type="button" onClick={this.getNewCharacter}>
//                     Click Me
//                 </button>
//             </div>
//         );
//     }
// }

// export default StarWars;
// // class FilmesItemRow extends React.Component {
// //     render(){
// //         return(
// //             <li>
// //              <a href={this.props.url}>{this.props.url}</a>
// //             </li>
// //         )
// //     }
// // }

// // class StarWars extends React.Component {
// //     constructor(){
// //         super();

// //         this.state={
// //             loadedCharacter:false,
// //             name:null,
// //             height:null,
// //             homeworld:null,
// //             films:[],
// //         }
// //     }
// //     getNewCharacter(){
// //         console.log("Button is clicked");
// //         const randomNum=Math.round(Math.random()*82);
// //         const url=`https://swapi.dev/api/people/${randomNum}/`;
// //         fetch(url).then(response => response.json()) .then(data => {
// //             this.setState({
// //                 loadedCharacter:true,
// //                 name:data.name,
// //                 height:data.height,
// //                 homeworld:data.homeworld,
// //                 films:data.films
// //             });
// //         })
// //     }
    
// //     render(){
// //         const movies=this.state.films.map((url,index) => {
// //             return <FilmesItemRow key={index} url={url} />
// //         })
// //         return(
// //             <div className="item">
// //                 {
// //                     this.state.loadedCharacter && 
// //                     <div>
// //                         <h1>{this.state.name}</h1>
// //                         <p>{this.state.height} cm</p>
// //                         <p>Homeworld: <a href={this.state.homeworld}>This is Ny homeworld</a> </p>
// //                         <ul>
                        
// //                             {movies}
                            
// //                         </ul>
// //                     </div>
// //                 }
// //                 <button
// //                 type="button" className="blt"
// //                 onClick={() => this.getNewCharacter()}
// //                 >Click Me</button>
// //             </div>
// //         );
// //     }
// // }





// // class Item extends React.Component {
// //     constructor(props){
// //         super(props);   
// //         this.state={
// //             totalRemaining:10
// //     }
// //     }

// //     clickMe(){
// //         console.log(`Button is clicked by ${this.props.name}`);
// //         //alert(`Button is clicked by ${this.props.name}`);
// //         this.setState({totalRemaining:this.state.totalRemaining-1});
// //         if(this.state.totalRemaining==5){
// //             alert("Only 5 clicks are remaining");
// //         }
// //         if(this.state.totalRemaining==0){
// //             alert("Ran out of clicks");
// //         }
// //     }
// //     render() {
// //       return(
// //         <div>
// //             <button onClick={()=>this.clickMe()}>Hello Sexy boy named : {this.props.name}</button>
// //         </div>
// //       )
// //     }
// //   }
// // class Item2 extends React.Component {
// //     constructor(props){
// //         super(props);
// //         this.state={
// //             clicks:0
// //         }
// //     }
// //     clickMe(){
// //         console.log(`Button is clicked by ${this.props.name}`);
// //         //alert(`Button is clicked by ${this.props.name}`);
// //         this.setState({clicks:this.state.clicks+1});
// //     }
// //     render() {
// //       return(
// //         <div>
// //              <button onClick={()=>this.clickMe()}>Testing on click Event : {this.props.name}</button>
// //                 <h1>Clicks on {this.props.name} : {this.state.clicks}</h1>
// //         </div>
// //         )
// //     }
// // }
// // export {Item,Item2,StarWars};
// // //  export default Item;