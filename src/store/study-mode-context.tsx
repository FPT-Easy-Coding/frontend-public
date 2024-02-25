import { Reducer, createContext, useReducer } from "react";

interface StudyMode {
  mode: string | null;
  flashcardSettings: {
    isShuffled: boolean | null;
    isSorted: boolean | null;
  };
}

interface StudyModeContextProps extends StudyMode {
  assignStudyMode: (studyMode: any) => void;
  clearStudyMode: () => void;
  changeShuffled: (newShuffle: boolean, mode: string) => void;
  changeSorted: (newSorted: boolean, mode: string) => void;
}

export const StudyModeContext = createContext<StudyModeContextProps>({
  mode: null,
  flashcardSettings: {
    isShuffled: null,
    isSorted: null,
  },
  assignStudyMode: () => {},
  clearStudyMode: () => {},
  changeShuffled: () => {},
  changeSorted: () => {},
});

function studyModeReducer(state: StudyMode, action: any) {
  switch (action.type) {
    case "ASSIGN_STUDY_MODE":
      return {
        ...state,
        mode: action.payload,
      };
    case "CLEAR_STUDY_MODE":
      return {
        mode: null,
        flashcardSettings: {
          isShuffled: null,
          isSorted: null,
        },
      };
    case "CHANGE_SHUFFLE":
      return {
        mode: state.mode,
      };
    case "CHANGE_SORTED":
      return {
        mode: state.mode,
      };
    default:
      return state;
  }
}

export default function StudyModeProvider({ children }: any) {
  const [studyModeState, studyModeDispatch] = useReducer(
    studyModeReducer as Reducer<StudyMode, any>,
    {
      mode: null,
      flashcardSettings: {
        isShuffled: null,
        isSorted: null,
      },
    }
  );

  function handleAssignStudyMode(newMode: string) {
    studyModeDispatch({
      type: "ASSIGN_STUDY_MODE",
      payload: newMode,
    });
  }

  function handleClearStudyMode() {
    studyModeDispatch({
      type: "CLEAR_STUDY_MODE",
    });
  }

  function handleShuffle(newShuffled: boolean, mode: string) {
    studyModeDispatch({
      type: "CHANGE_SHUFFLE",
      payload: {
        newShuffled: newShuffled,
        mode: mode,
      },
    });
  }

  function handleSorted(newSorted: boolean, mode: string) {
    studyModeDispatch({
      type: "CHANGE_SORTED",
      payload: {
        newSorted: newSorted,
        mode: mode,
      },
    });
  }

  const contextValues: StudyModeContextProps = {
    ...studyModeState,
    assignStudyMode: handleAssignStudyMode,
    clearStudyMode: handleClearStudyMode,
    changeShuffled: handleShuffle,
    changeSorted: handleSorted,
  };

  return (
    <StudyModeContext.Provider value={contextValues}>
      {children}
    </StudyModeContext.Provider>
  );
}
