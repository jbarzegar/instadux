export type Actions = {
  [key: string]: string;
};

export type Qualifier = {
  name: string;
  prefix?: boolean;
};

export type Resolver = {
  [key: string]: (state: any, action: { type: string; payload: string }) => any;
};

export type LexiconEntry = {
  name: string;
  initialState: any;
  resolvers?: Resolver;
  qualifiers?: Array<string | Qualifier>;
};
