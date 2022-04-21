export interface State {
  time: Date;
}

export async function* clock(state: State) {
  yield {
    ...state,
    time: new Date(),
  };
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return clock;
}
