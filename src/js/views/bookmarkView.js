import icons from 'url:../../img/icons.svg'; //pracel 2
import View from './view.js';
import previewView from './previewView.js';
class BookmarkView extends View {
  _parentElement = document.querySelector('.bookmarks__list');

  _errorMessage = 'no bookmarks yet. find a nice recipe and bookmark it;)';
  _message = '';

  addHandlerRender(handler) {
    window.addEventListener('load', handler);
  }
  _generateMarkup() {
    return this._data
      .map(bookmark => previewView.render(bookmark, false))
      .join('');
  }
}

export default new BookmarkView();
