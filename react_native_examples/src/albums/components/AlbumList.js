import React, {Component} from 'react';
import { Text, ScrollView} from 'react-native';
import axios from 'axios';
import AlbumDetail from './AlbumDetail'

const url = 'http://rallycoding.herokuapp.com/api/music_albums'

class AlbumList extends Component {
    state = {albums: []};

    componentWillMount(){
        console.log('component willlll mount')
        axios.get('http://rallycoding.herokuapp.com/api/music_albums')
            .then(response => this.setState({albums: response.data}))
        // fetch(url)
        //     .then((response) => response.json())
        //     .then((responseJson) => this.setState({albums: responseJson}))
    
    }

    renderAlbums(){
        return (
            this.state.albums.map(album => 
                <AlbumDetail key={album.title} data = {album}/>)
        )
    }

    render(){
        console.log(this.state);
        return (
            <ScrollView>
                {this.renderAlbums()}
            </ScrollView>
        );
    }
    
}

export default AlbumList