import {UserType} from '../HW8'

type ActionType = { type: 'sort'; payload: 'up' | 'down' } | { type: 'check'; payload: number }

export const homeWorkReducer = (state: UserType[], action: ActionType): any => { // need to fix any
    console.log(state)
    switch (action.type) {
        case 'sort': { // by name
            let copyState = [...state]


            if (action.payload === 'up'){

                return copyState.sort(function (a, b) {
                    if (a.name > b.name) {
                        return 1;
                    }
                    if (a.name < b.name) {
                        return -1;
                    }

                    return 0;
                });
            }
            if (action.payload === 'down'){

                return copyState.sort(function (a, b) {
                    if (a.name > b.name) {
                        return -1;
                    }
                    if (a.name < b.name) {
                        return 1;
                    }

                    return 0;
                });
            }

             return copyState
        }
        case 'check': {


            return state.filter(el => el.age > 18)
        }
        default:
            return state
    }
}
