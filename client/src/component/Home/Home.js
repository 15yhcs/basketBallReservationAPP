import React, { useState, useEffect } from "react";
import { Container, Grow, Grid, Paper, AppBar, TextField, Button} from '@material-ui/core'
import { getPosts, getPostsBySearch } from "../../actions/posts";
import { useDispatch } from "react-redux";

import { useHistory, useLocation } from "react-router-dom";
import ChipInput from 'material-ui-chip-input'


import useStyles from "./style";
import Posts from '../Posts/Posts';
import Form from '../Form/Form';
import Paginate from "../Pagination/Pagination";


function useQuery(){
    // useLocation returns the Object with the following properties
    /* {
            key: 'ac3df4', // not with HashHistory!
            pathname: '/somewhere',
            search: '?some=search-string',
            hash: '#howdy',
            state: {
                [userDefined]: true
            }
        } */
    
    // const urlParams = new URLSearchParams('abc=foo&def=%5Basf%5D&xyz=5');
    // const entries = urlParams.entries(); //returns an iterator of decoded [key,value] tuples
    // const params = paramsToObject(entries); //{abc:"foo",def:"[asf]",xyz:"5"}
    // urlParams.get("abc"); // "foo"
    return new URLSearchParams(useLocation().search)
}

const Home = () => {
    const [currentId, setCurrentId] = useState(0);
    const dispatch = useDispatch();
    const classes = useStyles()
    const query = useQuery();
    const history = useHistory();
    const page = query.get('page') || 1;
    const searchQuery = query.get('searchQuery');

    const [searchText,setSearchText] = useState("");
    const [tags,setTags] = useState([]);

    const changeSearchText = (e) => {
        setSearchText(e.target.value)
        console.log(searchText);
    }

    const handleKeyPress = (e) => {
        if(e.keyCode === 13){
            searchPost()
        }
    }

    const handleDelete = (tag) => {
        setTags(tags.filter((prev) => prev !== tag))
    }

    const handleAdd = (tag) => {
        setTags([...tags,tag])
    }

    const searchPost  = () => {
        if(searchText.trim()){
            console.log(searchText);
            dispatch(getPostsBySearch({ searchQuery: searchText, tags: tags.join(',') }));
            history.push(`/posts/search?searchQuery=${searchText || 'none'}&tags=${tags.join(',')} `);
            setSearchText('');
            setTags([]);
        }else{
            history.push('/');
        }
    }
    
    // UseEffect hook allows user to simplifies the side effects(change in other content) in components by making 
    // it much easier to run side effect when props/state changes, so we would avoid unnacassary state change. 
    // In this use effect implementation, we do not call the dispatch(getPosts()) if the dispatch contents are unchanged.
    // useEffect(() => {
    //     dispatch(getPosts());
    // },[currentId,dispatch]);
    return(
        <Grow in>
            <Container maxWidth="xl">
                <Grid container justifyContent="space-between" alignItems="stretch" spacing={3} direction="row" className={classes.gridContainer}>
                    <Grid item xs={12} sm={6} md={9}>
                        <Posts setCurrentId={setCurrentId}/>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <AppBar className={classes.appBarSearch} position="static" color="inherit">
                            <TextField name="search" variant="outlined" label="Search Memories" fullWidth value="TEXT" value={searchText} onChange={changeSearchText} onKeyPress={handleKeyPress}/>
                            <ChipInput
                                style = {{margin:"10px 0"}}
                                value = {tags}
                                onAdd = {handleAdd}
                                onDelete = {handleDelete}
                                label="Search Tags"
                                variant="outlined"
                            />
                            <Button className={classes.searchButton} variant="contained" color="primary" onClick={searchPost}>Search</Button>
                        </AppBar>
                        <Form currentId = {currentId} setCurrentId={setCurrentId}/>
                        <Paper  elevation={3} className={classes.pagination}>
                            <Paginate page={page}/>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </Grow>
    )
}

export default Home;