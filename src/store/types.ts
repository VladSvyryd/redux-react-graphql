export interface Counter {
  counter: number;
  result: Array<Result>;
}
export interface Result {
  id: string;
  value: number;
}
export const INCREMENT = "INCREMENT";
export const STORE_RESULT = "STORE_RESULT";
export const DELETE_RESULT = "DELETE_RESULT";

interface IncrementAction {
  type: typeof INCREMENT;
}

interface StoreResultAction {
  type: typeof STORE_RESULT;
}

interface DeleteResultAction {
  type: typeof DELETE_RESULT;
  payload: string;
}

export type CounterActionTypes =
  | IncrementAction
  | StoreResultAction
  | DeleteResultAction;
