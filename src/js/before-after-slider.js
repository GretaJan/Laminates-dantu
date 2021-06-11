
var beforeAfterSlide = document.querySelectorAll("#before-after-slide");

beforeAfterSlide.forEach(item => {
  bearSlider(item);
  item.addEventListener("click", function(e) {
    e.preventDefault();
    e.stopPropagation();
  })
  item.addEventListener("mouseenter", function() {
    if(item.parentElement.getAttribute('data-type') === 'active' || item.getAttribute('data-type') === 'slide-active') {
    customSliding(item);
      return;
    }
  })
});

function bearSlider(item) {
  new BeerSlider( item, {
    // start value
    start: '50',
    prefix: 'beer'
  });
}


function customSliding(item) {
    item.addEventListener("mousemove", function (event) {
      var rect = event.target.getBoundingClientRect();
      var x = event.clientX - rect.left; //x position within the element.
      item.children[3].style.left = `${x}px`;
      item.children[1].style.width = `${x}px`;
    });
    item.addEventListener("mouseleave", function(e) {
      item.children[3].style.left = '50%';
      item.children[1].style.width = '50%';
    });

}




