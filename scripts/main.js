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

  burgerButton.addEventListener("click", function () {
    // Переключаем класс is-active на кнопке
    // Проверяем, есть ли у кнопки класс is-active
    if (html.classList.contains("is-lock")) {
      // Если есть, добавляем класс visually-hidden к main
      mainElement.classList.add("visually-hidden");
      // Показываем меню
    } else {
      // Если нет, удаляем класс visually-hidden у main
      mainElement.classList.remove("visually-hidden");
      // Скрываем меню
    }
  });
});





//валидация формы
const rootSelector = "[data-js-input-mask]";

class InputMask {
  constructor(rootElement) {
    this.rootElement = rootElement;
    this.init();
  }

  init() {
    const isLibReady = typeof window.IMask != "undefined";

    if (isLibReady) {
      window.IMask(this.rootElement, {
        mask: this.rootElement.dataset.jsInputMask,
      });
    } else {
      console.error('библеотека "imask" не подключена');
    }
  }
}

class InputMaskCollection {
  constructor() {
    this.init();
  }

  init() {
    document.querySelectorAll(rootSelector).forEach((element) => {
      new InputMask(element);
    });
  }
}

new InputMaskCollection()

document.querySelector('.calculator__upload-button').addEventListener('change', function(e) {
  const fileName = this.files[0] ? this.files[0].name : 'Файл не выбран';
  document.getElementById('fileName').textContent = fileName;
});




