import normalizeAction from '../__core__/helpers/action';
import getList from './api';

/* action types */
const ACTIONS = normalizeAction('@gnome', [
  'FETCHING',
  'ERROR',
  'FETCH_COMPLETE',
  'FETCH_SEARCH_COMPLETE',
  'FETCH_FILTER_COMPLETE',
  'CLEAR_SEARCH',
  'CLEAR_FILTER',
  'FETCH_DETAILS_COMPLETE'
]);

function isFetching() {
  return {
    type: ACTIONS.FETCHING
  }
}

function isError(message) {
  return {
    type: ACTIONS.ERROR,
    errorMessage: message
  }
}

function fetchComplete(value) {
  return {
    type: ACTIONS.FETCH_COMPLETE,
    value
  }
}

function clearSearch() {
  return {
    type: ACTIONS.CLEAR_SEARCH
  }
}

function clearFilter(value) {
  return {
    type: ACTIONS.CLEAR_FILTER,
    range: value.range,
    professions: value.professions
  }
}

function fetchSearchComplete(value = []) {
  return {
    type: ACTIONS.FETCH_SEARCH_COMPLETE,
    search: value
  }
}

function fetchByFilterComplete(list, settings) {
  return {
    type: ACTIONS.FETCH_FILTER_COMPLETE,
    search: list,
    filter: settings
  }
}

function fetchDetailsComplete(details) {
  return {
    type: ACTIONS.FETCH_DETAILS_COMPLETE,
    details
  }
}

const mapAgeRange = (list) => {
  const minAge = list.reduce((min, gnome) => (gnome.age < min ? gnome.age : min), list[0].age);
  const maxAge = list.reduce((max, gnome) => (gnome.age > max ? gnome.age : max), list[0].age);

  return {
    min: minAge,
    max: maxAge
  }
}

const mapProfessions = (list) => {
  const professions = list.map(item => item.professions);
  const [ uniq ] = [...new Set(professions.flat())];
  const result = Array.from(uniq);

  return result.map((item) => {
    return {
      name: item.trim(),
      checked: false
    }
  })
}

const filterByName = (search, value) => value.includes(search);

const fetchList = () => async (dispatch, getState) => {

  const state = getState();

  if(state.gnome.list.length) {
    return;
  }

  dispatch(isFetching());

  try
  {
    const response = await getList();
    const { Brastlewark } = response;

    const range = mapAgeRange(Brastlewark);
    const professions = mapProfessions(Brastlewark);

    dispatch(fetchComplete({
      list: Brastlewark,
      filter: {
        professions,
        minAge: range.min,
        maxAge: range.max,
        range
      }
    }));
  }
  catch (error) {
    dispatch(isError(error.message));
    throw new Error(error.message);
  }
}

const fetchSearchByName = search => (dispatch, getState) => {

  if(!search) {
    return;
  }

  const { gnome } = getState();

  const listFiltered = gnome.search.length ? gnome.search : gnome.list;
  const result = listFiltered.filter(item => filterByName(search, item.name));

  dispatch(fetchSearchComplete(result));
}

const fetchByFilter = filter => (dispatch, getState) => {
  dispatch(isFetching());

  const { gnome } = getState();

  const professions = [];
  let listFiltered = gnome.search.length ? gnome.search : gnome.list;

  filter.professions.forEach((item) => {
    if(item.checked) {
      professions.push(item.name);
    }
  });

  if(professions.length) {
    listFiltered = listFiltered.filter(item => item.professions.some(name => professions.includes(name)));
  }

  const filterByAge = age => age >= filter.range.min && age <= filter.range.max;
  listFiltered = listFiltered.filter(item => filterByAge(item.age));

  const filterSettings = {
    professions: filter.professions,
    range: filter.range
  };

  dispatch(
    fetchByFilterComplete(listFiltered, filterSettings)
  )
}


const getDetails = (id, list = []) => list.find(item => item.id === parseInt(id));

const fetchDetails = id => (dispatch, getState) => {

  if(!id) {
    return;
  }

  const state = getState();
  if(state.gnome.list.length) {
    const result = getDetails(id, state.gnome.list);
    dispatch(fetchDetailsComplete(result));
    return;
  }

  dispatch(fetchList()).then(() => {
    const currentState = getState();
    const result = getDetails(id, currentState.gnome.list);
    dispatch(fetchDetailsComplete(result));
  });
}

export {
  isFetching,
  isError,
  fetchComplete,
  fetchList,
  fetchSearchByName,
  fetchByFilter,
  clearSearch,
  clearFilter,
  fetchDetails,
  ACTIONS
};
