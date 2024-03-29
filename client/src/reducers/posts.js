import { OPEN, CLOSE, FETCH_BY_SEARCH, FETCH_ALL, CREATE, UPDATE, DELETE, LIKEPOST, START_LOADING, END_LOADING, FETCH_POST, SETLOCATION } from "../constants/actionType";

export default (state = { isLoading: true, posts: [], isOpen: false }, action) => {
    switch (action.type) {
        case START_LOADING:
            return { ...state, isLoading: true };
        case END_LOADING:
            return { ...state, isLoading: false };

        case OPEN:
            return {...state, isOpen: true};
        case CLOSE:
            return {...state, isOpen: false};

        case FETCH_ALL:

            return {
                ...state,
                posts: action.payload.data,
                currentPage: action.payload.currentPage,
                numberOfPages: action.payload.numberOfPages
            };

        case FETCH_POST:

            return {
                ...state,
                post: action.payload
            };

        case FETCH_BY_SEARCH:

            return {
                ...state,
                posts: action.payload,
            };

        case CREATE:


            return { ...state, posts: [...state.posts, action.payload] };

        case UPDATE:

            return { ...state, posts: state.posts.map((post) => post._id === action.payload._id ? action.payload : post) };

        case DELETE:

            return { ...state, posts: state.posts.filter((post) => post._id !== action.payload) };

        case LIKEPOST:

            return { ...state, posts: state.posts.map((post) => post._id === action.payload._id ? action.payload : post) };
        
        case SETLOCATION:

            return {...state}
        default:
            return state;
    }
}