//hover на оверлее

document.addEventListener("DOMContentLoaded", function () {
  // Находим все элементы heading
  const headings = document.querySelectorAll(".header__overlay-rubric-heading");

  headings.forEach((heading) => {
    // Находим дочерние элементы title и line
    const title = heading.querySelector(".header__overlay-rubric-title");
    const line = heading.querySelector(".header__overlay-rubric-line");
    // Добавляем обработчики событий
    heading.addEventListener("mouseenter", () => {
      title.classList.add("hovered");
      line.classList.add("hovered");
    });

    heading.addEventListener("mouseleave", () => {
      title.classList.remove("hovered");
      line.classList.remove("hovered");
    });
  });
});

//переключение карточек стилей

document.addEventListener('DOMContentLoaded', function() {
  // Находим все элементы карточек
  const items = document.querySelectorAll('.stylistics__item');

  // Функция для закрытия всех открытых карточек
  function closeAllCards() {
    items.forEach(item => {
      const openedCard = item.querySelector('.style-card__opened');
      const unopenedCard = item.querySelector('.style-card__unopened, .style-card:not(.style-card__opened)');

      if (openedCard && unopenedCard) {
        openedCard.classList.add('visually-hidden');
        unopenedCard.classList.remove('visually-hidden');
      }
    });
  }

  // Функция для открытия конкретной карточки
  function openCard(item) {
    const openedCard = item.querySelector('.style-card__opened');
    const unopenedCard = item.querySelector('.style-card__unopened');

    if (openedCard && unopenedCard) {
      openedCard.classList.remove('visually-hidden');
      unopenedCard.classList.add('visually-hidden');
    }
  }

  // Добавляем обработчики событий на все карточки
  items.forEach(item => {
    const unopenedCard = item.querySelector('.style-card__unopened');

    if (unopenedCard) {
      unopenedCard.addEventListener('click', function() {
        closeAllCards();
        openCard(item);
      });
    }
  });

  // Изначально открываем первую карточку
  if (items.length > 0) {
    const firstItemOpenedCard = items[0].querySelector('.style-card__opened');
    const firstItemUnopenedCard = items[0].querySelector('.style-card__unopened');

    if (firstItemOpenedCard && firstItemUnopenedCard) {
      firstItemOpenedCard.classList.remove('visually-hidden');
      firstItemUnopenedCard.classList.add('visually-hidden');
    }
  }
});

// выбор ячейки таблицы
document.addEventListener('DOMContentLoaded', function() {
  const tableFirstCells = document.querySelectorAll('.table__first');
  const tableSecondCells = document.querySelectorAll('.table__second');
  const images = document.querySelectorAll('.table__item-image');
  const subtitles = document.querySelectorAll('.table__item-sub');

  // Проверяем, мобильное ли устройство
  function isMobile() {
    return window.innerWidth <= 768; // Измените значение по необходимости
  }

  // Функция для мобильного вида - активирует все изображения
  function activateMobileView() {
    images.forEach(img => {
      if (!img.src.includes('-active')) {
        img.src = img.src.replace('.png', '-active.png');
      }
      img.classList.add('is-active');
    });

    subtitles.forEach(sub => {
      sub.classList.remove('visually-hidden');
    });
  }

  // Функция активации ячейки таблицы
  function activateTableCell(cell) {
    // Удаляем активные классы у всех ячеек
    document.querySelectorAll('.table__first, .table__second').forEach(cell => {
      cell.classList.remove('is-active');
    });

    // Добавляем активный класс выбранной ячейке
    cell.classList.add('is-active');

    // Находим и активируем соответствующую ячейку
    const cellClasses = cell.className.split(' ');
    let cellNumber;

    if (cell.classList.contains('table__first')) {
      const firstClass = cellClasses.find(cls => cls.startsWith('table__first--'));
      if (firstClass) {
        cellNumber = firstClass.split('--')[1];
        const correspondingCell = document.querySelector(`.table__second--${cellNumber}`);
        if (correspondingCell) {
          correspondingCell.classList.add('is-active');
        }
      }
    } else if (cell.classList.contains('table__second')) {
      const secondClass = cellClasses.find(cls => cls.startsWith('table__second--'));
      if (secondClass) {
        cellNumber = secondClass.split('--')[1];
        const correspondingCell = document.querySelector(`.table__first--${cellNumber}`);
        if (correspondingCell) {
          correspondingCell.classList.add('is-active');
        }
      }
    }
  }

  // Функция активации изображения
  function activateImage(size) {
    // Деактивируем все изображения и скрываем подписи
    images.forEach(img => {
      img.classList.remove('is-active');
      // Восстанавливаем исходный src (убираем -active)
      if (img.src.includes('-active')) {
        img.src = img.src.replace('-active.png', '.png');
      }
    });

    subtitles.forEach(sub => sub.classList.add('visually-hidden'));

    // Активируем соответствующее изображение
    const targetImage = Array.from(images).find(img => img.alt === size);
    if (targetImage) {
      targetImage.classList.add('is-active');
      // Меняем src на активную версию
      targetImage.src = targetImage.src.replace('.png', '-active.png');

      // Находим соответствующую подпись
      const parentItem = targetImage.closest('.table__item');
      const targetSubtitle = parentItem.querySelector('.table__item-sub');
      if (targetSubtitle) {
        targetSubtitle.classList.remove('visually-hidden');
      }
    }
  }

  // Обработчики событий для ячеек таблицы
  function setupTableHandlers() {
    if (isMobile()) return; // Не вешаем обработчики на мобильных устройствах

    tableFirstCells.forEach(cell => {
      cell.addEventListener('mouseover', () => {
        const size = cell.textContent.trim();
        activateTableCell(cell);
        activateImage(size);
      });
    });

    tableSecondCells.forEach(cell => {
      cell.addEventListener('mouseover', () => {
        // Для table__second получаем размер из соответствующей ячейки table__first
        const cellClasses = cell.className.split(' ');
        const secondClass = cellClasses.find(cls => cls.startsWith('table__second--'));
        if (secondClass) {
          const cellNumber = secondClass.split('--')[1];
          const correspondingCell = document.querySelector(`.table__first--${cellNumber}`);
          if (correspondingCell) {
            const size = correspondingCell.textContent.trim();
            activateTableCell(cell);
            activateImage(size);
          }
        }
      });
    });
  }

  // Инициализация
  if (isMobile()) {
    activateMobileView();
  } else {
    // Автоматическая активация первого элемента при загрузке
    if (tableFirstCells.length > 0) {
      const firstCell = tableFirstCells[0];
      const firstSize = firstCell.textContent.trim();
      activateTableCell(firstCell);
      activateImage(firstSize);
    }
    setupTableHandlers();
  }

  // Обработчик изменения размера окна
  window.addEventListener('resize', function() {
    if (isMobile()) {
      activateMobileView();
    } else {
      // Переинициализируем десктопный вид
      images.forEach(img => {
        if (img.src.includes('-active')) {
          img.src = img.src.replace('-active.png', '.png');
        }
      });

      // Активируем первую ячейку
      if (tableFirstCells.length > 0) {
        const firstCell = tableFirstCells[0];
        const firstSize = firstCell.textContent.trim();
        activateTableCell(firstCell);
        activateImage(firstSize);
      }

      setupTableHandlers();
    }
  });
});
//кнопка каталога и всплывающее меню

