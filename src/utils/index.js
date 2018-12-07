import {ARTISTS_NAMES} from '../constants';
import axios from 'axios';
import {get} from 'lodash';

export const startGame = () => {
    // choose 3 random artists
    let artists = getRandomElements(ARTISTS_NAMES,5);
    let quizData = [];
    let albumRequests = [];
    
    artists.forEach((artist) => {
        const queryURL = getQueryURL(artist);
        const albumRequest = axios.get(queryURL).then((res) => {
            if(res)
            {
                //TODO: Handle artist with less than 3 albums / no albums
                const albums = get(res, 'data.results',null);
                if(albums){
                    const chosenAlbums = getRandomElements(albums, 3);
                    const albumArtwork = chosenAlbums[0].artworkUrl60;
                    const chosenAlbumsNames = chosenAlbums.map((album) =>  album.collectionName);
                    quizData.push({albumNames:chosenAlbumsNames, albumArtwork});
                }
            }
            // TODO: Handle no res
        });
        albumRequests.push(albumRequest);
    });
    Promise.all(albumRequests).then(() => {
        console.log(quizData);
        //TODO: send event that game can start
    });
}

function getQueryURL (artist) {
    return `https://itunes.apple.com/search?term=${artist}&entity=album`;
}

/** Generic get n random elements from array */
function getRandomElements (arr, n) {
    if(arr.length < n) {
        return null;
    }
    let randArr = arr.slice().sort( function() { return 0.5 - Math.random() } );
    return randArr.slice(0,n);
};