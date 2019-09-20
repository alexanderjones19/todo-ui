export type AsyncState = {
  loading?: boolean;
  error?: boolean;
}

type AsyncStateMap = {
  [key: string]: AsyncState
}

export default AsyncStateMap;