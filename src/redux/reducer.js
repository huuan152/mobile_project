import BUTTON_COLORS from '../Constants/Utilities/index';

const initState = {
    addPost: {
        address: '',
        postType: 'renting',
        // Loai phong?
        rentalPrice: 0,
        // Dien tich?
        utilities: {
            "wifi": BUTTON_COLORS.colorBasic,
            "toilet": BUTTON_COLORS.colorBasic,
            "motorcycle": BUTTON_COLORS.colorBasic,
            "clock": BUTTON_COLORS.colorBasic,
            "food": BUTTON_COLORS.colorBasic,
            "air-conditioner": BUTTON_COLORS.colorBasic,
            "ice-cream": BUTTON_COLORS.colorBasic,
            "washing-machine": BUTTON_COLORS.colorBasic
        },
        title: '',
        // lien he voi
        // so dien thoai
        description: ''
    },
    // next step 3 man go back 3 man
    locationScreen: false,
    infoScreen: false,
    imagesScreen: false,
    confirmScreen: false
}

const rootReducer = (state = initState, action) => {
    switch(action.type) {
        case 'utilitiesColorUpdate':
            return {
                ...state,
                addPost: {
                    ...state.addPost,
                    utilities: action.payload
                }
            }
        case 'locationScreenUpdate':
            return {
                ...state,
                locationScreen: action.payload
            }
        case 'infoScreenUpdate':
            return {
                ...state,
                infoScreen: action.payload
            }
        case 'imagesScreenUpdate':
            return {
                ...state,
                imagesScreen: action.payload
            }
        case 'confirmScreenUpdate':
            return {
                ...state,
                confirmScreen: action.payload
            }
        case 'locationScreenData':
            return {
                ...state,
                addPost: {
                    ...state.addPost,
                    address: action.payload
                }
            }
        case 'infoScreenData':
            return {
                ...state,
                addPost: {
                    ...state.addPost,
                    postType: action.payload.postType,
                    // Loai phong?
                    rentalPrice: action.payload.rentalPrice,
                    // Dien tich?
                }
            }
        case 'imagesScreenData':
            return {
                ...state,
                imagesScreen: action.payload
            }
        case 'confirmScreenData':
            return {
                ...state,
                addPost: {
                    ...state.addPost,
                    title: action.payload.title,
                    // lien he voi
                    // so dien thoai
                    description: action.payload.description
                }
            }
        case 'updatePostDetail': 
            return {
                ...state,
                addPost: action.payload
            }
        default: 
            return state;
    }
}

export default rootReducer;