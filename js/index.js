"use strict";

$(document).ready(function () {
  $(".menu_icon").click(function () {
    $(".navbar").toggleClass("mobile");
  });

  $(".services_select").change(function () {
    $(".description_block_active").removeClass("description_block_active");
    $(`[data-name=${this.value}]`).addClass("description_block_active");
  });
});

//----Services Tabs----//

pageLoadCheck();
eachTabCheck();

function pageLoadCheck() {
  if ($(!`[data-tab-name = "web-design"`)) {
    $(`[data-name = "web-design"]`).removeClass("description_block_active");
    $(`.services_item:first-child`).addClass("active");
    $(
      `[data-name = ${$(`.services_item:first-child`).data("tab-name")}]`
    ).addClass("description_block_active");
  }
}

function eachTabCheck() {
  $(`.services_item`).each(function () {
    if (document.querySelector(`[data-name= ${$(this).data("tab-name")}]`)) {
      $(this).on(`click`, buttonActivatingHandler);
    } else {
      $(this).addClass("none");
    }
  });
}

function disableOthersTabs() {
  $(`.services_item`).each(function () {
    if ($(this).hasClass("active")) {
      $(this).removeClass("active");
      $(`[data-name= ${$(this).data("tab-name")}]`).removeClass(
        "description_block_active"
      );
    }
  });
}

function buttonActivatingHandler() {
  let currentTextBlock = $(`[data-name= ${$(this).data("tab-name")}]`);
  if (!currentTextBlock.hasClass("description_block_active")) {
    disableOthersTabs();
    currentTextBlock.addClass("description_block_active");
    $(this).addClass("active");
  }
}

//---------------//

//----Amazing Tabs, Button----//

$(`.category_item`).click(categoryClickingHandler);
$(".category_option").click(categoryClickingHandler);

function categoryClickingHandler() {
  let currentTab = $(this);
  const className = currentTab[0].classList[0];

  if (currentTab.hasClass("active")) {
    currentTab.removeClass("active");
    resumeTabs();
    return;
  }
  if (currentTab.data("amazing-tab") === "all") {
    tabsActiveCheck(className);
    resumeTabs();
    currentTab.addClass("active");
    return;
  }
  tabsActiveCheck(className);
  $(`.category_image_item`).each(function () {
    if ($(this).data("amazing-name") !== currentTab.data("amazing-tab")) {
      $(this).addClass("none");
      return;
    }
    currentTab.addClass("active");
  });
}
function tabsActiveCheck(className) {
  $(`.${className}`).each(function () {
    if ($(this).hasClass("active")) {
      $(this).removeClass("active");
      resumeTabs();
    }
  });
}

function resumeTabs() {
  $(`.category_image_item`).each(function () {
    $(this).removeClass("none");
  });
}
let counter = 0;
$(`.category_load_button`).on("click", loadNewImages);
function loadNewImages() {
  counter++;
  if (counter === 1) {
    $(`.amazing_bar`).removeClass("bar_hided");
    let timer = setTimeout(() => {
      $(`.amazing_bar`).addClass("bar_hided");
      $(`.first_section_hideElement`).removeClass("not_show");
    }, 2300);
  }
  if (counter === 2) {
    $(`.amazing_bar`).removeClass("bar_hided");
    let timer = setTimeout(() => {
      $(`.amazing_bar`).addClass("bar_hided");
      $(`.second_section_hideElement`).removeClass("not_show");
      $(`.amazing_button_wrapper`).addClass("none");
      $(`.amazing_work .container`).addClass("padding_bottom");
    }, 2300);
  }
}
//---------------//

//----Carousel----//
$(`.slider_button_left`).on("click", previousSlide);
$(`.slider_button_right`).on("click", nextSlide);
$(`.slide_people_icon`).each(function () {
  $(this).on("click", imageSliderHandler);
});
let personBlocks = $(`.person_wrapper`);
let slides = $(`.slide_people_icon`);
let currentPerson = $(`.person_wrapper:nth-child(3)`).data("person-number") - 1;
let currentSlide = $(`.slide_selected`).data("slide-number") - 1;
$(personBlocks[currentPerson]).fadeIn();
function previousSlide() {
  $(slides[currentSlide]).removeClass("slide_selected");
  $(personBlocks[currentPerson]).fadeOut(function () {
    previousSlideCheck();
    $(slides[currentSlide]).addClass("slide_selected");
    $(personBlocks[currentPerson]).fadeIn();
  });
}
function nextSlide() {
  $(slides[currentSlide]).removeClass("slide_selected");
  $(personBlocks[currentPerson]).fadeOut(function () {
    nextSlideCheck();
    $(slides[currentSlide]).addClass("slide_selected");
    $(personBlocks[currentPerson]).fadeIn();
  });
}
function imageSliderHandler() {
  $(slides[currentSlide]).removeClass("slide_selected");
  currentSlide = $(this).data("slide-number") - 1;
  $(personBlocks[currentPerson]).fadeOut(function () {
    currentPerson = currentSlide;
    $(slides[currentSlide]).addClass("slide_selected");
    $(personBlocks[currentPerson]).fadeIn();
  });
}
function nextSlideCheck() {
  if (currentPerson === 3) {
    currentPerson = -1;
    currentSlide = -1;
  }
  currentPerson += 1;
  currentSlide += 1;
}
function previousSlideCheck() {
  if (currentPerson === 0) {
    currentPerson = 4;
    currentSlide = 4;
  }
  currentPerson -= 1;
  currentSlide -= 1;
}

//---------------//

//----Masonry----//

$(".masonry").masonry({
  itemSelector: ".masonry_item",
  gutter: 13.3,
});

$(".small_main_items").masonry({
  itemSelector: ".small_masonry_width1",
  gutter: 3,
});

$(".small_masonry").masonry({
  itemSelector: ".small_masonry_item",
  gutter: 3,
});

$(`.masonry_load_button`).one("click", loadMasonryImages);
function loadMasonryImages() {
  $(`.masonry_bar`).removeClass("bar_hided");
  let timer = setTimeout(() => {
    $(`.first_masonry_hideElement`).removeClass("not_show");
    $(".masonry").masonry({
      itemSelector: ".masonry_item",
      gutter: 13.3,
    });
    $(`.masonry_bar`).addClass("bar_hided");
    $(`.masonry_button_wrapper`).addClass("none");
  }, 2300);
}

//---------------//
