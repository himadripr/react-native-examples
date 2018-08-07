import React, {Component} from 'react';
import {connect} from 'react-redux';
import {ListView} from 'react-native';

import ListItem from './ListItem';

class LibraryList extends Component {
    componentWillMount(){
        const ds = new ListView.DataSource(
            {
                rowHasChanged: (r1, r2) => r1 != r2
            }
        );
        this.dataSource = ds.cloneWithRows(this.props.libraries);
    }

    renderRow(library){
       return  <ListItem library = {library}/>;
    } 

    render(){
        return(
            <ListView
                
                dataSource = {this.dataSource}
                renderRow={this.renderRow}
            />
        );
       
    }
}

//purpose is to map the state that we got from the reducer and then map it to the prop attribute of the Library List component.
const mapStateToProps = state => {
     return {libraries: state.libraries}
    
}
 
//connect connects to the provider to get the data from the reducer and display in the app
export default connect(mapStateToProps)(LibraryList); 