document.addEventListener("DOMContentLoaded", function () {
  const catalogButton = document.querySelector(".header__catalog");
  const overlay = document.querySelector(".header__overlay");
  let overlayTimer;
  let isOverlayHovered = false;

  // Функция для показа оверлея
  function showOverlay() {
    clearTimeout(overlayTimer);
    overlay.classList.remove("visually-hidden");
    isOverlayHovered = false;
  }

  // Функция для скрытия оверлея с задержкой
  function hideOverlayWithDelay() {
    clearTimeout(overlayTimer);
    overlayTimer = setTimeout(() => {
      if (!isOverlayHovered) {
        overlay.classList.add("visually-hidden");
      }
    }, 1000);
  }

  // Функция для немедленного скрытия оверлея
  function hideOverlay() {
    clearTimeout(overlayTimer);
    overlay.classList.add("visually-hidden");
  }

  // Обработчики для кнопки каталога
  if (catalogButton) {
    catalogButton.addEventListener("mouseenter", showOverlay);
    catalogButton.addEventListener("mouseleave", hideOverlayWithDelay);

    // Для мобильных устройств (если нужно)
    catalogButton.addEventListener("touchstart", function (e) {
      e.preventDefault();
      if (overlay.classList.contains("visually-hidden")) {
        showOverlay();
      } else {
        hideOverlay();
      }
    });
  }

  // Обработчики для оверлея
  if (overlay) {
    overlay.addEventListener("mouseenter", function () {
      isOverlayHovered = true;
      clearTimeout(overlayTimer);
    });

    overlay.addEventListener("mouseleave", function () {
      isOverlayHovered = false;
      hideOverlayWithDelay();
    });
  }

  // Скрывать оверлей при клике outside
  document.addEventListener("click", function (e) {
    if (
      !overlay.classList.contains("visually-hidden") &&
      !overlay.contains(e.target) &&
      !catalogButton.contains(e.target)
    ) {
      hideOverlay();
    }
  });
});

