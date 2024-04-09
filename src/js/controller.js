import * as model from './model.js';
import { MODAL_CLOSE_SEC } from './config.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';
import bookmarkView from './views/bookmarkView.js';
import addRecipeView from './views/addRecipeView.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { async } from 'regenerator-runtime';

// if (module.hot) {
//   module.hot.accept();
// }
const controlRecipe = async function () {
  try {
    const id = window.location.hash.slice(1);
    //console.log(id);
    if (!id) return;
    recipeView.renderSpinner();

    // 0) updaate resu;ts view to mark selected resu;ts
    resultsView.update(model.getSearchResultsPage());

    //3) updating bookmark view
    bookmarkView.update(model.state.bookmarks);

    // 1) loading recipe
    await model.loadRecipe(id);

    //2) rendering recipe
    // const recipeView = new recipeView(model.state.recipe);
    recipeView.render(model.state.recipe);
  } catch (err) {
    recipeView.renderError();
    console.error(err);
  }
};
const controlSearchResults = async function () {
  try {
    resultsView.renderSpinner();
    // 1)get search query
    const query = searchView.getQuery();
    if (!query) return;

    // 2)load search results
    await model.loadSearchResults(query);

    // 3) render results
    // resultsView.render(model.state.search.results);
    resultsView.render(model.getSearchResultsPage());

    //4 render initital pagination btn
    paginationView.render(model.state.search);
  } catch (err) {
    console.log(err);
  }
};

const controlPagination = function (goToPage) {
  // 3) render results
  // resultsView.render(model.state.search.results);
  resultsView.render(model.getSearchResultsPage(goToPage));

  //4 render new pagination btn
  paginationView.render(model.state.search);
};

const controlServings = function (newServings) {
  //update the recipe srvings (in state)
  model.updateServings(newServings);
  //update the recipe view
  // recipeView.render(model.state.recipe);
  recipeView.update(model.state.recipe); // 302 start
};

const controlAddBookmark = function () {
  //1) add/ remove bookmarks
  if (!model.state.recipe.bookmarked) model.addBookmarks(model.state.recipe);
  else model.deleteBookmarks(model.state.recipe.id);

  //2) update rceipe view
  recipeView.update(model.state.recipe);

  //3)render bookmark
  bookmarkView.render(model.state.bookmarks);
};

const controlBookmarks = function () {
  bookmarkView.render(model.state.bookmarks);
};

const controlAddRecipe = async function (newRecipe) {
  //console.log(newRecipe);
  try {
    //shiw loading spinner
    addRecipeView.renderSpinner();

    //upload new recipe data
    await model.uploadRecipe(newRecipe);
    console.log(model.state.recipe);

    //render recipe
    recipeView.render(model.state.recipe);

    //success meassage
    addRecipeView.renderMessage();

    //render bookmark view
    bookmarkView.render(model.state.bookmarks);

    //change id in url
    window.history.pushState(null, '', `#${model.state.recipe.id}`);
    //window.history.back()

    //close form window
    setTimeout(() => {
      addRecipeView.toggleWindow();
    }, MODAL_CLOSE_SEC * 1000);
  } catch (err) {
    console.log('🔥', err);
    addRecipeView.renderError(err.message);
  }
};
const newFeature = function () {
  console.log('welcome to the application');
};

const init = function () {
  bookmarkView.addHandlerRender(controlBookmarks);
  recipeView.addHandlerRender(controlRecipe);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
  addRecipeView.addHandlerUpload(controlAddRecipe);
  newFeature();
};
init();

console.log('welcome');
