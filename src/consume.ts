export interface Observer {
  set(value: any): any;
  get(): any;
}

export interface Abort {
  abort: boolean;
}

export class Cycle<R> extends Promise<R> {
  process: Abort = { abort: false };
  abort() {
    this.process.abort = true;
  }
}

const isGenerator = (value: any) =>
  value && typeof value === "object" && Symbol.asyncIterator in value;

export function consume(
  result: any,
  { set, get }: Observer,
  process: Abort = { abort: false }
): any {
  if (process.abort) return;
  const typeAsync = isGenerator(result) ? 1 : result instanceof Promise ? 2 : 0;
  if (typeAsync) {
    const cycle = new Cycle(async (resolve, reject) => {
      try {
        if (typeAsync === 2) {
          const value = await result;
          if (process.abort) return;
          set(value);
        } else {
          const { value, done } = await result.next(get());

          if (process.abort) return;

          if (isGenerator(value)) {
            await consume(value, { set, get }, process);
          } else if (value != null) {
            set(value);
          }

          if (process.abort) return;

          if (!done) {
            await consume(result, { set, get }, process);
          }
        }

        resolve(get());
      } catch (e) {
        reject(e);
      }
    });

    cycle.process = process;

    return cycle;
  } else {
    if (typeof result === "function") {
      return consume(get(), { set, get }, process);
    } else {
      return set(result);
    }
  }
}
