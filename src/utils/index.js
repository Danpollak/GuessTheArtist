import axios from 'axios';
import {get} from 'lodash';
import {POINTS_NO_STRIKES, POINTS_1_STRIKES, POINTS_2_STRIKES, ARTISTS_NAMES} from '../constants';

export const getQuizData = async (numOfRounds) => {
    // choose 3 random artists
    let artists = getRandomElements(ARTISTS_NAMES,numOfRounds);
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
                    quizData.push({albumNames:chosenAlbumsNames, albumArtwork, artist});
                }
            }
            // TODO: Handle no res
        });
        albumRequests.push(albumRequest);
    });
    await Promise.all(albumRequests);
    return quizData;
}

export const getPointsByStrikes = (strikes) => {
    switch(strikes){
        case 0: return POINTS_NO_STRIKES;
        case 1: return POINTS_1_STRIKES;
        case 2: return POINTS_2_STRIKES;
        default: return 1;
    }
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