document.addEventListener('DOMContentLoaded', function() {
  // Получаем все ячейки таблицы, кроме заголовков
  const sizeCells = document.querySelectorAll('.table__first');
  const priceCells = document.querySelectorAll('.table__second');

  // Получаем все картинки
  const images = document.querySelectorAll('.table__item-image');

  // Получаем все подписи
  const subs = document.querySelectorAll('.table__item-sub');

  // Добавляем обработчики клика на ячейки с размерами
  sizeCells.forEach(cell => {
    cell.addEventListener('click', function() {
      // Получаем номер ячейки из класса
      const cellNumber = this.className.split('--')[1];
      selectCell(cellNumber);
    });
  });

  // Добавляем обработчики клика на ячейки с ценами
  priceCells.forEach(cell => {
    cell.addEventListener('click', function() {
      // Получаем номер ячейки из класса
      const cellNumber = this.className.split('--')[1];
      selectCell(cellNumber);
    });
  });

  function selectCell(cellNumber) {
    // Удаляем активный класс со всех ячеек
    sizeCells.forEach(cell => cell.classList.remove('is-active'));
    priceCells.forEach(cell => cell.classList.remove('is-active'));

    // Добавляем активный класс к соответствующим ячейкам
    const selectedSizeCell = document.querySelector(`.table__first--${cellNumber}`);
    selectedSizeCell.classList.add('is-active');
    document.querySelector(`.table__second--${cellNumber}`).classList.add('is-active');

    // Получаем выбранный размер и цену
    const selectedSize = selectedSizeCell.textContent;
    const selectedPrice = document.querySelector(`.table__second--${cellNumber}`).textContent;

    // Обновляем информацию о выборе
    document.getElementById('sizeValue').textContent = selectedSize;
    document.getElementById('priceValue').textContent = selectedPrice;

    // Показываем блок с выбранным размером
    const selectedSizeBlock = document.getElementById('selectedSize');
    selectedSizeBlock.classList.add('show');

    // Активируем соответствующую картинку
    activateImageBySize(selectedSize);
  }

  function activateImageBySize(size) {
    // Сбрасываем все картинки и подписи
    images.forEach(img => {
      img.classList.remove('is-active');
      // Возвращаем обычное изображение (без -active)
      if (img.src.includes('-active')) {
        img.src = img.src.replace('-active', '');
      }
    });

    // Скрываем все подписи
    subs.forEach(sub => sub.classList.add('visually-hidden'));

    // Ищем картинку с соответствующим размером в alt
    let found = false;
    images.forEach(img => {
      if (img.alt === size) {
        img.classList.add('is-active');
        // Меняем src на активную версию
        if (!img.src.includes('-active')) {
          img.src = img.src.replace('.png', '-active.png');
        }

        // Показываем соответствующую подпись
        const subIndex = img.closest('.table__item').querySelector('.table__item-sub');
        if (subIndex) {
          subIndex.classList.remove('visually-hidden');
        }

        found = true;
      }
    });

    // Если не нашли подходящего размера, активируем первую картинку
    if (!found && images.length > 0) {
      images[0].classList.add('is-active');
      if (!images[0].src.includes('-active')) {
        images[0].src = images[0].src.replace('.png', '-active.png');
      }
      subs[0].classList.remove('visually-hidden');
    }
  }

  // Автоматически выбираем первый вариант при загрузке
  selectCell('1');
});

class Header {
  selectors = {
    root: "[data-js-header]",
    overlay: "[data-js-header-overlay]",
    burgerButton: "[data-js-header-burger-button]",
  };

  stateClasses = {
    isActive: "is-active",
    isLock: "is-lock",
  };

  constructor() {
    this.rootElement = document.querySelector(this.selectors.root);
    this.overlayElement = this.rootElement.querySelector(
      this.selectors.overlay
    );
    this.burgerButtonElement = this.rootElement.querySelector(
      this.selectors.burgerButton
    );
    this.bindEvents();
  }

  onBurgerButtonClick = () => {
    this.burgerButtonElement.classList.toggle(this.stateClasses.isActive);
    this.overlayElement.classList.toggle(this.stateClasses.isActive);
    document.documentElement.classList.toggle(this.stateClasses.isLock);
  };

  bindEvents() {
    this.burgerButtonElement.addEventListener(
      "click",
      this.onBurgerButtonClick
    );
  }
}
new Header();

document.addEventListener("DOMContentLoaded", function () {
  const burgerButton = document.querySelector("[data-js-header-burger-button]");
  const mainElement = document.querySelector("main");
  const html = document.querySelector("html");
  const hero = document.querySelector(".hero");
  const footerMobile = document.querySelector(".footer-mobile");
  // const footer-mobile = document.querySelector(".footer-overlay-mobile");
  burgerButton.addEventListener("click", function () {
    // Переключаем класс is-active на кнопке
    // Проверяем, есть ли у кнопки класс is-active
    if (html.classList.contains("is-lock")) {
      // Если есть, добавляем класс visually-hidden к main
      mainElement.classList.add("visually-hidden");
      hero.classList.add("visually-hidden");
      footerMobile.classList.add("visually-hidden");
      // footer-overlay-mobile.classList.add("visually-hidden");
      // Показываем меню
    } else {
      // Если нет, удаляем класс visually-hidden у main
      mainElement.classList.remove("visually-hidden");
      hero.classList.remove("visually-hidden");
      footerMobile.classList.remove("visually-hidden");
      // footer-overlay-mobile.classList.remove("visually-hidden");
      // Скрываем меню
    }
  });
});

