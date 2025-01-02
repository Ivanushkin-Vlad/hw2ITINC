const initState = {
    isLoading: false,
}
type initStateType = typeof initState;

export const loadingReducer = (state:initStateType = initState, action: ActionType): initStateType => { // fix any
    switch (action.type) {
        // пишет студент  // need to fix

        case 'CHANGE_LOADING':
            debugger
            return {...state, isLoading: action.isLoading};
        default:
            return state
    }
}

type LoadingActionType = {
    type: 'CHANGE_LOADING'
    isLoading: boolean
}
type ActionType = LoadingActionType
export const loadingAC = (isLoading: boolean): LoadingActionType => ({
    type: 'CHANGE_LOADING',
    isLoading,
})
