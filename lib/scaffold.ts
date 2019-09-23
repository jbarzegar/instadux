import { createAction, handleActions } from "redux-actions";

import { asyncResolvers, commonResolvers, commonQualifiers } from "./resolvers";
import {
  createAsyncResolvers,
  createDefaultReducers,
  convertToActionName
} from "./helpers";

import { LexiconEntry, Actions } from "./types";
import { Reducer, ReducersMapObject, ActionCreator } from "redux";

const createReducerAction = (name: string) => (acc: Object, name: string) => {
  const create = (actionName: string) =>
    createAction(convertToActionName(name, actionName));

  acc[name] = create(name);

  return acc;
};

type MakeActions = {
  name?: string;
  verbs?: string[];
  resolvers?: Object;
  qualifiers?: string[];
};

const makeActions = ({ name, resolvers = {}, verbs }: MakeActions) => {
  const resolverNames = Object.keys(resolvers);
  const toMake = [...verbs, ...resolverNames];

  return toMake.reduce(createReducerAction(name), {});
};

const mapCustomReducer = (resolvers: Object, name: string) =>
  Object.entries(resolvers).reduce((obj, [k, v]) => {
    obj[convertToActionName(name, k)] = v;

    return obj;
  }, {});

type ReducerParam = {
  name: string;
  initialState: Object;
  resolvers: Object;
  actions: Actions;
};
const makeReducer = ({
  name,
  initialState = { loading: false, error: false },
  resolvers = {},
  actions
}: ReducerParam): Object =>
  handleActions(
    {
      ...createDefaultReducers(actions),
      ...mapCustomReducer(resolvers, name)
    },
    initialState
  );

type GeneratedLexicon = {
  actions: Object;
  reducers: Object;
};

type Options = {
  qualifiers?: Array<string>;
};

type ScaffoldReturn = {
  actions: Actions;
  reducers: ReducersMapObject<unknown>;
};

export default (lexicon: Array<LexiconEntry>) => {
  if (lexicon.length === 0) {
    console.error("You have no entries in your lexicon");
  }

  // const qualifiers = commonQualifiers;

  return lexicon.reduce(
    // Generate actions and reducers
    (generated: GeneratedLexicon, entry: LexiconEntry): ScaffoldReturn => {
      const verbs = [
        ...commonResolvers
        // ...createAsyncResolvers(asyncResolvers, qualifiers)
      ];

      const actions = makeActions({
        name: entry.name,
        verbs,
        resolvers: entry.resolvers
      });

      generated.actions[entry.name] = actions;

      generated.reducers[entry.name] = makeReducer({
        actions,
        name: entry.initialState,
        resolvers: entry.resolvers,
        initialState: entry.initialState
      });

      return generated;
    },
    { actions: {}, reducers: {} }
  );
};