document.addEventListener('DOMContentLoaded', function() {
  const typeSelect = document.getElementById('type');
  const priceElement = document.querySelector('.calculator__price');
  let basePrice = 0;

  const cupImage = document.querySelector('.calculator__cup-image');


  // Получаем элемент чекбокса
  const surpriseBox = document.getElementById('surprise-box');

// Получаем радиокнопки для способа получения
  const deliveryRadios = document.querySelectorAll('input[name="receiving-type"]');

  const optionPrices = {
    'size-for-white': {
      'Маленькая': 650,
      'Стандартная': 490,
      'Большая': 750
    },
    'size-for-latte': {
      'Стандартная': 790,
      'Большая': 990
    },
    'type-of-beer-cup': {
      'Керамическая': 1400,
      'Матовое стекло': 1200,
      'Белая': 1200
    }
  };

  const imageUrls = {
    'Белая': {
      'Маленькая': 'https://копировальня.рф/wp-content/uploads/2020/06/Sunmeta-6-SKB01D_1.jpg',
      'Стандартная': 'https://копировальня.рф/wp-content/uploads/2019/09/mug_white_700.jpg',
      'Большая': 'https://копировальня.рф/wp-content/uploads/2020/06/b8de65ea52cac398dde1a60a3129476e.jpg'
    },
    'Цветная внутри': {
      'Красная': 'https://копировальня.рф/wp-content/uploads/2019/09/mug_color_red_700.jpg',
      'Оранжевая': 'https://копировальня.рф/wp-content/uploads/2019/09/mug_color_orange_700.jpg',
      'Желтая': 'https://копировальня.рф/wp-content/uploads/2019/09/mug_color_yellow_700.jpg',
      'Синяя': 'https://копировальня.рф/wp-content/uploads/2020/06/mug_color_blue_700_kopia.jpg',
      'Голубая': 'https://копировальня.рф/wp-content/uploads/2019/09/mug_color_light_blue_700.jpg',
      'Зеленая': 'https://копировальня.рф/wp-content/uploads/2019/09/mug_color_green_700.jpg',
      'Салатовая': 'https://копировальня.рф/wp-content/uploads/2019/09/mug_color_light_green_700.jpg',
      'Черная': 'https://копировальня.рф/wp-content/uploads/2019/09/mug_color_black_700.jpg',
      'Бордовая': 'https://копировальня.рф/wp-content/uploads/2019/09/mug_color_burgundy_700.jpg'
    },
    'С надписями внутри': {
      'Улыбнись': 'https://копировальня.рф/wp-content/uploads/2020/06/13993.jpg',
      'С Любовью': 'https://копировальня.рф/wp-content/uploads/2020/06/13996.jpg',
      'Пора на работу': 'https://копировальня.рф/wp-content/uploads/2020/06/13994.jpg',
      'С днём рождения': 'https://копировальня.рф/wp-content/uploads/2020/06/15050.jpg'
    },
    'Хамелеон': 'https://копировальня.рф/wp-content/uploads/2019/09/mug_chameleon_glossy_black_700.jpg',
    'Латте': {
      'Стандартная': 'https://копировальня.рф/wp-content/uploads/2020/06/HC721047WT.jpg',
      'Большая': 'https://копировальня.рф/wp-content/uploads/2020/06/Snimok_ekrana_2020-06-28_v_21_53_11_kopia.jpg'
    },
    'Металлик': {
      'Золотая': 'https://копировальня.рф/wp-content/uploads/2019/09/mug_gold_700.jpg',
      'Серебряная': 'https://копировальня.рф/wp-content/uploads/2019/09/mug_silver_700.jpg',
      'Розовая': 'https://копировальня.рф/wp-content/uploads/2020/07/26412_kruzhka-pod-logotip-s-3d-effe_kopia.jpg',
      'Синяя': 'https://копировальня.рф/wp-content/uploads/2020/09/%D0%B3%D0%BE%D0%BB%D1%83%D0%B1.jpg'
    },
    'Эмалированная': 'https://копировальня.рф/wp-content/uploads/2019/09/%D0%AD%D0%BC%D0%B0%D0%BB%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D0%BD%D0%BD%D0%B0%D1%8F-%D1%80%D0%B5%D1%82%D1%80%D0%BE-%D0%BA%D1%80%D1%83%D0%B6%D0%BA%D0%B0.jpg',
    'Кофейная': 'https://копировальня.рф/wp-content/uploads/2020/06/promotional-price-blank-white-sublimation-ceramic-mug_1_vbkg.jpg',
    'Термокружка': 'https://копировальня.рф/wp-content/uploads/2019/09/%D0%B0%D0%B2%D1%82%D0%BE%D0%BC%D0%BE%D0%B1%D0%B8%D0%BB%D1%8C%D0%BD%D0%B0%D1%8F-%D1%82%D0%B5%D1%80%D0%BC%D0%BE-%D0%BA%D1%80%D1%83%D0%B6%D0%BA%D0%B0.jpg',
    'Пивная': {
      'Керамическая': 'https://копировальня.рф/wp-content/uploads/2019/09/mug_beer_gold_700.jpg',
      'Матовое стекло': 'https://копировальня.рф/wp-content/uploads/2020/06/bokal_steklo_title_kopia.jpg',
      'Белая': 'https://копировальня.рф/wp-content/uploads/2020/06/23bfd9aff17ddac6e11b80120f4a425d.jpg'
    },
    'Бутылка металл': 'https://копировальня.рф/wp-content/uploads/2019/09/%D1%81%D0%BF%D0%BE%D1%80%D1%82%D0%B8%D0%B2%D0%BD%D0%B0%D1%8F-%D0%B1%D1%83%D1%82%D1%8B%D0%BB%D0%BA%D0%B0-%D1%84%D0%BB%D1%8F%D0%B3%D0%B0.jpg'
  };

  // Все дополнительные селекты
  const additionalSelects = [
    'size-for-white',
    'color-for-colored-inside',
    'design',
    'size-for-latte',
    'color-for-metallic',
    'type-of-beer-cup'
  ];

  function updateCupImage() {
    const selectedType = typeSelect.value;
    let imageUrl = '';

    if (selectedType && imageUrls[selectedType]) {
      if (typeof imageUrls[selectedType] === 'string') {
        // Если тип имеет прямое соответствие URL
        imageUrl = imageUrls[selectedType];
      } else {
        // Если тип имеет дополнительные опции
        let additionalSelect = null;
        let additionalValue = null;

        switch(selectedType) {
          case 'Белая':
            additionalSelect = document.getElementById('size-for-white');
            break;
          case 'Цветная внутри':
            additionalSelect = document.getElementById('color-for-colored-inside');
            break;
          case 'С надписями внутри':
            additionalSelect = document.getElementById('design');
            break;
          case 'Латте':
            additionalSelect = document.getElementById('size-for-latte');
            break;
          case 'Металлик':
            additionalSelect = document.getElementById('color-for-metallic');
            break;
          case 'Пивная':
            additionalSelect = document.getElementById('type-of-beer-cup');
            break;
        }

        if (additionalSelect && !additionalSelect.classList.contains('visually-hidden')) {
          additionalValue = additionalSelect.value;
          if (additionalValue && imageUrls[selectedType][additionalValue]) {
            imageUrl = imageUrls[selectedType][additionalValue];
          }
        }

        // Если не удалось получить URL из дополнительной опции, используем первое доступное изображение
        if (!imageUrl) {
          const firstKey = Object.keys(imageUrls[selectedType])[0];
          imageUrl = imageUrls[selectedType][firstKey];
        }
      }

      // Устанавливаем новое изображение
      if (imageUrl) {
        cupImage.src = imageUrl;
      }
    }
  }

  // Функция для скрытия всех дополнительных селектов
  function hideAllSelects() {
    additionalSelects.forEach(id => {
      const element = document.getElementById(id);
      if (element) {
        element.classList.add('visually-hidden');
        element.value = ''; // Сбрасываем значение
      }
    });
  }

  // Функция для показа определенного селекта
  function showSelect(id) {
    hideAllSelects();
    const element = document.getElementById(id);
    if (element) {
      element.classList.remove('visually-hidden');
    }
  }

  function calculateTotalPrice() {
    let total = basePrice;

    // Добавляем стоимость коробки, если чекбокс отмечен
    if (surpriseBox.checked) {
      total += 80;
    }

    // Добавляем стоимость доставки, если выбрана доставка
    const deliverySelected = document.querySelector('input[name="receiving-type"]:checked').value === 'Доставка';
    if (deliverySelected) {
      total += 300;
    }

    // Обновляем отображение цены
    priceElement.textContent = `Стоимость: ${total}₽`;
  }

  // Функция для обновления цены
  function updatePrice(price) {
    basePrice = Math.max(0, price);
    calculateTotalPrice();
  }

  function getOptionPrice(selectId, value) {
    if (optionPrices[selectId] && optionPrices[selectId][value]) {
      return optionPrices[selectId][value];
    }
    return basePrice; // Если цена для опции не определена, возвращаем базовую цену
  }

  // Обработчик изменения основного селекта


// Обработчик для чекбокса
  surpriseBox.addEventListener('change', calculateTotalPrice);

// Обработчики для радиокнопок доставки
  deliveryRadios.forEach(radio => {
    radio.addEventListener('change', calculateTotalPrice);
  });

// Обработчики для дополнительных селектов
  document.getElementById('size-for-white').addEventListener('change', function() {
    basePrice = getOptionPrice('size-for-white', this.value);
    calculateTotalPrice();
    updateCupImage();
  });

  document.getElementById('color-for-colored-inside').addEventListener('change', function() {
    updateCupImage();
  });

  document.getElementById('design').addEventListener('change', function() {
    updateCupImage();
  });

  document.getElementById('size-for-latte').addEventListener('change', function() {
    basePrice = getOptionPrice('size-for-latte', this.value);
    calculateTotalPrice();
    updateCupImage();
  });

  document.getElementById('color-for-metallic').addEventListener('change', function() {
    updateCupImage();
  });

  document.getElementById('type-of-beer-cup').addEventListener('change', function() {
    basePrice = getOptionPrice('type-of-beer-cup', this.value);
    calculateTotalPrice();
    updateCupImage();
  });

  typeSelect.addEventListener('change', function() {
    const selectedValue = this.value;

    // Скрываем все дополнительные опции
    hideAllSelects();

    // Обрабатываем выбор в зависимости от значения
    switch(selectedValue) {
      case 'Белая':
        showSelect('size-for-white');
        // Устанавливаем стандартную цену для белой кружки
        basePrice = 490;
        calculateTotalPrice();
        break;
      case 'Цветная внутри':
        showSelect('color-for-colored-inside');
        updatePrice(590);
        break;
      case 'С надписями внутри':
        showSelect('design');
        updatePrice(750);
        break;
      case 'Хамелеон':
        updatePrice(750);
        break;
      case 'Латте':
        showSelect('size-for-latte');
        // Устанавливаем стандартную цену для латте
        basePrice = 790;
        calculateTotalPrice();
        break;
      case 'Металлик':
        showSelect('color-for-metallic');
        updatePrice(690);
        break;
      case 'Эмалированная':
        updatePrice(890);
        break;
      case 'Кофейная':
        updatePrice(850);
        break;
      case 'Термокружка':
        updatePrice(1200);
        break;
      case 'Пивная':
        showSelect('type-of-beer-cup');
        // Устанавливаем стандартную цену для пивной кружки
        basePrice = 1200;
        calculateTotalPrice();
        break;
      case 'Бутылка металл':
        updatePrice(1200);
        break;
      default:
        updatePrice(0);
    }

    // Обновляем изображение кружки
    updateCupImage();
  });

  // Добавляем обработчики для дополнительных селектов, если нужно обновлять цену при их изменении
  additionalSelects.forEach(id => {
    const select = document.getElementById(id);
    if (select) {
      select.addEventListener('change', function() {
        // Здесь можно добавить логику изменения цены
        // в зависимости от выбора в дополнительном селекте
      });
    }
  });

// Добавляем обработчик события change для чекбокса
  surpriseBox.addEventListener('change', function() {
    // Пересчитываем цену с учетом состояния чекбокса
    const finalPrice = this.checked ? basePrice + 80 : basePrice;
    priceElement.textContent = `Стоимость: ${finalPrice}₽`;
  });
});


