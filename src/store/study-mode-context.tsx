import { Reducer, createContext, useReducer } from "react";

interface StudyMode {
  mode: string | null;
  settings: {
    flashcard: {
      isSorted: boolean;
    };
    learn: {
      isShuffer: boolean;
    };
  };
}

interface StudyModeContextProps extends StudyMode {
  assignStudyMode: (mode: any) => void;
  clearStudyMode: () => void;
  // changeShuffled: (newShuffle: boolean, mode: string) => void;
  changeSorted: (isSorted: boolean, mode: string) => void;
  shufferQuiz: (isSorted: boolean, mode: string) => void,
}

export const StudyModeContext = createContext<StudyModeContextProps>({
  mode: null,
  settings: {
    flashcard: {
      isSorted: false,
    },
    learn: {
      isShuffer: false,
    }
  },
  assignStudyMode: () => { },
  clearStudyMode: () => { },
  // changeShuffled: () => {},
  changeSorted: () => { },
  shufferQuiz: () => { },
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
        settings: {
          flashcard: {
            isSorted: false,
          }
        }
      };
    // case "CHANGE_SHUFFLE":
    //   return {
    //     mode: state.mode,
    //   };
    case "CHANGE_SORTED":
      if (state.mode === action.payload.mode) {
        return {
          mode: state.mode,
          settings: {
            flashcard: {
              isSorted: action.payload.isSorted
            }
          }
        }
      }
      return state;
    default:
      return state;
  }
}

export default function StudyModeProvider({ children }: any) {
  const [studyModeState, studyModeDispatch] = useReducer(
    studyModeReducer as Reducer<StudyMode, any>,
    {
      mode: null,
      settings: {
        flashcard: {
          isSorted: false,
        },
        learn: {
          isShuffer: false
        },
      },
    }
  );

  function handleAssignStudyMode(mode: string) {
    studyModeDispatch({
      type: "ASSIGN_STUDY_MODE",
      payload: mode,
    });
  }

  function handleClearStudyMode() {
    studyModeDispatch({
      type: "CLEAR_STUDY_MODE",
    });
  }

  // function handleShuffle(newShuffled: boolean, mode: string) {
  //   studyModeDispatch({
  //     type: "CHANGE_SHUFFLE",
  //     payload: {
  //       newShuffled: newShuffled,
  //       mode: mode,
  //     },
  //   });
  // }

  function handleSorted(isSorted: boolean, mode: string) {
    studyModeDispatch({
      type: "CHANGE_SORTED",
      payload: {
        isSorted: isSorted,
        mode: mode,
      },
    });
  }
  function handleShufferQuiz(isShuffer: boolean, mode: string): void {
    studyModeDispatch({
      type: "SHUFFER_QUIZ",
      payload: {
        isShuffer: isShuffer,
        mode: mode,
      },
    });
  }
  const contextValues: StudyModeContextProps = {
    ...studyModeState,
    assignStudyMode: handleAssignStudyMode,
    clearStudyMode: handleClearStudyMode,
    // changeShuffled: handleShuffle,
    changeSorted: handleSorted,
    shufferQuiz: () => {
      // sufferQuizLocal();
      studyModeDispatch({
        type: "SHUFFER_QUIZ",
        payload: {
          isShuffer: true,
          mode: studyModeState.mode,
        },
      });
    },
  };

  return (
    <StudyModeContext.Provider value={contextValues}>
      {children}
    </StudyModeContext.Provider>
  );
}


