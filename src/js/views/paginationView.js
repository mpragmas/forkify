import view from './view.js';
import icons from 'url:../../img/icons.svg'; //pracel 2

class PaginationView extends view {
  _parentElement = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      console.log(btn);

      if (!btn) return;
      const goToPage = +btn.dataset.goto;

      handler(goToPage);
    });
  }

  _generateMarkup() {
    const curPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );

    //page 1 and thre are other pages
    if (curPage === 1 && numPages > 1) {
      return `
      <button data-goto="${
        curPage + 1
      }" class="btn--inline pagination__btn--next">
            <span>Page ${curPage + 1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
     </button>
      `;
    }
    //last page
    if (curPage === numPages && numPages > 1) {
      return `
      <button data-goto="${
        curPage - 1
      }" class="btn--inline pagination__btn--prev">
          <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
          </svg>
            <span>Page ${curPage - 1}</span>
      </button>
      `;
    }
    //other page
    if (curPage < numPages) {
      return `
     <button data-goto="${
       curPage - 1
     }" class="btn--inline pagination__btn--prev">
         <svg class="search__icon">
             <use href="${icons}#icon-arrow-left"></use>
         </svg>
           <span>Page ${curPage - 1}</span>
     </button>
     <button data-goto="${
       curPage + 1
     }" class="btn--inline pagination__btn--next">
     <span>Page ${curPage + 1}</span>
     <svg class="search__icon">
       <use href="${icons}#icon-arrow-right"></use>
     </svg>
</button>
     `;
    }
    //page 1 and thre are  no other pages
    return '';
  }
}

export default new PaginationView();
