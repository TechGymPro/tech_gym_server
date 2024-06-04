interface TrainingDivisionExercise {
    trainingDivisionId: number;
    trainingDivisionLetter: string;
    trainingDivisionName: string;
    newDivision: boolean;
    idsExercise: number[];
  }
  
  interface TrainingDivision {
    training_division_id: number;
    training_id: number;
    training_serie_name: string;
    deleted_date: null | string;
    updated_date: string;
    created_date: string;
    letter: string;
    training_division_exercise: TrainingDivisionExercise[];
  }
  
  interface TrainingDivisionOption {
    training_division__option_id: number;
    gym_id: number;
    training_division_name: string;
    deleted_date: null | string;
    updated_date: string;
    created_date: string;
    num_options: number;
  }
  
  export interface TrainingData {
    training_id: number |null;
    gym_id: number;
    training_division_option_id: number;
    objective_id: number;
    training_name: string;
    deleted_date: null | string;
    updated_date: string;
    created_date: string;
    training_division: TrainingDivision[];
    training_division_option: TrainingDivisionOption;
    trainingDivisionExercise: TrainingDivisionExercise[]|null;
  }
  export interface Exercise {
    exercise_name: string
    exercise_url: string
    exercise_qtd_serie: number
    exercise_qtd_rep: number
    exercise_obs: string 
    exercise_rest_time: number
    type:string
  }