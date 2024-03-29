import React, { useState } from 'react';
import useStyles from "./style";
import { Card, CardActions, CardContent, CardMedia, Button, Typography, ButtonBase } from '@material-ui/core';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import moment from 'moment';
import { deletePost, likePost } from '../../../actions/posts';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

const UserPost = ({ post, setCurrentId }) => {
    
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const user = JSON.parse(localStorage.getItem("profile"));
    
    const initLikestatus = post.likeCount.find((item) => item === (user?.result?._id || user?.result?.googleId));
    const [likeStatus, setLikeStatus] = useState(initLikestatus ? true : false)
    const cardDetails = () => {
        history.push(`/posts/${post._id}`)
    }
    
    const clickLike = () => {
        dispatch(likePost(post._id));
        setLikeStatus((prev) => !prev);
    }
    return(
        <Card className={classes.card}>
            <CardMedia className={classes.media} image={post.selectedFile} title={post.title} />
            <div className={classes.overlay}>
                <Typography variant="h6">{post.name}</Typography>
                <Typography variant="body2">{moment(post.createdAt).fromNow()}</Typography>
            </div>
            <div className={classes.overlay2} style={{zIndex : '999'}}>
                <Button style={{ color: 'white', zIndex : '999' }} size="small" onClick={() => setCurrentId(post._id)} disabled={(post.creator === user?.result?._id || post.creator === user?.result?.googleId) ? false : true}>
                    {(post.creator === user?.result?._id || post.creator === user?.result?.googleId) && <MoreHorizIcon fontSize="medium" />}
                </Button>
            </div>
            <ButtonBase component="span" className={classes.cardAction} onClick={cardDetails}>
                <div className={classes.details}>
                    <Typography variant="body2" color="textSecondary">{post.tags.map((tag) => `# ${tag} `)}</Typography>
                </div>

                <Typography className={classes.title} variant="h5" gutterBottom>{post.title}</Typography>

                <CardContent>
                    <Typography variant="body2" color="textSecondary" component="p">{post.message}</Typography>
                </CardContent>
            </ButtonBase>
            <CardActions className={classes.cardActions} disableSpacing>
                <Button size="small" color="primary" onClick={() => dispatch(deletePost(post._id))} disabled={(post.creator === user?.result?._id || post.creator === user?.result?.googleId) ? false : true}>
                    <DeleteIcon fontSize="small" />
                    delete
                </Button>
                <Button disabled={!user?.result} size="small" color="primary" onClick={clickLike}>
                    <ThumbUpAltIcon fontSize="small" /> {likeStatus ? "Dislike" : "like"} {post.likeCount.length}
                </Button>
            </CardActions>

        </Card>
    )
}

export default UserPost;